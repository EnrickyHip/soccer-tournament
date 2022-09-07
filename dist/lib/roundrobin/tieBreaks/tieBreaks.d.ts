import { AttributeTieBreak } from "./AttributeTieBreak";
import { HeadToHeadAwayGoalsTieBreak } from "./HeadToHeadAwayGoalsTieBreak";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";
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
export declare const tieBreaks: {
    wins: AttributeTieBreak;
    goals: AttributeTieBreak;
    goalDifference: AttributeTieBreak;
    headToHead: HeadToHeadTieBreak;
    HeadToHeadAwayGoals: HeadToHeadAwayGoalsTieBreak;
};
