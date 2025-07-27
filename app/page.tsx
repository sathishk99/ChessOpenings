'use client';

import { useState } from 'react';
import ChessBoardComponent from './components/ChessBoard';
import MovesList from './components/MovesList';
import VariantInfo from './components/VariantInfo';
import { openingsData } from './data/openings';
import { Opening, Variant } from './types/chess';
import { FaStepBackward, FaBackward, FaPlay, FaForward, FaStepForward } from 'react-icons/fa';

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    openingsData[0].openings[0].variants[0]
  );
  const [selectedOpening, setSelectedOpening] = useState<Opening>(
    openingsData[0].openings[0]
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  // Flatten all openings to easily find them by ID
  const allOpenings = openingsData.flatMap(category => category.openings);

  // Dropdown handlers
  const handleOpeningChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const openingId = e.target.value;
    const foundOpening = allOpenings.find(o => o.id === openingId);
    if (foundOpening) {
      setSelectedOpening(foundOpening);
      setSelectedVariant(foundOpening.variants[0]);
      setCurrentMoveIndex(-1);
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = e.target.value;
    const foundVariant = selectedOpening.variants.find(v => v.id === variantId);
    if (foundVariant) {
      setSelectedVariant(foundVariant);
      setCurrentMoveIndex(-1);
    }
  };

  const handleMoveClick = (index: number) => setCurrentMoveIndex(index);

  // Move navigation handlers
  const goToStart = () => setCurrentMoveIndex(-1);
  const goToPrev = () => setCurrentMoveIndex(idx => Math.max(idx - 1, -1));
  const goToNext = () => setCurrentMoveIndex(idx => Math.min(idx + 1, selectedVariant.moves.length - 1));
  const goToEnd = () => setCurrentMoveIndex(selectedVariant.moves.length - 1);

  return (
    <main className="flex w-full h-screen bg-neutral-800 p-4 gap-4">
      {/* Left Column: Chessboard and Player Info */}
      <div className="flex flex-col justify-center items-center w-2/3">
        {/* Placeholder for Top Player */}
        <div className="w-full max-w-lg mb-2">
          <p className="text-lg font-bold text-white">Teimour Radjabov</p>
        </div>

        <div className="w-full max-w-lg aspect-square">
          <ChessBoardComponent
            variant={selectedVariant}
            currentMoveIndex={currentMoveIndex}
            onMoveChange={setCurrentMoveIndex}
          />
        </div>

        {/* Placeholder for Bottom Player */}
        <div className="w-full max-w-lg mt-2">
          <p className="text-lg font-bold text-white">Nikolas Theodorou</p>
        </div>
      </div>

      {/* Right Column: Analysis Panel */}
      <div className="flex flex-col w-1/3 bg-neutral-900 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Analysis</h2>
        
        {/* Openings and Variants Dropdowns */}
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
          >
            {selectedOpening.variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} {variant.isMainLine ? '(Main Line)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Variant Info and Moves List */}
        <div className="flex-grow overflow-y-auto pr-2">
            <VariantInfo variant={selectedVariant} opening={selectedOpening} />
            <MovesList
                variant={selectedVariant}
                currentMoveIndex={currentMoveIndex}
                onMoveClick={handleMoveClick}
            />
        </div>
        
        {/* Move Controls at the bottom */}
        <div className="flex justify-center space-x-2 mt-4 p-2 rounded-lg bg-neutral-800">
          <button onClick={goToStart} aria-label="First" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl">
            <FaStepBackward />
          </button>
          <button onClick={goToPrev} aria-label="Previous" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl">
            <FaBackward />
          </button>
          <button aria-label="Play" disabled className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 text-gray-500 text-2xl cursor-default">
            <FaPlay />
          </button>
          <button onClick={goToNext} aria-label="Next" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl">
            <FaForward />
          </button>
          <button onClick={goToEnd} aria-label="Last" className="w-16 h-12 flex items-center justify-center rounded bg-neutral-700 hover:bg-neutral-600 text-gray-300 text-2xl">
            <FaStepForward />
          </button>
        </div>
      </div>
    </main>
  );
}