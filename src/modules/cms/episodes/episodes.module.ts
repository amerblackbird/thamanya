import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsModule } from '../programs/programs.module';
import { EpisodeTask } from './task/episode.task';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), ProgramsModule],
  controllers: [EpisodesController],
  providers: [EpisodesService, EpisodeTask],
  exports: [EpisodesService],
})
export class EpisodesModule {}
