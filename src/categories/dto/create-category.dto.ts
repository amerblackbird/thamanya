import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  // Define properties for the CreateCategoryDto here
  // For example:
  @ApiProperty({ description: 'Name of the category' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the category', required: false })
  @IsString()
  description?: string;
}
