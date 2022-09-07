import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
export declare class AttributeTieBreak implements TieBreak {
    private attribute;
    reverse: boolean;
    constructor(attribute: SortableAttribute, reverse?: boolean);
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
