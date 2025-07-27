import { Opening } from '../../types/chess';

export const queensGambit: Opening = {
  id: 'queens-gambit',
  name: "Queen's Gambit",
  category: 'gambits',
  description: "One of the oldest and most respected chess openings. White offers a pawn to gain control of the center and accelerate development.",
  variants: [
    {
      id: 'queens-gambit-accepted',
      name: "Queen's Gambit Accepted",
      eco: 'D20',
      description: "Black accepts the gambit pawn, leading to sharp tactical play.",
      isMainLine: true,
      moves: [
        { san: 'd4', comment: 'White controls the center with the queen pawn', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1' },
        { san: 'd5', comment: 'Black mirrors, also controlling the center', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2' },
        { san: 'c4', comment: "The Queen's Gambit! White offers the c-pawn to disrupt Black's center", fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2' },
        { san: 'dxc4', comment: 'Black accepts the gambit, capturing the pawn', fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3' },
        { san: 'e3', comment: 'White prepares to recapture the pawn with the bishop', fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/4P3/PP3PPP/RNBQKBNR b KQkq - 0 3' },
        { san: 'Nf6', comment: 'Black develops the knight, attacking the center', fen: 'rnbqkb1r/ppp1pppp/5n2/8/2pP4/4P3/PP3PPP/RNBQKBNR w KQkq - 1 4' },
        { san: 'Bxc4', comment: 'White recaptures the pawn and develops the bishop', fen: 'rnbqkb1r/ppp1pppp/5n2/8/2BP4/4P3/PP3PPP/RNBQK1NR b KQkq - 0 4' }
      ]
    },
    {
      id: 'queens-gambit-declined',
      name: "Queen's Gambit Declined",
      eco: 'D06',
      description: "Black declines the gambit, maintaining the central pawn structure.",
      isMainLine: false,
      moves: [
        { san: 'd4', comment: 'White controls the center with the queen pawn', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1' },
        { san: 'd5', comment: 'Black mirrors, also controlling the center', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2' },
        { san: 'c4', comment: "The Queen's Gambit! White offers the c-pawn", fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2' },
        { san: 'e6', comment: 'Black declines the gambit, supporting the d5 pawn', fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3' },
        { san: 'Nc3', comment: 'White develops the knight, putting pressure on d5', fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3' },
        { san: 'Nf6', comment: 'Black develops the knight to a natural square', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4' }
      ]
    },
    {
      id: 'slav-defense',
      name: "Slav Defense",
      eco: 'D10',
      description: "A solid defense where Black supports the d5 pawn with c6.",
      isMainLine: false,
      moves: [
        { san: 'd4', comment: 'White controls the center', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1' },
        { san: 'd5', comment: 'Black mirrors in the center', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2' },
        { san: 'c4', comment: "The Queen's Gambit offer", fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2' },
        { san: 'c6', comment: 'The Slav Defense! Black supports d5 with the c-pawn', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3' },
        { san: 'Nf3', comment: 'White develops the knight to a natural square', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3' },
        { san: 'Nf6', comment: 'Black develops the knight, keeping the position solid', fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4' }
      ]
    }
  ]
};