import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../programs/entities/program.entity';
import { Repository } from 'typeorm';
import {
  BaseService,
  FindOneResult,
  ICreateOptions,
  IFindOneOptions,
  IPaginationOption,
  IRemoveOptions,
} from '../../../core/resources';
import { IRequestOptions } from '../../../core/interfaces';
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

  /**
   * Creates a new `Episode` entity.
   *
   * If a `programId` is provided in the DTO, the corresponding `Program` entity
   * is fetched and associated with the new episode.
   * After creation, updates the `search_vector` field in the `tbl_episodes` table
   * for full-text search support in PostgreSQL.
   *
   * @param createEpisodeDto - Data Transfer Object containing episode details and optional `programId`.
   * @param options - Options for creation, such as user context or transaction.
   * @returns The created `Episode` entity.
   */
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
      onCreated: (record) => {
        return this.repository.query(
          "UPDATE tbl_episodes SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce($2, '')) WHERE id = $1",
          [record.id, program ? program.title : ''],
        );
      },
      ...options,
    });
  }

  /**
   * Retrieves a paginated list of `Episode` entities.
   * Optionally filters episodes by `programId` if provided.
   *
   * @param options - Pagination options and optional `programId` filter.
   * @returns A paginated result of episodes.
   */
  async findAll(
    options: IPaginationOption<Episode> & {
      programId?: string;
    },
  ) {
    const { programId, ...rest } = options;
    const filterData = programId ? { programId } : undefined;
    return await this._paginate(Episode, {
      ...rest,
      filterData,
    });
  }

  /**
   * Retrieves a single `Episode` entity by its ID.
   * Optionally filters by `programId` if provided.
   *
   * @param id - The ID of the episode.
   * @param options - Find options and optional `programId` filter.
   * @returns The found episode or `undefined`.
   */
  async findOne(
    id: string,
    options: IFindOneOptions<Episode> & {
      programId?: string;
    },
  ): Promise<FindOneResult<Episode>> {
    const { programId, ...rest } = options;

    const filterData = programId ? { programId } : undefined;

    return this._findOne(id, Episode, {
      ...rest,
      filterData,
    });
  }

  /**
   * Updates an existing `Episode` entity.
   *
   * @param id - The ID of the episode to update.
   * @param updateEpisodeDto - The data to update the episode with.
   * @param options - Request options.
   * @returns The updated episode.
   */
  async update(
    id: string,
    updateEpisodeDto: UpdateEpisodeDto,
    options: IRequestOptions,
  ): Promise<Episode> {
    return await this._update(id, Episode, {
      ...options,
      unique: true,
      dto: {
        ...updateEpisodeDto,
      },
    });
  }

  /**
   * Removes an `Episode` entity by its ID.
   *
   * @param id - The ID of the episode to remove.
   * @param options - Remove options.
   * @returns The removed episode.
   */
  async remove(id: string, options: IRemoveOptions<Episode>): Promise<Episode> {
    return (await this._removeByQuery({
      ...options,
      many: false,
      filterData: { id },
    })) as Episode;
  }

  /**
   * Ensures that all `Episode` entities have their `search_vector` field
   * populated for full-text search in PostgreSQL.
   *
   * This method updates all records in the `Episode` table, setting the
   * `search_vector` column to a tsvector generated from the `title` and
   * `description` fields. It uses the English text search configuration.
   *
   * Example SQL generated:
   *   UPDATE tbl_episodes
   *   SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce((SELECT p.title FROM program p WHERE p.id = "Episode"."programId"), ''));
   */
  async validateSearchVector() {
    await this.repository.manager.query(`
    UPDATE tbl_episodes AS e
    SET search_vector = to_tsvector('english',
      coalesce(e.title, '') || ' ' ||
      coalesce(e.description, '') || ' ' ||
      coalesce(p.title, '')
    )
    FROM tbl_programs p
    WHERE e.program_id = p.id
  `);
  }
}
