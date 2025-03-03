
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TypingStatus, LetterStatus, TypingStats, Challenge } from '@/types';
import { calculateWPM, calculateAccuracy, formatTime } from '@/utils/textUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TypingInterfaceProps {
  challenge: Challenge;
  onComplete: (stats: TypingStats) => void;
  onReset: () => void;
  className?: string;
}

const TypingInterface: React.FC<TypingInterfaceProps> = ({
  challenge,
  onComplete,
  onReset,
  className
}) => {
  const [status, setStatus] = useState<TypingStatus>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    startTime: null,
    endTime: null,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const currentLetterRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);

  // Listen for keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling modifier keys and other special keys
      if (
        e.ctrlKey || 
        e.altKey || 
        e.metaKey ||
        e.key === 'Shift' ||
        e.key === 'Control' ||
        e.key === 'Alt' ||
        e.key === 'Meta' ||
        e.key === 'CapsLock' ||
        e.key === 'Tab' ||
        e.key === 'Escape'
      ) {
        return;
      }
      
      // Ignore key events if challenge is complete
      if (status === 'complete') {
        return;
      }
      
      // Start timer on first keypress
      if (status === 'idle') {
        setStatus('active');
        const now = Date.now();
        setStats(prev => ({ ...prev, startTime: now }));
        
        // Set up timer for elapsed time
        timerRef.current = window.setInterval(() => {
          setElapsedTime(Date.now() - now);
        }, 100);
      }
      
      // Handle backspace
      if (e.key === 'Backspace') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          setInputHistory(prev => prev.slice(0, -1));
        }
        return;
      }
      
      // Normal character input
      if (currentIndex < challenge.text.length) {
        const expected = challenge.text[currentIndex];
        const actual = e.key;
        
        const isCorrect = actual === expected;
        
        setInputHistory(prev => [...prev, actual]);
        setCurrentIndex(prev => prev + 1);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          correctChars: prev.correctChars + (isCorrect ? 1 : 0),
          incorrectChars: prev.incorrectChars + (isCorrect ? 0 : 1),
          totalChars: prev.totalChars + 1
        }));
        
        // Check if typing is complete
        if (currentIndex === challenge.text.length - 1) {
          completeChallenge();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [challenge.text, currentIndex, status]);
  
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
  
  // Handle challenge completion
  const completeChallenge = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const endTime = Date.now();
    
    setStatus('complete');
    
    const finalStats = {
      ...stats,
      endTime,
      wpm: calculateWPM(stats.correctChars, stats.startTime, endTime),
      accuracy: calculateAccuracy(stats.correctChars, stats.totalChars)
    };
    
    setStats(finalStats);
    onComplete(finalStats);
  }, [stats, onComplete]);
  
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
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    onReset();
  };
  
  // Determine status of each letter
  const getLetterStatus = (index: number): LetterStatus => {
    if (index === currentIndex) return 'current';
    if (index < currentIndex) {
      return inputHistory[index] === challenge.text[index] ? 'correct' : 'incorrect';
    }
    return 'pending';
  };
  
  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <div className="flex justify-between items-center w-full mb-4">
        <div>
          <h2 className="text-xl font-medium">{challenge.title}</h2>
          <p className="text-sm text-muted-foreground">{challenge.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-mono font-medium">
              {formatTime(elapsedTime)}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetChallenge}
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div 
        className="w-full bg-white rounded-xl p-8 shadow-sm border border-border mb-8"
      >
        <div 
          ref={textContainerRef}
          className="typing-text relative min-h-36 mb-4 overflow-hidden leading-relaxed"
        >
          {challenge.text.split('').map((char, index) => {
            const status = getLetterStatus(index);
            return (
              <span 
                key={index} 
                ref={status === 'current' ? currentLetterRef : null}
                className={cn(
                  "letter-base",
                  status === 'current' && "letter-current",
                  status === 'correct' && "letter-correct",
                  status === 'incorrect' && "letter-incorrect",
                  status === 'pending' && "letter-pending",
                )}
              >
                {char}
                {status === 'current' && (
                  <span 
                    className="absolute h-5 w-0.5 ml-0.5 cursor-blink" 
                    aria-hidden="true"
                  />
                )}
              </span>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            {status === 'idle' && "Type to start..."}
            {status === 'active' && `${Math.floor((currentIndex / challenge.text.length) * 100)}% complete`}
            {status === 'complete' && "Challenge complete!"}
          </div>
          
          {status !== 'idle' && (
            <div className="flex space-x-4">
              <div>
                <span className="font-medium">WPM:</span> {calculateWPM(stats.correctChars, stats.startTime, stats.endTime || Date.now())}
              </div>
              <div>
                <span className="font-medium">Accuracy:</span> {calculateAccuracy(stats.correctChars, stats.totalChars)}%
              </div>
            </div>
          )}
        </div>
      </div>
      
      {status === 'idle' && (
        <p className="text-center text-muted-foreground animate-fade-in">
          Press any key to begin typing
        </p>
      )}
    </div>
  );
};

export default TypingInterface;
