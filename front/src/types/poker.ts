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
  players: PlayerState[]; 
  street: Street;        
  pot: number;           
  toAct: string;         
  lastAggressor: string; 
  dealerSeat: number;
  smallBlind: number;
  bigBlind: number;
}

export interface PlayerState {
  id: string;
  seat: number;
  stack: number;       
  bet: number;         
  hole: Card[];
  folded: boolean;
  allIn: boolean;
}

export interface DealState {
    board: Card[];
    players: any[];
    street: Street;
  }
