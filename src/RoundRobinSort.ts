import type { RoundRobinTeamProtocol, SortableAttribute, SortProtocol, TieBreak } from "./types";

export default class RoundRobinSort implements SortProtocol {
  private tieBreaks: TieBreak[];
  public sortAttribute: SortableAttribute = "position";

  constructor(tieBreaks: TieBreak[]) {
    this.tieBreaks = tieBreaks;
  }

  public customSort = (attribute?: SortableAttribute, sentDirection?: 1 | -1) => {
    if (attribute) this.sortAttribute = attribute;
    const direction = sentDirection || 1;

    return (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => {
      if (attribute !== "position") {
        if (team1[this.sortAttribute] < team2[this.sortAttribute]) return 1 * direction;
        if (team1[this.sortAttribute] > team2[this.sortAttribute]) return -1 * direction;
      }

      if (team1.position > team2.position) return 1 * direction;
      if (team1.position < team2.position) return -1 * direction;
      return 0;
    };
  };

  public positionSort = (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => {
    if (team1.points > team2.points) return -1; // -1 still the same
    if (team1.points < team2.points) return 1; // 1 changes the position

    for (const tieBreaker of this.tieBreaks) {
      const [team1attribute, team2attribute] = tieBreaker.getAttributes(team1, team2);
      if (team1attribute < team2attribute) return 1;
      if (team1attribute > team2attribute) return -1;
    }

    if (team1.name > team2.name) return 1;
    if (team1.name < team2.name) return -1;
    return 0;
  };
}
