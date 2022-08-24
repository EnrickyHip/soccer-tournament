import { ClassificationOptions, ClassificationProtocol } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";

class Classification implements ClassificationProtocol {
  private readonly classification: ClassificationOptions;

  constructor(classification: ClassificationOptions) {
    this.classification = classification;
  }

  get() {
    return this.classification;
  }

  getTeamClassification(team: RoundRobinTeam): string | null {
    const { position } = team;
    if (position === 1) return "first";

    for (const key in this.classification) {
      if (this.isClassified(position, key)) return key;
    }

    return null;
  }

  private isClassified(position: number, classification: keyof ClassificationOptions) {
    const classified = this.classification[classification];
    return position >= classified.min && position <= classified.max;
  }
}

export default Classification;
