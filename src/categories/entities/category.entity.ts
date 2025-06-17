import { Column, Entity, OneToMany } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { ProgramCategory } from '../../programs/entities/program-category.entity';
import { RecordMapResult } from '../../core/resources';

@Entity('tbl_categories')
export class Category extends BaseDataEntity {
  @Column({ type: 'varchar', nullable: true, length: 255 })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(
    () => ProgramCategory,
    (programCategory) => programCategory.category,
  )
  programs: ProgramCategory[];

  toMap(selection?: string[]): RecordMapResult<Category> {
    let rec: Record<string, any> = {
      id: this.id,
      title: this.title,
      description: this.description,
      ...super.toMap(selection),
    };

    if (this.programs && this.programs.length > 0) {
      rec = {
        ...rec,
        programs: this.programs.map((programCategory) =>
          programCategory.toMap(),
        ),
      };
    }

    return rec;
  }
}
