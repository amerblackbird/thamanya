import { BaseSerializer } from '../../../../core/serializers';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategorySerializer extends BaseSerializer {
  @ApiProperty({ description: 'Category title' })
  title: string;

  @ApiPropertyOptional({ description: 'Category description' })
  description?: string;
}
