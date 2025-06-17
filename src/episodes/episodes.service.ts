import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../programs/entities/program.entity';
import { Repository } from 'typeorm';
import {
  BaseService,
  DeleteResult,
  FindOneResult,
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
  RecordMapResult,
} from '../core/resources';
import { IRequestOptions } from '../core/interfaces';
import { EPISODE_FILTERS } from './constants';
import { ProgramsService } from '../programs/programs.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from './entities/episode.entity';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService extends BaseService<Episode> {
  constructor(
    @InjectRepository(Episode)
    private readonly repository: Repository<Episode>,
    private readonly programsService: ProgramsService,
  ) {
    super({
      resName: 'episode',
      repository: repository,
      filters: EPISODE_FILTERS,
    });
  }

  async create(createEpisodeDto: CreateEpisodeDto, options: ICreateOptions) {
    const { programId, ...data } = createEpisodeDto;
    let program: Program | undefined = undefined;
    if (programId) {
      program =
        (await this.programsService.findOne(programId, {
          ...options,
        })) ?? undefined;
    }

    return this._create({
      createDto: (): Promise<Episode> => {
        return Promise.resolve(
          this.repository.create({
            ...data,
            program,
          }),
        );
      },
      ...options,
    });
  }

  async findAll(options: IPaginationOption<Episode>) {
    return await this._paginate(Episode, options);
  }

  async findOne(
    id: string,
    options: IFindOneOptions<Episode>,
  ): Promise<FindOneResult<Episode>> {
    return this._findOne(id, Episode, options);
  }

  async update(
    id: string,
    updateEpisodeDto: UpdateEpisodeDto,
    options: IRequestOptions,
  ): Promise<RecordMapResult<Episode>> {
    return await this._update(id, Episode, {
      ...options,
      unique: true,
      dto: {
        ...updateEpisodeDto,
      },
    });
  }

  async remove(
    id: string,
    options: IRemoveOptions<Episode>,
  ): Promise<DeleteResult<Episode>> {
    return this._removeByQuery({
      ...options,
      many: false,
      filterData: { id },
    });
  }
}
