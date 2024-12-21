import { Suspense } from 'react';
import StudentDashboard from '@/components/StudentDashboard';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <StudentDashboard />
        </Suspense>
      </div>
    </main>
  );
}