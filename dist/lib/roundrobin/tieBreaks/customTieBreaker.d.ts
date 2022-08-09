import { RoundRobinTeamProtocol, TieBreak } from "../../types/interfaces";
export declare class CustomTieBreaker implements TieBreak {
    getAttributes: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => [number, number];
    constructor(getAttributes: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => [number, number]);
}
