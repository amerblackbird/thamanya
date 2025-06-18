import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseSerializer } from '../serializers';

export function UpdateApiResponse(response: typeof BaseSerializer) {
  const f: MethodDecorator[] = [
    ApiResponse({
      status: 200,
      description: 'Record updated successfully',
      type: () => response,
    }),
    ApiBadRequestResponse({ description: 'Record not found or archived' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  ];

  return applyDecorators(...f);
}
