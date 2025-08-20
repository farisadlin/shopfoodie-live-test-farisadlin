"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface UserProfileProps {
  name: string;
  role: string;
  initials: string;
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  role,
  initials,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 ml-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
