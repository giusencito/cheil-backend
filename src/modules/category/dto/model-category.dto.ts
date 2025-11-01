export class ModelCategoryDto {
  id: string;
  name: string;
  code: string;
  num?: number;
}
export class ObjectCategoryDto extends ModelCategoryDto {
  createdBy: string;
  createdAt: string;
}
