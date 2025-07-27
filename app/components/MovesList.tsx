'use client';

import { Variant } from '../types/chess';

interface MovesListProps {
  variant: Variant;
  currentMoveIndex: number;
  onMoveClick: (index: number) => void;
}

export default function MovesList({ variant, currentMoveIndex, onMoveClick }: MovesListProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Moves</h3>
      <div className="space-y-2">
        {variant.moves.map((move, index) => (
          <div
            key={index}
            onClick={() => onMoveClick(index)}
            className={`p-2 rounded cursor-pointer transition-colors ${
              index === currentMoveIndex
                ? 'bg-blue-100 border-l-4 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono font-semibold text-blue-600">
                {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'} {move.san}
              </span>
            </div>
            {move.comment && (
              <p className="text-sm text-gray-600 mt-1">{move.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}