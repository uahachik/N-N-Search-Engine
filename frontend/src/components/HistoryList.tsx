import { HistoryItem } from '@/lib/types';

export default function HistoryList({ items }: { items: HistoryItem[] }) {
  if (!items || items.length === 0) {
    return <div className="card">No history yet.</div>;
  }
  return (
    <div className="card">
      <ul className="list">
        {items.map((h) => (
          <li key={h.id}>
            <strong>{h.query}</strong>
            <div style={{ color: '#666', fontSize: 12 }}>{new Date(h.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
