import { Match } from "../Match";
import Team from "../Team";
import { Result } from "../types";

export class RoundRobinTeam extends Team {
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

  get lastMatches(): Match[] {
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

  //* esse método não é recomendado o uso na lib
  setPosition(position: number) {
    this._position = position;
  }

  calculatePoints() {
    this.resetValues();
    this.matchesPlayedArray.forEach((match: Match) => {
      this.calculateMatch(match);
    });

    return this.points;
  }

  private calculateMatch(match: Match): void {
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
