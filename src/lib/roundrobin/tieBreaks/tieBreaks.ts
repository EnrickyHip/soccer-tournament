import { AttributeTieBreak } from "./AttributeTieBreak";
import { HeadToHeadAwayGoalsTieBreak } from "./HeadToHeadAwayGoalsTieBreak";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";

const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();
const HeadToHeadAwayGoals = new HeadToHeadAwayGoalsTieBreak();

/**
 * Object of built-in tie breaks.
 *
 * Add desired tie breaks to your tournament as an array:
 *
 * ```js
 * const tournament = new RoundRobinTournament(
 *  teams,
 *  true,
 *  classification,
 *  [tieBreaks.goalDifference, tieBreaks.goals]
 * );
 * ```
 *
 * Remember that tie breaks which come first in the array have priority.
 */
export const tieBreaks = { wins, goals, goalDifference, headToHead, HeadToHeadAwayGoals };
