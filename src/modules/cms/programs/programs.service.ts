import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  BaseService,
  FindOneResult,
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
} from '../../../core/resources';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRequestOptions } from '../../../core/interfaces';
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

  /**
   * Creates a new `Program` entity with optional category associations.
   *
   * - Extracts `categoryIds` from the provided DTO and fetches corresponding `Category` entities if present.
   * - Maps each `Category` to a new `ProgramCategory` entity for association.
   * - Persists the new `Program` entity using the base `_create` method, including its categories.
   * - After creation, updates the `search_vector` field in the `tbl_programs` table for full-text search support in PostgreSQL,
   *   using the program's `title` and `description`.
   *
   * @param createProgramDto - Data Transfer Object containing the fields for the new program, including optional `categoryIds`.
   * @param options - Creation options for the operation.
   * @returns The result of the `_create` operation, which is the created `Program` entity.
   */
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
      onCreated: (record) => {
        return this.repository.query(
          "UPDATE tbl_programs SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')) WHERE id = $1",
          [record.id],
        );
      },
      ...options,
    });
  }

  /**
   * Retrieves a paginated list of `Program` entities.
   *
   * @param options - Pagination options for retrieving programs.
   * @returns A paginated result of `Program` entities.
   */
  async findAll(options: IPaginationOption<Program>) {
    return await this._paginate(Program, options);
  }

  /**
   * Finds a single `Program` entity by its ID.
   *
   * @param id - The ID of the program to find.
   * @param options - Options for finding the program.
   * @returns The found `Program` entity wrapped in a `FindOneResult`.
   */
  async findOne(
    id: string,
    options: IFindOneOptions<Program>,
  ): Promise<FindOneResult<Program>> {
    return this._findOne(id, Program, options);
  }

  /**
   * Updates a `Program` entity by its ID.
   *
   * @param id - The ID of the program to update.
   * @param updateProgramDto - Data Transfer Object containing updated fields.
   * @param options - Request options for the update operation.
   * @returns The updated `Program` entity.
   */
  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
    options: IRequestOptions,
  ): Promise<Program> {
    return await this._update(id, Program, {
      ...options,
      unique: true,
      dto: {
        ...updateProgramDto,
      },
    });
  }

  /**
   * Removes a `Program` entity by its ID.
   *
   * @param id - The ID of the program to remove.
   * @param options - Options for removing the program.
   * @returns The removed `Program` entity.
   */
  async remove(id: string, options: IRemoveOptions<Program>): Promise<Program> {
    return (await this._removeByQuery({
      ...options,
      many: false,
      filterData: { id },
    })) as Program;
  }

  /**
   * Ensures that all `Program` entities have their `search_vector` field
   * populated for full-text search in PostgreSQL.
   *
   * This method updates all records in the `Program` table, setting the
   * `search_vector` column to a tsvector generated from the `title` and
   * `description` fields. It uses the English text search configuration.
   *
   * Example SQL generated:
   *   UPDATE tbl_programs
   *   SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''));
   */
  async validateSearchVector() {
    await this.repository.query(
      "UPDATE tbl_programs SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))",
    );
  }
}
