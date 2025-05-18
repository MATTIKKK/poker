import { Card } from "../../types/poker";
import { ranks, suits } from "./constants";

/* 52 карточки в порядке ♣♦♥♠ 2…A */
export function newDeck(): Card[] {
  return suits.flatMap((s) => ranks.map((r) => ({ rank: r, suit: s })));
}

/* Фишер–Йетс */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
