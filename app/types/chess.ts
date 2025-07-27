export interface Move {
  san: string;
  comment?: string;
  fen: string;
}

export interface Variant {
  id: string;
  name: string;
  eco: string;
  moves: Move[];
  description: string;
  isMainLine: boolean;
}

export interface Opening {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: Variant[];
  eco?: string;
}

export interface OpeningCategory {
  id: string;
  name: string;
  description: string;
  openings: Opening[];
}

import { Square } from 'chess.js';

export interface CustomArrow {
  startSquare: Square;
  endSquare: Square;
  color: string;
}