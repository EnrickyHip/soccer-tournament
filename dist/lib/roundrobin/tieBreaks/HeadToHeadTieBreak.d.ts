import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";
export declare class HeadToHeadTieBreak implements TieBreak {
    getAttributes: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
}
