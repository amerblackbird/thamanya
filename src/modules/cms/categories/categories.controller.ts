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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../../../core/filters';
import {
  CreateApiResponse,
  DeleteApiResponse,
  FindOneApiResponse,
  PaginationApiResponse,
  RequestInfo,
  UpdateApiResponse,
} from '../../../core/decorators';
import { IRequestOptions } from '../../../core/interfaces';
import { PaginationDto } from '../../../core/dtos';
import { CategorySerializer } from './serializers/category.serializer';

@ApiTags('Categories')
@Controller('/cms/categories')
@UseFilters(new GlobalExceptionFilter())
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @CreateApiResponse(CategorySerializer)
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createCategoryDto: CreateCategoryDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.categoriesService.create(
      createCategoryDto,
      reqInfo,
    );
    return record?.toMap();
  }

  @Get()
  @PaginationApiResponse(CategorySerializer, 'categories')
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    paginationDto: PaginationDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    return this.categoriesService.findAll({ ...paginationDto, ...reqInfo });
  }

  @Get(':id')
  @FindOneApiResponse(CategorySerializer)
  async findOne(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.categoriesService.findOne(id, reqInfo);
    return record?.toMap();
  }

  @Patch(':id')
  @UpdateApiResponse(CategorySerializer)
  async update(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateCategoryDto: UpdateCategoryDto,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.categoriesService.update(
      id,
      updateCategoryDto,
      reqInfo,
    );
    return record?.toMap();
  }

  @Delete(':id')
  @DeleteApiResponse(CategorySerializer)
  async remove(
    @Param('id', new ParseUUIDPipe({})) id: string,
    @RequestInfo() reqInfo: IRequestOptions,
  ) {
    const record = await this.categoriesService.remove(id, reqInfo);
    return record?.toMap();
  }
}
