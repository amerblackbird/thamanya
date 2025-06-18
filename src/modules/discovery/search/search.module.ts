import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '../../cms/programs/entities/program.entity';
import { Episode } from '../../cms/episodes/entities/episode.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([Program, Episode])],
})
export class SearchModule {}
