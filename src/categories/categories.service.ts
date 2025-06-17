import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseService,
  DeleteResult,
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
  RecordMapResult,
} from '../core/resources';
import { IRequestOptions } from '../core/interfaces';
import { CATEGORIES_FILTERS } from './constants';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {
    super({
      resName: 'category',
      repository: repository,
      filters: CATEGORIES_FILTERS,
    });
  }

  create(createCategoryDto: CreateCategoryDto, options: ICreateOptions) {
    return this._create({
      createDto: (): Promise<Category> => {
        return Promise.resolve(
          this.repository.create({
            ...createCategoryDto,
          }),
        );
      },
      ...options,
    });
  }

  async findAll(options: IPaginationOption<Category>) {
    return await this._paginate(Category, options);
  }

  async findByIds(ids: string[], options: IPaginationOption<Category>) {
    return await this._findByIds(ids, Category, options);
  }

  async findOne(
    id: string,
    options: IFindOneOptions<Category>,
  ): Promise<Category | null | undefined> {
    return this._findOne(id, Category, options);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    options: IRequestOptions,
  ): Promise<RecordMapResult<Category>> {
    return await this._update(id, Category, {
      ...options,
      unique: true,
      dto: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(
    id: string,
    options: IRemoveOptions<Category>,
  ): Promise<DeleteResult<Category>> {
    return this._removeByQuery({
      ...options,
      many: false,
      filterData: { id },
    });
  }
}
