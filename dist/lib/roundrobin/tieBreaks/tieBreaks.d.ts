import { SortableAttribute } from "../../types";
import { RoundRobinTeamProtocol, TieBreak } from "../../types/interfaces";
declare class AttributeTieBreak implements TieBreak {
    private attribute;
    constructor(attribute: SortableAttribute);
    getAttributes: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => [number, number];
}
declare class HeadToHeadTieBreak implements TieBreak {
    getAttributes: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => [number, number];
}
export declare const tieBreaks: {
    wins: AttributeTieBreak;
    goals: AttributeTieBreak;
    goalDifference: AttributeTieBreak;
    headToHead: HeadToHeadTieBreak;
};
export {};
