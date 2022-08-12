import { Match } from "../Match";
import Team from "../Team";
import { Result } from "../types";
export declare class RoundRobinTeam extends Team {
    wins: number;
    draws: number;
    losses: number;
    goals: number;
    counterGoals: number;
    private _position;
    get points(): number;
    get goalDifference(): number;
    get percentage(): number;
    get lastMatches(): Match[];
    get lastResults(): Result[];
    get position(): number;
    setPosition(position: number): void;
    playMatch(match: Match): void;
    private calculatePoints;
    private calculateMatch;
    private resetValues;
}
