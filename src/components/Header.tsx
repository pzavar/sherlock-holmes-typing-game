
import React from 'react';
import { cn } from "@/lib/utils";
import { Pipe } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-8 bg-[#221F26] text-white", className)}>
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center">
            <Pipe className="h-5 w-5 text-white transform rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold">Sherlock's Typing Test</h1>
            <p className="text-xs text-amber-300 italic">Elementary, my dear typist</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-amber-200">
            Solve cases with your typing skills
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
