export class ModelProductDto {
  id: string;
  name: string;
  descripcion?: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName?: string;
}
export class ObjectProductDto extends ModelProductDto {
  createdBy: string;
  createdAt: string;
}
