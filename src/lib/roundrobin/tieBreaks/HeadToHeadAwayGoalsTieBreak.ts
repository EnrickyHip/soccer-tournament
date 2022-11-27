import { Match } from "../../Match";
import { TieBreakGetAttributes } from "../../types/types";
import { TieBreak } from "./TieBreak";

export class HeadToHeadAwayGoalsTieBreak extends TieBreak {
  public getAttributes: TieBreakGetAttributes = (team1, team2) => {
    const headToHead = Match.getMatchesBetween(team1, team2);

    let team1Goals = 0;
    let team2Goals = 0;

    headToHead.forEach((match) => {
      if (!match.isPlayed) return;
      if (match.awayTeam.id === team1.id) {
        team1Goals += match.score.awayTeam as number;
      } else {
        team2Goals += match.score.awayTeam as number;
      }
    });

    return [team1Goals, team2Goals];
  };
}
