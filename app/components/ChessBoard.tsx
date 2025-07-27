'use client';

import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useState, useEffect } from 'react';
import { Variant } from '../types/chess';

// Define a reusable interface for arrows
export interface CustomArrow {
  startSquare: Square;
  endSquare: Square;
  color: string;
}

interface ChessBoardProps {
  variant: Variant;
  currentMoveIndex: number;
  customArrows: CustomArrow[]; // Accept custom arrows from parent
}


export default function ChessBoardComponent({ variant, currentMoveIndex, customArrows }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [lastMoveArrow, setLastMoveArrow] = useState<CustomArrow[]>([]);

  // Effect to update the board state and last move arrow
  useEffect(() => {
    const newGame = new Chess();
    let currentLastMove: { from: string; to: string } | null = null;

    // Apply moves up to the current index
    for (let i = 0; i <= currentMoveIndex; i++) {
      if (variant.moves[i]) {
        const moveResult = newGame.move(variant.moves[i].san, { strict: false });
        if (moveResult) {
          currentLastMove = { from: moveResult.from, to: moveResult.to };
        }
      }
    }

    setPosition(newGame.fen());
    setGame(newGame);

    // Set a green arrow for the most recent move
    if (currentLastMove) {
      setLastMoveArrow([{
        startSquare: currentLastMove.from as Square,
        endSquare: currentLastMove.to as Square,
        color: 'rgb(0, 150, 0)' // Green arrow for last move
      }]);
    } else {
      setLastMoveArrow([]); // Clear arrow if no moves are made
    }
  }, [variant, currentMoveIndex]);


  // Determine which arrows to display: variation arrows take precedence
  const arrowsToDisplay = customArrows.length > 0 ? customArrows : lastMoveArrow;
    // Options for the Chessboard component
  const chessboardOptions = {
    id:"chess-board",
    position:position,
    customArrows: {arrowsToDisplay},
    boardWidth:560,
  };

  return (
    <div className="w-full">
      {/* <Chessboard
        id="chess-board"
        position={position}
        customArrows={arrowsToDisplay}
        boardWidth={560}
      /> */}
      <Chessboard options={chessboardOptions} />

    </div>
  );
}