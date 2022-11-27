import { Match } from "../../Match";
import { TieBreakGetAttributes } from "../../types/types";
import { TieBreak } from "./TieBreak";

export class HeadToHeadTieBreak extends TieBreak {
  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    return Match.headToHeadGoals(team1, team2);
  };
}
