import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { BoolTransform } from '../../../../core/transforms/bool.transform';

export class UpdateEpisodeDto extends PartialType(
  OmitType(CreateEpisodeDto, ['programId'] as const),
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
