import { Match } from "../../Match";
import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";

export class HeadToHeadTieBreak implements TieBreak {
  public reverse = false;
  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    return Match.headToHeadGoals(team1, team2);
  };
}
