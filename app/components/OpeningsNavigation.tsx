'use client';

import { useState } from 'react';
import { OpeningCategory, Opening, Variant } from '../types/chess';

interface OpeningsNavigationProps {
  categories: OpeningCategory[];
  selectedVariant: Variant;
  onVariantSelect: (variant: Variant, opening: Opening) => void;
}

export default function OpeningsNavigation({ 
  categories, 
  selectedVariant, 
  onVariantSelect 
}: OpeningsNavigationProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['gambits']));
  const [expandedOpenings, setExpandedOpenings] = useState<Set<string>>(new Set(['queens-gambit']));

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleOpening = (openingId: string) => {
    const newExpanded = new Set(expandedOpenings);
    if (newExpanded.has(openingId)) {
      newExpanded.delete(openingId);
    } else {
      newExpanded.add(openingId);
    }
    setExpandedOpenings(newExpanded);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Chess Openings</h3>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <button
            onClick={() => toggleCategory(category.id)}
            className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded"
          >
            <span className="mr-2">
              {expandedCategories.has(category.id) ? '▼' : '▶'}
            </span>
            <span className="font-semibold text-gray-800">{category.name}</span>
          </button>
          
          {expandedCategories.has(category.id) && (
            <div className="ml-4 mt-2">
              {category.openings.map((opening) => (
                <div key={opening.id} className="mb-2">
                  <button
                    onClick={() => toggleOpening(opening.id)}
                    className="flex items-center w-full text-left p-2 hover:bg-gray-50 rounded"
                  >
                    <span className="mr-2">
                      {expandedOpenings.has(opening.id) ? '▼' : '▶'}
                    </span>
                    <span className="font-medium text-gray-700">{opening.name}</span>
                  </button>
                  
                  {expandedOpenings.has(opening.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {opening.variants.map((variant) => (
                        <div
                          key={variant.id}
                          onClick={() => onVariantSelect(variant, opening)}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            variant.id === selectedVariant.id
                              ? 'bg-blue-100 border-l-4 border-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{variant.name}</span>
                            {variant.isMainLine && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Main
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ECO: {variant.eco}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}