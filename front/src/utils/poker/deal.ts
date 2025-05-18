import { Street } from "../../types/poker";
import { newDeck, shuffle } from "./deck";

export function openCount(street: Street) {
  switch (street) {
    case 'preflop':   return 0; 
    case 'flop':      return 3;  
    case 'turn':      return 4;  
    case 'river':     return 5; 
    case 'showdown':  return 5; 
  }
}

export function deal(statePlayers: any) {
  let deck = shuffle(newDeck());

  const players = statePlayers.map((p: any) => ({
    ...p,
    hole: [deck.pop()!, deck.pop()!],
  }));

  const board = [
    deck.pop()!,
    deck.pop()!,
    deck.pop()!,
    deck.pop()!,
    deck.pop()!,
  ];

  return { players, board, deck };
}
