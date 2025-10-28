# N&N Search Engine Frontend

A Next.js (App Router) frontend for the N&N Search Engine backend.

## Prerequisites

- Node.js 18+
- Backend running at http://localhost:5000 (or set NEXT_PUBLIC_API_BASE_URL)

## Setup

```bash
# From the frontend folder
npm install
cp .env.local.example .env.local
# Edit .env.local if your backend URL differs
```

## Run

```bash
npm run dev     # http://localhost:3000
```

## Build & Start (production)

```bash
npm run build
npm start
```

## Configuration

- Configure backend base URL via `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.
- CORS must allow the frontend origin in the backend.

## Project Structure

```
src/
  app/
    page.tsx        # Search page (client)
    history/page.tsx# History list (server)
    health/page.tsx # Health view (server)
    layout.tsx      # App layout & nav
  components/
    SearchForm.tsx
    SearchResults.tsx
    HistoryList.tsx
  lib/
    api.ts          # API client
    types.ts        # Shared types
  styles/
    globals.css
```

## Testing the UI

- Search without saving: use the Search page and uncheck "Save to history".
- Search with saving: keep the checkbox enabled (default).
- History page shows saved searches.
- Health page shows backend health.

### Testing Pagination & Find-in-Page

To test pagination and find-in-page features with many results:
- **Search for "test" or "demo"** - This will generate 25 fake results (3 pages with 10 results per page)
- Use the pagination controls to navigate between pages
- Use the "Find in results" field to highlight matches across results
