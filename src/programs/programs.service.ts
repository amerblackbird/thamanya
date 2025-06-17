import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  BaseService,
  DeleteResult,
  FindOneResult,
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
  RecordMapResult,
} from '../core/resources';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRequestOptions } from '../core/interfaces';
import { PROGRAMS_FILTERS } from './constants';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { ProgramCategory } from './entities/program-category.entity';

@Injectable()
export class ProgramsService extends BaseService<Program> {
  constructor(
    @InjectRepository(Program)
    private repository: Repository<Program>,
    private categoriesService: CategoriesService,
  ) {
    super({
      resName: 'program',
      repository: repository,
      filters: PROGRAMS_FILTERS,
    });
  }

  async create(createProgramDto: CreateProgramDto, options: ICreateOptions) {
    const { categoryIds, ...data } = createProgramDto;
    let categories: Category[] | undefined;
    if (categoryIds) {
      categories = await this.categoriesService.findByIds(categoryIds, {
        ...options,
        throwSomeRecordsNotFound: true,
      });
    }

    return this._create({
      createDto: (): Promise<Program> => {
        return Promise.resolve(
          this.repository.create({
            ...data,
            categories: categories?.map((category) => {
              const programCategory = new ProgramCategory();
              programCategory.category = category;
              return programCategory;
            }),
          }),
        );
      },
      ...options,
    });
  }

  async findAll(options: IPaginationOption<Program>) {
    return await this._paginate(Program, options);
  }

  async findOne(
    id: string,
    options: IFindOneOptions<Program>,
  ): Promise<FindOneResult<Program>> {
    return this._findOne(id, Program, options);
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
    options: IRequestOptions,
  ): Promise<RecordMapResult<Program>> {
    return await this._update(id, Program, {
      ...options,
      unique: true,
      dto: {
        ...updateProgramDto,
      },
    });
  }

  async remove(
    id: string,
    options: IRemoveOptions<Program>,
  ): Promise<DeleteResult<Program>> {
    return this._removeByQuery({
      ...options,
      many: false,
      filterData: { id },
    });
  }
}
