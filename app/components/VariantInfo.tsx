'use client';

import { Opening, Variant } from '../types/chess';

// Use the same color constants for consistency
const VARIATION_COLORS = ['#fde047', '#6ee7b7', '#f87171', '#93c5fd'];

interface VariantInfoProps {
  variant: Variant;
  opening: Opening;
  allVariants?: Variant[]; // Optional prop to pass all available variants
}

export default function VariantInfo({ variant, opening, allVariants = [] }: VariantInfoProps) {
  // If 'allVariants' has items, we are at a decision point. Display all choices.
  if (allVariants.length > 0) {
    return (
      <div className="bg-neutral-800 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Choose a Variation</h3>
        <p className="text-sm text-neutral-400 mb-4">
          The board shows the possible next moves, each with a colored arrow. Select a variation from the dropdown above to see its line.
        </p>
        <div className="space-y-3">
          {allVariants.map((v, index) => (
            <div 
              key={v.id} 
              className="p-3 rounded-lg bg-neutral-700/50" 
              // The colored border visually links this info to the arrow on the board
              style={{ borderLeft: `4px solid ${VARIATION_COLORS[index % VARIATION_COLORS.length]}`}}
            >
              <h4 className="font-semibold text-white">{v.name} {v.isMainLine ? <span className="text-xs text-green-400">(Main Line)</span> : ''}</h4>
              <p className="text-sm text-neutral-300 mt-1">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default view: Show information for the currently selected variant
  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow mb-4 text-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold">{variant.name}</h2>
          <p className="text-sm text-neutral-400">{opening.name} • ECO: {variant.eco}</p>
        </div>
        {variant.isMainLine && (
          <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
            Main Line
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-200 mb-1">Variant Description:</h4>
          <p className="text-sm text-neutral-300">{variant.description}</p>
        </div>
      </div>
    </div>
  );
}