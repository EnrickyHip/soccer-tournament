import { AttributeTieBreak } from "./AttributeTieBreak";
import { HeadToHeadAwayGoalsTieBreak } from "./HeadToHeadAwayGoalsTieBreak";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";

const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();
const HeadToHeadAwayGoals = new HeadToHeadAwayGoalsTieBreak();

export const tieBreaks = { wins, goals, goalDifference, headToHead, HeadToHeadAwayGoals };
