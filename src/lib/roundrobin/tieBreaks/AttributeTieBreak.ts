import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";

export class AttributeTieBreak implements TieBreak {
  private attribute: SortableAttribute;
  public reverse: boolean;

  constructor(attribute: SortableAttribute, reverse = false) {
    this.attribute = attribute;
    this.reverse = reverse;
  }

  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}
