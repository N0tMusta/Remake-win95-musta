
import React from 'react';

const Hearts: React.FC = () => {
  return (
    <div className="hearts-game h-full flex flex-col p-4">
      <div className="win95-inset bg-green-800 flex-1 flex flex-col items-center justify-center p-4">
        <div className="win95-window p-4 bg-win95-gray">
          <h2 className="text-xl mb-4 font-bold">Hearts</h2>
          <p className="mb-4">This game is not yet implemented.</p>
          <p className="mb-4">Hearts is a trick-taking card game where the goal is to avoid taking points, particularly the Queen of Spades (13 points) and any Hearts (1 point each).</p>
          <p>In this classic Windows game, you play against three computer opponents.</p>
          <div className="flex justify-center mt-4">
            <button className="win95-button px-4 py-2">Coming Soon!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hearts;
