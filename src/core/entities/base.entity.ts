import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RecordMapResult } from '../resources';

// Base toMap
export interface ResourceToMap {
  toMap(selection?: string[]): RecordMapResult<BaseDataEntity>;
}

// Each model in system have this fields.
export abstract class BaseDataEntity
  extends BaseEntity
  implements ResourceToMap
{
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date; // Data at which record archived.

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean; // Visibility of this row depend on user permission.

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'timestamptz',
    name: 'activated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  activatedAt: Date;

  toMap(selection?: string[]): RecordMapResult<BaseDataEntity> {
    return {
      id: this.id,
      active: this.active,
      activatedAt: this.activatedAt,
      deletedAt: this.deletedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
