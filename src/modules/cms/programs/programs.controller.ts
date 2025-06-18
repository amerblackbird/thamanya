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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  CreateApiResponse, DeleteApiResponse, FindOneApiResponse,
  PaginationApiResponse,
  RequestInfo, UpdateApiResponse,
} from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';
import { ProgramSerializer } from './serializers/program.serializer';
import { EpisodeSerializer } from '../episodes/serializers/episode.serializer';
import { CategorySerializer } from '../categories/serializers/category.serializer';

@ApiTags('Programs')
@Controller('/cms/programs')
@UseFilters(new GlobalExceptionFilter())
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @CreateApiResponse(ProgramSerializer)
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createProgramDto: CreateProgramDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.create(createProgramDto, reqInfo);
    return record?.toMap();
  }

  @Get()
  @PaginationApiResponse(ProgramSerializer, 'programs')
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.findAll({ ...paginationDto, ...reqInfo });
  }

  @Get(':id')
  @FindOneApiResponse(ProgramSerializer)
  async findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.findOne(id, reqInfo);
    return record?.toMap();
  }

  @Patch(':id')
  @UpdateApiResponse(ProgramSerializer)
  async update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateProgramDto: UpdateProgramDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.update(
      id,
      updateProgramDto,
      reqInfo,
    );
    return record?.toMap();
  }

  @Delete(':id')
  @DeleteApiResponse(ProgramSerializer)
  async remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.remove(id, reqInfo);
    return record?.toMap();
  }
}
