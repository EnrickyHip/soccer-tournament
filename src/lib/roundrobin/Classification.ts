import { ClassificationOptions, ClassificationProtocol } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";

class Classification implements ClassificationProtocol {
  private readonly _classification: ClassificationOptions;

  constructor(classification: ClassificationOptions) {
    this._classification = classification;
  }

  public get(): ClassificationOptions {
    return this._classification;
  }

  public getTeamClassification(team: RoundRobinTeam): string | null {
    const { position } = team;
    if (position === 1) return "first";

    for (const key in this._classification) {
      if (this.isClassified(position, key)) return key;
    }

    return null;
  }

  private isClassified(position: number, classification: keyof ClassificationOptions): boolean {
    const classified = this._classification[classification];
    return position >= classified.min && position <= classified.max;
  }
}

export default Classification;
