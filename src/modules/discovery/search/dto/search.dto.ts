import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: 'Search query string' })
  @IsString()
  query: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Offset number', minimum: 1 })
  @IsInt()
  @IsPositive()
  offset?: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Results per page', minimum: 1 })
  @IsInt()
  @IsPositive()
  limit?: number;
}
