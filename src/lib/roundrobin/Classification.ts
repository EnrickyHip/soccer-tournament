import {
  ClassificationOptions,
  ClassificationProtocol,
  RoundRobinTeamProtocol,
  RoundRobinTournamentProtocol,
} from "../types/interfaces";

class Classification implements ClassificationProtocol {
  private readonly classification: ClassificationOptions;
  private readonly tournament: RoundRobinTournamentProtocol;

  constructor(classification: ClassificationOptions, tournament: RoundRobinTournamentProtocol) {
    this.classification = classification;
    this.tournament = tournament;
  }

  get(team: RoundRobinTeamProtocol): string | null {
    if (!this.tournament.teams.includes(team)) {
      throw new Error("Team passed as argument does not belongs to this tournament!");
    }

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
