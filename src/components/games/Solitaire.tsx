
import React, { useState, useEffect } from 'react';

const Solitaire: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  
  // Card suits and values
  const suits = ['♥', '♦', '♣', '♠'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  // Card data structure
  type Card = {
    suit: string;
    value: string;
    color: string;
    faceUp: boolean;
    id: string;
  };
  
  // Game state
  const [deck, setDeck] = useState<Card[]>([]);
  const [drawPile, setDrawPile] = useState<Card[]>([]);
  const [wastePile, setWastePile] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>(Array(4).fill([]));
  const [tableaus, setTableaus] = useState<Card[][]>(Array(7).fill([]));
  const [selectedCard, setSelectedCard] = useState<{card: Card, source: string, index: number} | null>(null);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Initialize game
  const initializeGame = () => {
    // Create and shuffle deck
    const newDeck: Card[] = [];
    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({
          suit,
          value,
          color: (suit === '♥' || suit === '♦') ? 'red' : 'black',
          faceUp: false,
          id: `${value}-${suit}`
        });
      });
    });
    
    // Shuffle the deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    // Set up tableaus
    const newTableaus: Card[][] = Array(7).fill([]).map(() => []);
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = newDeck.pop();
        if (card) {
          // Turn up the top card
          if (j === i) {
            card.faceUp = true;
          }
          newTableaus[i].push(card);
        }
      }
    }
    
    // Set up draw pile
    setDeck([]);
    setDrawPile(newDeck);
    setWastePile([]);
    setFoundations(Array(4).fill([]));
    setTableaus(newTableaus);
    setSelectedCard(null);
    setMoves(0);
    setTimer(0);
    
    // Start timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    setTimerInterval(interval);
    setGameStarted(true);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle draw pile click
  const handleDrawPileClick = () => {
    if (drawPile.length > 0) {
      const card = drawPile[drawPile.length - 1];
      card.faceUp = true;
      
      setWastePile([...wastePile, card]);
      setDrawPile(drawPile.slice(0, -1));
      setMoves(prev => prev + 1);
    } else if (wastePile.length > 0) {
      // Reset draw pile when empty
      const newDrawPile = [...wastePile].reverse();
      newDrawPile.forEach(card => card.faceUp = false);
      
      setDrawPile(newDrawPile);
      setWastePile([]);
      setMoves(prev => prev + 1);
    }
  };
  
  // Component cleanup
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);
  
  return (
    <div className="solitaire-game h-full flex flex-col p-2">
      <div className="win95-menu-bar mb-2">
        <div className="flex space-x-4">
          <div className="dropdown relative">
            <button className="win95-button px-2 py-0.5">Game</button>
            <div className="dropdown-content win95-menu absolute hidden left-0 top-full bg-win95-gray z-10 shadow-md">
              <button className="win95-menu-item w-full text-left px-2 py-0.5 hover:bg-win95-blue hover:text-white" onClick={initializeGame}>
                New Game
              </button>
            </div>
          </div>
          <div className="dropdown relative">
            <button className="win95-button px-2 py-0.5">Help</button>
          </div>
        </div>
      </div>
      
      <div className="win95-inset p-2 mb-2 bg-win95-gray">
        <div className="flex justify-between items-center">
          <div className="text-sm">Moves: {moves}</div>
          <div className="text-sm">Time: {formatTime(timer)}</div>
          <button 
            className="win95-button px-2 py-0.5"
            onClick={initializeGame}
          >
            New Game
          </button>
        </div>
      </div>
      
      {!gameStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="win95-inset bg-win95-gray p-4 mb-4">
            <h2 className="text-xl mb-2">Welcome to Solitaire</h2>
            <p className="mb-4">Try to move all cards to the foundation piles.</p>
            <button 
              className="win95-button w-full px-4 py-2"
              onClick={initializeGame}
            >
              Start New Game
            </button>
          </div>
        </div>
      ) : (
        <div className="win95-inset flex-1 overflow-auto p-2 bg-green-800">
          <div className="solitaire-layout h-full">
            <div className="flex space-x-4 mb-4">
              {/* Draw and waste piles */}
              <div className="win95-outset w-20 h-28 flex items-center justify-center">
                {drawPile.length > 0 ? (
                  <div 
                    className="card card-back w-16 h-24 bg-blue-700 rounded win95-outset cursor-pointer"
                    onClick={handleDrawPileClick}
                  />
                ) : (
                  <div 
                    className="card-outline w-16 h-24 rounded border-2 border-white border-dashed"
                    onClick={handleDrawPileClick}
                  />
                )}
              </div>
              
              <div className="win95-outset w-20 h-28 flex items-center justify-center">
                {wastePile.length > 0 ? (
                  <div className="card w-16 h-24 bg-white rounded win95-outset flex items-center justify-center">
                    <span className={`text-2xl ${wastePile[wastePile.length - 1].color === 'red' ? 'text-red-600' : 'text-black'}`}>
                      {wastePile[wastePile.length - 1].value}
                      {wastePile[wastePile.length - 1].suit}
                    </span>
                  </div>
                ) : (
                  <div className="card-outline w-16 h-24 rounded border-2 border-white border-dashed" />
                )}
              </div>
              
              {/* Foundations */}
              {foundations.map((foundation, i) => (
                <div key={`foundation-${i}`} className="win95-outset w-20 h-28 flex items-center justify-center">
                  <div className="card-outline w-16 h-24 rounded border-2 border-white border-dashed">
                    {/* Add foundation display here */}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tableaus */}
            <div className="flex space-x-2">
              {tableaus.map((tableau, i) => (
                <div key={`tableau-${i}`} className="tableau win95-outset w-20 min-h-40 p-1 flex flex-col items-center">
                  {tableau.length > 0 ? (
                    tableau.map((card, j) => (
                      <div 
                        key={card.id}
                        className={`card relative ${card.faceUp ? 'bg-white' : 'bg-blue-700'} w-16 h-8 ${j > 0 ? '-mt-6' : ''} rounded win95-outset flex items-center justify-center`}
                        style={{ zIndex: j }}
                      >
                        {card.faceUp && (
                          <span className={`${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                            {card.value}{card.suit}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="card-outline w-16 h-24 rounded border-2 border-white border-dashed" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solitaire;
