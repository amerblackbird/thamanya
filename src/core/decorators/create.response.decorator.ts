import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseSerializer } from '../serializers';

export function CreateApiResponse(response: typeof BaseSerializer) {
  return applyDecorators(
    ApiCreatedResponse({ type: () => response }),
    ApiBadRequestResponse({ description: 'Record not found or archived' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
