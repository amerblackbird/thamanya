import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../constants';

/**
 * Parameters for constructing a BusinessError.
 *
 * @template Err - The error code type, extending ErrorCode.
 */
export interface BusinessErrorParams<Err extends keyof typeof ERROR_CODES> {
  /** Human-readable error message. */
  message: string;
  /** Name of the error. */
  name: string;
  /** Application-specific error code. */
  code: Err;
  /** Optional HTTP status code (defaults to 400 Bad Request). */
  status?: HttpStatus;
}

/**
 * Generic base class for business logic errors in the application.
 * Extends the native Error class and provides additional properties for error code,
 * HTTP status, and optional metadata.
 *
 * @template Err - The error code type, extending ErrorCode.
 * @template TMetadata - Optional metadata type for additional error context.
 *
 * @example
 * throw new BusinessError({
 *   message: 'Resource not found',
 *   name: 'NotFoundError',
 *   code: 'not_found',
 *   status: HttpStatus.NOT_FOUND,
 * });
 */
export class BusinessError<
  Err extends keyof typeof ERROR_CODES,
  TMetadata extends Record<string, any> | undefined = undefined,
> extends Error {
  /** Optional additional error context. */
  readonly metadata?: TMetadata;

  /** Name of the error. */
  readonly name: string;

  /** Application-specific error code. */
  readonly code: Err;

  /** Optional sub-code for more granular error identification. */
  readonly subCode?: string;

  /** HTTP status code. */
  readonly status: HttpStatus;

  /**
   * Constructs a new BusinessError.
   *
   * @param params - The error parameters.
   */
  constructor({
    message,
    name,
    code,
    status = HttpStatus.BAD_REQUEST,
  }: BusinessErrorParams<Err>) {
    super();

    this.name = name;
    this.code = code;
    this.status = status;
    this.message = message;
  }
}
