'use client';

import { Opening } from '../types/chess';

interface OpeningsListProps {
  openings: Opening[];
  selectedOpening: Opening;
  onOpeningSelect: (opening: Opening) => void;
}

export default function OpeningsList({ 
  openings, 
  selectedOpening, 
  onOpeningSelect 
}: OpeningsListProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Chess Openings</h3>
      <div className="space-y-2">
        {openings.map((opening) => (
          <div
            key={opening.id}
            onClick={() => onOpeningSelect(opening)}
            className={`p-3 rounded cursor-pointer transition-colors ${
              opening.id === selectedOpening.id
                ? 'bg-blue-100 border-l-4 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold">{opening.name}</div>
            <div className="text-sm text-gray-600">ECO: {opening.eco}</div>
          </div>
        ))}
      </div>
    </div>
  );
}