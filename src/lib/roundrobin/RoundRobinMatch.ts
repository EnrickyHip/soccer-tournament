import { Match } from "../Match";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { RoundRobinTournament } from "./RoundRobinTournament";

export class RoundRobinMatch extends Match {
  public readonly id: number;
  public readonly homeTeam: RoundRobinTeam;
  public readonly awayTeam: RoundRobinTeam;
  protected readonly _tournament: RoundRobinTournament;

  private constructor(
    homeTeam: RoundRobinTeam,
    awayTeam: RoundRobinTeam,
    id: number,
    tournament: RoundRobinTournament,
  ) {
    super(homeTeam, awayTeam, id);
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this._tournament = tournament;
  }

  protected afterPlay(): void {
    this.homeTeam.calculatePoints();
    this.awayTeam.calculatePoints();
    this._tournament.sortTeams();
  }

  public static create(
    homeTeam: RoundRobinTeam,
    awayTeam: RoundRobinTeam,
    id: number,
    tournament: RoundRobinTournament,
  ): RoundRobinMatch {
    const match = new RoundRobinMatch(homeTeam, awayTeam, id, tournament);

    homeTeam.addMatch(match);
    awayTeam.addMatch(match);

    return match;
  }
}
