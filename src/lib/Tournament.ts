import { Match } from "./Match";
import Team from "./Team";

//!fazer validação dos times para identifica o id de cada um OU criar o id dos times dentro do Tournament
export abstract class Tournament<TeamType extends Team = Team, MatchType extends Match = Match> {
  public readonly teams: TeamType[];
  public readonly matches: MatchType[] = [];

  constructor(teams: TeamType[]) {
    this.teams = teams;
    this.teams.forEach((team) => (team.tournament = this));
  }
}
