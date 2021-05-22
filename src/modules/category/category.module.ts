import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders],
})
export class CategoryModule {}
