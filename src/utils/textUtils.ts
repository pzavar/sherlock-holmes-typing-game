
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

// Organized typing challenges by difficulty level
export const typingChallenges: Challenge[] = [
  // BEGINNER LEVEL
  {
    id: "beginner-1",
    title: "A Study in Scarlet",
    description: "Introduction to Sherlock Holmes",
    text: "In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon.",
    difficulty: "easy",
    estimatedTime: "30 sec",
    level: "beginner"
  },
  {
    id: "beginner-2",
    title: "The Red-Headed League",
    description: "The mysterious job offer",
    text: "I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair.",
    difficulty: "easy",
    estimatedTime: "20 sec",
    level: "beginner"
  },
  {
    id: "beginner-3",
    title: "The Blue Carbuncle",
    description: "A Christmas mystery",
    text: "I had called upon my friend Sherlock Holmes upon the second morning after Christmas, with the intention of wishing him the compliments of the season.",
    difficulty: "easy",
    estimatedTime: "15 sec",
    level: "beginner"
  },
  {
    id: "beginner-4",
    title: "A Scandal in Bohemia",
    description: "The woman who outsmarted Holmes",
    text: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.",
    difficulty: "easy",
    estimatedTime: "20 sec",
    level: "beginner"
  },
  {
    id: "beginner-5",
    title: "The Five Orange Pips",
    description: "A deadly warning",
    text: "When I glance over my notes and records of the Sherlock Holmes cases between the years '82 and '90, I am faced by so many which present strange and interesting features that it is no easy matter to know which to choose and which to leave.",
    difficulty: "easy",
    estimatedTime: "30 sec",
    level: "beginner"
  },
  
  // INTERMEDIATE LEVEL
  {
    id: "intermediate-1",
    title: "The Science of Deduction",
    description: "Holmes explains his methods",
    text: "From a drop of water a logician could infer the possibility of an Atlantic or a Niagara without having seen or heard of one or the other. So all life is a great chain, the nature of which is known whenever we are shown a single link of it.",
    difficulty: "medium",
    estimatedTime: "1 min",
    level: "intermediate"
  },
  {
    id: "intermediate-2",
    title: "The Speckled Band",
    description: "A locked room mystery",
    text: "The adventure of the Speckled Band represents a case where Sherlock Holmes was engaged in his professional capacity. Miss Helen Stoner consulted him in regard to some very unusual happenings at Stoke Moran, the residence of her stepfather, Dr. Grimesby Roylott, the last survivor of one of the oldest Saxon families in England.",
    difficulty: "medium",
    estimatedTime: "1 min",
    level: "intermediate"
  },
  {
    id: "intermediate-3",
    title: "Silver Blaze",
    description: "The case of the missing racehorse",
    text: "I am afraid, Watson, that I shall have to go. What do you mean, Holmes? I have just had an answer to my American telegram. No; we have got something really practical. My dear fellow, I stand upon the point of completing one of the most remarkable cases of my career. The problem of the missing race-horse.",
    difficulty: "medium",
    estimatedTime: "45 sec",
    level: "intermediate"
  },
  {
    id: "intermediate-4",
    title: "The Dancing Men",
    description: "Holmes deciphers a code",
    text: "Holmes had been seated for some hours in silence with his long, thin back curved over a chemical vessel in which he was brewing a particularly malodorous product. His head was sunk upon his breast, and he looked from my point of view like a strange, lank bird, with dull gray plumage and a black top-knot.",
    difficulty: "medium",
    estimatedTime: "50 sec",
    level: "intermediate"
  },
  {
    id: "intermediate-5",
    title: "The Naval Treaty",
    description: "A missing document of national importance",
    text: "The July which immediately succeeded my marriage was made memorable by three cases of interest, in which I had the privilege of being associated with Sherlock Holmes and of studying his methods. I find them recorded in my notes under the headings of 'The Adventure of the Second Stain,' 'The Adventure of the Naval Treaty,' and 'The Adventure of the Tired Captain.'",
    difficulty: "medium",
    estimatedTime: "1 min",
    level: "intermediate"
  },
  
  // ADVANCED LEVEL
  {
    id: "advanced-1",
    title: "The Hound of the Baskervilles",
    description: "The famous supernatural case",
    text: "Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before. It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a 'Penang lawyer.'",
    difficulty: "hard",
    estimatedTime: "2 min",
    level: "advanced"
  },
  {
    id: "advanced-2",
    title: "The Final Problem",
    description: "Holmes faces his nemesis Professor Moriarty",
    text: "It is with a heavy heart that I take up my pen to write these the last words in which I shall ever record the singular gifts by which my friend Mr. Sherlock Holmes was distinguished. In an incoherent and, as I deeply feel, an entirely inadequate fashion, I have endeavored to give some account of my strange experiences in his company from the chance which first brought us together at the period of the 'Study in Scarlet,' up to the time of his interference in the matter of the 'Naval Treaty.'",
    difficulty: "hard",
    estimatedTime: "3 min",
    level: "advanced"
  },
  {
    id: "advanced-3",
    title: "The Empty House",
    description: "Holmes's dramatic return",
    text: "It was in the spring of the year 1894 that all London was interested, and the fashionable world dismayed, by the murder of the Honourable Ronald Adair under most unusual and inexplicable circumstances. The public has already learned those particulars of the crime which came out in the police investigation, but a good deal was suppressed upon that occasion, since the case for the prosecution was so overwhelmingly strong that it was not necessary to bring forward all the facts.",
    difficulty: "hard",
    estimatedTime: "2 min 30 sec",
    level: "advanced"
  },
  {
    id: "advanced-4",
    title: "The Valley of Fear",
    description: "Holmes investigates a coded message",
    text: "I am inclined to think—said I. I should do so, Sherlock Holmes remarked impatiently. I believe that I am one of the most long-suffering of mortals; but I'll admit that I was annoyed at the sardonic interruption. Being a natural busybody, he went on, is one of the most valuable qualities a man can possess in this world. So it is that I find myself telling you a story long before I should even properly know whether you desire to hear it.",
    difficulty: "hard",
    estimatedTime: "2 min",
    level: "advanced"
  },
  {
    id: "advanced-5",
    title: "His Last Bow",
    description: "Holmes's wartime service",
    text: "It was nine o'clock at night upon the second of August—the most terrible August in the history of the world. One might have thought already that God's curse hung heavy over a degenerate world, for there was an awesome hush and a feeling of vague expectancy in the sultry and stagnant air. The sun had long set, but one blood-red gash like an open wound lay low in the distant west. Above, the stars were shining brightly, and below, the lights of the shipping glimmered in the bay.",
    difficulty: "hard",
    estimatedTime: "3 min",
    level: "advanced"
  }
];
