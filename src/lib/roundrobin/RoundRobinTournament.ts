import roundrobin, { type Rounds } from "roundrobin-tournament-js";
import { Round, SortableAttribute, Tournament } from "../types";
import { ClassificationOptions, ClassificationProtocol, SortProtocol, TieBreak } from "../types/interfaces";

import Classification from "./Classification";
import { RoundRobinMatch } from "./RoundRobinMatch";
import RoundRobinSort from "./RoundRobinSort";
import { RoundRobinTeam } from "./RoundRobinTeam";

export class RoundRobinTournament implements Tournament {
  public readonly teams: RoundRobinTeam[];
  public readonly matches: RoundRobinMatch[] = [];
  public readonly rounds: Round[];
  public readonly classification: ClassificationProtocol;
  private readonly secondRound: boolean;
  private readonly sort: SortProtocol;

  constructor(
    teams: RoundRobinTeam[],
    secondRound: boolean,
    classification: ClassificationOptions,
    tieBreaks: TieBreak[],
  ) {
    this.teams = teams;
    this.secondRound = secondRound;
    this.classification = new Classification(classification);
    this.sort = new RoundRobinSort(tieBreaks);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): Round[] {
    const rounds = roundrobin(this.teams, this.secondRound);
    return this.createMatches(rounds);
  }

  private createMatches(rounds: Rounds<RoundRobinTeam>): Round[] {
    return rounds.map((round: RoundRobinTeam[][]) => {
      return round.map((teams: RoundRobinTeam[]) => {
        const id = this.matches.length;
        const newMatch = RoundRobinMatch.create(teams, id, this);
        this.matches.push(newMatch);
        return newMatch;
      });
    });
  }

  public sortTeams(attribute?: SortableAttribute, reverse = false): void {
    this.teams.sort(this.sort.positionSort());
    this.teams.forEach((team, index) => {
      team.setPosition(index + 1);
    });

    if (attribute !== undefined || this.sort.currentAttribute !== "position") {
      this.teams.sort(this.sort.customSort(attribute, reverse));
    }
  }
}
