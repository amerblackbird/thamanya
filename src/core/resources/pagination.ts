import * as url from 'url';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { RecordMapResult } from './resources.type';
import { BaseDataEntity } from '../entities/base.entity';

export const MAX_PAGINATION_LIMIT = 50;

export interface IPaginationResult<T extends RecordMapResult<BaseDataEntity>> {
  entries: T[];
  total: number;
  offset?: number;
  select?: string;
  limit?: number;
  url?: number;
  query?: string;
}

export class Pagination<
  PaginationEntity extends RecordMapResult<BaseDataEntity>,
> {
  public entries: PaginationEntity[];
  public meta: any;

  constructor(result: IPaginationResult<PaginationEntity>, baseUrl: string) {
    const offset = result.offset ?? 0;
    const limit =
      result.limit && result.limit <= MAX_PAGINATION_LIMIT
        ? result.limit
        : MAX_PAGINATION_LIMIT;
    this.entries = result.entries;
    const next = offset + limit < result.total;
    const prev = offset >= limit;
    const query = result.query ? `query=${result.query}&` : '';

    const select = result.select ? `select=${result.select}&` : '';

    this.meta = {
      total: result.total,
      count: result.entries.length,
      offset: offset ?? 0,
      limit: limit ?? MAX_PAGINATION_LIMIT,
      page: {
        next: next
          ? `${url.parse(baseUrl).pathname}?${query}${select}offset=${
              offset + limit
            }&limit=${limit}&since=${Math.round(+new Date() / 1000)}`
          : null,
        previous: prev
          ? `${url.parse(baseUrl).pathname}?${query}${select}offset=${
              offset - limit
            }&limit=${limit}&since=${Math.round(+new Date() / 1000)}`
          : null,
      },
    };
  }
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  resPath: string,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              entries: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                properties: {
                  length: {
                    type: 'number',
                    example: 100,
                  },
                  total: {
                    type: 'number',
                    example: 1022,
                  },
                  offset: {
                    type: 'number',
                    example: 100,
                  },
                  limit: {
                    type: 'number',
                    example: 1000,
                  },
                  page: {
                    properties: {
                      next: {
                        type: 'string',
                        description: 'Next page',
                        example: `/api/v1/${resPath}?offset=0&limit=100&since=1660472121`,
                      },
                      previous: {
                        type: 'string',
                        description: 'Previous page',
                        example: `/api/v1/${resPath}?offset=200&limit=100&since=1660472121`,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        ],
      },
    }),
  );
};
