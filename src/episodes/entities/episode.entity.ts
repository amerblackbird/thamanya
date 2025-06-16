import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseDataEntity } from '../../core/entities/base.entity';
import { Program } from '../../programs/entities/program.entity';

@Entity('tbl_episodes')
export class Episode extends BaseDataEntity {
  @Column({ name: 'program_id', nullable: true })
  programId?: string;

  @ManyToOne(() => Program, (program) => program.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'program_id',
  })
  program: Program;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'integer' })
  duration: number;

  @Column({
    type: 'timestamptz',
    name: 'publish_date',
    nullable: true,
  })
  publishDate?: string;
}
