import { BaseSerializer } from '../../../../core/serializers';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProgramType } from '../types';

export class ProgramSerializer extends BaseSerializer {
  @ApiProperty({
    description: 'Title of the program',
    example: 'The Future of AI',
    type: String,
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Category description',
    example: 'A program about advancements in AI',
    type: String,
  })
  description?: string;

  @ApiProperty({
    description: 'Program type',
    example: 'webinar',
    type: String,
  })
  type: ProgramType;

  @ApiPropertyOptional({
    description: 'Is published',
    example: true,
    type: Boolean,
  })
  isPublished?: boolean;

  @ApiPropertyOptional({
    description: 'Language',
    example: 'en',
    type: String,
  })
  language?: string;

  @ApiPropertyOptional({
    description: 'Publish date',
    example: '2024-06-01T00:00:00Z',
    type: String,
  })
  publishDate?: string;
}
