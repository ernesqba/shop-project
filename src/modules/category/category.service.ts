import { Inject, Injectable } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from '../../core/constants';
import { CategoryDto } from './dto/category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  async createCategory(data: CategoryDto): Promise<Category> {
    const category = await this.categoryRepository.create<Category>(
      <Category>data,
    );
    return category;
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll<Category>();
    return categories;
  }

  async getCategoryById(id): Promise<Category> {
    const category = await this.categoryRepository.findByPk<Category>(id);
    return category;
  }

  async getCategorySonsById(id): Promise<Category> {
    const category = await this.categoryRepository.findByPk<Category>(id, {
      include: [
        {
          model: Category,
          as: 'Categories',
        },
      ],
    });
    return category;
  }
}
