'use client';

import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useState, useEffect } from 'react';

// Define the Move and Variant interfaces based on the user's provided code
interface Move {
  san: string;
}

interface Variant {
  name: string;
  eco: string;
  description: string;
  moves: Move[];
  isMainLine: boolean;
}

interface ChessBoardProps {
  variant: Variant;
  currentMoveIndex: number; // Now controlled by parent
  onMoveChange: (index: number) => void; // Callback to update parent's move index
}

export default function ChessBoardComponent({ variant, currentMoveIndex, onMoveChange }: ChessBoardProps) {
  // Initialize Chess.js game instance
  const [game, setGame] = useState(new Chess());
  // State to hold the current FEN position for the chessboard
  const [position, setPosition] = useState(game.fen());
  const [lastMoveSquares, setLastMoveSquares] = useState<{from?: string, to?: string}>({});

  // Effect to reset the board and update position based on currentMoveIndex from parent
  useEffect(() => {
    const newGame = new Chess();
    setGame(newGame);

    let lastMove: {from: string, to: string} | null = null;
    for (let i = 0; i <= currentMoveIndex; i++) {
      if (variant.moves[i]) {
        const move = newGame.move(variant.moves[i].san, { sloppy: true });
        if (move) {
          lastMove = { from: move.from, to: move.to };
        }
      }
    }
    setPosition(newGame.fen());
    if (lastMove) {
      setLastMoveSquares(lastMove);
    } else {
      setLastMoveSquares({});
    }
  }, [variant, currentMoveIndex]); // Depend on variant and currentMoveIndex

  /**
   * Resets the chessboard to the initial position by setting move index to -1.
   */
  const resetBoard = () => {
    onMoveChange(-1); // Inform parent to reset move index
  };

  /**
   * Advances the board to the next move in the variant sequence.
   */
  const nextMove = () => {
    // Check if there are more moves to play
    if (currentMoveIndex < variant.moves.length - 1) {
      onMoveChange(currentMoveIndex + 1); // Inform parent to advance move index
    }
  };

  /**
   * Reverts the board to the previous move in the variant sequence.
   */
  const prevMove = () => {
    // Check if there are previous moves to revert to
    if (currentMoveIndex > -1) { 
      onMoveChange(currentMoveIndex - 1); // Inform parent to revert move index
    }
  };

  // Highlight style for last move squares
  const highlightStyle = {
    background: 'radial-gradient(circle, #ffe066 60%, transparent 100%)',
    borderRadius: '50%',
  };
  
  // Highlight style specifically for the *last* square of the last move
  const lastSquareHighlightStyle = {
    backgroundColor: 'rgba(255, 0, 0, 0.4)', // A red highlight
    borderRadius: '50%', // Optional: for a circular highlight
  };

  // Prepare custom square styles for highlighting last move and the last square
  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (lastMoveSquares.from) {
    customSquareStyles[lastMoveSquares.from] = highlightStyle;
  }
  // Apply the specific last square highlight to the 'to' square
  if (lastMoveSquares.to) {
    customSquareStyles[lastMoveSquares.to] = lastSquareHighlightStyle;
  }

  // Options object for the Chessboard component
  const chessboardOptions = {
    position: position, // The current FEN string
    id: 'chess-board', // A unique ID for the chessboard
    squareStyles: customSquareStyles, // Pass the custom square styles here
    // If you want to allow dragging pieces, you would add an onPieceDrop handler here.
    // For example: onPieceDrop={onDrop}
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="w-full max-w-sm aspect-square">
        <Chessboard options={chessboardOptions} 
        />
      </div>
      
      <div className="flex space-x-4 mt-4">
        <button
          onClick={resetBoard}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          Reset
        </button>
        <button
          onClick={prevMove}
          disabled={currentMoveIndex <= -1}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextMove}
          disabled={currentMoveIndex >= variant.moves.length - 1}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="text-center mt-4 p-4 bg-white rounded-lg shadow-inner w-full max-w-md">
        <p className="text-xl font-bold text-gray-900">{variant.name}</p>
        <p className="text-base text-gray-700 mt-1">ECO: {variant.eco}</p>
        {variant.isMainLine && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1 font-medium">
            Main Line
          </span>
        )}
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{variant.description}</p>
      </div>
    </div>
  );
}