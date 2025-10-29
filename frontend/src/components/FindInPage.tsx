"use client";

import { useState, useEffect } from 'react';

type Props = {
  results: Array<{ title: string; url: string; snippet?: string }>;
  onHighlight: (term: string, currentIndex: number, totalMatches: number) => void;
};

export default function FindInPage({ results, onHighlight }: Props) {
  const [findTerm, setFindTerm] = useState('');
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    // Helper to escape regex special characters in the search term
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (!findTerm.trim()) {
      // Clear highlights
      onHighlight('', 0, 0);
      setTotalMatches(0);
      setCurrentMatch(0);
      return;
    }

    // Count matches
    const term = escapeRegExp(findTerm.toLowerCase());
    const regex = new RegExp(term, 'g');
    let count = 0;
    results.forEach((r) => {
      const titleMatches = (r.title.toLowerCase().match(regex) || []).length;
      const snippetMatches = r.snippet
        ? (r.snippet.toLowerCase().match(regex) || []).length
        : 0;
      count += titleMatches + snippetMatches;
    });

    setTotalMatches(count);
    if (count > 0) {
      setCurrentMatch(1);
      onHighlight(findTerm, 1, count);
    } else {
      setCurrentMatch(0);
      onHighlight(findTerm, 0, count);
    }
  }, [findTerm, results, onHighlight]);

  const goToNext = () => {
    if (totalMatches === 0) return;
    const next = currentMatch >= totalMatches ? 1 : currentMatch + 1;
    setCurrentMatch(next);
    onHighlight(findTerm, next, totalMatches);
  };

  const goToPrev = () => {
    if (totalMatches === 0) return;
    const prev = currentMatch <= 1 ? totalMatches : currentMatch - 1;
    setCurrentMatch(prev);
    onHighlight(findTerm, prev, totalMatches);
  };

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label style={{ fontWeight: 500 }}>Find in results:</label>
      <input
        type="text"
        value={findTerm}
        onChange={(e) => setFindTerm(e.target.value)}
        placeholder="Type to search..."
        style={{ flex: 1, maxWidth: 300, padding: '0.4rem 0.6rem' }}
      />
      {totalMatches > 0 && (
        <>
          <span style={{ fontSize: 14, color: '#555' }}>
            {currentMatch} of {totalMatches} matches
          </span>
          <button onClick={goToPrev} style={{ padding: '0.4rem 0.6rem' }}>
            &lt; Prev
          </button>
          <button onClick={goToNext} style={{ padding: '0.4rem 0.6rem' }}>
            Next &gt;
          </button>
        </>
      )}
      {findTerm && totalMatches === 0 && (
        <span style={{ fontSize: 14, color: '#999' }}>No matches</span>
      )}
    </div>
  );
}
