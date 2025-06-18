import {
  Controller,
  Get,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { GlobalExceptionFilter } from '../../../core/filters';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
@UseFilters(new GlobalExceptionFilter())
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    dto: SearchDto,
  ) {
    return this.searchService.search(dto);
  }
}
