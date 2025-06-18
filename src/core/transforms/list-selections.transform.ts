import { TransformFnParams } from 'class-transformer/types/interfaces';
import { Logger } from '@nestjs/common';

const FIELD_NAME = /^([a-zA-Z]([a-zA-Z]*)+[0-9-a-zA-Z])$/;

const DOTTED_FIELD_NAME =
  /^([a-zA-Z]([a-zA-Z]*)+[0-9-a-zA-Z])\.([a-zA-Z]([a-zA-Z]*)+[0-9-a-zA-Z])$/;

export const ListSelectionTransform = ({ value }: TransformFnParams) => {
  try {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value.join(',');
    }
    if (typeof value !== 'string') {
      return undefined;
    }
    const list: string[] = value.split(',');
    const validSelect: string[] = [];

    for (const ls of list) {
      if (FIELD_NAME.test(ls) || DOTTED_FIELD_NAME.test(ls)) {
        validSelect.push(decodeURIComponent(ls));
      }
    }
    return validSelect.join(',');
  } catch (e) {
    Logger.error(e);
  }
  return undefined;
};
