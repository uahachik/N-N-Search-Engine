import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchHistory } from './search/entities/search-history.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 10, // 10 requests per minute
    }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [SearchHistory],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SearchHistory]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class AppModule {}
