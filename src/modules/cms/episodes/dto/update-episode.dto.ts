import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BoolTransform } from '../../../../core/transforms/bool.transform';

export class UpdateEpisodeDto extends PartialType(
  OmitType(CreateEpisodeDto, ['programId'] as const),
) {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is the episode active?',
  })
  @IsOptional()
  @Transform(BoolTransform)
  @IsBoolean()
  active?: boolean;
}
