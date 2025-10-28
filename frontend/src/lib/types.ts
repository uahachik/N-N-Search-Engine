export type SearchResult = {
  title: string;
  url: string;
  snippet?: string;
};

export type SearchResponse = {
  results: SearchResult[];
};

export type HistoryItem = {
  id: number;
  query: string;
  createdAt: string;
};

export type HistoryResponse = {
  searches: HistoryItem[];
};

export type HealthResponse = {
  status: 'ok' | 'error';
  info?: Record<string, unknown>;
  error?: Record<string, unknown>;
  details?: Record<string, unknown>;
};
