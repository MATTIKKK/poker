import { Card } from "../../types/poker";
import { rankName, suitName } from "./constants";

export function cardImg(c: Card) {
  return `/cards/${rankName[c.rank]}_of_${suitName[c.suit]}.png`;
}