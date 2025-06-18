import { TransformFnParams } from 'class-transformer/types/interfaces';
import { Logger } from '@nestjs/common';

export const IntTransform = ({ value }: TransformFnParams) => {
  try {
    if (value === undefined || value === null) return null;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value);
  } catch (e) {
    Logger.error(e);
  }
  return null;
};
