'use client';

import { Variant } from '../types/chess';

interface MovesListProps {
  variant: Variant;
  currentMoveIndex: number;
  onMoveClick: (index: number) => void;
}

export default function MovesList({ variant, currentMoveIndex, onMoveClick }: MovesListProps) {
  // Helper to render moves inline with numbers
  const moves: React.ReactNode[] = [];
  for (let i = 0; i < variant.moves.length; i += 2) {
    const moveNum = Math.floor(i / 2) + 1;
    // White move
    moves.push(
      <span key={`num-${i}`} className="text-gray-700 font-mono mr-1">{moveNum}.</span>
    );
    moves.push(
      <span
        key={`w-${i}`}
        className={`cursor-pointer mr-2 ${
          currentMoveIndex === i ? 'font-bold underline text-blue-700' : 'hover:underline'
        }`}
        onClick={() => onMoveClick(i)}
      >
        {variant.moves[i]?.san}
      </span>
    );
    // Black move
    if (variant.moves[i + 1]) {
      moves.push(
        <span
          key={`b-${i + 1}`}
          className={`cursor-pointer mr-2 ${
            currentMoveIndex === i + 1 ? 'font-bold underline text-blue-700' : 'hover:underline'
          }`}
          onClick={() => onMoveClick(i + 1)}
        >
          {variant.moves[i + 1]?.san}
        </span>
      );
    }
  }

  // Current move description
  const currentComment =
    currentMoveIndex >= 0 && variant.moves[currentMoveIndex]?.comment
      ? variant.moves[currentMoveIndex].comment
      : '';

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Moves</h3>
      <div className="flex flex-wrap items-center font-mono text-base leading-relaxed">
        {moves}
      </div>
      {currentComment && (
        <div className="mt-4 p-2 bg-blue-50 rounded text-blue-900 text-sm">
          {currentComment}
        </div>
      )}
    </div>
  );
}