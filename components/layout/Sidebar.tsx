'use client';

import { LayoutDashboard, Users, BookOpen, HelpCircle, BarChart2, Settings } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Students', href: '/' },
  { icon: BookOpen, label: 'Chapter', href: '/chapter' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
  { icon: BarChart2, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block w-64 bg-white border-r min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 px-4">Quyl.</div>
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}