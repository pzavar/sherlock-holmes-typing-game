
import React from 'react';
import { HighScore } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface HighScoresListProps {
  scores: HighScore[];
  title?: string;
}

const HighScoresList: React.FC<HighScoresListProps> = ({
  scores,
  title = "High Scores"
}) => {
  if (scores.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No scores yet. Be the first to submit a score!
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-center mb-3">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-purple-200 text-sm text-purple-800">
              <th className="px-2 py-2 text-left">#</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-right">WPM</th>
              <th className="px-2 py-2 text-right">Accuracy</th>
              <th className="px-2 py-2 text-right">When</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id} className="border-b border-purple-100">
                <td className="px-2 py-2 text-left">{index + 1}</td>
                <td className="px-2 py-2 text-left font-medium">{score.playerName}</td>
                <td className="px-2 py-2 text-right">{score.wpm}</td>
                <td className="px-2 py-2 text-right">{score.accuracy}%</td>
                <td className="px-2 py-2 text-right text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(score.date), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighScoresList;
