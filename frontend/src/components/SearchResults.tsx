import { SearchResult } from '@/lib/types';

export default function SearchResults({ results }: { results: SearchResult[] }) {
  if (!results || results.length === 0) {
    return <div className="card">No results yet. Try a query above.</div>;
  }

  return (
    <div className="card">
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
    </div>
  );
}
