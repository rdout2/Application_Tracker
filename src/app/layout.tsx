import './globals.css';
import { Inter } from 'next/font/google';
import { initializeDatabase } from '@/lib/initDB'; // 👈 Notre init script

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Application Tracker',
  description: 'Track your job applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Exécute initDB uniquement côté serveur
  if (typeof window === 'undefined') {
    initializeDatabase();
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
