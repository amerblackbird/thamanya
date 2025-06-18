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
import {
  CreateApiResponse, DeleteApiResponse,
  FindOneApiResponse,
  PaginationApiResponse,
  RequestInfo,
  UpdateApiResponse,
} from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';
import { EpisodeSerializer } from './serializers/episode.serializer';

@ApiTags('Episodes')
@Controller('/cms/episodes')
@UseFilters(new GlobalExceptionFilter())
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @CreateApiResponse(EpisodeSerializer)
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createEpisodeDto: CreateEpisodeDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.create(createEpisodeDto, reqInfo);
    return record?.toMap();
  }

  @Get()
  @PaginationApiResponse(EpisodeSerializer, 'episodes')
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.findAll({ ...paginationDto, ...reqInfo });
  }

  @Get(':id')
  @FindOneApiResponse(EpisodeSerializer)
  async findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.findOne(id, reqInfo);
    return record?.toMap();
  }

  @Patch(':id')
  @UpdateApiResponse(EpisodeSerializer)
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
  @DeleteApiResponse(EpisodeSerializer)
  async remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.episodesService.remove(id, reqInfo);
    return record?.toMap();
  }
}
