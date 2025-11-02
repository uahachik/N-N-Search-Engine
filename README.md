# Search Engine Frontend & Backend Assignment

## Overview

Build a typescript full-stack search application using NestJS (backend) and Next.js (frontend) that proxies search requests to DuckDuckGo and provides a rich search interface with query history and advanced search features.

**Time Limit:** 4 hours (can extend up to 24 hours for polish)

---

## Requirements

### Backend (NestJS + TypeORM + PostgreSQL)

#### 1. Search GET Endpoint

- **Route:** `GET /search?q=query`
- **Description:** Proxy search query to DuckDuckGo API (https://api.duckduckgo.com/?q=x&format=json)
- **Response Format:**
  ```json
  {
    "results": [
      { "title": "...", "url": "..." },
      { "title": "...", "url": "..." }
    ],
    "total": 30
  }
  ```
- **Requirements:**
  - Validate query parameter with class-validator DTOs
  - Fetch from DuckDuckGo and transform response
  - Filter to return only `title` and `url` fields
  - Include total count of results

#### 2. Search POST Endpoint

- **Route:** `POST /search`
- **Body:** `{ "query": "search term" }`
- **Description:** Same as GET but also persists the query to database
- **Database:** Store query with timestamp in PostgreSQL via TypeORM
- **Response:** Same as GET endpoint
- **Requirements:**
  - Validate request body with class-validator DTOs
  - Persist search query to `search_history` table
  - Return same search results as GET endpoint

#### 3. Query History Endpoint

- **Route:** `GET /search/history`
- **Description:** Retrieve all stored search queries ordered by most recent first
- **Response Format:**
  ```json
  {
    "history": [
      { "id": 1, "query": "nodejs", "createdAt": "2025-10-27T10:00:00Z" },
      { "id": 2, "query": "nestjs", "createdAt": "2025-10-27T09:30:00Z" }
    ]
  }
  ```

#### 4. Database

- **Setup:** PostgreSQL with TypeORM
- **Entity:** Add a supporting entity
- **Requirements:**
  - Configure TypeORM with provided connection settings
  - Create and run migrations

---

### Frontend (Next.js + React Hook Form)

#### 1. Search Form

- Implement with React Hook Form
- Single input field for search query
- Submit button
- Form validation

#### 2. Search Results Display

- Display search results as a list
- Each result shows title (as clickable link) and URL
- Clean, readable layout
- Show result count

#### 3. Pagination

- Implement client-side pagination (results per page: 10)
- Show current page and total pages
- Previous/Next buttons
- Jump to page functionality

#### 4. Query History Sidebar

- Display list of past searches (up to 10 most recent)
- Clickable - clicking a query:
  - Populates the search input with that query
  - Triggers API request
  - Displays results below
  - Maintains pagination state

#### 5. Find-in-Page Feature (Client-side)

- Input field: "Find in results"
- Highlights all occurrences of the search term in yellow
- Shows count: "X of Y matches"
- Navigatable matches with Previous/Next buttons
- Highlights current match differently (e.g., orange/bold)

#### 6. Server Components & Data Fetching

- Use Next.js Server Components for initial data fetching
- Fetch query history on page load
- Handle loading and error states

---

## Technical Stack

| Layer                    | Technology      | Version |
| ------------------------ | --------------- | ------- |
| Backend                  | NestJS          | 10.x    |
| Backend ORM              | TypeORM         | 0.3.x   |
| Backend Database         | PostgreSQL      | 13+     |
| Backend Validation       | class-validator | Latest  |
| Frontend                 | Next.js         | 15.x    |
| Frontend Form            | React Hook Form | Latest  |
| Frontend Form validation | Zod             | Latest  |

---

## Deliverables

1. **Complete monorepo** with `/backend` and `/frontend` folders
2. **Database setup** with migrations
3. **Comprehensive README.md** with:

   - Project overview
   - Setup instructions (database, environment variables, installing dependencies)
   - How to run backend and frontend
   - Architecture overview
   - Brief technical decisions explanation

4. **Working application** that meets all requirements

**Good luck!** ⚡
