import { Column, Entity, OneToMany } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { ProgramType } from '../dto/create-program.dto';
import { Episode } from '../../episodes/entities/episode.entity';

@Entity('tbl_programs')
export class Program extends BaseDataEntity {
  @Column({ type: 'text', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true, length: 255 })
  description?: string;

  @Column({ type: 'enum', enum: ProgramType })
  type: ProgramType;

  @Column({ type: 'text', nullable: true })
  category?: string;

  @Column({ type: 'text', nullable: true })
  language?: string;

  @Column({ type: 'date', nullable: true })
  publish_date?: string;

  @OneToMany(() => Episode, (episode) => episode.program, { cascade: true })
  episodes: Episode[];
}
