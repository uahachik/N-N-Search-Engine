import { getHistory } from '@/lib/api';
import HistoryList from '@/components/HistoryList';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const data = await getHistory().catch(() => ({ history: [] }));
  return (
    <div className="container">
      <h1>Search History</h1>
      <HistoryList items={data.history} />
    </div>
  );
}
