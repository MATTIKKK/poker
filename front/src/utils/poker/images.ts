import { Card } from "../../types/poker";
import { rankName, suitName } from "./constants";

export function cardImg(c: Card) {
  return `/cards/${rankName[c.rank]}_of_${suitName[c.suit]}.png`;
}

export function generateRandomAvatar(name?: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || Math.random().toString(36).substring(2)}`;
}
