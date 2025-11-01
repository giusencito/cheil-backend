/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaService } from 'src/database/prisma.service';
import { FindOptions } from '../collection/findOptions';

export abstract class GenericCrudRepository<T> {
  protected abstract modelName: string;
  constructor(protected readonly prisma: PrismaService) {}

  protected get model() {
    return (this.prisma as any)[this.modelName];
  }
  create(data: Partial<T>): Promise<T> {
    return this.model.create({ data });
  }
  findOne(
    id: string,
    includeDeleted: boolean = false,
    include?: any,
  ): Promise<T | null> {
    const where = includeDeleted ? { id } : { id, deletedAt: null };
    return this.model.findUnique({ where, include });
  }
  update(id: string, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }
  findAll(
    includeDeleted: boolean = false,
    options?: FindOptions,
  ): Promise<T[]> {
    const baseWhere = includeDeleted ? {} : { deletedAt: null };
    const where = options?.where
      ? { ...baseWhere, ...options.where }
      : baseWhere;

    return this.model.findMany({
      where,
      orderBy: options?.orderBy,
      include: options?.include,
      skip: options?.skip,
      take: options?.take,
    });
  }
  softDelete(id: string, userId: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date(), deletedById: userId },
    });
  }
  async exists(id: string): Promise<boolean> {
    const count = await this.model.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }
}
