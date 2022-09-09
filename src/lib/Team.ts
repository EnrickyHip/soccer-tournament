import { Match } from "./Match";
import { MatchesObject } from "./types/interfaces";

abstract class Team {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly matchesObject: MatchesObject = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  public get matches(): Match[] {
    return Object.values(this.matchesObject);
  }

  public get matchesPlayedArray(): Match[] {
    return Object.values(this.matchesObject).filter((match: Match) => match.isPlayed);
  }

  public get matchesPlayed(): number {
    return this.matchesPlayedArray.length;
  }

  public goalsInMatches(matches: Match[]): number {
    return matches.reduce((goals: number, match) => {
      if (match.homeTeam !== this && match.awayTeam !== this) {
        throw new Error("This team doest not belong to some match which was passed as an argument");
      }
      const [selfScore] = match.getTeamScore(this);
      return goals + selfScore;
    }, 0);
  }

  //* esse método não é recomendado o uso na lib
  public addMatch(match: Match) {
    if (this.matchesObject[match.id]) throw new Error("Match id already exists!");
    else this.matchesObject[match.id] = match;
  }
}

export default Team;
