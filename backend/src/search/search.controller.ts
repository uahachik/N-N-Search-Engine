import { Controller, Get, Post, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { SearchService } from './search.service';
import { QuerySearchDto } from './dto/query-search.dto';
import { CreateSearchDto } from './dto/create-search.dto';

@Controller('search')
@Throttle({ default: { limit: 10, ttl: 60000 } })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getSearch(@Query() queryDto: QuerySearchDto) {
    return this.searchService.searchDuckDuckGo(queryDto.q);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async postSearch(@Body() bodyDto: CreateSearchDto) {
    return this.searchService.searchAndStore(bodyDto.query);
  }

  @Get('history')
  async getHistory() {
    return this.searchService.getHistory();
  }
}
