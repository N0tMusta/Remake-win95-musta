
import React from 'react';

const FreeCell: React.FC = () => {
  return (
    <div className="freecell-game h-full flex flex-col p-4">
      <div className="win95-inset bg-green-800 flex-1 flex flex-col items-center justify-center p-4">
        <div className="win95-window p-4 bg-win95-gray">
          <h2 className="text-xl mb-4 font-bold">FreeCell</h2>
          <p className="mb-4">This game is not yet implemented.</p>
          <p className="mb-4">FreeCell is a solitaire card game played with a standard 52-card deck. All cards are dealt face-up, and the goal is to build up four foundation piles in ascending suit sequence from Ace to King.</p>
          <p>Unlike standard solitaire, almost all FreeCell games are winnable with the right strategy.</p>
          <div className="flex justify-center mt-4">
            <button className="win95-button px-4 py-2">Coming Soon!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCell;
