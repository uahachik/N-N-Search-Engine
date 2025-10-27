# N&N Search Engine Backend

A NestJS-based backend service that provides search functionality using DuckDuckGo API with history tracking.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Technology Stack

- NestJS (v10.x)
- TypeORM (v0.3.x)
- class-validator (Latest)
- PostgreSQL (v13+)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd N&N\ Search\ Engine/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the backend directory with the following variables:
   ```env
   # Database Configuration
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=search_db

   # Application Configuration
   PORT=5000                           # Backend API port
   FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS
   ```

4. **Database Setup**
   
   Make sure PostgreSQL is running and create a new database:
   ```bash
   createdb search_db
   ```
   
   The application will automatically create tables on first run (synchronize: true).

## Running the Application

### Development Mode
```bash
npm run start:dev
```
The server will start on port 5000 (http://localhost:5000) with auto-reload enabled.

### Production Mode
```bash
npm run build        # Build the application
npm run start:prod   # Start the production server
```

## API Endpoints

All endpoints are prefixed with `/api`

### Search

1. **Search without saving to history**
   ```bash
   # Simple technology search
   curl -i "http://localhost:5000/api/search?q=nestjs"

   # General topic search
   curl -i "http://localhost:5000/api/search?q=cats"
   ```

   Example responses:
   ```json
   // Technology search response
   {
     "results": [
       {
         "title": "JavaScript libraries",
         "url": "https://duckduckgo.com/c/JavaScript_libraries"
       },
       {
         "title": "Web frameworks",
         "url": "https://duckduckgo.com/c/Web_frameworks"
       }
     ]
   }

   // General topic response
   {
     "results": [
       {
         "title": "Cats A small domesticated carnivorous mammal.",
         "url": "https://duckduckgo.com/Cat"
       },
       {
         "title": "Cats (musical) A sung-through musical with music by Andrew Lloyd Webber.",
         "url": "https://duckduckgo.com/Cats_(musical)"
       }
     ]
   }
   ```

2. **Search and save to history**
   ```bash
   # Technical search with history
   curl -i -X POST http://localhost:5000/api/search \
     -H "Content-Type: application/json" \
     -d '{"query": "typescript best practices"}'

   # General search with history
   curl -i -X POST http://localhost:5000/api/search \
     -H "Content-Type: application/json" \
     -d '{"query": "cats and dogs"}' 
   ```

   Example response:
   ```json
   {
     "results": [
       {
         "title": "Cats and dogs Animals commonly kept as pets.",
         "url": "https://duckduckgo.com/Pets"
       }
     ],
     "saved": {
       "id": 2,
       "query": "cats and dogs",
       "createdAt": "2025-10-27T20:15:00.000Z"
     }
   }
   ```

3. **Get search history**
   ```bash
   curl -i http://localhost:5000/api/search/history
   ```

### Health Check

**Check system health**
```bash
curl -i http://localhost:5000/api/health
```

Example responses:

1. **Successful search response:**
   ```json
   {
     "results": [
       {
         "title": "Example Result",
         "link": "https://example.com",
         "snippet": "Result description..."
       }
     ]
   }
   ```

2. **Search history response:**
   ```json
   {
     "searches": [
       {
         "id": 1,
         "query": "typescript best practices",
         "createdAt": "2025-10-27T10:30:00.000Z"
       }
     ]
   }
   ```

3. **Health check response:**
   ```json
   {
     "status": "ok",
     "info": {
       "database": {
         "status": "up"
       }
     }
   }
   ```

Note: All responses include appropriate HTTP status codes and headers.

## Features

- DuckDuckGo search integration
- Search history tracking
- Database health monitoring
- Rate limiting (10 requests per minute)
- CORS enabled for frontend integration
- Global exception handling
- Input validation
- TypeORM for database management

## Project Structure

```
src/
├── common/              # Common utilities and filters
├── health/             # Health check module
├── search/             # Search module
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Database entities
│   └── interfaces/    # TypeScript interfaces
└── main.ts            # Application entry point
```

## Development

### Database Migrations

The project uses TypeORM for database migrations. Here's how to work with them:

1. **Initial Setup**
   ```bash
   # Create the database if it doesn't exist
   createdb search_db

   # Run existing migrations
   npm run migration:run
   ```

2. **Creating a New Migration**
   
   When you need to make database changes (e.g., add a new table or column):

   ```bash
   # Generate a migration for your changes
   npm run migration:generate -- -n DescriptiveChangeName
   ```
   
   For example, to add a new field to search history:
   ```bash
   npm run migration:generate -- -n AddTimestampToSearchHistory
   ```
   
   This will create a new file in `src/migrations/` with timestamp prefix.

3. **Applying Migrations**
   ```bash
   # Run any pending migrations
   npm run migration:run
   ```

4. **Checking Migration Status**
   ```bash
   # See which migrations have been run
   npm run typeorm -- migration:show -d ormconfig.ts
   ```

Important Notes:
- Always backup your database before running migrations in production
- Migration files are automatically created in `src/migrations/`
- The current database schema is tracked in `SearchHistory` entity
- For production, always use migrations instead of `synchronize: true`
- Commit migration files to version control

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in .env file
   - Check for other running services on port 5000

