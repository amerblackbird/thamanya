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
import { RequestInfo } from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';

@ApiTags('Discovery Browser')
@Controller('/discovery')
@UseFilters(new GlobalExceptionFilter())
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Get('/programs')
  findAllProgram(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.browserService.findPrograms({ ...paginationDto, ...reqInfo });
  }

  @Get('/programs/:id')
  async findOneProgram(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const result = await this.browserService.findOne(id, reqInfo);
    return result?.toMap();
  }

  @Get('/programs/:id/episodes')
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
  findAllEpisodes(@RequestInfo() reqInfo: IRequestOptions) {
    return this.browserService.findAllEpisodes(reqInfo);
  }

  @Get('/episodes/:id')
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
