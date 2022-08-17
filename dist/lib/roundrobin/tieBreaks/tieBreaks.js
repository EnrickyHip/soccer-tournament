"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieBreaks = void 0;
const AttributeTieBreak_1 = require("./AttributeTieBreak");
const HeadToHeadTieBreak_1 = require("./HeadToHeadTieBreak");
const wins = new AttributeTieBreak_1.AttributeTieBreak("wins");
const goals = new AttributeTieBreak_1.AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak_1.AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak_1.HeadToHeadTieBreak();
exports.tieBreaks = { wins, goals, goalDifference, headToHead };
//# sourceMappingURL=tieBreaks.js.map