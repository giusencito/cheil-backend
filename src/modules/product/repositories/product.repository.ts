import { Injectable } from '@nestjs/common';
import { GenericCrudRepository } from 'src/common/repositories/GenericCrudRepository';
import { ProductEntity } from '../entities/product.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductRepository extends GenericCrudRepository<ProductEntity> {
  protected modelName = 'product';
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
  findByName(name: string): Promise<ProductEntity | null> {
    return this.prisma.product.findFirst({
      where: { name, deletedAt: null },
    });
  }
}
