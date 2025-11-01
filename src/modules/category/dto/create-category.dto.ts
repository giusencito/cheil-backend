/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsOptional()
  createdById: string;
}
