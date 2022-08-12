import { AttributeTieBreak } from "./AttributeTieBreak";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";

const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();

export const tieBreaks = { wins, goals, goalDifference, headToHead };
