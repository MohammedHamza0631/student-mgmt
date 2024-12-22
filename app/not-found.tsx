import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Return to Students
      </Link>
    </div>
  );
}