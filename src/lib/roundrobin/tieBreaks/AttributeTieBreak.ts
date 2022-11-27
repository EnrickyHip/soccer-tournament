import { SortableAttribute } from "../../types";
import { TieBreakGetAttributes } from "../../types/types";
import { TieBreak } from "./TieBreak";

export class AttributeTieBreak extends TieBreak {
  private attribute: SortableAttribute;

  constructor(attribute: SortableAttribute, reverse = false) {
    super();
    this.attribute = attribute;
    this._reverse = reverse;
  }

  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}
