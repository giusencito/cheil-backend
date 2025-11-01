import { BaseEntity } from 'src/common/entities/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export class ProductEntity extends BaseEntity {
  name: string;
  descripcion: string | null;
  price: number;
  stock: number;
  categoryId: string;
  category?: CategoryEntity;
}
