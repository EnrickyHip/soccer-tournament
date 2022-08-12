import { Match } from "./Match";
import { MatchesObject } from "./types/interfaces";
declare abstract class Team {
    readonly id: number;
    readonly name: string;
    readonly shield: string;
    protected readonly matchesObject: MatchesObject;
    protected readonly matchesPlayedObject: MatchesObject;
    constructor(name: string, shield: string, id: number);
    get matches(): Match[];
    get matchesPlayedArray(): Match[];
    get matchesPlayed(): number;
    goalsInMatches(matches: Match[]): number;
    addMatch(match: Match): void;
    abstract playMatch(match: Match): void;
}
export default Team;
