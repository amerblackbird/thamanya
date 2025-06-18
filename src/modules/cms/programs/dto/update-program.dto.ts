import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProgramDto } from './create-program.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { BoolTransform } from '../../../../core/transforms/bool.transform';

export class UpdateProgramDto extends PartialType(
  OmitType(CreateProgramDto, ['categoryIds'] as const),
) {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is the category active?',
  })
  @IsBoolean()
  @Transform(BoolTransform)
  @IsBoolean()
  active?: boolean;
}
