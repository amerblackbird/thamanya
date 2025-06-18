import { Column, Entity, OneToMany } from 'typeorm';

import { BaseDataEntity } from '../../../../core/entities/base.entity';
import { Episode } from '../../episodes/entities/episode.entity';
import { ProgramCategory } from './program-category.entity';
import { RecordMapResult } from '../../../../core/resources';
import { ProgramType } from '../types';

@Entity('tbl_programs')
export class Program extends BaseDataEntity {
  @Column({ type: 'varchar', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ProgramType, default: ProgramType.PODCAST })
  type: ProgramType;

  @Column({ type: 'boolean', default: false })
  isPublished?: boolean;

  @Column({ type: 'text', nullable: true, default: 'en' })
  language?: string;

  @Column({
    type: 'tsvector',
    nullable: true,
    select: false,
    name: 'search_vector',
  })
  searchVector?: string;

  @Column({
    type: 'timestamptz',
    name: 'publish_date',
    nullable: true,
  })
  publishDate?: string;

  @OneToMany(() => Episode, (episode) => episode.program)
  episodes: Episode[];

  @OneToMany(
    () => ProgramCategory,
    (programCategory) => programCategory.program,
  )
  categories: ProgramCategory[];

  toMap(selection?: string[]): RecordMapResult<Program> {
    if (selection) {
      return Object.fromEntries(
        Object.entries(this).filter(([key]) => selection.includes(key)),
      );
    }
    let rec: Record<string, any> = {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      ...super.toMap(),
    };

    if (this.categories && this.categories.length > 0) {
      rec = {
        ...rec,
        categories: this.categories.map((category) => category.toMap()),
      };
    }

    return rec;
  }
}
