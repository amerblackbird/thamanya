import { Column, Entity, OneToMany } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { ProgramCategory } from './program-category.entity';

@Entity('tbl_categories')
export class Category extends BaseDataEntity {
  @Column({ type: 'varchar', nullable: true, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(
    () => ProgramCategory,
    (programCategory) => programCategory.category,
  )
  programs: ProgramCategory[];
}
