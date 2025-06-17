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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../core/filters';
import { RequestInfo } from '../core/decorators';
import { IRequestOptions } from '../core/interfaces';

@ApiTags('Categories')
@Controller('categories')
@UseFilters(new GlobalExceptionFilter())
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createCategoryDto: CreateCategoryDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.categoriesService.create(createCategoryDto, reqInfo);
  }

  @Get()
  findAll(@RequestInfo() reqInfo: IRequestOptions) {
    return this.categoriesService.findAll(reqInfo);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.categoriesService.findOne(id, reqInfo);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateCategoryDto: UpdateCategoryDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, reqInfo);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.categoriesService.remove(id, reqInfo);
  }
}
