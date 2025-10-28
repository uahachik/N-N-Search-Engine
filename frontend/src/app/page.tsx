"use client";

import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import FindInPage from '@/components/FindInPage';
import { search, searchAndSave, getHistory } from '@/lib/api';
import type { SearchResult, HistoryItem } from '@/lib/types';

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [highlightTerm, setHighlightTerm] = useState("");
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const RESULTS_PER_PAGE = 10;

  // Fetch history on mount
  useEffect(() => {
    getHistory().then((data) => setHistory(data.history || []));
  }, []);

  const onSearch = async (query: string, save = true) => {
    try {
      setLoading(true);
      setError(null);
      
      // TEST MODE: Generate 25 fake results if query is "test" or "demo"
      if (query.toLowerCase() === 'test' || query.toLowerCase() === 'demo') {
        const fakeResults: SearchResult[] = Array.from({ length: 25 }, (_, i) => ({
          title: `Test Result ${i + 1}: ${query} - Sample item for pagination testing`,
          url: `https://example.com/result-${i + 1}`,
          snippet: `This is a sample snippet for result ${i + 1}. It contains the word ${query} multiple times for testing the find-in-page feature. ${query} ${query} ${query}.`
        }));
        setResults(fakeResults);
        setPage(1);
        setSearchInput(query);
        if (save) {
          await searchAndSave(query).catch(() => {}); // Save but ignore response
          getHistory().then((data) => setHistory(data.history || []));
        }
      } else {
        // Normal search
        const res = save ? await searchAndSave(query) : await search(query);
        setResults(res.results || []);
        setPage(1); // Reset to first page on new search
        setSearchInput(query);
        // Refresh history if saved
        if (save) {
          getHistory().then((data) => setHistory(data.history || []));
        }
      }
    } catch (e: any) {
      setError(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE) || 1;
  const pagedResults = results.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Handle click on history item
  const handleHistoryClick = (query: string) => {
    setSearchInput(query);
    onSearch(query, false); // Do not save again
  };

  // Handle find-in-page highlighting
  const handleHighlight = (term: string, currentIndex: number, totalMatches: number) => {
    setHighlightTerm(term);
    setCurrentMatchIndex(currentIndex);
  };

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Sidebar */}
      <aside style={{ minWidth: 220, maxWidth: 260 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Recent Searches</div>
        <div className="card" style={{ padding: 0 }}>
          <ul className="list">
            {history.length === 0 && <li style={{ padding: 12, color: '#888' }}>No history yet.</li>}
            {history.map((h) => (
              <li key={h.id} style={{ cursor: 'pointer' }} onClick={() => handleHistoryClick(h.query)}>
                <span>{h.query}</span>
                <div style={{ color: '#666', fontSize: 12 }}>{new Date(h.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main content */}
      <div className="container" style={{ flex: 1 }}>
        <h1>N&N Search</h1>
        <SearchForm onSearch={onSearch} initialQuery={searchInput} />
        {loading && <div className="card">Loading…</div>}
        {error && <div className="card" style={{ color: 'crimson' }}>{error}</div>}
        {results.length > 0 && <FindInPage results={pagedResults} onHighlight={handleHighlight} />}
        <SearchResults results={pagedResults} highlightTerm={highlightTerm} currentMatchIndex={currentMatchIndex} />
        {results.length > 0 && (
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}>&lt; Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Next &gt;</button>
            <span style={{ marginLeft: 12 }}>
              Jump to:
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={e => goToPage(Number(e.target.value))}
                style={{ width: 50, marginLeft: 4 }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
