'use client';

import { useState } from 'react';
import ChessBoardComponent from './components/ChessBoard';
import MovesList from './components/MovesList';
import VariantInfo from './components/VariantInfo';
import { openingsData } from './data/openings';
import { Opening, Variant, OpeningCategory } from './types/chess';
import { FaStepBackward, FaBackward, FaPlay, FaForward, FaStepForward } from 'react-icons/fa';

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    openingsData[0].openings[0].variants[0]
  );
  const [selectedOpening, setSelectedOpening] = useState<Opening>(
    openingsData[0].openings[0]
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  // Flatten all openings for dropdown
  const allOpenings: { opening: Opening; category: OpeningCategory }[] = [];
  openingsData.forEach(category => {
    category.openings.forEach(opening => {
      allOpenings.push({ opening, category });
    });
  });

  // Find selected opening's variants
  const variantOptions = selectedOpening.variants;

  // Dropdown handlers
  const handleOpeningChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const openingId = e.target.value;
    const found = allOpenings.find(o => o.opening.id === openingId);
    if (found) {
      setSelectedOpening(found.opening);
      setSelectedVariant(found.opening.variants[0]);
      setCurrentMoveIndex(-1);
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = e.target.value;
    const found = selectedOpening.variants.find(v => v.id === variantId);
    if (found) {
      setSelectedVariant(found);
      setCurrentMoveIndex(-1);
    }
  };

  const handleMoveClick = (index: number) => {
    setCurrentMoveIndex(index);
  };

  const handleVariantSelect = (variant: Variant, opening: Opening) => {
    setSelectedVariant(variant);
    setSelectedOpening(opening);
    setCurrentMoveIndex(-1);
  };

  // Move navigation handlers
  const goToStart = () => setCurrentMoveIndex(-1);
  const goToPrev = () => setCurrentMoveIndex(idx => Math.max(idx - 1, -1));
  const goToNext = () => setCurrentMoveIndex(idx => Math.min(idx + 1, selectedVariant.moves.length - 1));
  const goToEnd = () => setCurrentMoveIndex(selectedVariant.moves.length - 1);

  return (
    <>
      {/* Nav Bar */}
      <nav className="bg-white shadow mb-8">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-700">Chess Openings Explorer</span>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition">Openings</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition">Analysis</a>
          </div>
        </div>
      </nav>
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* <h1 className="text-3xl font-bold text-center mb-8">Chess Openings Explorer</h1> */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-8">
            {/* Openings Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Opening</label>
              <select
                value={selectedOpening.id}
                onChange={handleOpeningChange}
                className="w-64 p-2 rounded border"
              >
                {openingsData.map(category => (
                  <optgroup key={category.id} label={category.name}>
                    {category.openings.map(opening => (
                      <option key={opening.id} value={opening.id}>
                        {opening.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            {/* Variants Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Variation</label>
              <select
                value={selectedVariant.id}
                onChange={handleVariantChange}
                className="w-64 p-2 rounded border"
              >
                {variantOptions.map(variant => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} {variant.isMainLine ? '(Main Line)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col items-center">
                <ChessBoardComponent
                  variant={{
                    ...selectedVariant,
                    isMainLine: selectedVariant.isMainLine ?? false
                  }}
                  currentMoveIndex={currentMoveIndex}
                  onMoveChange={setCurrentMoveIndex}
                />
                {/* Move controls below the board */}
                <div className="flex space-x-4 mt-4 bg-neutral-900 p-2 rounded-lg">
                  <button
                    onClick={goToStart}
                    className="w-12 h-12 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xl"
                    aria-label="First"
                  >
                    {/* |< */}
                    <FaStepBackward />
                  </button>
                  <button
                    onClick={goToPrev}
                    className="w-12 h-12 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xl"
                    aria-label="Previous"
                  >
                    {/* < */}
                    <FaBackward />
                  </button>
                  <button
                    onClick={goToStart}
                    className="w-12 h-12 flex items-center justify-center rounded bg-neutral-800 text-gray-400 text-xl cursor-default"
                    aria-label="Play"
                    disabled
                  >
                    {/* Play icon (disabled, for visual match) */}
                    <FaPlay />
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-12 h-12 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xl"
                    aria-label="Next"
                  >
                    {/* > */}
                    <FaForward />
                  </button>
                  <button
                    onClick={goToEnd}
                    className="w-12 h-12 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-xl"
                    aria-label="Last"
                  >
                    {/* >| */}
                    <FaStepForward />
                  </button>
                </div>
              </div>
              <VariantInfo variant={selectedVariant} opening={selectedOpening} />
            </div>
            {/* Moves Panel */}
            <div className="lg:col-span-1">
              <MovesList
                variant={selectedVariant}
                currentMoveIndex={currentMoveIndex}
                onMoveClick={handleMoveClick}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}