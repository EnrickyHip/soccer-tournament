import { Round, SortableAttribute, Tournament } from "../types";
import { ClassificationOptions, ClassificationProtocol, TieBreak } from "../types/interfaces";
import { RoundRobinMatch } from "./RoundRobinMatch";
import { RoundRobinTeam } from "./RoundRobinTeam";
export declare class RoundRobinTournament implements Tournament {
    readonly teams: RoundRobinTeam[];
    readonly matches: RoundRobinMatch[];
    readonly rounds: Round[];
    readonly classification: ClassificationProtocol;
    private readonly secondRound;
    private readonly sort;
    constructor(teams: RoundRobinTeam[], secondRound: boolean, classification: ClassificationOptions, tieBreaks: TieBreak[]);
    private createRounds;
    private createMatches;
    sortTeams(attribute?: SortableAttribute, direction?: 1 | -1): void;
}
