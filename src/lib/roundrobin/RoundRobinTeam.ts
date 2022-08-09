import Team from "../Team";
import { Result } from "../types";
import { MatchProtocol, RoundRobinTeamProtocol } from "../types/interfaces";

export class RoundRobinTeam extends Team implements RoundRobinTeamProtocol {
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public goals = 0;
  public counterGoals = 0;
  private _position = 0;

  get points(): number {
    return this.wins * 3 + this.draws;
  }

  get goalDifference(): number {
    return this.goals - this.counterGoals;
  }

  get percentage(): number {
    if (this.points === 0) return 0;
    return (this.points * 100) / (this.matchesPlayed * 3);
  }

  get lastMatches(): MatchProtocol[] {
    return this.matchesPlayedArray.slice(-5);
  }

  get lastResults(): Result[] {
    return this.lastMatches.map((match) => {
      const [selfScore, otherScore] = match.getTeamScore(this);

      if (selfScore > otherScore) return "win";
      if (otherScore > selfScore) return "lose";
      return "draw";
    });
  }

  get position() {
    return this._position;
  }

  setPosition(position: number) {
    this._position = position;
  }

  playMatch(match: MatchProtocol): void {
    if (match.score.homeTeam === null || match.score.awayTeam === null) {
      delete this.matchesPlayedObject[match.id];
    } else {
      this.matchesPlayedObject[match.id] = match;
    }

    this.calculatePoints();
  }

  private calculatePoints(): void {
    this.resetValues();
    this.matchesPlayedArray.forEach((match: MatchProtocol) => {
      this.calculateMatch(match);
    });
  }

  private calculateMatch(match: MatchProtocol): void {
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
