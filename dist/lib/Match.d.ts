import type Team from "./Team";
import { Goal } from "./types";
import { MatchProtocol, Score } from "./types/interfaces";
export declare class Match implements MatchProtocol {
    readonly id: number;
    readonly homeTeam: Team;
    readonly awayTeam: Team;
    isPlayed: boolean;
    score: Score;
    constructor(homeTeam: Team, awayTeam: Team, id: number);
    play(homeGoals: Goal, awayGoals: Goal): void;
    getTeamScore(team: Team): number[];
    static create(teams: Team[], id: number): MatchProtocol;
    static getMatchesBetween(team1: Team, team2: Team): MatchProtocol[];
    static headToHeadGoals(team1: Team, team2: Team): [number, number];
}
