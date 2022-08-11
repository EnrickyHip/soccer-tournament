import { Match } from "../Match";
import { Goal } from "../types";
import { MatchProtocol, RoundRobinTeamProtocol, RoundRobinTournamentProtocol } from "../types/interfaces";
export declare class RoundRobinMatch extends Match {
    readonly id: number;
    readonly homeTeam: RoundRobinTeamProtocol;
    readonly awayTeam: RoundRobinTeamProtocol;
    protected readonly tournament: RoundRobinTournamentProtocol;
    constructor(homeTeam: RoundRobinTeamProtocol, awayTeam: RoundRobinTeamProtocol, id: number, tournament: RoundRobinTournamentProtocol);
    play(homeGoals: Goal, awayGoals: Goal): void;
    static create(teams: RoundRobinTeamProtocol[], id: number, tournament: RoundRobinTournamentProtocol): MatchProtocol;
}
