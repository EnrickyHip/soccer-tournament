import type Team from "./Team";
import { Goal } from "./types";
import { Score, Tournament } from "./types/interfaces";
export declare abstract class Match {
    readonly id: number;
    readonly homeTeam: Team;
    readonly awayTeam: Team;
    isPlayed: boolean;
    score: Score;
    protected readonly tournament?: Tournament;
    constructor(homeTeam: Team, awayTeam: Team, id: number, tournament?: Tournament);
    abstract play(homeGoals: Goal, awayGoals: Goal): void;
    getTeamScore(team: Team): [number, number];
    static getMatchesBetween<MatchType extends Match>(team1: Team<MatchType>, team2: Team<MatchType>): MatchType[];
    static headToHeadGoals(team1: Team, team2: Team): [number, number];
}