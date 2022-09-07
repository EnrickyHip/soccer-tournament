import { Match } from "../../Match";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

export class HeadToHeadTieBreak implements TieBreak {
  public reverse = false;
  public getAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
    return Match.headToHeadGoals(team1, team2);
  };
}
