import { OpeningCategory, Opening, Variant } from '../types/chess';

export const openingsData: OpeningCategory[] = [
  {
    id: 'gambits',
    name: 'Gambits',
    description: 'Aggressive openings where material is sacrificed for rapid development and attacking chances',
    openings: [
      {
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
              {
                san: 'd4',
                comment: 'White controls the center with the queen pawn',
                fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1'
              },
              {
                san: 'd5',
                comment: 'Black mirrors, also controlling the center',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2'
              },
              {
                san: 'c4',
                comment: 'The Queen\'s Gambit! White offers the c-pawn to disrupt Black\'s center',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2'
              },
              {
                san: 'dxc4',
                comment: 'Black accepts the gambit, capturing the pawn',
                fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
              },
              {
                san: 'e3',
                comment: 'White prepares to recapture the pawn with the bishop',
                fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/4P3/PP3PPP/RNBQKBNR b KQkq - 0 3'
              },
              {
                san: 'Nf6',
                comment: 'Black develops the knight, attacking the center',
                fen: 'rnbqkb1r/ppp1pppp/5n2/8/2pP4/4P3/PP3PPP/RNBQKBNR w KQkq - 1 4'
              },
              {
                san: 'Bxc4',
                comment: 'White recaptures the pawn and develops the bishop',
                fen: 'rnbqkb1r/ppp1pppp/5n2/8/2BP4/4P3/PP3PPP/RNBQK1NR b KQkq - 0 4'
              }
            ]
          },
          {
            id: 'queens-gambit-declined',
            name: "Queen's Gambit Declined",
            eco: 'D06',
            description: "Black declines the gambit, maintaining the central pawn structure.",
            isMainLine: false,
            moves: [
              {
                san: 'd4',
                comment: 'White controls the center with the queen pawn',
                fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1'
              },
              {
                san: 'd5',
                comment: 'Black mirrors, also controlling the center',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2'
              },
              {
                san: 'c4',
                comment: 'The Queen\'s Gambit! White offers the c-pawn',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2'
              },
              {
                san: 'e6',
                comment: 'Black declines the gambit, supporting the d5 pawn',
                fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
              },
              {
                san: 'Nc3',
                comment: 'White develops the knight, putting pressure on d5',
                fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3'
              },
              {
                san: 'Nf6',
                comment: 'Black develops the knight to a natural square',
                fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4'
              }
            ]
          },
          {
            id: 'slav-defense',
            name: "Slav Defense",
            eco: 'D10',
            description: "A solid defense where Black supports the d5 pawn with c6.",
            isMainLine: false,
            moves: [
              {
                san: 'd4',
                comment: 'White controls the center',
                fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1'
              },
              {
                san: 'd5',
                comment: 'Black mirrors in the center',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2'
              },
              {
                san: 'c4',
                comment: 'The Queen\'s Gambit offer',
                fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2'
              },
              {
                san: 'c6',
                comment: 'The Slav Defense! Black supports d5 with the c-pawn',
                fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
              },
              {
                san: 'Nf3',
                comment: 'White develops the knight to a natural square',
                fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3'
              },
              {
                san: 'Nf6',
                comment: 'Black develops the knight, keeping the position solid',
                fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4'
              }
            ]
          }
        ]
      },
      {
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
              {
                san: 'e4',
                comment: 'White opens with the king\'s pawn',
                fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
              },
              {
                san: 'e5',
                comment: 'Black mirrors the move',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'
              },
              {
                san: 'f4',
                comment: 'The King\'s Gambit! White offers the f-pawn for rapid development',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2'
              },
              {
                san: 'exf4',
                comment: 'Black accepts the gambit pawn',
                fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3'
              },
              {
                san: 'Nf3',
                comment: 'White develops the knight, preparing to castle',
                fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3'
              }
            ]
          },
          {
            id: 'kings-gambit-declined',
            name: "King's Gambit Declined",
            eco: 'C30',
            description: "Black refuses the gambit, maintaining a solid position.",
            isMainLine: false,
            moves: [
              {
                san: 'e4',
                comment: 'White opens with the king\'s pawn',
                fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
              },
              {
                san: 'e5',
                comment: 'Black mirrors the move',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'
              },
              {
                san: 'f4',
                comment: 'The King\'s Gambit offer',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2'
              },
              {
                san: 'Bc5',
                comment: 'Black declines the gambit, developing the bishop',
                fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3'
              },
              {
                san: 'Nf3',
                comment: 'White develops the knight',
                fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/5N2/PPPP2PP/RNBQKB1R b KQkq - 2 3'
              }
            ]
          }
        ]
      },
      {
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
              {
                san: 'e4',
                comment: 'White opens with the king pawn',
                fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
              },
              {
                san: 'e5',
                comment: 'Black mirrors',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'
              },
              {
                san: 'Nf3',
                comment: 'White develops the knight',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
              },
              {
                san: 'Nc6',
                comment: 'Black develops the knight',
                fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'
              },
              {
                san: 'Bc4',
                comment: 'White develops the bishop to an active square',
                fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3'
              },
              {
                san: 'Bc5',
                comment: 'Black mirrors the bishop development',
                fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
              },
              {
                san: 'b4',
                comment: 'The Evans Gambit! White sacrifices a pawn for rapid development',
                fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4'
              },
              {
                san: 'Bxb4',
                comment: 'Black accepts the gambit',
                fen: 'r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5'
              }
            ]
          }
        ]
      }
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