import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchHistory } from './entities/search-history.entity';
import { SearchResponse, HistoryResponse } from './interfaces/search.interface';
import { DuckDuckGoResponse } from './interfaces/duckduckgo.interface';

@Injectable()
export class SearchService {
  private readonly historyRepo: Repository<SearchHistory>;

  constructor(
    @InjectRepository(SearchHistory)
    historyRepo: Repository<SearchHistory>,
  ) {
    this.historyRepo = historyRepo;
  }

  async searchDuckDuckGo(query: string): Promise<SearchResponse> {
    try {
      const url = new URL('https://api.duckduckgo.com/');
      url.searchParams.append('q', query);
      url.searchParams.append('format', 'json');

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new HttpException('Failed to fetch from DuckDuckGo', HttpStatus.BAD_GATEWAY);
      }

      const data = await response.json() as DuckDuckGoResponse;

      const results = (data.RelatedTopics || [])
        .filter((item) => item.Text && item.FirstURL)
        .map((item) => ({
          title: item.Text,
          url: item.FirstURL,
        }));

      return {
        results,
        total: results.length,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error processing search request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchAndStore(query: string) {
    await this.historyRepo.save({ query });
    return this.searchDuckDuckGo(query);
  }

  async getHistory(): Promise<HistoryResponse> {
    try {
      const results = await this.historyRepo.find({
        order: { createdAt: 'DESC' },
        take: 10,
      });
      
      const history = results.map(item => ({
        id: item.id,
        query: item.query,
        createdAt: item.createdAt.toISOString()
      }));
      
      return { history };
    } catch (error) {
      throw new HttpException(
        'Error fetching search history',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
