import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend (supports multiple origins via FRONTEND_URLS)
  const rawOrigins = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000';
  const allowedOrigins = rawOrigins.split(',').map((s) => s.trim()).filter(Boolean);
  const allowAll = allowedOrigins.includes('*');

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin) and same-origin
      if (!origin) return callback(null, true);
      if (allowAll || allowedOrigins.includes(origin)) return callback(null, true);
      // Disallow without throwing to avoid 500 on preflight
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204,
  });
  
  // Enable validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Set global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
