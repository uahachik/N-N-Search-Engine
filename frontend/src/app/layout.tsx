import type { Metadata } from 'next';
import '../styles/globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'N&N Search Engine',
  description: 'Frontend for N&N Search Engine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/">Search</Link>
            <Link href="/history">History</Link>
            <Link href="/health">Health</Link>
          </nav>
        </header>
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '1rem' }}>{children}</main>
        <footer style={{ padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem', textAlign: 'center' }}>
          <small>© {new Date().getFullYear()} N&N Search</small>
        </footer>
      </body>
    </html>
  );
}
