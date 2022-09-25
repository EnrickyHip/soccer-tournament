import { Match } from "./Match";
import { MatchesObject } from "./types/interfaces";
declare abstract class Team<MatchType extends Match = Match> {
    readonly id: number;
    readonly name: string;
    readonly shield: string;
    protected readonly matchesObject: MatchesObject<MatchType>;
    constructor(name: string, shield: string, id: number);
    get matches(): MatchType[];
    get matchesPlayedArray(): MatchType[];
    get matchesPlayed(): number;
    goalsInMatches(matches: MatchType[]): number;
    addMatch(match: MatchType): void;
}
export default Team;
