import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() product: ProductDto,
    @GetUser() user,
  ): Promise<Product> {
    product.UserId = user.id;
    return await this.productService.createProduct(product);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('category')
  async getProductsByCategoryName(
    @Query('name') name: string,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategoryName(name);
  }

  @Get('/category/:id')
  async getProductsByCategoryId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategoryId(id);
  }

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productService.getProductById(id);
  }
}
