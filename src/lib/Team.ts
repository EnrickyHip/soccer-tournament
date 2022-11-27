import { Match } from "./Match";
import { Tournament } from "./Tournament";
import { MatchesObject } from "./types/interfaces";

abstract class Team<MatchType extends Match = Match> {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly _matchesObject: MatchesObject<MatchType> = {};
  protected abstract _tournament: Tournament | null;

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  public set tournament(tournament: Tournament) {
    if (this._tournament) throw new Error("This match has already been on a Tournament!");
    if (!this.isInTournament(tournament)) throw new Error("This team does not belongs to the passed tournament!");
    this._tournament = tournament;
  }

  public get tournament(): Tournament {
    if (!this._tournament) throw new Error("this team does not belongs to any tournament!");
    return this._tournament;
  }

  public get matches(): MatchType[] {
    return Object.values(this._matchesObject);
  }

  public get matchesPlayedArray(): MatchType[] {
    return Object.values(this._matchesObject).filter((match: MatchType) => match.isPlayed);
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
  public addMatch(match: MatchType): void {
    if (this._matchesObject[match.id]) throw new Error("Match id already exists!");
    else this._matchesObject[match.id] = match;
  }

  protected isInTournament(tournament: Tournament): boolean {
    const filteredTeams = tournament.teams.filter((team) => team === this);
    return filteredTeams.length === 1;
  }
}

export default Team;
