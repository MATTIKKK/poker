// ранги: 2-9, T (ten), J, Q, K, A
export type Rank = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'T'|'J'|'Q'|'K'|'A';
// масти shorthand: clubs, diamonds, hearts, spades
export type Suit = 'c' | 'd' | 'h' | 's';

export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface Card {
  rank: Rank;
  suit: Suit;
}

/* пока лишь минимальный «игрок»;
   позже добавим ставки, действия и т.д. */
export interface Player {
  id: string;
  name: string;
  seat: number;
  avatarUrl: string;
  hole: Card[];         // ← две личные карты
}
