import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
export declare class AttributeTieBreak implements TieBreak {
    private attribute;
    constructor(attribute: SortableAttribute);
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
