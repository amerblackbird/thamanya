/**
 * Represents a business error for bad requests.
 *
 * Extends the `BusinessError` class with a specific error code `'bad_request'`.
 *
 * @example
 * throw new BadRequestError({ message: 'Invalid input' });
 */

import { HttpStatus } from '@nestjs/common';
import { BusinessError } from './business.error';

export class BadRequestError extends BusinessError<'bad_request'> {
  constructor({ message }: { message: string }) {
    super({
      name: 'Bad Request',
      code: 'bad_request',
      message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
