import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

@ApiTags('Categories')
@Controller('categories')
@UseFilters(new GlobalExceptionFilter())
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryDto, {
      lang: 'en',
    });
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll({
      lang: 'en',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id, {
      lang: 'en',
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, {
      lang: 'en',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id, {
      lang: 'en',
    });
  }
}
