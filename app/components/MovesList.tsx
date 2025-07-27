'use client';

import { Variant } from '../types/chess';

interface MovesListProps {
  variant: Variant;
  currentMoveIndex: number;
  onMoveClick: (index: number) => void;
}

export default function MovesList({ variant, currentMoveIndex, onMoveClick }: MovesListProps) {
  const moves: React.ReactNode[] = [];
  for (let i = 0; i < variant.moves.length; i += 2) {
    const moveNum = Math.floor(i / 2) + 1;
    // Render the move number
    moves.push(<span key={`num-${i}`} className="text-neutral-400 mr-2">{moveNum}.</span>);
    
    // Render White's move
    moves.push(
      <span
        key={`w-${i}`}
        onClick={() => onMoveClick(i)}
        className={`cursor-pointer rounded px-1 ${
          currentMoveIndex === i ? 'bg-yellow-600 text-white' : 'hover:bg-neutral-700'
        }`}
      >
        {variant.moves[i]?.san}
      </span>
    );

    // Render Black's move if it exists
    if (variant.moves[i + 1]) {
      moves.push(
        <span
          key={`b-${i + 1}`}
          onClick={() => onMoveClick(i + 1)}
          className={`cursor-pointer rounded px-1 ml-2 ${
            currentMoveIndex === i + 1 ? 'bg-yellow-600 text-white' : 'hover:bg-neutral-700'
          }`}
        >
          {variant.moves[i + 1]?.san}
        </span>
      );
    }
  }

  const currentComment = currentMoveIndex >= 0 && variant.moves[currentMoveIndex]?.comment;

  return (
    <div className="text-white mt-4">
      <div className="flex flex-wrap items-center font-mono text-lg leading-loose">
        {moves}
      </div>
      {currentComment && (
        <div className="mt-4 p-3 bg-neutral-800 rounded text-neutral-300 text-base">
          {currentComment}
        </div>
      )}
    </div>
  );
}