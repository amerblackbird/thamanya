import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindOneDto {
  @ApiProperty({
    description: 'List of relation separated with coma',
    example: 'program,program.categories',
    type: 'string',
    required: false,
  })
  @IsOptional()
  // @Transform(RequestSelectTransform)
  readonly includes?: string;
}
