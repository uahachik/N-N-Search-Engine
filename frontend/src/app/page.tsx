"use client";

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { search, searchAndSave } from '@/lib/api';
import type { SearchResult } from '@/lib/types';

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (query: string, save = true) => {
    try {
      setLoading(true);
      setError(null);
      const res = save ? await searchAndSave(query) : await search(query);
      setResults(res.results || []);
    } catch (e: any) {
      setError(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>N&N Search</h1>
      <SearchForm onSearch={onSearch} />
      {loading && <div className="card">Loading…</div>}
      {error && <div className="card" style={{ color: 'crimson' }}>{error}</div>}
      <SearchResults results={results} />
    </div>
  );
}
