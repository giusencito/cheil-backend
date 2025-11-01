/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsOptional()
  createdById: string;
}
