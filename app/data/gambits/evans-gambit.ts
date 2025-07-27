import { Opening } from '../../types/chess';

export const evansGambit: Opening = {
  id: 'evans-gambit',
  name: "Evans Gambit",
  category: 'gambits',
  description: "A sharp tactical opening arising from the Italian Game where White sacrifices a pawn for rapid development.",
  variants: [
    {
      id: 'evans-gambit-accepted',
      name: "Evans Gambit Accepted",
      eco: 'C51',
      description: "Black accepts the gambit pawn, leading to complex tactical play.",
      isMainLine: true,
      moves: [
        { san: 'e4', comment: 'White opens with the king pawn', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
        { san: 'e5', comment: 'Black mirrors', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2' },
        { san: 'Nf3', comment: 'White develops the knight', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2' },
        { san: 'Nc6', comment: 'Black develops the knight', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3' },
        { san: 'Bc4', comment: 'White develops the bishop to an active square', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3' },
        { san: 'Bc5', comment: 'Black mirrors the bishop development', fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4' },
        { san: 'b4', comment: 'The Evans Gambit! White sacrifices a pawn for rapid development', fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4' },
        { san: 'Bxb4', comment: 'Black accepts the gambit', fen: 'r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5' }
      ]
    }
  ]
};