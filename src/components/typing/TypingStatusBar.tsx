
import React from 'react';
import { TypingStatus } from '@/types';
import { calculateWPM, calculateAccuracy } from '@/utils/textUtils';

interface TypingStatusBarProps {
  status: TypingStatus;
  currentIndex: number;
  totalLength: number;
  correctChars: number;
  totalChars: number;
  startTime: number | null;
  endTime: number | null;
}

const TypingStatusBar: React.FC<TypingStatusBarProps> = ({
  status,
  currentIndex,
  totalLength,
  correctChars,
  totalChars,
  startTime,
  endTime
}) => {
  return (
    <div className="flex justify-between items-center text-sm text-muted-foreground">
      <div>
        {status === 'idle' && "Type to start..."}
        {status === 'active' && `${Math.floor((currentIndex / totalLength) * 100)}% complete`}
        {status === 'complete' && "Challenge complete!"}
      </div>
      
      {status !== 'idle' && (
        <div className="flex space-x-4">
          <div>
            <span className="font-medium">WPM:</span> {calculateWPM(correctChars, startTime, endTime || Date.now())}
          </div>
          <div>
            <span className="font-medium">Accuracy:</span> {calculateAccuracy(correctChars, totalChars)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingStatusBar;
