import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

export abstract class BaseSerializer {
  @ApiProperty({
    description: 'Id of text',
    example: '52868e37-afd7-43e6-a5bf-ae84537581e8',
  })
  id: string;

  @ApiProperty({
    description: 'Record is active',
  })
  active?: boolean;

  @ApiProperty({
    description: 'Latest date of activation',
    type: Timestamp,
    example: '2022-08-14T08:45:09.861Z',
  })
  activatedAt?: Date;

  @ApiProperty({
    description: 'Date of creation',
    type: Timestamp,
    example: '2022-08-14T08:45:09.861Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Last update date',
    type: Timestamp,
    example: '2022-08-14T08:45:09.861Z',
  })
  updatedAt?: Date;
}
