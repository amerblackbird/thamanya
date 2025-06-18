import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestInfo } from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';

@ApiTags('Episodes')
@Controller('/cms/episodes')
@UseFilters(new GlobalExceptionFilter())
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createEpisodeDto: CreateEpisodeDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.create(createEpisodeDto, reqInfo);
    return record?.toMap();
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.findAll({ ...paginationDto, ...reqInfo });
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.findOne(id, reqInfo);
    return record?.toMap();
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateEpisodeDto: UpdateEpisodeDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.update(
      id,
      updateEpisodeDto,
      reqInfo,
    );
    return record?.toMap();
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.remove(id, reqInfo);
    return record?.toMap();
  }
}
