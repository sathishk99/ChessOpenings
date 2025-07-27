'use client';

import { Opening, Variant } from '../types/chess';

interface VariantInfoProps {
  variant: Variant;
  opening: Opening;
}

export default function VariantInfo({ variant, opening }: VariantInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{variant.name}</h2>
          <p className="text-sm text-gray-600">{opening.name} • ECO: {variant.eco}</p>
        </div>
        {variant.isMainLine && (
          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
            Main Line
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Opening Description:</h4>
          <p className="text-sm text-gray-600">{opening.description}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Variant Description:</h4>
          <p className="text-sm text-gray-600">{variant.description}</p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Total Moves: {variant.moves.length}</span>
          <span>Category: {opening.category}</span>
        </div>
      </div>
    </div>
  );
}