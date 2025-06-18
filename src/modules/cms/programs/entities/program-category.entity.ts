import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseDataEntity } from '../../../../core/entities/base.entity';
import { Program } from './program.entity';
import { Category } from '../../categories/entities/category.entity';
import { RecordMapResult } from '../../../../core/resources';

@Entity('tbl_program_categories')
@Index(['programId', 'categoryId'], { unique: true })
export class ProgramCategory extends BaseDataEntity {
  @Column({ name: 'program_id' })
  public programId!: string;

  @ManyToOne(() => Program, (program) => program.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'program_id' })
  public program: Program;

  @Column({ name: 'category_id' })
  public categoryId!: string;

  @ManyToOne(() => Category, (category) => category.programs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  toMap(selection?: string[]): RecordMapResult<Category> {
    let rec: Record<string, any> = {
      ...super.toMap(selection),
      programId: this.programId,
      categoryId: this.categoryId,
    };

    if (this.program) {
      rec = {
        ...rec,
        program: this.program.toMap(),
      };
    }

    if (this.category) {
      rec = {
        ...rec,
        category: this.category.toMap(),
      };
    }

    return rec;
  }
}
