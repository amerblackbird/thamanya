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
import { RequestInfo } from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../../../core/filters';
import { PaginationDto } from '../../../core/dtos';

@ApiTags('Programs')
@Controller('/cms/programs')
@UseFilters(new GlobalExceptionFilter())
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createProgramDto: CreateProgramDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.create(createProgramDto, reqInfo);
    return record?.toMap();
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.findAll({ ...paginationDto, ...reqInfo });
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.findOne(id, reqInfo);
    return record?.toMap();
  }

  @Patch(':id')
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
  async remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.programsService.remove(id, reqInfo);
    return record?.toMap();
  }
}
