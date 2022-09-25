import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";
export declare class HeadToHeadTieBreak implements TieBreak {
    reverse: boolean;
    getAttributes: TieBreakGetAttributes;
}
