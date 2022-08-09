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
    return matches.reduce((goals: number, match) => {
      const [selfScore] = match.getTeamScore(this);
      return goals + selfScore;
    }, 0);
  }

  public addMatch(match: MatchProtocol) {
    this.matchesObject[match.id] = match;
  }

  abstract playMatch(match: MatchProtocol): void;
}

export default Team;
