"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadToHeadAwayGoalsTieBreak = void 0;
const Match_1 = require("../../Match");
class HeadToHeadAwayGoalsTieBreak {
    constructor() {
        this.reverse = false;
        this.getAttributes = (team1, team2) => {
            const headToHead = Match_1.Match.getMatchesBetween(team1, team2);
            let team1Goals = 0;
            let team2Goals = 0;
            headToHead.forEach((match) => {
                if (!match.isPlayed)
                    return;
                if (match.awayTeam.id === team1.id) {
                    team1Goals += match.score.awayTeam;
                }
                else {
                    team2Goals += match.score.awayTeam;
                }
            });
            return [team1Goals, team2Goals];
        };
    }
}
exports.HeadToHeadAwayGoalsTieBreak = HeadToHeadAwayGoalsTieBreak;
//# sourceMappingURL=HeadToHeadAwayGoalsTieBreak.js.map