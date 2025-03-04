
export type TypingStatus = 'idle' | 'active' | 'complete';

export type LetterStatus = 'correct' | 'incorrect' | 'current' | 'pending';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  startTime: number | null;
  endTime: number | null;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}
