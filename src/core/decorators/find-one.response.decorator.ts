import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseSerializer } from '../serializers';

export function FindOneApiResponse(response: typeof BaseSerializer) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Record found successfully',
      type: () => response,
    }),
    ApiBadRequestResponse({ description: 'Record not found or archived' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
