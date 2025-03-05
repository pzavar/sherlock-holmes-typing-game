
import { Challenge, LetterStatus, TypingStats, TypingStatus } from '@/types';

export interface TypingInterfaceProps {
  challenge: Challenge;
  onComplete: (stats: TypingStats) => void;
  onReset: () => void;
  className?: string;
}
