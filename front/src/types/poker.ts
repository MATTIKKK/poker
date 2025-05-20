// ранги: 2-9, T (ten), J, Q, K, A
export type Rank = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'T'|'J'|'Q'|'K'|'A';
// clubs, diamonds, hearts, spades
export type Suit = 'c' | 'd' | 'h' | 's';

export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface GameState {
  players: Player[]; 
  street: Street;        
  pot: number;           
  toAct: string;         
  lastAggressor: string; 
  dealerSeat: number;
  smallBlind: number;
  bigBlind: number;
}

export interface Player {
  id: string;
  gameId: string;
  name: string;
  stack: number;
  rating: number;
  level: string;
  seat: number;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  avatarUrl?: string;
  /**
   * Two cards dealt to the player.
   */
  hole: Card[];
}


export interface DealState {
    board: Card[];
    players: any[];
    street: Street;
  }
