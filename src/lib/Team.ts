import { MatchesObject, MatchProtocol } from "./types/interfaces";

abstract class Team {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly matchesObject: MatchesObject = {};
  protected readonly matchesPlayedObject: MatchesObject = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  get matches(): MatchProtocol[] {
    return Object.values(this.matchesObject);
  }

  get matchesPlayedArray(): MatchProtocol[] {
    return Object.values(this.matchesPlayedObject);
  }

  get matchesPlayed(): number {
    return this.matchesPlayedArray.length;
  }

  public goalsInMatches(matches: MatchProtocol[]): number {
    try {
      return matches.reduce((goals: number, match) => {
        const [selfScore] = match.getTeamScore(this);
        return goals + selfScore;
      }, 0);
    } catch (error) {
      throw new Error("This team doest not belong to some match which was passed was an argument");
    }
  }

  //* esse método não é recomendado o uso na lib
  public addMatch(match: MatchProtocol) {
    if (this.matchesObject[match.id]) throw new Error("Match id already exists!");
    this.matchesObject[match.id] = match;
  }

  abstract playMatch(match: MatchProtocol): void;
}

export default Team;
