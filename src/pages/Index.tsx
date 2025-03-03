
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChallengeSelector from '@/components/ChallengeSelector';
import TypingInterface from '@/components/TypingInterface';
import { typingChallenges } from '@/utils/textUtils';
import { Challenge, TypingStats } from '@/types';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedStats, setCompletedStats] = useState<TypingStats | null>(null);
  
  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCompletedStats(null);
  };
  
  const handleChallengeComplete = (stats: TypingStats) => {
    setCompletedStats(stats);
  };
  
  const handleReset = () => {
    setSelectedChallenge(null);
    setCompletedStats(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {!selectedChallenge ? (
          <ChallengeSelector 
            challenges={typingChallenges} 
            onSelect={handleChallengeSelect} 
          />
        ) : !completedStats ? (
          <TypingInterface 
            challenge={selectedChallenge}
            onComplete={handleChallengeComplete}
            onReset={handleReset}
            className="animate-fade-in"
          />
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="results-card w-full max-w-xl mb-8">
              <h2 className="text-2xl font-medium mb-6 text-center">
                Challenge Complete!
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Typing Speed</p>
                  <p className="text-4xl font-medium">{completedStats.wpm} <span className="text-sm font-normal text-muted-foreground">WPM</span></p>
                </div>
                
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Accuracy</p>
                  <p className="text-4xl font-medium">{completedStats.accuracy}%</p>
                </div>
                
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Correct Characters</p>
                  <p className="text-2xl font-medium text-typing-correct">{completedStats.correctChars}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Incorrect Characters</p>
                  <p className="text-2xl font-medium text-typing-incorrect">{completedStats.incorrectChars}</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCompletedStats(null);
                  }}
                >
                  Try Again
                </Button>
                
                <Button
                  onClick={handleReset}
                >
                  New Challenge
                </Button>
              </div>
            </div>
            
            <div className="text-center text-muted-foreground text-sm">
              <p>Keep practicing to improve your typing speed and accuracy!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
