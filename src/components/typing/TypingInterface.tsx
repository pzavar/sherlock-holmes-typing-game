
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { TypingInterfaceProps } from './types';
import TypingHeader from './TypingHeader';
import TypingText from './TypingText';
import TypingStatusBar from './TypingStatusBar';
import ExitDialog from './ExitDialog';
import { useTypingState } from './hooks/useTypingState';

const TypingInterface: React.FC<TypingInterfaceProps> = ({
  challenge,
  onComplete,
  onReset,
  className
}) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const currentLetterRef = useRef<HTMLSpanElement>(null);

  const {
    status,
    currentIndex,
    inputHistory,
    stats,
    elapsedTime,
    showExitDialog,
    setShowExitDialog,
    clearTimer,
    handleKeyPress,
    setStatus,
    setCurrentIndex,
    setInputHistory,
    setStats,
    setElapsedTime
  } = useTypingState(challenge.text, onComplete);
  
  // Listen for keyboard input
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearTimer();
    };
  }, [challenge.text, currentIndex, status, handleKeyPress, clearTimer]);
  
  // Scroll text into view as user types
  useEffect(() => {
    if (currentLetterRef.current) {
      currentLetterRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [currentIndex]);
  
  // Reset the challenge
  const resetChallenge = () => {
    setStatus('idle');
    setCurrentIndex(0);
    setInputHistory([]);
    setStats({
      wpm: 0,
      accuracy: 100,
      startTime: null,
      endTime: null,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0
    });
    setElapsedTime(0);
    clearTimer();
    onReset();
  };
  
  // Handle back button click
  const handleBackClick = () => {
    if (status === 'active' && currentIndex > 0) {
      setShowExitDialog(true);
    } else {
      onReset();
    }
  };
  
  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <TypingHeader
        title={challenge.title}
        description={challenge.description}
        elapsedTime={elapsedTime}
        onBackClick={handleBackClick}
        onResetClick={resetChallenge}
      />
      
      <div 
        className="w-full bg-white rounded-xl p-8 shadow-sm border border-border mb-8"
      >
        <TypingText
          text={challenge.text}
          currentIndex={currentIndex}
          inputHistory={inputHistory}
          textContainerRef={textContainerRef}
          currentLetterRef={currentLetterRef}
        />
        
        <TypingStatusBar
          status={status}
          currentIndex={currentIndex}
          totalLength={challenge.text.length}
          correctChars={stats.correctChars}
          totalChars={stats.totalChars}
          startTime={stats.startTime}
          endTime={stats.endTime}
        />
      </div>
      
      {status === 'idle' && (
        <p className="text-center text-muted-foreground animate-fade-in">
          Press any key to begin typing
        </p>
      )}

      <ExitDialog
        isOpen={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirm={onReset}
      />
    </div>
  );
};

export default TypingInterface;
