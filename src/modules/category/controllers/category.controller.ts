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
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Filter } from 'src/common/collection/filter';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}
  @Get('comboCat')
  async combo(@Query() query: Filter) {
    return this.service.combo(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Post()
  async create(
    @Body() dto: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.service.create(dto, user.id);
  }
  @Put()
  async update(
    @Body() dto: UpdateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
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
