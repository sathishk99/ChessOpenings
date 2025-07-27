import { OpeningCategory, Opening, Variant } from '../types/chess';
import { evansGambit } from './gambits/evans-gambit';
import { kingsGambit } from './gambits/kings-gambit';
import { queensGambit } from './gambits/queens-gambit';

export const openingsData: OpeningCategory[] = [
  {
    id: 'gambits',
    name: 'Gambits',
    description: 'Aggressive openings where material is sacrificed for rapid development and attacking chances',
    openings: [
      queensGambit,
      kingsGambit,
      evansGambit,
    ]
  }
];

// Helper functions for easy access
export const getAllOpenings = (): Opening[] => {
  return openingsData.flatMap(category => category.openings);
};

export const getAllVariants = (): Variant[] => {
  return getAllOpenings().flatMap(opening => opening.variants);
};

export const getOpeningById = (id: string): Opening | undefined => {
  return getAllOpenings().find(opening => opening.id === id);
};

export const getVariantById = (id: string): Variant | undefined => {
  return getAllVariants().find(variant => variant.id === id);
};