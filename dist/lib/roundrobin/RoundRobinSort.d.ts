import { SortableAttribute } from "../types";
import { SortProtocol, TieBreak } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";
export default class RoundRobinSort implements SortProtocol {
    private tieBreaks;
    currentAttribute: SortableAttribute;
    constructor(tieBreaks: TieBreak[]);
    customSort: (sentAttribute?: SortableAttribute, reverse?: boolean) => (team1: RoundRobinTeam, team2: RoundRobinTeam) => number;
    positionSort: () => (team1: RoundRobinTeam, team2: RoundRobinTeam) => 1 | -1 | 0;
}
