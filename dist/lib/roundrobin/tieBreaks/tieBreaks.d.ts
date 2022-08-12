import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
declare class AttributeTieBreak implements TieBreak {
    private attribute;
    constructor(attribute: SortableAttribute);
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
declare class HeadToHeadTieBreak implements TieBreak {
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
export declare const tieBreaks: {
    wins: AttributeTieBreak;
    goals: AttributeTieBreak;
    goalDifference: AttributeTieBreak;
    headToHead: HeadToHeadTieBreak;
};
export {};
