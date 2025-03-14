import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ChallengeSelector from '@/components/ChallengeSelector';
import TypingInterface from '@/components/TypingInterface';
import { typingChallenges, getChallengeHighScores, getFreshChallenges } from '@/utils/textUtils';
import { Challenge, TypingStats, HighScore } from '@/types';
import { Button } from '@/components/ui/button';
import { Scroll, CheckCircle, Search, BookOpen, Glasses, MapPin } from 'lucide-react';
import HighScoreForm from '@/components/typing/HighScoreForm';
import HighScoresList from '@/components/typing/HighScoresList';
import GlobalLeaderboard from '@/components/typing/GlobalLeaderboard';

const Index = () => {
  const [challenges, setChallenges] = useState(() => getFreshChallenges());
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedStats, setCompletedStats] = useState<TypingStats | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  
  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCompletedStats(null);
    setPlayerName(null);
    
    if (challenge.level === 'challenge') {
      const scores = getChallengeHighScores(challenge.id);
      setHighScores(scores);
    }
  };
  
  const handleChallengeComplete = (stats: TypingStats) => {
    setCompletedStats(stats);
  };
  
  const handleSaveScore = (name: string) => {
    setPlayerName(name);
    
    if (selectedChallenge && selectedChallenge.level === 'challenge') {
      const scores = getChallengeHighScores(selectedChallenge.id);
      setHighScores(scores);
    }
  };
  
  const handleReset = () => {
    setChallenges(getFreshChallenges());
    setSelectedChallenge(null);
    setCompletedStats(null);
    setPlayerName(null);
    setHighScores([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F7] bg-[url('/paper-texture.png')] bg-repeat relative">
      <div className="absolute top-[10%] left-[5%] opacity-10 transform -rotate-12">
        <Search className="h-32 w-32 text-amber-800" strokeWidth={1} />
      </div>
      <div className="absolute bottom-[15%] right-[8%] opacity-10 transform rotate-12">
        <MapPin className="h-24 w-24 text-amber-800" strokeWidth={1} />
      </div>
      <div className="absolute top-[20%] right-[10%] opacity-10 transform rotate-6">
        <Glasses className="h-20 w-20 text-amber-800" strokeWidth={1} />
      </div>
      <div className="absolute bottom-[25%] left-[7%] opacity-10 transform -rotate-6">
        <BookOpen className="h-28 w-28 text-amber-800" strokeWidth={1} />
      </div>
      
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 relative z-10">
        {!selectedChallenge ? (
          <div className="flex flex-col gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md border border-amber-200 w-full">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-serif font-bold text-[#403E43] mb-2">The Case Files</h2>
                <p className="text-[#8A898C] italic">Select a document to transcribe from Sherlock's archives</p>
              </div>
              <ChallengeSelector 
                challenges={challenges}
                onSelect={handleChallengeSelect} 
              />
            </div>
            
            <div className="w-full">
              <GlobalLeaderboard />
            </div>
          </div>
        ) : !completedStats ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md border border-amber-200">
            <TypingInterface 
              challenge={selectedChallenge}
              onComplete={handleChallengeComplete}
              onReset={handleReset}
              className="animate-fade-in"
            />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="results-card w-full max-w-xl mb-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-amber-200">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-amber-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-[#403E43]">
                  {selectedChallenge.level === 'challenge' ? 'Challenge Complete!' : 'Case Closed!'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center bg-[#221F26] text-white rounded-lg p-4">
                  <p className="text-amber-300 text-sm mb-1">Deduction Speed</p>
                  <p className="text-4xl font-medium">{completedStats.wpm} <span className="text-sm font-normal text-amber-200">WPM</span></p>
                </div>
                
                <div className="text-center bg-[#221F26] text-white rounded-lg p-4">
                  <p className="text-amber-300 text-sm mb-1">Accuracy</p>
                  <p className="text-4xl font-medium">{completedStats.accuracy}%</p>
                </div>
                
                <div className="text-center border border-green-200 bg-green-50 rounded-lg p-4">
                  <p className="text-green-700 text-sm mb-1">Evidence Collected</p>
                  <p className="text-2xl font-medium text-green-600">{completedStats.correctChars}</p>
                </div>
                
                <div className="text-center border border-red-200 bg-red-50 rounded-lg p-4">
                  <p className="text-red-700 text-sm mb-1">Mistakes Made</p>
                  <p className="text-2xl font-medium text-red-600">{completedStats.incorrectChars}</p>
                </div>
              </div>
              
              {selectedChallenge.level === 'challenge' && !playerName && (
                <HighScoreForm 
                  stats={completedStats}
                  challengeId={selectedChallenge.id}
                  onSave={handleSaveScore}
                />
              )}
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-800 hover:bg-amber-50"
                  onClick={() => {
                    setCompletedStats(null);
                  }}
                >
                  Re-examine Evidence
                </Button>
                
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleReset}
                >
                  New Investigation
                </Button>
              </div>
            </div>
            
            {selectedChallenge.level === 'challenge' && highScores.length > 0 && (
              <div className="w-full max-w-xl mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-purple-200">
                <HighScoresList scores={highScores} title="Challenge Leaderboard" />
              </div>
            )}
            
            <div className="text-center text-[#8A898C] text-sm">
              <p className="italic">"The world is full of obvious things which nobody by any chance ever observes."</p>
              <p className="mt-2">Keep practicing to improve your investigative typing skills!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
