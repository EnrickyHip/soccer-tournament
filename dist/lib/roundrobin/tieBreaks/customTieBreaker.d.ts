import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";
export declare class CustomTieBreaker implements TieBreak {
    getAttributes: TieBreakGetAttributes;
    reverse: boolean;
    constructor(getAttributes: TieBreakGetAttributes, reverse?: boolean);
}
