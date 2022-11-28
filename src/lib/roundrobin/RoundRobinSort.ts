import { SortableAttribute } from "../types";
import { SortProtocol } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { TieBreak } from "./tieBreaks/TieBreak";

export default class RoundRobinSort implements SortProtocol {
  private tieBreaks: TieBreak[];
  private _currentAttribute: SortableAttribute = "position";

  constructor(tieBreaks: TieBreak[]) {
    this.tieBreaks = tieBreaks;
  }

  public get currentAttribute(): SortableAttribute {
    return this._currentAttribute;
  }

  public customSort(attribute = this._currentAttribute, reverse = false) {
    this._currentAttribute = attribute;
    const direction = reverse ? -1 : 1;

    return (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
      if (attribute !== "position") {
        if (team1[this._currentAttribute] < team2[this._currentAttribute]) return 1 * direction;
        if (team1[this._currentAttribute] > team2[this._currentAttribute]) return -1 * direction;
      }

      if (team1.position > team2.position) return 1 * direction;
      if (team1.position < team2.position) return -1 * direction;
      return 0;
    };
  }

  public positionSort() {
    return (team1: RoundRobinTeam, team2: RoundRobinTeam): number => {
      if (team1.points < team2.points) return 1; // 1 changes the position
      if (team1.points > team2.points) return -1; // -1 still the same

      for (const tieBreak of this.tieBreaks) {
        const [team1attribute, team2attribute] = tieBreak.getAttributes(team1, team2);
        const direction = tieBreak.reverse ? -1 : 1;
        if (team1attribute < team2attribute) return 1 * direction;
        if (team1attribute > team2attribute) return -1 * direction;
      }

      if (team1.name > team2.name) return 1;
      if (team1.name < team2.name) return -1;
      return 0;
    };
  }
}
