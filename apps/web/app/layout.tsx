import { Header } from '../components/header';
import { Nav } from '../components/nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, Arial, sans-serif', background: '#0b0f17', color: '#f2f3f5' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: 20 }}>
          <Header />
          <Nav />
          <div style={{ border: '1px solid #242b3a', borderRadius: 10, padding: 16, background: '#0f1624' }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
