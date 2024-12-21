'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserProfile() {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <p className="text-sm font-medium">Adeline H. Dancy</p>
      </div>
    </div>
  );
}