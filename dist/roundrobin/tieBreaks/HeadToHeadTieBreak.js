"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadToHeadTieBreak = void 0;
const Match_1 = require("../../Match");
class HeadToHeadTieBreak {
    constructor() {
        this.reverse = false;
        this.getAttributes = (team1, team2) => {
            return Match_1.Match.headToHeadGoals(team1, team2);
        };
    }
}
exports.HeadToHeadTieBreak = HeadToHeadTieBreak;
//# sourceMappingURL=HeadToHeadTieBreak.js.map