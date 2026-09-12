import './globals.css';
import { Header } from '@/components/header';
import { AuthProvider } from '@/components/auth-provider';

export const metadata = { title: 'College Discovery Platform', description: 'Search, compare and predict colleges with real database-backed APIs.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AuthProvider><Header />{children}</AuthProvider></body></html>;
}
