export interface SearchResult {
  title: string;
  url: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface HistoryResponse {
  history: {
    id: number;
    query: string;
    createdAt: string;
  }[];
}