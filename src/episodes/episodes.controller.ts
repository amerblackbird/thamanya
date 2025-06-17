import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestInfo } from '../core/decorators';
import { IRequestOptions } from '../core/interfaces';
import { GlobalExceptionFilter } from '../core/filters';

@ApiTags('Episodes')
@Controller('episodes')
@UseFilters(new GlobalExceptionFilter())
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createEpisodeDto: CreateEpisodeDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.create(createEpisodeDto, reqInfo);
  }

  @Get()
  findAll(@RequestInfo() reqInfo: IRequestOptions) {
    return this.episodesService.findAll(reqInfo);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.findOne(id, reqInfo);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateEpisodeDto: UpdateEpisodeDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.update(id, updateEpisodeDto, reqInfo);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.episodesService.remove(id, reqInfo);
  }
}
