import type Match from "../Match";
import type RoundRobinTeam from "../RoundRobinTeam";
import Team from "../Team";

/* criará um novo tipo com todas as chaves que forem do tipo passado como parâmetro
[Key in keyof Object] -> faz uma iteração entre todas as chaves do objeto
Object[Key] extends Type ? Key : never -> é uma condição ternária, se o valor da chave for do tipo informado,
a chave será incluida com um tipo literal, que será uma string com o nome da chave ex:{ key: "key"}, caso não, a chave não é incluida.
  [keyof Object] no final retorna apenas os tipos dos VALORES (nesse caso são tipos literais).
  */
type KeysType<Obj, Type> = {
  [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];

export type Round = Match[];
export type Goal = number | null;
export type Result = "win" | "draw" | "lose";
export type SortableAttribute = KeysType<RoundRobinTeam, number>;

export interface MatchesObject {
  [id: number]: MatchProtocol;
}

export interface TieBreak {
  getAttributes: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => [number, number];
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
  matches: MatchProtocol[];
}

export interface ClassificationProtocol {
  get(team: RoundRobinTeamProtocol): keyof ClassificationOptions | "first" | null;
}

export interface RoundRobinTeamProtocol extends Team {
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  counterGoals: number;
  points: number;
  position: number;
  goalDifference: number;
  percentage: number;
  lastMatches: MatchProtocol[];
  lastResults: Result[];
  setPosition(index: number): void;
}

export interface MatchProtocol {
  readonly id: number;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  isPlayed: boolean;
  score: Score;
  play(homeGoals: Goal, awayGoals: Goal): void;
  getTeamScore(team: Team): number[];
}

export interface SortProtocol {
  sortAttribute: SortableAttribute;
  customSort(
    attribute?: SortableAttribute,
    sentDirection?: 1 | -1,
  ): (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => number;
  positionSort(team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol): 0 | 1 | -1;
}
