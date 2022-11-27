import { Match } from "../Match";
import { RoundRobinTeam } from "../roundrobin";
import { Goal, SortableAttribute } from "./types";

export interface MatchesObject<MatchType extends Match> {
  [id: number]: MatchType;
}

export interface MinMax {
  min: number;
  max: number;
}

export interface Score {
  homeTeam: Goal;
  awayTeam: Goal;
}

export interface ClassificationOptions {
  [key: string]: MinMax;
}

export interface ClassificationProtocol {
  get(): ClassificationOptions;
  getTeamClassification(team: RoundRobinTeam): string | null;
}

export interface SortProtocol {
  currentAttribute: SortableAttribute;
  positionSort(): (team1: RoundRobinTeam, team2: RoundRobinTeam) => number;
  customSort(
    attribute?: SortableAttribute,
    reverse?: boolean,
  ): (team1: RoundRobinTeam, team2: RoundRobinTeam) => number;
}
