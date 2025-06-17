import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { Program } from './program.entity';
import { Category } from '../../categories/entities/category.entity';

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
}
