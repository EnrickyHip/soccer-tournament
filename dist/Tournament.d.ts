import { Match } from "./Match";
import Team from "./Team";
export declare abstract class Tournament<TeamType extends Team<MatchType>, MatchType extends Match> {
    readonly teams: TeamType[];
    readonly matches: MatchType[];
    constructor(teams: TeamType[]);
}
