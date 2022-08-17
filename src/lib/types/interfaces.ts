import { Match } from "../Match";
import { RoundRobinTeam } from "../roundrobin";
import Team from "../Team";
import { Goal, SortableAttribute } from "./types";

export interface MatchesObject {
  [id: number]: Match;
}

export interface TieBreak {
  getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
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
  get(team: RoundRobinTeam): string | null;
}

export interface SortProtocol {
  currentAttribute: SortableAttribute;
  positionSort(): (team1: RoundRobinTeam, team2: RoundRobinTeam) => 0 | 1 | -1;
  customSort(
    attribute?: SortableAttribute,
    sentDirection?: 1 | -1,
  ): (team1: RoundRobinTeam, team2: RoundRobinTeam) => number;
}
