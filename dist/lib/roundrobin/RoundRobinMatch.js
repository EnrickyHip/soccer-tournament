"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobinMatch = void 0;
const Match_1 = require("../Match");
class RoundRobinMatch extends Match_1.Match {
    constructor(homeTeam, awayTeam, id, tournament) {
        super(homeTeam, awayTeam, id, tournament);
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.tournament = tournament;
    }
    play(homeGoals, awayGoals) {
        const { homeTeam, awayTeam } = this.score;
        if (homeTeam === homeGoals && awayTeam === awayGoals)
            return;
        this.score.homeTeam = homeGoals;
        this.score.awayTeam = awayGoals;
        if (homeGoals === null || awayGoals === null) {
            this.isPlayed = false;
        }
        else {
            this.isPlayed = true;
        }
        this.homeTeam.playMatch(this);
        this.awayTeam.playMatch(this);
        this.tournament.sortTeams();
    }
    static create(teams, id, tournament) {
        const visitingTeam = teams[1];
        const homeTeam = teams[0];
        const match = new RoundRobinMatch(homeTeam, visitingTeam, id, tournament);
        homeTeam.addMatch(match);
        visitingTeam.addMatch(match);
        return match;
    }
}
exports.RoundRobinMatch = RoundRobinMatch;
//# sourceMappingURL=RoundRobinMatch.js.map