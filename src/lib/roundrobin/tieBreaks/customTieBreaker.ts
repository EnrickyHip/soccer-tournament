import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";

export class CustomTieBreaker implements TieBreak {
  public getAttributes: TieBreakGetAttributes;
  public reverse: boolean;

  constructor(getAttributes: TieBreakGetAttributes, reverse = false) {
    this.getAttributes = getAttributes;
    this.reverse = reverse;
  }
}
