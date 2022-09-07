import { Match } from "../Match";
import { RoundRobinTeam } from "../roundrobin";
import Team from "../Team";
import { Goal, SortableAttribute } from "./types";

export interface MatchesObject {
  [id: number]: Match;
}

export interface TieBreak {
  getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
  reverse: boolean;
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

export interface Tournament {
  teams: Team[];
  matches: Match[];
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
