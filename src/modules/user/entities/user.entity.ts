import { ModelEntity } from 'src/common/entities/model.entity';

export class UserEntity extends ModelEntity {
  name: string;
  email: string;
  password: string;
}
