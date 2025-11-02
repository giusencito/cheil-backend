import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Filter } from 'src/common/collection/filter';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Post()
  async create(@Body() dto: CreateProductDto, @CurrentUser() user: UserEntity) {
    return await this.service.create(dto, user.id);
  }
  @Put()
  async update(@Body() dto: UpdateProductDto, @CurrentUser() user: UserEntity) {
    return await this.service.update(dto, user.id);
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.service.delete(id, user.id);
  }
  @Get()
  async find(@Query() query: Filter) {
    return this.service.findAll(query);
  }
}
