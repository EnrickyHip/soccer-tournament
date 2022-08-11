import Team from "../Team";
import { Goal, Result, SortableAttribute } from "./types";
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
    get(team: RoundRobinTeamProtocol): string | null;
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
    customSort(attribute?: SortableAttribute, sentDirection?: 1 | -1): (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => number;
    positionSort(team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol): 0 | 1 | -1;
}
export interface RoundRobinTournamentProtocol extends Tournament {
    sortTeams(attribute?: SortableAttribute, direction?: 1 | -1): void;
}
