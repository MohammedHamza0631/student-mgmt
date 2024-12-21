'use client';

import { Search, Bell, Settings, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/SearchBar';
import { UserProfile } from '@/components/layout/UserProfile';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center space-x-8 flex-1">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <HelpCircle className="h-5 w-5 text-gray-500 hidden sm:block" />
          <Bell className="h-5 w-5 text-gray-500 hidden sm:block" />
          <Settings className="h-5 w-5 text-gray-500 hidden sm:block" />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}