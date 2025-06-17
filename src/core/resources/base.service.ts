import { Injectable, Logger } from '@nestjs/common';
import { BaseDataEntity } from '../entities/base.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
  IResFilter,
  IUpdateOptions,
  RecordMapResult,
  ResBuilder,
} from './resources.type';
import { BadRequestError } from '../errors';
import { IAuditLog } from '../interfaces';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { ERROR_MESSAGES } from '../constants';
import { MAX_PAGINATION_LIMIT, Pagination } from './pagination';

// Maximum execution time for queries in milliseconds
export const MAX_EXECUTION_TIME = 2000;

@Injectable()
export class BaseService<T extends BaseDataEntity> {
  protected readonly resName: string;
  private readonly _repository: Repository<T>;
  protected readonly _hardRelations: string[];
  private readonly _logger: Logger;
  protected readonly _filters: IResFilter[];

  constructor(options: {
    resName: string;
    repository: Repository<T>;
    hardRelations?: string[];
    filters?: IResFilter[];
  }) {
    this.resName = options.resName;
    this._repository = options.repository;
    this._hardRelations = options.hardRelations || [];
    this._filters = options.filters || [];

    this._logger = new Logger(`BaseCrud:${this.resName}`);
  }

  /**
   * Creates a new entity record after checking for existing matches.
   * Throws a BadRequestError if a matching record exists (including soft-deleted records).
   *
   * @param findMatch - A function that returns a promise resolving to an existing record if found.
   * @param createDto - A function that returns a promise resolving to the DTO for creation.
   * @param options - Options for creation, including audit log details.
   * @returns The newly created entity.
   * @throws BadRequestError if a matching record already exists.
   */
  protected async _create(
    options: ICreateOptions & {
      findMatch?: ResBuilder<T>;
      createDto: ResBuilder<T>;
      onCreated?: (record: T) => void;
    },
  ): Promise<T> {
    const { createDto, findMatch, onCreated, ...opts } = options;
    // Check match
    const existRecord = await findMatch?.();

    if (existRecord) {
      if (existRecord.deletedAt) {
        throw new BadRequestError({
          message: `The ${this.resName} record already exists but is marked as deleted.`,
        });
      }
      throw new BadRequestError({
        message: `The ${this.resName} record already exists.`,
      });
    }

    const dto = await createDto();

    const result = await this._repository.save<T>(dto);

    // Audit logger
    this.logActivity({
      ...opts,
      accessType: 'create',
      resId: result.id,
      accessById: options.createdById,
    });

    // Call onCreated callback if provided
    onCreated?.(result);

    return result;
  }

  // Find match
  async _findOne(
    id: string,
    type: { new (): T },
    options: IFindOneOptions<T>,
  ): Promise<T | null | undefined> {
    const {
      // relations,
      // select,
      // includes,
      // filters,
      loadArchived = true,
      throwArchivedException = true,
      throwNotFoundException = true,
      notFoundMessage = ERROR_MESSAGES.ERROR_NOT_FOUND,
      archivedMessage = ERROR_MESSAGES.ERROR_RECORD_ARCHIVE,
      // loadHardRel = true,
      queryApplier,
      filterData,
    } = options;
    try {
      // Create query builder
      const builder = this._repository
        .createQueryBuilder(`${this.resName}`)
        .maxExecutionTime(MAX_EXECUTION_TIME);
      if (loadArchived) {
        builder.withDeleted();
      }

      // // Apply relations and includes
      // this._applyRelations(builder, type, {
      //   relations: relations,
      //   includes: includes,
      //   loadHardRel: loadHardRel,
      // });

      // if (includes) {
      //   this._applyRelationIncludes(builder, this.resource, includes, embedded);
      // }
      //
      // const recFilters = this.parseFilters(new type().getSchema(), filters);
      // if (recFilters) {
      //   this._applyFilters(builder, type, recFilters);
      // }
      //

      if (builder.expressionMap.wheres.length > 0) {
        // Apply find by id where clause.
        builder.andWhere(`${this.resName}.id = :id`, {
          id: id,
        });
      } else {
        // Apply find by id where clause.
        builder.where(`${this.resName}.id = :id`, {
          id: id,
        });
      }

      // Apply active filter
      if (filterData && (this._filters?.length ?? 0) > 0) {
        this.applyFilters(builder, filterData);
      }

      /// Apply query.
      queryApplier?.(builder);

      // // Apply select fields
      // if (select) {
      //   this._applySelect(builder, type, select);
      // }
      // Apply translation
      const record = await builder.getOne();

      if (throwNotFoundException && !record) {
        throw new BadRequestError({
          message: notFoundMessage,
        });
      }

      // Throw archive error
      if (throwArchivedException && record && record.deletedAt) {
        throw new BadRequestError({
          message: archivedMessage,
        });
      }
      return record;
    } catch (e) {
      this._logger.error(e);
      rethrow(e);
    }
  }

