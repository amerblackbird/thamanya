import { TransformFnParams } from 'class-transformer/types/interfaces';
import { Logger } from '@nestjs/common';

export const BoolTransform = ({ value }: TransformFnParams) => {
  try {
    if (value === undefined) return undefined;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value == 'true';
  } catch (e) {
    Logger.error(e);
  }
  return undefined;
};
