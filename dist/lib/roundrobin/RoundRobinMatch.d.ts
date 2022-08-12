import { Match } from "../Match";
import { Goal } from "../types";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { RoundRobinTournament } from "./RoundRobinTournament";
export declare class RoundRobinMatch extends Match {
    readonly id: number;
    readonly homeTeam: RoundRobinTeam;
    readonly awayTeam: RoundRobinTeam;
    protected readonly tournament: RoundRobinTournament;
    constructor(homeTeam: RoundRobinTeam, awayTeam: RoundRobinTeam, id: number, tournament: RoundRobinTournament);
    play(homeGoals: Goal, awayGoals: Goal): void;
    static create(teams: RoundRobinTeam[], id: number, tournament: RoundRobinTournament): RoundRobinMatch;
}
