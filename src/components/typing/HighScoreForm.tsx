
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypingStats, HighScore } from '@/types';
import { saveHighScore } from '@/utils/textUtils';
import { Trophy } from 'lucide-react';

interface HighScoreFormProps {
  stats: TypingStats;
  challengeId: string;
  onSave: (playerName: string) => void;
}

const HighScoreForm: React.FC<HighScoreFormProps> = ({
  stats,
  challengeId,
  onSave
}) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) return;
    
    setIsSaving(true);
    
    // Create high score object
    const highScore: HighScore = {
      id: Date.now().toString(),
      playerName: playerName.trim(),
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      date: Date.now(),
      challengeId
    };
    
    // Save to local storage
    saveHighScore(highScore);
    
    // Notify parent
    onSave(playerName);
  };

  return (
    <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg mb-6">
      <div className="flex items-center justify-center mb-3">
        <Trophy className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-medium text-purple-800">Submit Your Score</h3>
      </div>
      
      <p className="text-sm text-purple-700 mb-4">
        Congratulations on completing the challenge! Enter your name to save your score.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="max-w-xs border-purple-300 focus:border-purple-500"
          maxLength={20}
          required
        />
        
        <Button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
          disabled={isSaving || !playerName.trim()}
        >
          Save My Score
        </Button>
      </form>
    </div>
  );
};

export default HighScoreForm;
