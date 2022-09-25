import { Match } from "./Match";
import { MatchesObject } from "./types/interfaces";

abstract class Team<MatchType extends Match = Match> {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly matchesObject: MatchesObject<MatchType> = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  public get matches(): MatchType[] {
    return Object.values(this.matchesObject);
  }

  public get matchesPlayedArray(): MatchType[] {
    return Object.values(this.matchesObject).filter((match: MatchType) => match.isPlayed);
  }

  public get matchesPlayed(): number {
    return this.matchesPlayedArray.length;
  }

  public goalsInMatches(matches: MatchType[]): number {
    return matches.reduce((goals: number, match) => {
      if (match.homeTeam !== this && match.awayTeam !== this) {
        throw new Error("This team doest not belong to some match which was passed as an argument");
      }
      const [selfScore] = match.getTeamScore(this);
      return goals + selfScore;
    }, 0);
  }

  //* esse método não é recomendado o uso na lib
  public addMatch(match: MatchType) {
    if (this.matchesObject[match.id]) throw new Error("Match id already exists!");
    else this.matchesObject[match.id] = match;
  }
}

export default Team;
