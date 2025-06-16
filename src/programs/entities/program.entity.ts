import { Column, Entity, OneToMany } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { Episode } from '../../episodes/entities/episode.entity';
import { ProgramCategory } from './program-category.entity';

export enum ProgramType {
  PODCAST = 'podcast',
  DOCUMENTARY = 'documentary',
}

@Entity('tbl_programs')
export class Program extends BaseDataEntity {
  @Column({ type: 'varchar', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ProgramType, default: ProgramType.PODCAST })
  type: ProgramType;

  @Column({ type: 'text', nullable: true })
  category?: string;

  @Column({ type: 'text', nullable: true })
  language?: string;

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
}
