import { ApiProperty } from '@nestjs/swagger';
import { IntTransform } from '../transforms/int.transform';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_PAGINATION_LIMIT } from '../resources/pagination';
import { BoolTransform } from '../transforms/bool.transform';
import { ListSelectionTransform } from '../transforms/list-selections.transform';

export class PaginationDto {
  @ApiProperty({
    description: 'Number of record in page',
    example: 0,
    type: 'number',
    required: false,
  })
  @Transform(IntTransform)
  @IsOptional()
  @IsNumber()
  readonly limit = MAX_PAGINATION_LIMIT;

  @ApiProperty({
    description: 'Offset index of records',
    example: 100,
    type: 'number',
    required: false,
  })
  @Transform(IntTransform)
  @IsOptional()
  offset = 0;

  @ApiProperty({
    description: 'Search query',
    example: 'mohammed',
    type: 'string',
    required: false,
  })
  @IsOptional()
  readonly query?: string;

  @ApiProperty({
    description: 'List of relation names separated with coma',
    example: 'categories',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @Transform(ListSelectionTransform)
  readonly includes?: string;

  @IsOptional()
  @Transform(BoolTransform)
  @IsBoolean()
  active?: boolean;
}
