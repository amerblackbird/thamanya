import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../resources';
import { BaseSerializer } from '../serializers';

export function PaginationApiResponse(
  response: typeof BaseSerializer,
  res: string,
) {
  return applyDecorators(
    ApiPaginatedResponse(response as never, res),
    ApiBadRequestResponse({ description: 'Record not found or archived' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    // ApiImplicitParam({ name: "id", type: "uuid" }),
  );
}
