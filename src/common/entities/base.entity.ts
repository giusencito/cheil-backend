import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ModelEntity } from './model.entity';

export class BaseEntity extends ModelEntity {
  createdById: string;
  createdBy?: UserEntity;
  updatedById: string | null;
  updatedBy?: UserEntity;
  deletedById: string | null;
  deletedBy?: UserEntity;
}
