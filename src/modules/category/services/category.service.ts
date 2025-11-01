import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelCategoryDto, ObjectCategoryDto } from '../dto/model-category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { DataCollection, GetPages } from 'src/common/collection/DataCollection';
import { Filter } from 'src/common/collection/filter';
import { ItemCombo } from 'src/common/collection/ItemCombo';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { getDayMonth } from 'src/common/helpers/time.helper';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async findOne(id: string): Promise<ObjectCategoryDto> {
    const category = await this.categoryRepository.findOne(id, false, {
      createdBy: { select: { name: true } },
    });
    if (!category) {
      throw new NotFoundException(`categoryId ${id} no encontrada`);
    }
    const findCategory: ObjectCategoryDto = {
      id: category.id,
      name: category.name,
      code: category.code,
      createdBy: category.createdBy?.name ?? '',
      createdAt: getDayMonth(category.createdAt),
    };
    return findCategory;
  }
  async create(
    createCategory: CreateCategoryDto,
    userId: string,
  ): Promise<BaseResponseDto> {
    const categoryName = await this.categoryRepository.findByName(
      createCategory.name,
    );
    const categoryCode = await this.categoryRepository.findByCode(
      createCategory.name,
    );
    if (categoryName || categoryCode) {
      throw new NotFoundException(`data de categoria ya existe`);
    }
    await this.categoryRepository.create({
      ...createCategory,
      createdById: userId,
    });
    const response = new BaseResponseDto();
    response.message = 'categoria creada';
    response.isSuccess = true;
    return response;
  }
  async update(
    updateCategory: UpdateCategoryDto,
    userId: string,
  ): Promise<BaseResponseDto> {
    const id = updateCategory.id;
    await this.categoryRepository.update(id, {
      ...updateCategory,
      updatedById: userId,
    });
    const response = new BaseResponseDto();
    response.message = 'categoria actualizada';
    response.isSuccess = true;
    return response;
  }
  async delete(id: string, userId: string): Promise<BaseResponseDto> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`categoryId ${id} no enocntrada`);
    }
    await this.categoryRepository.softDelete(id, userId);
    const response = new BaseResponseDto();
    response.message = 'categoria eliminada';
    response.isSuccess = true;
    return response;
  }
  async combo(filter: Filter): Promise<ItemCombo[]> {
    const categories = await this.categoryRepository.findAll(false, {
      orderBy: { name: 'desc' },
      skip: filter.skip ? Number(filter.skip) : undefined,
      take: filter.take ? Number(filter.take) : undefined,
      where: {
        name: {
          contains: filter.search ?? undefined,
        },
        deletedAt: null,
      },
    });
    const combo: ItemCombo[] = categories.map((category) => ({
      key: category.id,
      text: category.name,
    }));
    return combo;
  }
  async findAll(filter: Filter): Promise<DataCollection<ModelCategoryDto>> {
    const categories = await this.categoryRepository.findAll(false, {
      orderBy: { createdAt: 'desc' },
    });
    let count = 1;
    const list: ModelCategoryDto[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      code: category.code,
      num: count++,
    }));
    const collection: DataCollection<ModelCategoryDto> = {
      items: list.slice(filter.skip, filter.skip + filter.take),
      total: categories.length,
      page: Math.floor(filter.skip / filter.take) + 1,
      pages: GetPages(filter.take, categories.length),
    };
    return collection;
  }
}
