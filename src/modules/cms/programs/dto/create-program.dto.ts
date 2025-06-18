import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MAX_PAGINATION_LIMIT } from '../../../../core/resources';
import { ProgramType } from '../types';
import { IsLanguageCode } from '../../../../core/decorators';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({
    description: 'Title of the program',
    example: 'Tech Innovations',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the program',
    example: 'A program about the latest in technology.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Type of the program',
    enum: ProgramType,
    example: ProgramType.PODCAST,
  })
  @IsOptional()
  @IsEnum(ProgramType)
  type?: ProgramType;

  @ApiPropertyOptional({
    description: `Array of category UUIDs (max ${MAX_PAGINATION_LIMIT})`,
    type: [String],
    example: [
      'b3b6c8e2-1d2a-4e5b-9c3d-2f1a4b5c6d7e',
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    ],
    maxItems: MAX_PAGINATION_LIMIT,
    format: 'uuid',
  })
  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsArray({})
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_PAGINATION_LIMIT)
  categoryIds?: string[];

  @ApiProperty({
    description: 'Language code (ISO 639-1)',
    example: 'en',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string'
      ? value.toLowerCase()
      : (value?.toString?.().toLowerCase?.() ?? value),
  )
  @IsString()
  @IsLanguageCode({ message: 'Language must be a valid ISO 639-1 code' })
  language: string;
}
