
import React from 'react';
import { Challenge } from '@/types';
import { cn } from '@/lib/utils';

interface ChallengeSelectorProps {
  challenges: Challenge[];
  onSelect: (challenge: Challenge) => void;
  className?: string;
}

const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({
  challenges,
  onSelect,
  className
}) => {
  return (
    <div className={cn("w-full animate-slide-up", className)}>
      <h2 className="text-2xl font-medium mb-2">Choose a typing challenge</h2>
      <p className="text-muted-foreground mb-6">
        Select a challenge to start practicing your typing skills
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id}
            className="challenge-card cursor-pointer"
            onClick={() => onSelect(challenge)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-lg">{challenge.title}</h3>
              <div className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                {challenge.difficulty}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4">
              {challenge.description}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                ~{challenge.estimatedTime}
              </span>
              <span className="text-primary font-medium">
                Start Challenge →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeSelector;
