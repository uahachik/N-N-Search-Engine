import { SearchResult } from '@/lib/types';
import { useEffect, useRef } from 'react';

type Props = {
  results: SearchResult[];
  highlightTerm?: string;
  currentMatchIndex?: number;
};

export default function SearchResults({ results, highlightTerm = '', currentMatchIndex = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove all previous highlights
    const container = containerRef.current;
    const existingHighlights = container.querySelectorAll('.highlight, .highlight-current');
    existingHighlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });

    if (!highlightTerm.trim()) return;

    // Apply new highlights
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    const regex = new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    let matchIndex = 0;

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || '';
      if (!regex.test(text)) return;

      const parent = textNode.parentNode;
      if (!parent) return;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      regex.lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        matchIndex++;
        // Add text before match
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }
        // Add highlighted match
        const span = document.createElement('span');
        span.textContent = match[0];
        span.className = matchIndex === currentMatchIndex ? 'highlight-current' : 'highlight';
        fragment.appendChild(span);
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }

      parent.replaceChild(fragment, textNode);
    });

    // Scroll current match into view
    if (currentMatchIndex > 0) {
      const currentHighlight = container.querySelector('.highlight-current');
      if (currentHighlight) {
        currentHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightTerm, currentMatchIndex, results]);

  if (!results || results.length === 0) {
    return <div className="card">No results yet. Try a query above.</div>;
  }

  return (
    <div className="card" ref={containerRef}>
      <div style={{ marginBottom: 8, color: '#444', fontSize: 15 }}>
        {results.length} result{results.length !== 1 ? 's' : ''}
      </div>
      <ul className="list">
        {results.map((r, i) => (
          <li key={`${r.url}-${i}`}>
            <a href={r.url} target="_blank" rel="noreferrer">
              <strong>{r.title}</strong>
            </a>
            {r.snippet ? <div style={{ color: '#555' }}>{r.snippet}</div> : null}
          </li>
        ))}
      </ul>
      <style jsx>{`
        :global(.highlight) {
          background-color: yellow;
          padding: 2px 0;
        }
        :global(.highlight-current) {
          background-color: orange;
          font-weight: bold;
          padding: 2px 0;
        }
      `}</style>
    </div>
  );
}
