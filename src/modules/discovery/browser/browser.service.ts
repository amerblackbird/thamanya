import { Injectable } from '@nestjs/common';
import { ProgramsService } from '../../cms/programs/programs.service';
import { EpisodesService } from '../../cms/episodes/episodes.service';
import { IFindOneOptions, IPaginationOption } from '../../../core/resources';
import { Program } from '../../cms/programs/entities/program.entity';
import { Episode } from '../../cms/episodes/entities/episode.entity';

@Injectable()
export class BrowserService {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly episodesService: EpisodesService,
  ) {}

  findPrograms(options: IPaginationOption<Program>) {
    return this.programsService.findAll(options);
  }

  findOne(id: string, options: IFindOneOptions<Program>) {
    return this.programsService.findOne(id, options);
  }

  findProgramEpisode(
    programId: string,
    episodeId: string,
    options: IFindOneOptions<Episode>,
  ) {
    return this.episodesService.findOne(episodeId, {
      ...options,
      programId,
    });
  }

  findEpisodesByProgramId(
    programId: string,
    options: IPaginationOption<Episode>,
  ) {
    return this.episodesService.findAll({
      ...options,
      programId,
    });
  }

  findAllEpisodes(options: IPaginationOption<Episode>) {
    return this.episodesService.findAll(options);
  }

  findEpisodeById(id: string, options: IFindOneOptions<Episode>) {
    return this.episodesService.findOne(id, options);
  }
}
