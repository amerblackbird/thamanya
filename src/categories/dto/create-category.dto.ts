import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Technology',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'All about the latest in tech and innovation.',
  })
  @IsString()
  description?: string;
}
