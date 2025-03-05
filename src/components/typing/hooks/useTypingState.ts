
import { useState, useRef, useCallback } from 'react';
import { TypingStatus, TypingStats } from '@/types';
import { calculateWPM, calculateAccuracy } from '@/utils/textUtils';

export const useTypingState = (text: string, onComplete: (stats: TypingStats) => void) => {
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
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // Start the timer and set the start time
  const startTimer = () => {
    const now = Date.now();
    setStats(prev => ({ ...prev, startTime: now }));
    
    // Set up timer for elapsed time
    clearTimer(); // Clear any existing timer
    timerRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 100);
  };
  
  // Clear the timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Complete the challenge
  const completeChallenge = useCallback(() => {
    clearTimer();
    
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

  // Handle key press
  const handleKeyPress = (e: KeyboardEvent) => {
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
      startTimer();
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
    if (currentIndex < text.length) {
      const expected = text[currentIndex];
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
      if (currentIndex === text.length - 1) {
        completeChallenge();
      }
    }
  };

  return {
    status,
    currentIndex,
    inputHistory,
    stats,
    elapsedTime,
    showExitDialog,
    setShowExitDialog,
    startTimer,
    clearTimer,
    completeChallenge,
    handleKeyPress,
    setStatus,
    setCurrentIndex,
    setInputHistory,
    setStats,
    setElapsedTime
  };
};
