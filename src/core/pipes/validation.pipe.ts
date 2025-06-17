// import {
//   ValidationError,
//   ValidationPipe as NestValidationPipe,
// } from '@nestjs/common';
//
// export class CustomValidationPipe extends NestValidationPipe {
//   public createExceptionFactory() {
//     return (validationErrors: ValidationError[] = []) => {
//       console.error('Validation errors:', validationErrors);
//
//       return validationErrors;
//     };
//   }
// }

import { ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { InvalidArgumentsError } from '../errors';

interface ValidationErrorConstraints extends ValidationError {
  constraints: {
    [type: string]: string;
  };
}

export class CustomValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      exceptionFactory: formatErrors,
    });
  }
}

function formatErrors(errors: ValidationError[]) {
  const allErrors = getAllErrors(errors);

  return new InvalidArgumentsError({
    fields: allErrors.map(({ property, constraints }) => ({
      name: property,
      message: Object.values(constraints),
      constraints: Object.keys(constraints).map((type) => ({
        type,
        message: constraints[type],
      })),
    })),
  });
}

function getAllErrors(
  errors: ValidationError[],
  parentKey?: string,
): ValidationErrorConstraints[] {
  return errors
    .reduce((arr, error) => {
      const newKey = parentKey
        ? `${parentKey}.${error.property}`
        : error.property;
      error.property = newKey;

      if (error.children && error.children.length > 0) {
        return [...arr, error, ...getAllErrors(error.children, error.property)];
      }

      return [...arr, error];
    }, [] as ValidationError[])
    .filter((error) => error.constraints) as ValidationErrorConstraints[];
}
