import { SortableAttribute } from "../types";
import { RoundRobinTeamProtocol, SortProtocol, TieBreak } from "../types/interfaces";
export default class RoundRobinSort implements SortProtocol {
    private tieBreaks;
    sortAttribute: SortableAttribute;
    constructor(tieBreaks: TieBreak[]);
    customSort: (attribute?: SortableAttribute, sentDirection?: 1 | -1) => (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => number;
    positionSort: (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => 1 | -1 | 0;
}
