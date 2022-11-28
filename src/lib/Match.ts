import { SoccerTournamentError } from "./SoccerTournamentError";
import type Team from "./Team";
import { Goal } from "./types";
import { Score } from "./types/interfaces";

export abstract class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public readonly awayTeam: Team;
  private readonly _score: Score = { homeTeam: null, awayTeam: null };
  private _isPlayed = false;

  constructor(homeTeam: Team, awayTeam: Team, id: number) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  public get isPlayed(): boolean {
    return this._isPlayed;
  }

  public get score(): Score {
    return { ...this._score };
  }

  protected abstract afterPlay(): void;

  public play(homeGoals: Goal, awayGoals: Goal): void {
    this._score.homeTeam = homeGoals;
    this._score.awayTeam = awayGoals;

    if (homeGoals === null || awayGoals === null) {
      this._isPlayed = false;
    } else {
      this._isPlayed = true;
    }

    this.afterPlay();
  }

  //! esse método está funcionando corretamente?
  public getTeamScore(team: Team): [number, number] {
    if (team !== this.homeTeam && team !== this.awayTeam) {
      throw new SoccerTournamentError("Team passed as an argument does not belongs to this match");
    }

    const { homeTeam: homeTeamGoals, awayTeam: awayTeamGoals } = this._score;
    const selfScore = this.homeTeam === team ? (homeTeamGoals as number) : (awayTeamGoals as number);
    const otherScore = this.homeTeam === team ? (awayTeamGoals as number) : (homeTeamGoals as number);
    return [selfScore, otherScore];
  }

  public static getMatchesBetween<MatchType extends Match>(
    team1: Team<MatchType>,
    team2: Team<MatchType>,
  ): MatchType[] {
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
