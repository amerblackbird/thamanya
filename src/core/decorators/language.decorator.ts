import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * List of valid ISO 639-1 language codes.
 * Extend this array as needed.
 */
const LANGUAGE_CODES = ['en', 'es', 'fr', 'de', 'ar'];

/**
 * Validator constraint to check if a value is a valid language code.
 */
@ValidatorConstraint({ async: false })
export class IsLanguageCodeConstraint implements ValidatorConstraintInterface {
  validate(code: any) {
    return (
      typeof code === 'string' && LANGUAGE_CODES.includes(code.toLowerCase())
    );
  }

  defaultMessage() {
    return 'Invalid language code';
  }
}

/**
 * Custom decorator to validate ISO 639-1 language codes.
 *
 * @param validationOptions - Optional class-validator options.
 */
export function IsLanguageCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLanguageCodeConstraint,
    });
  };
}