
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
  playerName?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'challenge';
  estimatedTime: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'challenge';
}

export interface HighScore {
  id: string;
  playerName: string;
  wpm: number;
  accuracy: number;
  date: number;
  challengeId: string;
}
