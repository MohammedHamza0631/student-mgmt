'use client';

import { Search, Bell, Settings, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">Quyl.</div>
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your course"
              className="pl-8"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <Bell className="h-5 w-5 text-gray-500" />
          <Settings className="h-5 w-5 text-gray-500" />
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Adeline H. Dancy</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}