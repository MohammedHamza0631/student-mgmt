'use client';

import { Search, Bell, Settings, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/SearchBar';
import { UserProfile } from '@/components/layout/UserProfile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="hidden md:block text-2xl font-bold mr-8">Quyl.</div>

        <div className="flex items-center space-x-4 flex-1">
          <SearchBar />
          
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Settings className="h-5 w-5 text-gray-500" />
            </Button>
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}