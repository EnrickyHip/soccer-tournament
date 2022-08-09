"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieBreaks = void 0;
const Match_1 = require("../../Match");
class AttributeTieBreak {
    constructor(attribute) {
        this.getAttributes = (team1, team2) => {
            return [team1[this.attribute], team2[this.attribute]];
        };
        this.attribute = attribute;
    }
}
class HeadToHeadTieBreak {
    constructor() {
        this.getAttributes = (team1, team2) => {
            return Match_1.Match.headToHeadGoals(team1, team2);
        };
    }
}
const wins = new AttributeTieBreak("wins");
const goals = new AttributeTieBreak("goals");
const goalDifference = new AttributeTieBreak("goalDifference");
const headToHead = new HeadToHeadTieBreak();
exports.tieBreaks = { wins, goals, goalDifference, headToHead };
//# sourceMappingURL=tieBreaks.js.map