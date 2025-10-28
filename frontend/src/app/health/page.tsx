import { getHealth } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HealthPage() {
  const data = await getHealth().catch(() => ({ status: 'error' as const }));
  return (
    <div className="container">
      <h1>Health</h1>
      <div className="card">
        <div>Status: <strong>{data.status}</strong></div>
        {('info' in data) && data.info ? (
          <pre style={{ overflowX: 'auto' }}>{JSON.stringify(data.info, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
}