  protected async _paginate(
    type: { new (): T },
    options: IPaginationOption<T> = {},
  ): Promise<RecordMapResult<T>> {
    const {
      queryApplier,
      limit,
      query,
      skip,
      url,
      ids,
      offset,
      active,
      // filters,
      // select,
      // orderBy,
      // includes,
      // sortBy,
      // sortOrder = 'ASC',
      // queryFields,
      // embedded,
      filterData,
    } = options;

    // Create builder

    try {
      const builder = this._repository
        .createQueryBuilder(`${this.resName}`)
        .maxExecutionTime(MAX_EXECUTION_TIME);

      if (active !== undefined) {
        builder.where(`${this.resName}.active = :active`, {
          active,
        });
      }
      //
      // /// Apply includes
      // this._applyRelations(builder, type, options);

      // Apply query applier
      queryApplier?.(builder);

      // Apply includes
      // if (includes) {
      //   this._applyRelationIncludes(builder, this.resource, includes, embedded);
      // }

      // const recFilters = this.parseFilters(new type().getSchema(), filters);

      // let filteredFilers = [];
      // if (recFilters) {
      //   filteredFilers = this._applyFilters(builder, type, recFilters);
      // }

      // Apply select fields
      if (filterData && (this._filters?.length ?? 0) > 0) {
        this.applyFilters(builder, filterData);
      }

      //
      // if (query) {
      //   this._applyQuery(builder, type, query, [], queryFields);
      // }
      //
      // const selection = this._applySelect(builder, type, select);

      if (limit) {
        builder.take(
          limit <= MAX_PAGINATION_LIMIT ? limit : MAX_PAGINATION_LIMIT,
        );
      }

      if (offset) {
        /// Add pagination
        builder.skip(offset);
      }

      // // Apply sort.
      // if (orderBy) {
      //   this._applyOrder(builder, filteredFilers, orderBy);
      // }
      //
      // if (sortBy) {
      //   this._applySortBy(builder, type, sortBy, sortOrder);
      // }
      const selection: string | undefined = undefined;

      if (ids && builder.expressionMap.wheres.length) {
        builder.andWhereInIds(ids);
      } else if (ids) {
        builder.whereInIds(ids);
      }

      const [records, total] = await builder.getManyAndCount();

      const entries = records.map((e) => e.toMap(selection));

      return new Pagination<RecordMapResult<T>>(
        {
          entries,
          total,
          offset: skip,
          limit: limit,
          query: query,
          // select: selection ? selection.join(',') : undefined,
          select: undefined,
        },
        url ?? '/',
      );
    } catch (e) {
      this._logger.error(e);
      rethrow(e);
    }
  }

  protected async _update(
    id: string,
    type: { new (): T },
    options: IUpdateOptions<T>,
  ): Promise<RecordMapResult<T>> {
    const { lang, dto, searchMatch, unique, ...rest } = options;

    try {
      // Update exist record.

      const record = (await this._findOne(id, type, options)) as T;

      // Search for match.
      const match = await searchMatch?.(record, lang);
      if (match && unique) {
        throw new BadRequestError({
          message: `The ${this.resName} record already exists.`,
        });
      }

      const updatedDataRecord = Object.assign(record, dto);

      // Update name in case default language
      const updatedRecord = await this._repository.save<T>(
        this._repository.create(updatedDataRecord),
        {
          reload: true,
        },
      );

      this.logActivity({
        ...rest,
        lang,
        accessType: 'update',
        status: 'success',
      });
      return updatedRecord;
    } catch (e) {
      this._logger.error(e);
      this.logActivity({
        ...rest,
        lang,
        accessType: 'update',
        status: 'failed',
      });
      rethrow(e);
    }
  }

