
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

// Sherlock Holmes typing challenges
export const typingChallenges: Challenge[] = [
  {
    id: "holmes-intro",
    title: "A Study in Scarlet",
    description: "Introduction to Sherlock Holmes",
    text: "In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon.",
    difficulty: "easy",
    estimatedTime: "30 sec"
  },
  {
    id: "holmes-observation",
    title: "The Science of Deduction",
    description: "Holmes explains his methods",
    text: "From a drop of water a logician could infer the possibility of an Atlantic or a Niagara without having seen or heard of one or the other. So all life is a great chain, the nature of which is known whenever we are shown a single link of it.",
    difficulty: "medium",
    estimatedTime: "1 min"
  },
  {
    id: "holmes-baskerville",
    title: "The Hound of the Baskervilles",
    description: "The famous supernatural case",
    text: "Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before. It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a 'Penang lawyer.'",
    difficulty: "medium",
    estimatedTime: "2 min"
  },
  {
    id: "holmes-final-problem",
    title: "The Final Problem",
    description: "Holmes faces his nemesis Professor Moriarty",
    text: "It is with a heavy heart that I take up my pen to write these the last words in which I shall ever record the singular gifts by which my friend Mr. Sherlock Holmes was distinguished. In an incoherent and, as I deeply feel, an entirely inadequate fashion, I have endeavored to give some account of my strange experiences in his company from the chance which first brought us together at the period of the 'Study in Scarlet,' up to the time of his interference in the matter of the 'Naval Treaty.'",
    difficulty: "hard",
    estimatedTime: "3 min"
  }
];
