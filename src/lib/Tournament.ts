import { Match } from "./Match";
import { SoccerTournamentError } from "./SoccerTournamentError";
import Team from "./Team";

export abstract class Tournament<TeamType extends Team = Team, MatchType extends Match = Match> {
  public readonly teams: TeamType[];
  public readonly matches: MatchType[] = [];

  constructor(teams: TeamType[]) {
    this.teams = teams;
    this.checkIds();
    this.teams.forEach((team) => (team.tournament = this));
  }

  private checkIds(): void {
    for (const team of this.teams) {
      for (const team2 of this.teams) {
        if (team === team2) continue;
        if (team.id === team2.id) throw new SoccerTournamentError("Some teams contain the same id!");
      }
    }
  }
}
