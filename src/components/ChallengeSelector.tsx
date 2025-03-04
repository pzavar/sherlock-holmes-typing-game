
import React, { useState } from 'react';
import { Challenge } from '@/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scroll, BookOpen, ScrollText } from 'lucide-react';

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

  // Helper function for difficulty badge
  const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const getColorClass = () => {
      switch (difficulty) {
        case 'easy': return 'bg-green-100 text-green-800';
        case 'medium': return 'bg-amber-100 text-amber-800';
        case 'hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <div className={`px-2 py-1 rounded-full ${getColorClass()} text-xs font-medium`}>
        {difficulty}
      </div>
    );
  };
  
  return (
    <div className={cn("w-full animate-slide-up", className)}>
      <Tabs 
        defaultValue="beginner" 
        value={currentLevel}
        onValueChange={setCurrentLevel}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#221F26]">
          <TabsTrigger className="data-[state=active]:bg-amber-600 text-amber-200 data-[state=active]:text-white" value="beginner">
            <BookOpen className="h-4 w-4 mr-2" />
            Novice
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-amber-600 text-amber-200 data-[state=active]:text-white" value="intermediate">
            <Scroll className="h-4 w-4 mr-2" />
            Detective
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-amber-600 text-amber-200 data-[state=active]:text-white" value="advanced">
            <ScrollText className="h-4 w-4 mr-2" />
            Consulting Detective
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="beginner" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beginner.map((challenge) => (
              <div 
                key={challenge.id}
                className="challenge-card cursor-pointer bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-bold text-lg text-[#403E43]">{challenge.title}</h3>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                
                <p className="text-[#8A898C] text-sm mb-4">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9F9EA1]">
                    ~{challenge.estimatedTime}
                  </span>
                  <span className="text-amber-600 font-medium">
                    Begin Investigation →
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
                className="challenge-card cursor-pointer bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-bold text-lg text-[#403E43]">{challenge.title}</h3>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                
                <p className="text-[#8A898C] text-sm mb-4">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9F9EA1]">
                    ~{challenge.estimatedTime}
                  </span>
                  <span className="text-amber-600 font-medium">
                    Begin Investigation →
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
                className="challenge-card cursor-pointer bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                onClick={() => onSelect(challenge)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-bold text-lg text-[#403E43]">{challenge.title}</h3>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                
                <p className="text-[#8A898C] text-sm mb-4">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9F9EA1]">
                    ~{challenge.estimatedTime}
                  </span>
                  <span className="text-amber-600 font-medium">
                    Begin Investigation →
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
