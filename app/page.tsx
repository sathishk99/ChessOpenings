'use client';

import { useState, useEffect } from 'react';
import ChessBoardComponent, { CustomArrow } from './components/ChessBoard';
import MovesList from './components/MovesList';
import VariantInfo from './components/VariantInfo';
import { openingsData } from './data/openings';
import { Opening, Variant } from './types/chess';
import { FaStepBackward, FaBackward, FaPlay, FaForward, FaStepForward } from 'react-icons/fa';
import { Chess } from 'chess.js';

// Pre-defined, distinct colors for variation arrows
const VARIATION_COLORS = ['#fde047', '#6ee7b7', '#f87171', '#93c5fd'];

export default function Home() {
  const [selectedOpening, setSelectedOpening] = useState<Opening>(openingsData[0].openings[0]);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(openingsData[0].openings[0].variants.find(v => v.isMainLine) || openingsData[0].openings[0].variants[0]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [variationArrows, setVariationArrows] = useState<CustomArrow[]>([]);

  const allOpenings = openingsData.flatMap(category => category.openings);

  // This effect hook is the core of the new interaction model
  useEffect(() => {
    // Find the last move index that is common to all variants of an opening
    const findCommonAncestorIndex = () => {
      const { variants } = selectedOpening;
      if (variants.length <= 1) return -1; // No variations to compare

      let commonIndex = -1;
      const firstVariantMoves = variants[0].moves;

      for (let i = 0; i < firstVariantMoves.length; i++) {
        const moveSan = firstVariantMoves[i].san;
        // Check if this move SAN exists at the same position in all other variants
        if (variants.slice(1).every(v => v.moves[i]?.san === moveSan)) {
          commonIndex = i;
        } else {
          break; // Point of divergence found
        }
      }
      return commonIndex;
    };

    const commonAncestorIndex = findCommonAncestorIndex();

    // If the user has navigated to the divergence point, generate and show variation arrows
    if (currentMoveIndex === commonAncestorIndex && selectedOpening.variants.length > 1) {
      const tempGame = new Chess();
      // Replay the common moves to get the correct board state
      for (let i = 0; i <= commonAncestorIndex; i++) {
        tempGame.move(selectedOpening.variants[0].moves[i].san);
      }

      // For each variant, find the next move and create a colored arrow for it
      const arrows = selectedOpening.variants.map((variant, index) => {
        const nextMoveSan = variant.moves[commonAncestorIndex + 1]?.san;
        if (!nextMoveSan) return null;

        // Use a temporary game instance to validate and get move details
        const move = tempGame.move(nextMoveSan, { strict: false });
        tempGame.undo(); // IMPORTANT: Undo the move so the board state is correct for the next iteration

        if (move) {
          return {
            startSquare: move.from,
            endSquare: move.to,
            color: VARIATION_COLORS[index % VARIATION_COLORS.length],
          };
        }
        return null;
      }).filter((arrow): arrow is CustomArrow => arrow !== null); // Filter out any nulls

      setVariationArrows(arrows);
    } else {
      // If not at a decision point, clear the variation arrows
      setVariationArrows([]);
    }
  }, [currentMoveIndex, selectedOpening]);


  const handleOpeningChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const openingId = e.target.value;
    const foundOpening = allOpenings.find(o => o.id === openingId);
    if (foundOpening) {
      setSelectedOpening(foundOpening);
      // Automatically select the main line variant as the default
      const mainLine = foundOpening.variants.find(v => v.isMainLine) || foundOpening.variants[0];
      setSelectedVariant(mainLine);
      setCurrentMoveIndex(-1);
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = e.target.value;
    const foundVariant = selectedOpening.variants.find(v => v.id === variantId);
    if (foundVariant) {
      setSelectedVariant(foundVariant);
      // When user picks a variation, auto-advance to the next move in that line
      const nextMoveIndex = currentMoveIndex + 1;
      if (nextMoveIndex < foundVariant.moves.length) {
         setCurrentMoveIndex(nextMoveIndex);
      }
    }
  };

  const handleMoveClick = (index: number) => setCurrentMoveIndex(index);
  const goToStart = () => setCurrentMoveIndex(-1);
  const goToPrev = () => setCurrentMoveIndex(idx => Math.max(idx - 1, -1));
  const goToEnd = () => setCurrentMoveIndex(selectedVariant.moves.length - 1);

  const goToNext = () => {
      // Prevent moving forward if at a decision point, guiding user to select a variant
      if (variationArrows.length > 0) return;
      setCurrentMoveIndex(idx => Math.min(idx + 1, selectedVariant.moves.length - 1));
  };
  
  const isAtDecisionPoint = variationArrows.length > 0;

  return (
    <main className="flex w-full h-screen bg-neutral-800 p-4 gap-4">
      {/* Left Column: Chessboard */}
      <div className="flex flex-col justify-center items-center w-2/3">
        <div className="w-full max-w-lg aspect-square">
          <ChessBoardComponent
            variant={selectedVariant}
            currentMoveIndex={currentMoveIndex}
            customArrows={variationArrows}
          />
        </div>
      </div>

      {/* Right Column: Analysis Panel */}
      <div className="flex flex-col w-1/3 bg-neutral-900 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Analysis</h2>
        
        {/* Dropdowns */}
        <div className="flex gap-4 mb-4">
          <select
            value={selectedOpening.id}
            onChange={handleOpeningChange}
            className="w-full p-2 rounded border bg-neutral-700 text-white border-neutral-600"
          >
            {openingsData.map(category => (
              <optgroup key={category.id} label={category.name}>
                {category.openings.map(opening => (
                  <option key={opening.id} value={opening.id}>{opening.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            value={selectedVariant.id}
            onChange={handleVariantChange}
            className="w-full p-2 rounded border bg-neutral-700 text-white border-neutral-600"
            // The dropdown is now central to the interaction at decision points
          >
            {selectedOpening.variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} {variant.isMainLine ? '(Main Line)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Info and Moves */}
        <div className="flex-grow overflow-y-auto pr-2">
            <VariantInfo 
              variant={selectedVariant} 
              opening={selectedOpening}
              // Pass all variants to info panel only at a decision point
              allVariants={isAtDecisionPoint ? selectedOpening.variants : []}
            />
            <MovesList
                variant={selectedVariant}
                currentMoveIndex={currentMoveIndex}
                onMoveClick={handleMoveClick}
            />
        </div>
        
        {/* Move Controls */}
        <div className="flex justify-center space-x-2 mt-4 p-2 rounded-lg bg-neutral-800">
            <button onClick={goToStart} aria-label="First" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl"><FaStepBackward /></button>
            <button onClick={goToPrev} aria-label="Previous" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl"><FaBackward /></button>
            <button aria-label="Play" disabled className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 text-gray-500 text-2xl cursor-default"><FaPlay /></button>
            {/* Disable 'Next' button at decision points to encourage using the dropdown */}
            <button onClick={goToNext} aria-label="Next" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl disabled:opacity-50 disabled:cursor-not-allowed" disabled={isAtDecisionPoint}><FaForward /></button>
            <button onClick={goToEnd} aria-label="Last" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl"><FaStepForward /></button>
        </div>
      </div>
    </main>
  );
}