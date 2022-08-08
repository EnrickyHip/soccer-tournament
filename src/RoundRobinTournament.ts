import roundrobin, { type Rounds } from "roundrobin-tournament-js";
import Match from "./Match";
import type {
  ClassificationOptions,
  ClassificationProtocol,
  MatchProtocol,
  Round,
  RoundRobinTeamProtocol,
  SortableAttribute,
  SortProtocol,
  TieBreak,
  Tournament,
} from "./types";
import Classification from "./Classification";
import RoundRobinSort from "./RoundRobinSort";

class RoundRobinTournament implements Tournament {
  public readonly teams: RoundRobinTeamProtocol[];
  public readonly matches: MatchProtocol[] = [];
  public readonly rounds: Round[];
  public readonly classification: ClassificationProtocol;
  private readonly secondRound: boolean;
  private readonly sort: SortProtocol;

  constructor(
    teams: RoundRobinTeamProtocol[],
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

  private createMatches(rounds: Rounds<RoundRobinTeamProtocol>): Round[] {
    return rounds.map((round: RoundRobinTeamProtocol[][]) => {
      return round.map((teams: RoundRobinTeamProtocol[]) => {
        const id = this.matches.length;
        const newMatch = Match.create(teams, id);
        this.matches.push(newMatch);
        return newMatch;
      });
    });
  }

  //* seria interessante se toda vez que uma partida fosse jogada esse método automaticamente fosse executado.
  public sortTeams(attribute?: SortableAttribute, direction?: 1 | -1): void {
    this.teams.sort(this.sort.positionSort);
    this.teams.forEach((team, index) => {
      team.setPosition(index + 1);
    });

    if (attribute !== undefined || this.sort.sortAttribute !== "position") {
      this.teams.sort(this.sort.customSort(attribute, direction));
    }
  }
}

export default RoundRobinTournament;
