import { SortableAttribute } from "../../types";
import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";
export declare class AttributeTieBreak implements TieBreak {
    private attribute;
    reverse: boolean;
    constructor(attribute: SortableAttribute, reverse?: boolean);
    getAttributes: TieBreakGetAttributes;
}
