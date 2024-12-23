import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Manage your students and courses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 md:p-8 bg-gray-50 flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}