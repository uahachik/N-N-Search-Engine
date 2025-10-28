"use client";

import { useState } from 'react';

type Props = {
  onSearch: (query: string, save?: boolean) => void;
  initialQuery?: string;
};

export default function SearchForm({ onSearch, initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [saveToHistory, setSaveToHistory] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim().length === 0) return;
        onSearch(query.trim(), saveToHistory);
      }}
      className="card"
    >
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search… (e.g., nestjs, cats, typescript)"
          style={{ flex: 1, padding: '0.6rem 0.8rem' }}
        />
        <button type="submit" style={{ padding: '0.6rem 1rem' }}>Search</button>
      </div>
      <label style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
        <input
          type="checkbox"
          checked={saveToHistory}
          onChange={(e) => setSaveToHistory(e.target.checked)}
        />
        Save to history
      </label>
    </form>
  );
}
