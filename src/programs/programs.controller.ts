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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { RequestInfo } from '../core/decorators';
import { IRequestOptions } from '../core/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../core/filters';

@ApiTags('Programs')
@Controller('programs')
@UseFilters(new GlobalExceptionFilter())
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createProgramDto: CreateProgramDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.create(createProgramDto, reqInfo);
  }

  @Get()
  findAll(@RequestInfo() reqInfo: IRequestOptions) {
    return this.programsService.findAll(reqInfo);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.findOne(id, reqInfo);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateProgramDto: UpdateProgramDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.update(id, updateProgramDto, reqInfo);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.programsService.remove(id, reqInfo);
  }
}
