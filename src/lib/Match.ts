import type Team from "./Team";
import { Goal } from "./types";
import { Score, Tournament } from "./types/interfaces";

export abstract class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public readonly awayTeam: Team;
  public isPlayed = false;
  public score: Score = { homeTeam: null, awayTeam: null };
  protected readonly tournament?: Tournament;

  constructor(homeTeam: Team, awayTeam: Team, id: number, tournament?: Tournament) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.tournament = tournament;
  }

  public abstract play(homeGoals: Goal, awayGoals: Goal): void;

  public getTeamScore(team: Team): [number, number] {
    if (team !== this.homeTeam && team !== this.awayTeam) {
      throw new Error("Team passed as an argument does not belongs to this match");
    }

    const { homeTeam: homeTeamGoals, awayTeam: awayTeamGoals } = this.score;
    const selfScore = this.homeTeam === team ? (homeTeamGoals as number) : (awayTeamGoals as number);
    const otherScore = this.homeTeam === team ? (awayTeamGoals as number) : (homeTeamGoals as number);
    return [selfScore, otherScore];
  }

  //* essa função está acessível em RoundRobinMatch também...
  public static getMatchesBetween<MatchType extends Match>(team1: Team<MatchType>, team2: Team<MatchType>) {
    return team1.matches.filter((match) => {
      const { homeTeam, awayTeam } = match;
      return (homeTeam === team1 && awayTeam === team2) || (homeTeam === team2 && awayTeam === team1);
    });
  }

  public static headToHeadGoals(team1: Team, team2: Team): [number, number] {
    const matches = Match.getMatchesBetween(team1, team2);
    const team1Goals = team1.goalsInMatches(matches);
    const team2Goals = team2.goalsInMatches(matches);
    return [team1Goals, team2Goals];
  }
}
