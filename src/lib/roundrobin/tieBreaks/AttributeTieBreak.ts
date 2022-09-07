import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

export class AttributeTieBreak implements TieBreak {
  private attribute: SortableAttribute;
  public reverse: boolean;

  constructor(attribute: SortableAttribute, reverse = false) {
    this.attribute = attribute;
    this.reverse = reverse;
  }

  getAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam): [number, number] => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}