  protected async _removeByQuery(
    options: IRemoveOptions<T>,
  ): Promise<T | T[] | undefined> {
    const { queryApplier, many, filterData, ...rest } = options;
    const builder = this._repository
      .createQueryBuilder(`${this.resName}`)
      .maxExecutionTime(MAX_EXECUTION_TIME);

    // Apply query filters
    queryApplier?.call(this, builder);

    // Apply select fields
    if (filterData && (this._filters?.length ?? 0) > 0) {
      this.applyFilters(builder, filterData);
    }

    if (many) {
      const records = await builder.getMany();
      if (!records) {
        throw new BadRequestError({
          message: `No records found to delete for ${this.resName}.`,
        });
      }
      await this._repository.remove(records);

      // Activity log for each record deleted
      for (const record of records) {
        this.logActivity({
          ...rest,
          accessById: options.deletedById,
          resId: record.id,
          accessType: 'delete',
          status: 'success',
        });
      }
      return records;
    }

    // builder.select([`${this.resName}.id`]);

    const record = await builder.getOne();

    if (!record) {
      throw new BadRequestError({
        message: `No record found to delete for ${this.resName}.`,
      });
    }

    await this._repository.remove({ ...record });

    // Log activity for the deleted record
    this.logActivity({
      ...rest,
      accessById: options.deletedById,
      resId: record.id,
      accessType: 'delete',
      status: 'success',
    });
    return record;
  }

  protected async _findByIds(
    ids: string[],
    type: { new (): T },
    options: IPaginationOption<T> = {},
  ): Promise<T[]> {
    const { queryApplier, filterData, throwSomeRecordsNotFound } = options;

    // Create builder
    const builder = this._repository
      .createQueryBuilder(`${this.resName}`)
      .maxExecutionTime(MAX_EXECUTION_TIME);

    /// Apply query.
    queryApplier?.(builder);

    // Apply select fields
    if (filterData && (this._filters?.length ?? 0) > 0) {
      this.applyFilters(builder, filterData);
    }

    builder.whereInIds(ids).take(MAX_PAGINATION_LIMIT);

    try {
      const records = await builder.getMany();

      if (throwSomeRecordsNotFound && records.length < ids.length) {
        throw new BadRequestError({
          message: `Some of ${this.resName} records were not found.`,
        });
      }

      return records;
    } catch (e) {
      this._logger.error(e);
      rethrow(e);
    }
  }

  /**
   * Applies filters to the given TypeORM query builder based on the provided data and configured filters.
   *
   * Iterates over the `_filters` array and, for each filter:
   * - Checks if the corresponding key exists in the `data` object.
   * - Skips filters if the specified alias is not present in the query builder's aliases.
   * - Constructs a query condition for equality or `IN` clause depending on the filter configuration.
   * - Adds the condition to the query builder using `where` or `andWhere`.
   *
   * @param builder - The TypeORM `SelectQueryBuilder` to which filters will be applied.
   * @param data - An object containing filter values keyed by filter keys.
   */
  private applyFilters(
    builder: SelectQueryBuilder<T>,
    data: Record<string, any>,
  ) {
    const aliases =
      builder.expressionMap.aliases?.map((alias) => alias.name) ?? [];

    for (const field of this._filters || []) {
      if (data[field.key] === undefined) {
        continue;
      }

      if (field.alias && !aliases.includes(field.alias)) {
        continue;
      }

      let query = `${field.alias ?? this.resName}.${field.attr} = :${
        field.key
      }`;
      if (field.isIn) {
        query = `${field.alias ?? this.resName}.${field.attr} IN (:...${
          field.key
        })`;
      }

      if (builder.expressionMap.wheres.length === 0) {
        builder.where(query, {
          [field.key]: data[field.key] as unknown,
        });
      } else {
        builder.andWhere(query, {
          [field.key]: data[field.key] as unknown,
        });
      }
    }
  }

  /**
   * Logs an activity related to the resource.
   *
   * @param accessById - The ID of the user performing the action.
   * @param resId - The ID of the resource being accessed.
   * @param accessType - The type of access (e.g., create, update, delete).
   * @param status - The status of the action.
   */
  logActivity({ accessById, resId, accessType, status }: IAuditLog) {
    this._logger.log(
      `[${accessById}] accessed ${this.resName} resource with id: ${resId} and access type: ${accessType} and status: ${status}`,
    );
  }
}
