import Team from "../Team";
import { Result } from "../types";
import { RoundRobinMatch } from "./RoundRobinMatch";

/**
 * Create a Team for a Round Robin Tournament.
 */

export class RoundRobinTeam extends Team<RoundRobinMatch> {
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public goals = 0;
  public counterGoals = 0;
  private _position = 0;

  public get points() {
    return this.wins * 3 + this.draws;
  }

  public get goalDifference() {
    return this.goals - this.counterGoals;
  }

  public get percentage() {
    if (this.points === 0) return 0;
    return (this.points * 100) / (this.matchesPlayed * 3);
  }

  public get position() {
    return this._position;
  }

  /**
   * Get the last played matches of the team.
   * @param total - Number of matches you want to return. The default value is 5.
   * @returns An Array cointaning the matches objects.
   */

  public getLastMatches(total = 5): RoundRobinMatch[] {
    return this.matchesPlayedArray.slice(-total);
  }

  /**
   * Get the result of the last played matches of the team. The possible results are "win", "draw", and "lose".
   * @param total The total results you want to get. The default values is 5.
   * @returns An array of the last results of the team.
   */

  public getLastResults(total = 5): Result[] {
    return this.getLastMatches(total).map((match) => {
      return this.getResult(match) as Result;
    });
  }

  /**
   * Get the result of a sent match.
   * @param match - The match to get the result.
   * @returns The possible returns are the strings: "win", "draw" or "lose". If the match was not played yet, it returns `null`.
   */

  public getResult(match: RoundRobinMatch): Result | null {
    if (match.homeTeam !== this && match.awayTeam !== this) {
      throw new Error("This team does not belongs to the sent match.");
    }

    if (!match.isPlayed) return null;
    const [selfScore, otherScore] = match.getTeamScore(this);
    if (selfScore > otherScore) return Result.win;
    if (otherScore > selfScore) return Result.lose;
    return Result.draw;
  }

  /**
   * Set the position of the team.
   * @package
   * @param position the position to set.
   *
   * We do not recommend to change the team position this way.
   */
  public setPosition(position: number) {
    this._position = position;
  }

  /**
   * This method is used internaly to calculate total wins, draws, losses, goals and counter goals.
   * @returns The team total points.
   * If you want the team's total points, it's recommended to use `team.points`.
   */

  public calculatePoints(): number {
    this.resetValues();
    this.matchesPlayedArray.forEach((match) => {
      this.calculateMatch(match);
    });

    return this.points;
  }

  private calculateMatch(match: RoundRobinMatch): void {
    const [selfScore, otherScore] = match.getTeamScore(this);

    this.goals += selfScore;
    this.counterGoals += otherScore;

    if (selfScore > otherScore) {
      this.wins += 1;
    } else if (otherScore > selfScore) {
      this.losses += 1;
    } else {
      this.draws += 1;
    }
  }

  private resetValues(): void {
    this.goals = 0;
    this.counterGoals = 0;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
  }
}
