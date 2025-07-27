import { Opening } from '../../types/chess';

export const kingsGambit: Opening = {
  id: 'kings-gambit',
  name: "King's Gambit",
  category: 'gambits',
  description: "An aggressive romantic opening where White sacrifices a pawn for rapid development and attacking chances.",
  variants: [
    {
      id: 'kings-gambit-accepted',
      name: "King's Gambit Accepted",
      eco: 'C33',
      description: "Black accepts the gambit, leading to sharp tactical complications.",
      isMainLine: true,
      moves: [
        { san: 'e4', comment: "White opens with the king's pawn", fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
        { san: 'e5', comment: 'Black mirrors the move', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2' },
        { san: 'f4', comment: "The King's Gambit! White offers the f-pawn for rapid development", fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2' },
        { san: 'exf4', comment: 'Black accepts the gambit pawn', fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3' },
        { san: 'Nf3', comment: 'White develops the knight, preparing to castle', fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3' }
      ]
    },
    {
      id: 'kings-gambit-declined',
      name: "King's Gambit Declined",
      eco: 'C30',
      description: "Black refuses the gambit, maintaining a solid position.",
      isMainLine: false,
      moves: [
        { san: 'e4', comment: "White opens with the king's pawn", fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
        { san: 'e5', comment: 'Black mirrors the move', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2' },
        { san: 'f4', comment: "The King's Gambit offer", fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2' },
        { san: 'Bc5', comment: 'Black declines the gambit, developing the bishop', fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3' },
        { san: 'Nf3', comment: 'White develops the knight', fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/5N2/PPPP2PP/RNBQKB1R b KQkq - 2 3' }
      ]
    }
  ]
};