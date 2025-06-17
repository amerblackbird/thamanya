import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
