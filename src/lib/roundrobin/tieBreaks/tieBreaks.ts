import { Match } from "../../Match";
import { SortableAttribute } from "../../types";
import { RoundRobinTeamProtocol, TieBreak } from "../../types/interfaces";

class AttributeTieBreak implements TieBreak {
  private attribute: SortableAttribute;

  constructor(attribute: SortableAttribute) {
    this.attribute = attribute;
  }

  getAttributes = (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol): [number, number] => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}

class HeadToHeadTieBreak implements TieBreak {
  getAttributes = (team1: RoundRobinTeamProtocol, team2: RoundRobinTeamProtocol) => {
    return Match.headToHeadGoals(team1, team2);
  };
}

const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();

export const tieBreaks = { wins, goals, goalDifference, headToHead };
