import roundrobin, { type Rounds } from "roundrobin-tournament-js";
import { Tournament } from "../Tournament";
import { Round, SortableAttribute } from "../types";
import { ClassificationOptions, ClassificationProtocol, SortProtocol } from "../types/interfaces";

import Classification from "./Classification";
import { RoundRobinMatch } from "./RoundRobinMatch";
import RoundRobinSort from "./RoundRobinSort";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { TieBreak } from "./tieBreaks/TieBreak";

export class RoundRobinTournament extends Tournament<RoundRobinTeam, RoundRobinMatch> {
  public readonly rounds: Round[];
  public readonly classification: ClassificationProtocol;
  private readonly _secondRound: boolean;
  private readonly _sort: SortProtocol;

  constructor(
    teams: RoundRobinTeam[],
    secondRound = false,
    classification: ClassificationOptions = {},
    tieBreaks: TieBreak[] = [],
  ) {
    super(teams);
    this._secondRound = secondRound;
    this.classification = new Classification(classification);
    this._sort = new RoundRobinSort(tieBreaks);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): Round[] {
    const rounds = roundrobin(this.teams, this._secondRound);
    return this.createMatches(rounds);
  }

  private createMatches(rounds: Rounds<RoundRobinTeam>): Round[] {
    return rounds.map((round: RoundRobinTeam[][]) => {
      return round.map((teams: RoundRobinTeam[]) => {
        const id = this.matches.length;
        const newMatch = RoundRobinMatch.create(teams[0], teams[1], id, this);
        this.matches.push(newMatch);
        return newMatch;
      });
    });
  }

  public sortTeams(attribute?: SortableAttribute, reverse = false): void {
    this.teams.sort(this._sort.positionSort());

    if (attribute !== undefined || this._sort.currentAttribute !== "position") {
      this.teams.sort(this._sort.customSort(attribute, reverse));
    }
  }
}
