import { Round, SortableAttribute, Tournament } from "../types";
import { ClassificationOptions, ClassificationProtocol, MatchProtocol, RoundRobinTeamProtocol, TieBreak } from "../types/interfaces";
export declare class RoundRobinTournament implements Tournament {
    readonly teams: RoundRobinTeamProtocol[];
    readonly matches: MatchProtocol[];
    readonly rounds: Round[];
    readonly classification: ClassificationProtocol;
    private readonly secondRound;
    private readonly sort;
    constructor(teams: RoundRobinTeamProtocol[], secondRound: boolean, classification: ClassificationOptions, tieBreaks: TieBreak[]);
    private createRounds;
    private createMatches;
    sortTeams(attribute?: SortableAttribute, direction?: 1 | -1): void;
}
