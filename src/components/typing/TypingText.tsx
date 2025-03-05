
import React from 'react';
import { cn } from '@/lib/utils';
import { LetterStatus } from '@/types';

interface TypingTextProps {
  text: string;
  currentIndex: number;
  inputHistory: string[];
  textContainerRef: React.RefObject<HTMLDivElement>;
  currentLetterRef: React.RefObject<HTMLSpanElement>;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  currentIndex,
  inputHistory,
  textContainerRef,
  currentLetterRef
}) => {
  // Determine status of each letter
  const getLetterStatus = (index: number): LetterStatus => {
    if (index === currentIndex) return 'current';
    if (index < currentIndex) {
      return inputHistory[index] === text[index] ? 'correct' : 'incorrect';
    }
    return 'pending';
  };

  return (
    <div 
      ref={textContainerRef}
      className="typing-text relative min-h-36 mb-4 overflow-hidden leading-relaxed"
    >
      {text.split('').map((char, index) => {
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
  );
};

export default TypingText;
