import { SortableAttribute } from "../../types";
import { TieBreakGetAttributes } from "../../types/types";
import { TieBreak } from "./TieBreak";

export class AttributeTieBreak extends TieBreak {
  private _attribute: SortableAttribute;

  constructor(attribute: SortableAttribute, reverse = false) {
    super();
    this._attribute = attribute;
    this._reverse = reverse;
  }

  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    return [team1[this._attribute], team2[this._attribute]];
  };
}
