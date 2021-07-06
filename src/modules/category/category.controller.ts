import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() category: CategoryDto,
    @GetUser() user,
  ): Promise<Category> {
    category.UserId = user.id;
    return await this.categoryService.createCategory(category);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get('/father')
  async getFatherCategories(): Promise<Category[]> {
    return this.categoryService.getFatherCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('/sons/:id')
  async getCategorySonsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategorySonsById(id);
  }
}
