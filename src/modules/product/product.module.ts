import { ProductController } from './controllers/product.controller';
import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [CategoryModule], // Importar para validar categorías
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductoModule {}
