import { HistoryResponse, SearchResponse, HealthResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function search(query: string): Promise<SearchResponse> {
  const url = new URL(`${API_BASE}/search`);
  url.searchParams.set('q', query);
  const res = await fetch(url.toString(), { cache: 'no-store' });
  return handle<SearchResponse>(res);
}

export async function searchAndSave(query: string): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return handle<SearchResponse>(res);
}

export async function getHistory(): Promise<HistoryResponse> {
  const res = await fetch(`${API_BASE}/search/history`, { cache: 'no-store' });
  return handle<HistoryResponse>(res);
}

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' });
  return handle<HealthResponse>(res);
}
