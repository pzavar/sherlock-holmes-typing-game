
import React, { useState, useEffect } from 'react';
import { HighScore } from '@/types';
import HighScoresList from './HighScoresList';
import { getHighScores } from '@/utils/textUtils';
import { Award, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GlobalLeaderboard = () => {
  const [allScores, setAllScores] = useState<HighScore[]>([]);
  const [activeTab, setActiveTab] = useState<'recent' | 'top'>('top');
  
  useEffect(() => {
    const scores = getHighScores();
    setAllScores(scores);
  }, []);
  
  // Get top scores - sort by WPM
  const topScores = [...allScores].sort((a, b) => b.wpm - a.wpm).slice(0, 10);
  
  // Get recent scores - sort by date
  const recentScores = [...allScores].sort((a, b) => b.date - a.date).slice(0, 10);
  
  // If no scores yet
  if (allScores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 shadow-md">
        <Trophy className="text-purple-400 h-16 w-16 mb-3" strokeWidth={1} />
        <h3 className="text-xl font-serif font-medium text-center mb-2">No Scores Yet</h3>
        <p className="text-center text-[#8A898C]">
          Complete a challenge to be the first on the leaderboard!
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 shadow-md">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Trophy className="text-purple-600 h-6 w-6" />
        <h2 className="text-2xl font-serif font-bold text-[#403E43]">Detective Leaderboard</h2>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'top' ? 'default' : 'outline'}
          className={activeTab === 'top' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'border-purple-300 text-purple-700 hover:bg-purple-50'}
          onClick={() => setActiveTab('top')}
          size="sm"
        >
          <Award className="h-4 w-4 mr-1" />
          Top Scores
        </Button>
        
        <Button
          variant={activeTab === 'recent' ? 'default' : 'outline'}
          className={activeTab === 'recent' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'border-purple-300 text-purple-700 hover:bg-purple-50'}
          onClick={() => setActiveTab('recent')}
          size="sm"
        >
          <Users className="h-4 w-4 mr-1" />
          Recent Scores
        </Button>
      </div>
      
      {activeTab === 'top' ? (
        <HighScoresList scores={topScores} title="Top Investigators" />
      ) : (
        <HighScoresList scores={recentScores} title="Recent Investigations" />
      )}
    </div>
  );
};

export default GlobalLeaderboard;
