import { Header } from '../components/header';
import { Nav } from '../components/nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, Arial, sans-serif', background: '#0b0f17', color: '#f2f3f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
          <Header />
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
