import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ModelProductDto, ObjectProductDto } from '../dto/model-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DataCollection, GetPages } from 'src/common/collection/DataCollection';
import { Filter } from 'src/common/collection/filter';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { getDayMonth } from 'src/common/helpers/time.helper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async findOne(id: string): Promise<ObjectProductDto> {
    const product = await this.productRepository.findOne(id, false, {
      createdBy: { select: { name: true } },
      category: { select: { name: true } },
    });
    if (!product) {
      throw new NotFoundException(`productId ${id} not found`);
    }
    const findProduct: ObjectProductDto = {
      id: product.id,
      name: product.name,
      descripcion: product.descripcion ?? '',
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      categoryName: product.category?.name ?? '',
      createdBy: product.createdBy?.name ?? '',
      createdAt: getDayMonth(product.createdAt),
    };
    return findProduct;
  }
  async create(
    createProduct: CreateProductDto,
    userId: string,
  ): Promise<BaseResponseDto> {
    const productName = await this.productRepository.findByName(
      createProduct.name,
    );
    if (productName) {
      throw new NotFoundException(`data de producto ya existe`);
    }
    await this.productRepository.create({
      ...createProduct,
      createdById: userId,
    });
    const response = new BaseResponseDto();
    response.message = 'producto creado';
    response.isSuccess = true;
    return response;
  }
  async update(
    updateProduct: UpdateProductDto,
    userId: string,
  ): Promise<BaseResponseDto> {
    const id = updateProduct.id;
    await this.productRepository.update(id, {
      ...updateProduct,
      updatedById: userId,
    });
    const response = new BaseResponseDto();
    response.message = 'producto actualizado';
    response.isSuccess = true;
    return response;
  }
  async delete(id: string, userId: string): Promise<BaseResponseDto> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`productId ${id} not found`);
    }
    await this.productRepository.softDelete(id, userId);
    const response = new BaseResponseDto();
    response.message = 'producto eliminado';
    response.isSuccess = true;
    return response;
  }
  async findAll(filter: Filter): Promise<DataCollection<ModelProductDto>> {
    const products = await this.productRepository.findAll(false, {
      orderBy: { createdAt: 'desc' },
      include: {
        category: { select: { name: true } },
      },
    });
    let count = 1;
    const list: ModelProductDto[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      descripcion: product.descripcion ?? '',
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      categoryName: product.category?.name,
      num: count++,
    }));
    const collection: DataCollection<ModelProductDto> = {
      items: list.slice(filter.skip, filter.skip + filter.take),
      total: products.length,
      page: Math.floor(filter.skip / filter.take) + 1,
      pages: GetPages(filter.take, products.length),
    };
    return collection;
  }
}
