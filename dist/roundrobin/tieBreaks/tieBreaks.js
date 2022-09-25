"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieBreaks = void 0;
const AttributeTieBreak_1 = require("./AttributeTieBreak");
const HeadToHeadAwayGoalsTieBreak_1 = require("./HeadToHeadAwayGoalsTieBreak");
const HeadToHeadTieBreak_1 = require("./HeadToHeadTieBreak");
const wins = new AttributeTieBreak_1.AttributeTieBreak("wins");
const goals = new AttributeTieBreak_1.AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak_1.AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak_1.HeadToHeadTieBreak();
const HeadToHeadAwayGoals = new HeadToHeadAwayGoalsTieBreak_1.HeadToHeadAwayGoalsTieBreak();
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
exports.tieBreaks = { wins, goals, goalDifference, headToHead, HeadToHeadAwayGoals };
//# sourceMappingURL=tieBreaks.js.map