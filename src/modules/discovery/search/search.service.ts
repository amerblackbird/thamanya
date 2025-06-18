import { Injectable } from '@nestjs/common';
import { Program } from 'src/modules/cms/programs/entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '../../cms/episodes/entities/episode.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>,
  ) {}

  /**
   * Performs a search for programs and episodes using both full-text search and fallback substring matching.
   *
   * - Uses PostgreSQL `tsvector`-based full-text search on the `search_vector` column for efficient and relevant results.
   * - Falls back to case-insensitive `ILIKE` queries on `title` and `description` fields to ensure broader matching if full-text search is too strict or incomplete.
   * - Returns up to 10 results each for programs and episodes, ordered by relevance.
   *
   * @param query - The search string to look for.
   * @param offset - (Optional) Offset for pagination (not currently used).
   * @param limit - (Optional) Limit for pagination (not currently used).
   * @returns An object containing arrays of matching programs and episodes.
   */
  async search({ query }: { query: string }) {
    if (!query || query.trim() === '') {
      return { programs: [], episodes: [] };
    }
    const programQuery = this.programRepo
      .createQueryBuilder('program')
      .where(`program.search_vector @@ to_tsquery(:q) `, {
        q: `${query}:*`,
      })
      .orWhere(
        `program.description ILIKE :likeQ OR program.title ILIKE :likeQ`,
        {
          likeQ: `%${query}%`,
        },
      )
      .orderBy(`ts_rank(program.search_vector, to_tsquery(:q))`, 'DESC')
      .limit(10)
      .getMany();

    const episodeQuery = this.episodeRepo
      .createQueryBuilder('episode')
      .leftJoinAndSelect('episode.program', 'program')
      .where(
        `episode.search_vector @@ to_tsquery(:q)  OR episode.description ILIKE :likeQ`,
        {
          q: `${query}:*`,
          likeQ: `%${query}%`,
        },
      )
      .orWhere(
        `episode.description ILIKE :likeQ OR episode.title ILIKE :likeQ`,
        {
          likeQ: `%${query}%`,
        },
      )
      .orderBy(`ts_rank(episode.search_vector, to_tsquery(:q))`, 'DESC')
      .limit(10)
      .getMany();

    const [programs, episodes] = await Promise.all([
      programQuery,
      episodeQuery,
    ]);

    return {
      programs,
      episodes,
    };
  }
}
