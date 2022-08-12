import { Match } from "../Match";
import { Goal } from "../types";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { RoundRobinTournament } from "./RoundRobinTournament";

export class RoundRobinMatch extends Match {
  public readonly id: number;
  public readonly homeTeam: RoundRobinTeam;
  public readonly awayTeam: RoundRobinTeam;
  protected readonly tournament: RoundRobinTournament;

  constructor(homeTeam: RoundRobinTeam, awayTeam: RoundRobinTeam, id: number, tournament: RoundRobinTournament) {
    super(homeTeam, awayTeam, id, tournament);
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.tournament = tournament;
  }

  play(homeGoals: Goal, awayGoals: Goal): void {
    const { homeTeam, awayTeam } = this.score;
    if (homeTeam === homeGoals && awayTeam === awayGoals) return;

    this.score.homeTeam = homeGoals;
    this.score.awayTeam = awayGoals;

    if (homeGoals === null || awayGoals === null) {
      this.isPlayed = false;
    } else {
      this.isPlayed = true;
    }

    this.homeTeam.playMatch(this);
    this.awayTeam.playMatch(this);

    this.tournament.sortTeams();
  }

  static create(teams: RoundRobinTeam[], id: number, tournament: RoundRobinTournament): RoundRobinMatch {
    const visitingTeam = teams[1];
    const homeTeam = teams[0];

    const match = new RoundRobinMatch(homeTeam, visitingTeam, id, tournament);

    homeTeam.addMatch(match);
    visitingTeam.addMatch(match);

    return match;
  }
}
