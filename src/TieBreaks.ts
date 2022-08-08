import Match from "./Match";
import { RoundRobinTeamProtocol, SortableAttribute, TieBreak } from "./types";

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

export const wins = new AttributeTieBreak("wins");
export const goals = new AttributeTieBreak("goals");
export const goalDifference = new AttributeTieBreak("goalDifference");
export const headToHead = new HeadToHeadTieBreak();
