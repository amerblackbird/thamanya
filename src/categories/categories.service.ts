import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestError } from '../core/errors/bad-request.error';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.repository.save(this.repository.create(createCategoryDto));
  }

  findAll() {
    return this.repository
      .createQueryBuilder('category')
      .select(['category.id', 'category.title', 'category.description'])
      .getMany()
      .then((categories) => {
        return categories.map((category) => ({
          id: category.id,
          title: category.title,
          description: category.description,
        }));
      });
  }

  async findOne(id: string): Promise<Category | null> {
    return this.repository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | { message: string }> {
    const category = await this.findOne(id);
    if (!category) {
      return { message: 'Category not found' };
    }
    const res = await this.repository.update(id, updateCategoryDto);
    if (res.affected === 0) {
      return { message: 'No changes made to the category' };
    }

    return Object.assign(category, updateCategoryDto);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestError({
        message: 'Category not found',
      });
    }
    return this.repository
      .delete(id)
      .then(() => {
        return { message: 'Category deleted successfully' };
      })
      .catch(() => {
        return { message: 'Error deleting category' };
      });
  }
}
