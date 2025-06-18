import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { BrowserService } from './browser.service';
import {
  FindOneApiResponse,
  PaginationApiResponse,
  RequestInfo,
} from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';
import { ProgramSerializer } from '../../cms/programs/serializers/program.serializer';
import { EpisodeSerializer } from '../../cms/episodes/serializers/episode.serializer';

@ApiTags('Discovery Browser')
@Controller('/discovery')
@UseFilters(new GlobalExceptionFilter())
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Get('/programs')
  @PaginationApiResponse(ProgramSerializer, 'programs')
  findAllProgram(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.browserService.findPrograms({ ...paginationDto, ...reqInfo });
  }

  @Get('/programs/:id')
  @FindOneApiResponse(ProgramSerializer)
  async findOneProgram(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const result = await this.browserService.findOne(id, reqInfo);
    return result?.toMap();
  }

  @Get('/programs/:id/episodes')
  @PaginationApiResponse(EpisodeSerializer, 'episodes')
  findEpisodesByProgramId(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.browserService.findEpisodesByProgramId(id, {
      ...paginationDto,
      ...reqInfo,
    });
  }

  @Get('/programs/:id/episodes/:episodeId')
  @FindOneApiResponse(EpisodeSerializer)
  async findEpisodeById(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Param('episodeId', new ParseUUIDPipe({})) episodeId: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const result = await this.browserService.findProgramEpisode(
      id,
      episodeId,
      reqInfo,
    );
    return result?.toMap();
  }

  @Get('/episodes')
  @PaginationApiResponse(EpisodeSerializer, 'episodes')
  findAllEpisodes(@RequestInfo() reqInfo: IRequestOptions) {
    return this.browserService.findAllEpisodes(reqInfo);
  }

  @Get('/episodes/:id')
  @FindOneApiResponse(EpisodeSerializer)
  async findOneEpisode(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const result = await this.browserService.findEpisodeById(id, {
      ...paginationDto,
      ...reqInfo,
    });
    return result?.toMap();
  }
}
