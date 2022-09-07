import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
export declare class CustomTieBreaker implements TieBreak {
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
    reverse: boolean;
    constructor(getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number], reverse?: boolean);
}
