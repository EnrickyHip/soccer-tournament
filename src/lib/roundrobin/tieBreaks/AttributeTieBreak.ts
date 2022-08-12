import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

export class AttributeTieBreak implements TieBreak {
  private attribute: SortableAttribute;

  constructor(attribute: SortableAttribute) {
    this.attribute = attribute;
  }

  getAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam): [number, number] => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}
