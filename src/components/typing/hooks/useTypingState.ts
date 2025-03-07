
import { useState, useRef, useCallback, useEffect } from 'react';
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
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Start the timer
  const startTimer = useCallback(() => {
    // Only start timer if not already started
    if (startTimeRef.current !== null) {
      return;
    }
    
    // Stop any existing timer
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    
    // Record the start time
    const now = Date.now();
    startTimeRef.current = now;
    
    // Update stats with the start time
    setStats(prev => ({ ...prev, startTime: now }));
    
    // Start a new timer interval
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.max(0, Date.now() - startTimeRef.current);
        setElapsedTime(elapsed);
      }
    }, 100);
    
    console.log("Timer started at:", now);
  }, []);
  
  // Clear the timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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
  }, [stats, onComplete, clearTimer]);

  // Handle key press
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Ignore specific keys that shouldn't trigger typing
    if (isModifierKey(e.key)) {
      return;
    }
    
    // Ignore key events if challenge is complete
    if (status === 'complete') {
      return;
    }
    
    // Ignore key combinations with modifiers
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }
    
    // Start timer and change status on the first keypress
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
  }, [status, currentIndex, text, startTimer, completeChallenge]);

  // Helper function to check if a key is a modifier key
  const isModifierKey = useCallback((key: string): boolean => {
    return [
      'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 
      'Tab', 'Escape', 'ArrowUp', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 'Home', 'End',
      'PageUp', 'PageDown', 'Insert', 'Delete',
      'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 
      'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ].includes(key);
  }, []);

  // Reset everything when the text changes
  useEffect(() => {
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
    startTimeRef.current = null;
  }, [text, clearTimer]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

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
