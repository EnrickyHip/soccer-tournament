import { MatchesObject, MatchProtocol } from "./types/interfaces";
declare abstract class Team {
    readonly id: number;
    readonly name: string;
    readonly shield: string;
    protected readonly matchesObject: MatchesObject;
    protected readonly matchesPlayedObject: MatchesObject;
    constructor(name: string, shield: string, id: number);
    get matches(): MatchProtocol[];
    get matchesPlayedArray(): MatchProtocol[];
    get matchesPlayed(): number;
    goalsInMatches(matches: MatchProtocol[]): number;
    addMatch(match: MatchProtocol): void;
    abstract playMatch(match: MatchProtocol): void;
}
export default Team;
