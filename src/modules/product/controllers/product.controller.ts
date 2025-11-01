import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Filter } from 'src/common/collection/filter';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProductDto, @CurrentUser() user: UserEntity) {
    return await this.service.create(dto, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() dto: UpdateProductDto, @CurrentUser() user: UserEntity) {
    return await this.service.update(dto, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.service.delete(id, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Query() query: Filter) {
    return this.service.findAll(query);
  }
}
