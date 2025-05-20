import { Rank, Suit } from '../../types/poker';

export const rankName: Record<Rank, string> = {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  T: '10',
  J: 'jack',
  Q: 'queen',
  K: 'king',
  A: 'ace',
};

export const suitName: Record<Suit, string> = {
  c: 'clubs',
  d: 'diamonds',
  h: 'hearts',
  s: 'spades',
};

export const ranks: Rank[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];
export const suits: Suit[] = ['c', 'd', 'h', 's'];
