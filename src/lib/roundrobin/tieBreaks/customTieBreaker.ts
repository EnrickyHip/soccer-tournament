import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

export class CustomTieBreaker implements TieBreak {
  getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
  reverse: boolean;

  constructor(getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number], reverse = false) {
    this.getAttributes = getAttributes;
    this.reverse = reverse;
  }
}
