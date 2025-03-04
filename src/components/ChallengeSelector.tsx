
import React, { useState } from 'react';
import { Challenge } from '@/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [currentLevel, setCurrentLevel] = useState<string>("beginner");
  
  // Group challenges by level
  const beginner = challenges.filter(c => c.level === 'beginner');
  const intermediate = challenges.filter(c => c.level === 'intermediate');
  const advanced = challenges.filter(c => c.level === 'advanced');
  
  return (
    <div className={cn("w-full animate-slide-up", className)}>
      <h2 className="text-2xl font-medium mb-2">Choose a typing challenge</h2>
      <p className="text-muted-foreground mb-6">
        Select a level and challenge to start practicing your typing skills
      </p>
      
      <Tabs 
        defaultValue="beginner" 
        value={currentLevel}
        onValueChange={setCurrentLevel}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="beginner" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beginner.map((challenge) => (
              <div 
                key={challenge.id}
                className="challenge-card cursor-pointer"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{challenge.title}</h3>
                  <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
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
        </TabsContent>
        
        <TabsContent value="intermediate" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intermediate.map((challenge) => (
              <div 
                key={challenge.id}
                className="challenge-card cursor-pointer"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{challenge.title}</h3>
                  <div className="px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
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
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advanced.map((challenge) => (
              <div 
                key={challenge.id}
                className="challenge-card cursor-pointer"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{challenge.title}</h3>
                  <div className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChallengeSelector;
