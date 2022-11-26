import { Match } from "../Match";
import { Goal } from "../types";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { RoundRobinTournament } from "./RoundRobinTournament";

export class RoundRobinMatch extends Match {
  public readonly id: number;
  public readonly homeTeam: RoundRobinTeam;
  public readonly awayTeam: RoundRobinTeam;
  protected readonly tournament: RoundRobinTournament;

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
    this.tournament = tournament;
  }

  public play(homeGoals: Goal, awayGoals: Goal): void {
    this.score.homeTeam = homeGoals;
    this.score.awayTeam = awayGoals;

    if (homeGoals === null || awayGoals === null) {
      this.isPlayed = false;
    } else {
      this.isPlayed = true;
    }

    this.homeTeam.calculatePoints();
    this.awayTeam.calculatePoints();
    this.tournament.sortTeams();
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
