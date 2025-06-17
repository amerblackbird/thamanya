// Search match
import { IRequestOptions } from '../interfaces';
import { DeepPartial, SelectQueryBuilder } from 'typeorm';
import { BaseDataEntity } from '../entities/base.entity';

export type ResMatchLookup<T> = (record: T, lang: string) => Promise<T>;

export type QueryApplier<T extends BaseDataEntity> = (
  builder: SelectQueryBuilder<T>,
  applyTranslation?: boolean,
) => void;

export type RecordMapResult<T> = T | Partial<T> | Record<string, any>;

export type ResBuilder<T> = () => Promise<T>;

export type FindOneResult<T> = T | null | undefined;

export type DeleteResult<T> = Partial<T> | Partial<T>[] | undefined | any;

export interface IResFilter {
  key: string;
  attr: string;
  alias?: string;
  isIn?: boolean;
  data?: Record<string, any>;
}

export interface ICreateOptions extends IRequestOptions {
  createdById?: string;
}

export interface IOrderBy {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface IFindOneOptions<T extends BaseDataEntity>
  extends IRequestOptions {
  loadArchived?: boolean;
  relations?: string[];
  select?: string;
  includes?: string;
  filters?: string;
  notFoundMessage?: string;
  archivedMessage?: string;
  throwNotFoundException?: boolean;
  throwArchivedException?: boolean;
  queryApplier?: QueryApplier<T>;
  ids?: string[];
  loadHardRel?: boolean;
  queryRelations?: string[];
  row?: boolean;
  active?: boolean;
  allows?: string;
  accessedById?: string;
  filterData?: Record<string, any>;
  errLog?: (e: any) => void;
}

export interface IPaginationOption<T extends BaseDataEntity> {
  lang?: string;
  loadArchived?: boolean;
  select?: string;
  include?: string;
  url?: string;
  filters?: string;
  orderBy?: IOrderBy[];
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  skip?: number;
  query?: string;
  notFoundMessage?: string;
  archivedMessage?: string;
  throwNotFoundException?: boolean;
  throwArchivedException?: boolean;
  throwSomeRecordsNotFound?: boolean;
  embedded?: boolean;
  queryApplier?: QueryApplier<T>;
  queryRelations?: string[];
  ids?: string[];
  relations?: string[];
  includes?: string;
  allows?: string;
  loadHardRel?: boolean;
  allowLimit?: boolean;
  all?: boolean;
  active?: boolean;
  published?: boolean;
  service?: boolean;
  addon?: boolean;
  isAddon?: boolean;
  mapping?: boolean;
  accessedById?: string;
  queryFields?: string[];
  translate?: boolean;
  filterData?: Record<string, any>;
}

export interface IRemoveOptions<T extends BaseDataEntity>
  extends IRequestOptions {
  queryApplier?: QueryApplier<T>;
  many?: boolean;
  deletedById?: string;
  deletedIds?: string[];
  deletedId?: string;
  sysRecord?: boolean;
  filterData?: Record<string, any>;
}

export interface IUpdateOptions<T extends BaseDataEntity> {
  dto: DeepPartial<T>;
  lang: string;
  searchMatch?: ResMatchLookup<T>;
  unique?: boolean;
  relations?: string[];
  updatedById?: string;
  restore?: boolean;
}
