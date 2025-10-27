# Search Engine Backend

A NestJS-based backend service that provides search functionality using DuckDuckGo API with history tracking.

## Features

- DuckDuckGo search proxy
- Search history tracking
- Rate limiting
- Health checks
- TypeORM integration with PostgreSQL
- Validation using class-validator
- Error handling
- API documentation

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL (v13 or later)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
4. Create the database:
   ```bash
   createdb search_db
   ```
5. Run migrations:
   ```bash
   npm run migration:run
   ```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### Search
- `GET /api/search?q=query` - Search DuckDuckGo
- `POST /api/search` - Search and save to history
- `GET /api/search/history` - Get search history

### Health
- `GET /api/health` - Check application health

## Rate Limiting

The API is rate-limited to 10 requests per minute per IP address.

## Error Handling

The application includes a global exception filter that handles:
- Validation errors
- HTTP exceptions
- Unknown errors

## Database Migrations

```bash
# generate migration
npm run migration:generate

# run migrations
npm run migration:run

# revert migration
npm run migration:revert
```