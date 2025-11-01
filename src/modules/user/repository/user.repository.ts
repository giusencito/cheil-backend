/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { GenericCrudRepository } from 'src/common/repositories/GenericCrudRepository';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository extends GenericCrudRepository<UserEntity> {
  protected modelName = 'user';
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }
}
