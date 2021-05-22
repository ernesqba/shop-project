import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import { PRODUCT_REPOSITORY } from '../../core/constants';
import { Category } from '../category/category.entity';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async createProduct(data: ProductDto): Promise<Product> {
    const product = await this.productRepository.create<Product>(<Product>data);
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll<Product>();
    return products;
  }

  async getProductById(id): Promise<Product> {
    const product = await this.productRepository.findByPk<Product>(id);
    return product;
  }

  async getProductsByCategoryId(id): Promise<Product[]> {
    const products = await this.productRepository.findAll<Product>({
      include: [
        {
          model: Category,
          where: {
            id,
          },
        },
      ],
    });
    return products;
  }

  async getProductsByCategoryName(name): Promise<Product[]> {
    const products = await this.productRepository.findAll<Product>({
      include: [
        {
          model: Category,
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
        },
      ],
    });
    return products;
  }
}
