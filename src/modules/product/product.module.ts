import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
})
export class ProductModule {}
