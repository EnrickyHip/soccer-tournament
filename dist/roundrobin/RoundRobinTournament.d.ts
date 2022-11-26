import { Tournament } from "../Tournament";
import { Round, SortableAttribute } from "../types";
import { ClassificationOptions, ClassificationProtocol, TieBreak } from "../types/interfaces";
import { RoundRobinMatch } from "./RoundRobinMatch";
import { RoundRobinTeam } from "./RoundRobinTeam";
export declare class RoundRobinTournament extends Tournament<RoundRobinTeam, RoundRobinMatch> {
    readonly rounds: Round[];
    readonly classification: ClassificationProtocol;
    private readonly secondRound;
    private readonly sort;
    constructor(teams: RoundRobinTeam[], secondRound: boolean, classification: ClassificationOptions, tieBreaks: TieBreak[]);
    private createRounds;
    private createMatches;
    sortTeams(attribute?: SortableAttribute, reverse?: boolean): void;
}
