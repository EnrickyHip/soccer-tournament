import { AttributeTieBreak } from "./AttributeTieBreak";
import { HeadToHeadAwayGoalsTieBreak } from "./HeadToHeadAwayGoalsTieBreak";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";
export declare const tieBreaks: {
    wins: AttributeTieBreak;
    goals: AttributeTieBreak;
    goalDifference: AttributeTieBreak;
    headToHead: HeadToHeadTieBreak;
    HeadToHeadAwayGoals: HeadToHeadAwayGoalsTieBreak;
};
