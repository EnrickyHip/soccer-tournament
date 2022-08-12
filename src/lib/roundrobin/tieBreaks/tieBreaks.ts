import { Match } from "../../Match";
import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { RoundRobinTeam } from "../RoundRobinTeam";

class AttributeTieBreak implements TieBreak {
  private attribute: SortableAttribute;

  constructor(attribute: SortableAttribute) {
    this.attribute = attribute;
  }

  getAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam): [number, number] => {
    return [team1[this.attribute], team2[this.attribute]];
  };
}

class HeadToHeadTieBreak implements TieBreak {
  getAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
    return Match.headToHeadGoals(team1, team2);
  };
}

const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();

export const tieBreaks = { wins, goals, goalDifference, headToHead };
