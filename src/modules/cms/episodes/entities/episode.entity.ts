import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseDataEntity } from '../../../../core/entities/base.entity';
import { Program } from '../../programs/entities/program.entity';
import { EpisodeStatus } from '../types';
import { RecordMapResult } from '../../../../core/resources';

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

  @Column({ type: 'text', nullable: true })
  audioUrl?: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'text', nullable: true })
  videoUrl?: string;

  @Column({ type: 'text', nullable: true })
  transcriptUrl?: string;

  @Column({ type: 'text', nullable: true })
  externalUrl?: string;

  @Column('enum', {
    enum: EpisodeStatus,
    default: EpisodeStatus.DRAFT,
    name: 'status',
  })
  status: EpisodeStatus;

  @Column({
    type: 'tsvector',
    nullable: true,
    select: false,
    name: 'search_vector',
  })
  searchVector?: string;

  toMap(selection?: string[]): RecordMapResult<Episode> {
    if (selection && selection.length > 0) {
      return super.toMap(selection);
    }

    let rec: Record<string, any> = {
      id: this.id,
      programId: this.programId,
      title: this.title,
      description: this.description,
      duration: this.duration,
      publishDate: this.publishDate,
      audioUrl: this.audioUrl,
      imageUrl: this.imageUrl,
      videoUrl: this.videoUrl,
      transcriptUrl: this.transcriptUrl,
      externalUrl: this.externalUrl,
      status: this.status,
      ...super.toMap(),
    };

    if (this.program) {
      rec = {
        ...rec,
        program: this.program.toMap(),
      };
    }

    return rec;
  }
}
