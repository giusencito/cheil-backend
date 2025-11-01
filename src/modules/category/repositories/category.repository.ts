import { Injectable } from '@nestjs/common';
import { GenericCrudRepository } from 'src/common/repositories/GenericCrudRepository';
import { CategoryEntity } from '../entities/category.entity';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class CategoryRepository extends GenericCrudRepository<CategoryEntity> {
  protected modelName = 'category';
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
  findByName(name: string): Promise<CategoryEntity | null> {
    return this.prisma.category.findFirst({
      where: { name, deletedAt: null },
    });
  }
  findByCode(code: string): Promise<CategoryEntity | null> {
    return this.prisma.category.findFirst({
      where: { code, deletedAt: null },
    });
  }
}
