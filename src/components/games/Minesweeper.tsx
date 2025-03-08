
import React, { useState, useEffect } from 'react';

interface MinesweeperProps {}

type CellState = {
  revealed: boolean;
  hasMine: boolean;
  flagged: boolean;
  neighborMines: number;
};

const Minesweeper: React.FC<MinesweeperProps> = () => {
  const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [firstClick, setFirstClick] = useState(true);
  const [flagsCount, setFlagsCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Difficulty settings
  const difficultySettings = {
    beginner: { rows: 9, cols: 9, mines: 10 },
    intermediate: { rows: 16, cols: 16, mines: 40 },
    expert: { rows: 16, cols: 30, mines: 99 }
  };
  
  // Initialize game board
  const initializeBoard = () => {
    const { rows, cols } = difficultySettings[difficulty];
    const board = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        revealed: false,
        hasMine: false,
        flagged: false,
        neighborMines: 0
      }))
    );
    setGameBoard(board);
    setGameStatus('playing');
    setFirstClick(true);
    setFlagsCount(0);
    setTimer(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };
  
  // Place mines after first click to ensure first click is safe
  const placeMines = (board: CellState[][], clickRow: number, clickCol: number) => {
    const { rows, cols, mines } = difficultySettings[difficulty];
    let minesPlaced = 0;
    
    while (minesPlaced < mines) {
      const randRow = Math.floor(Math.random() * rows);
      const randCol = Math.floor(Math.random() * cols);
      
      // Don't place mine on first click or where a mine already exists
      if ((randRow !== clickRow || randCol !== clickCol) && !board[randRow][randCol].hasMine) {
        board[randRow][randCol].hasMine = true;
        minesPlaced++;
      }
    }
    
    // Calculate neighbor mines for each cell
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!board[i][j].hasMine) {
          let count = 0;
          
          // Check all 8 neighbors
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              
              const ni = i + di;
              const nj = j + dj;
              
              if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].hasMine) {
                count++;
              }
            }
          }
          
          board[i][j].neighborMines = count;
        }
      }
    }
    
    return [...board];
  };
  
  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing' || gameBoard[row][col].revealed || gameBoard[row][col].flagged) {
      return;
    }
    
    // Start timer on first click
    if (firstClick) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      
      // Place mines ensuring first click is safe
      const newBoard = placeMines([...gameBoard], row, col);
      setGameBoard(newBoard);
      setFirstClick(false);
    }
    
    const newBoard = [...gameBoard];
    
    // If clicked on a mine, game over
    if (newBoard[row][col].hasMine) {
      newBoard[row][col].revealed = true;
      setGameBoard(newBoard);
      endGame('lost');
      return;
    }
    
    // Recursively reveal empty cells
    revealCells(newBoard, row, col);
    setGameBoard(newBoard);
    
    // Check for win
    checkWinCondition(newBoard);
  };
  
  // Recursively reveal empty cells
  const revealCells = (board: CellState[][], row: number, col: number) => {
    const { rows, cols } = difficultySettings[difficulty];
    
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].revealed || board[row][col].flagged) {
      return;
    }
    
    board[row][col].revealed = true;
    
    // If cell has no neighboring mines, reveal all adjacent cells
    if (board[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          revealCells(board, row + i, col + j);
        }
      }
    }
  };
  
  // Handle right click (flag)
  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || gameBoard[row][col].revealed) {
      return;
    }
    
    const newBoard = [...gameBoard];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setGameBoard(newBoard);
    
    // Update flag count
    const newFlagsCount = newBoard.flat().filter(cell => cell.flagged).length;
    setFlagsCount(newFlagsCount);
  };
  
  // Check if player has won
  const checkWinCondition = (board: CellState[][]) => {
    const { rows, cols, mines } = difficultySettings[difficulty];
    
    // Count revealed cells
    const revealedCount = board.flat().filter(cell => cell.revealed).length;
    
    // If all non-mine cells are revealed, player wins
    if (revealedCount === (rows * cols) - mines) {
      endGame('won');
    }
  };
  
  // End the game
  const handleRestart = () => {
    initializeBoard();
  };
  
  const endGame = (status: 'won' | 'lost') => {
    setGameStatus(status);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Reveal all mines when game ends
    if (status === 'lost') {
      const newBoard = [...gameBoard];
      newBoard.forEach(row => {
        row.forEach(cell => {
          if (cell.hasMine) {
            cell.revealed = true;
          }
        });
      });
      setGameBoard(newBoard);
    }
  };
  
  // Change difficulty
  const changeDifficulty = (newDifficulty: 'beginner' | 'intermediate' | 'expert') => {
    setDifficulty(newDifficulty);
    initializeBoard();
  };
  
  // Initialize board on mount and when difficulty changes
  useEffect(() => {
    initializeBoard();
    
    // Cleanup
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [difficulty]);
  
  // Get color for cell number
  const getNumberColor = (num: number) => {
    const colors = [
      'text-blue-600',     // 1
      'text-green-600',    // 2
      'text-red-600',      // 3
      'text-blue-900',     // 4
      'text-red-800',      // 5
      'text-teal-600',     // 6
      'text-black',        // 7
      'text-gray-600'      // 8
    ];
    return num > 0 && num <= 8 ? colors[num - 1] : '';
  };
  
  const { rows, cols, mines } = difficultySettings[difficulty];
  
  return (
    <div className="win95-minesweeper h-full flex flex-col p-2">
      <div className="win95-menu-bar mb-2">
        <div className="flex space-x-4">
          <div className="dropdown relative">
            <button className="win95-button px-2 py-0.5">Game</button>
            <div className="dropdown-content win95-menu absolute hidden left-0 top-full bg-win95-gray z-10 shadow-md">
              <button className="win95-menu-item w-full text-left px-2 py-0.5 hover:bg-win95-blue hover:text-white" onClick={handleRestart}>
                New Game
              </button>
              <div className="win95-menu-separator border-t border-win95-border-dark border-b border-win95-border-light my-1"></div>
              <button 
                className={`win95-menu-item w-full text-left px-2 py-0.5 hover:bg-win95-blue hover:text-white ${difficulty === 'beginner' ? 'font-bold' : ''}`}
                onClick={() => changeDifficulty('beginner')}
              >
                Beginner
              </button>
              <button 
                className={`win95-menu-item w-full text-left px-2 py-0.5 hover:bg-win95-blue hover:text-white ${difficulty === 'intermediate' ? 'font-bold' : ''}`}
                onClick={() => changeDifficulty('intermediate')}
              >
                Intermediate
              </button>
              <button 
                className={`win95-menu-item w-full text-left px-2 py-0.5 hover:bg-win95-blue hover:text-white ${difficulty === 'expert' ? 'font-bold' : ''}`}
                onClick={() => changeDifficulty('expert')}
              >
                Expert
              </button>
            </div>
          </div>
          <div className="dropdown relative">
            <button className="win95-button px-2 py-0.5">Help</button>
          </div>
        </div>
      </div>
      
      <div className="win95-inset p-2 mb-2">
        <div className="flex justify-between items-center">
          <div className="win95-lcd bg-black px-2 py-1 text-red-600 font-mono">
            {mines - flagsCount}
          </div>
          <button 
            className="win95-button p-1"
            onClick={handleRestart}
          >
            {gameStatus === 'playing' ? '🙂' : gameStatus === 'won' ? '😎' : '😵'}
          </button>
          <div className="win95-lcd bg-black px-2 py-1 text-red-600 font-mono">
            {String(timer).padStart(3, '0')}
          </div>
        </div>
      </div>
      
      <div className="win95-inset flex-1 overflow-auto p-1 bg-win95-gray">
        <div 
          className="minesweeper-grid inline-grid gap-0"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 16px)`,
            gridTemplateRows: `repeat(${rows}, 16px)`
          }}
        >
          {gameBoard.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-4 h-4 flex items-center justify-center text-xs font-bold ${
                  cell.revealed 
                    ? 'bg-win95-gray' 
                    : 'win95-outset'
                } ${
                  cell.revealed && cell.hasMine ? 'bg-red-500' : ''
                } ${
                  getNumberColor(cell.neighborMines)
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
              >
                {cell.revealed 
                  ? cell.hasMine 
                    ? '💣' 
                    : cell.neighborMines > 0 
                      ? cell.neighborMines 
                      : ''
                  : cell.flagged 
                    ? '🚩' 
                    : ''}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
