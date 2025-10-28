import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchHistory } from './search/entities/search-history.entity';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10), // default 1 minute
      limit: parseInt(process.env.THROTTLE_LIMIT ?? '10', 10), // default 10 req/min
    }]),
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [SearchHistory],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([SearchHistory]),
  ],
  controllers: [SearchController, HealthController],
  providers: [SearchService],
})
export class AppModule {}
