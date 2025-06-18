import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseSerializer } from '../serializers';

export function DeleteApiResponse(response: typeof BaseSerializer) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Record found successfully',
      type: () => response,
    }),
    ApiNoContentResponse({ description: 'Record deleted successfully' }),
    ApiBadRequestResponse({ description: 'Record not found or archived' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
