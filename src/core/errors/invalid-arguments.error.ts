/**
 * Represents an error thrown when invalid arguments are provided to a business operation.
 *
 * Extends the `BusinessError` class with a specific error code `'invalid_arguments'`
 * and optional metadata describing the invalid fields and constraints.
 *
 * @example
 * throw new InvalidArgumentsError({
 *   error: 'Validation failed',
 *   fields: [
 *     {
 *       name: 'email',
 *       message: ['Email must be valid'],
 *       constraints: [
 *         { type: 'isEmail', message: 'Email must be valid' }
 *       ]
 *     }
 *   ]
 * });
 */
import { BusinessError } from './business.error';

interface InvalidArgumentsErrorMetadata {
  /**
   * Optional general error message.
   */
  error?: string;
  /**
   * Array of invalid fields with their messages and constraints.
   */
  fields?: {
    name: string;
    message: string[];
    constraints: {
      type: string;
      message: string;
    }[];
  }[];
}

/**
 * Error class for invalid arguments.
 */
export class InvalidArgumentsError extends BusinessError<
  'invalid_arguments',
  InvalidArgumentsErrorMetadata
> {
  /**
   * Constructs a new InvalidArgumentsError.
   * @param metadata Optional metadata describing the invalid arguments.
   */
  constructor(readonly metadata?: InvalidArgumentsErrorMetadata) {
    super({
      message: 'Invalid argument(s) were provided',
      name: 'InvalidArgumentsError',
      code: 'invalid_arguments',
    });
  }
}