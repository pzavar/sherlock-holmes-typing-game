
import { Challenge } from "../types";

// Calculate WPM (Words Per Minute)
export const calculateWPM = (
  correctChars: number,
  startTime: number | null,
  endTime: number | null
): number => {
  if (!startTime || !endTime) return 0;
  
  // Standard calculation: 5 characters = 1 word
  const words = correctChars / 5;
  const minutes = (endTime - startTime) / 60000; // Convert milliseconds to minutes
  
  return Math.round(words / minutes);
};

// Calculate accuracy percentage
export const calculateAccuracy = (
  correctChars: number,
  totalAttempted: number
): number => {
  if (totalAttempted === 0) return 100;
  return Math.round((correctChars / totalAttempted) * 100);
};

// Format time in mm:ss
export const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Sample typing challenges
export const typingChallenges: Challenge[] = [
  {
    id: "quick-test",
    title: "Quick Test",
    description: "A short test to measure your typing speed",
    text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
    difficulty: "easy",
    estimatedTime: "30 sec"
  },
  {
    id: "programming",
    title: "Programming Snippet",
    description: "Practice typing code-like text",
    text: "function calculateResult(a, b) {\n  const sum = a + b;\n  return sum > 10 ? 'Large' : 'Small';\n}\n\nconst result = calculateResult(5, 7);\nconsole.log(`The result is ${result}`);",
    difficulty: "medium",
    estimatedTime: "1 min"
  },
  {
    id: "paragraph",
    title: "Full Paragraph",
    description: "A longer text to test your endurance",
    text: "Design is not just what it looks like and feels like. Design is how it works. Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it's worth it in the end because once you get there, you can move mountains. The people who are crazy enough to think they can change the world are the ones who do.",
    difficulty: "medium",
    estimatedTime: "2 min"
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum",
    description: "Classic placeholder text for extensive practice",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    difficulty: "hard",
    estimatedTime: "3 min"
  }
];
