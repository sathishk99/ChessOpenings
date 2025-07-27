'use client';

import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useState, useEffect } from 'react';

// Define the Move and Variant interfaces
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
  currentMoveIndex: number;
  onMoveChange: (index: number) => void;
}

// Define the Arrow interface for custom arrows
interface ChessboardArrow {
  startSquare: string;
  endSquare: string;
  color: string;
}

export default function ChessBoardComponent({ variant, currentMoveIndex, onMoveChange }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [arrows, setArrows] = useState<ChessboardArrow[]>([]);

  // Effect to update the board when the variant or move index changes
  useEffect(() => {
    const newGame = new Chess();
    let currentLastMove: { from: string; to: string } | null = null;

    for (let i = 0; i <= currentMoveIndex; i++) {
      if (variant.moves[i]) {
        const move = newGame.move(variant.moves[i].san, { strict: false });
        if (move) {
          currentLastMove = { from: move.from, to: move.to };
        }
      }
    }

    setPosition(newGame.fen());

    // Set an arrow for the last move
    if (currentLastMove) {
      setArrows([{
        startSquare: currentLastMove.from,
        endSquare: currentLastMove.to,
        color: 'rgb(0, 150, 0)' // Green arrow
      }]);
    } else {
      setArrows([]); // Clear arrows if there are no moves
    }
  }, [variant, currentMoveIndex]);

  // Options for the Chessboard component
  const chessboardOptions = {
    position: position,
    id: 'chess-board',
    arrows: arrows,
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Chessboard options={chessboardOptions} />
    </div>
  );
}