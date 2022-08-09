import Team from "../Team";
import { Result } from "../types";
import { MatchProtocol, RoundRobinTeamProtocol } from "../types/interfaces";
export declare class RoundRobinTeam extends Team implements RoundRobinTeamProtocol {
    wins: number;
    draws: number;
    losses: number;
    goals: number;
    counterGoals: number;
    private _position;
    get points(): number;
    get goalDifference(): number;
    get percentage(): number;
    get lastMatches(): MatchProtocol[];
    get lastResults(): Result[];
    get position(): number;
    setPosition(position: number): void;
    playMatch(match: MatchProtocol): void;
    private calculatePoints;
    private calculateMatch;
    private resetValues;
}
