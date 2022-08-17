import { SortableAttribute } from "../types";
import { SortProtocol, TieBreak } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";

export default class RoundRobinSort implements SortProtocol {
  private tieBreaks: TieBreak[];
  public currentAttribute: SortableAttribute = "position";

  constructor(tieBreaks: TieBreak[]) {
    this.tieBreaks = tieBreaks;
  }

  public customSort = (attribute: SortableAttribute, sentDirection?: 1 | -1) => {
    this.currentAttribute = attribute;
    const direction = sentDirection || 1;

    return (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
      if (attribute !== "position") {
        if (team1[this.currentAttribute] < team2[this.currentAttribute]) return 1 * direction;
        if (team1[this.currentAttribute] > team2[this.currentAttribute]) return -1 * direction;
      }

      if (team1.position > team2.position) return 1 * direction;
      if (team1.position < team2.position) return -1 * direction;
      return 0;
    };
  };

  public positionSort = () => {
    return (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
      if (team1.points < team2.points) return 1; // 1 changes the position
      if (team1.points > team2.points) return -1; // -1 still the same

      for (const tieBreaker of this.tieBreaks) {
        const [team1attribute, team2attribute] = tieBreaker.getAttributes(team1, team2);
        if (team1attribute < team2attribute) return 1;
        if (team1attribute > team2attribute) return -1;
      }

      if (team1.name > team2.name) return 1;
      if (team1.name < team2.name) return -1;
      return 0;
    };
  };
}
