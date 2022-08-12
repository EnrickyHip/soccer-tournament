import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

export class CustomTieBreaker implements TieBreak {
  getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];

  constructor(getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number]) {
    this.getAttributes = getAttributes;
  }
}
