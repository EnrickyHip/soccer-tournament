import { Match } from "./Match";
import Team from "./Team";

export abstract class Tournament<TeamType extends Team<MatchType>, MatchType extends Match> {
  public readonly teams: TeamType[];
  public readonly matches: MatchType[] = [];

  constructor(teams: TeamType[]) {
    this.teams = teams;
    // this.teams.forEach((team) => (team.tournament = this));
  }
}
