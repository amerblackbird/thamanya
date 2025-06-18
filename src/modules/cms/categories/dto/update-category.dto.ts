import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BoolTransform } from '../../../../core/transforms/bool.transform';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is the category active?',
  })
  @IsOptional()
  @Transform(BoolTransform)
  @IsBoolean()
  active?: boolean;
}
