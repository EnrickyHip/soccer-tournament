import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
export declare class HeadToHeadTieBreak implements TieBreak {
    reverse: boolean;
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
