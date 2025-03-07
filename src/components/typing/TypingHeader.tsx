
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { formatTime } from '@/utils/textUtils';

interface TypingHeaderProps {
  title: string;
  description: string;
  elapsedTime: number;
  onBackClick: () => void;
  onResetClick: () => void;
  status: 'idle' | 'active' | 'complete';
}

const TypingHeader: React.FC<TypingHeaderProps> = ({
  title,
  description,
  elapsedTime,
  onBackClick,
  onResetClick,
  status
}) => {
  return (
    <div className="flex justify-between items-center w-full mb-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="rounded-full hover:bg-amber-50 text-amber-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Only show timer if complete */}
        {status === 'complete' && (
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-mono font-medium">
              {formatTime(elapsedTime)}
            </p>
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetClick}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TypingHeader;
