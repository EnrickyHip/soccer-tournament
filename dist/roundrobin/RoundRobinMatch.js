"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobinMatch = void 0;
const Match_1 = require("../Match");
class RoundRobinMatch extends Match_1.Match {
    constructor(homeTeam, awayTeam, id, tournament) {
        super(homeTeam, awayTeam, id);
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.tournament = tournament;
    }
    play(homeGoals, awayGoals) {
        this.score.homeTeam = homeGoals;
        this.score.awayTeam = awayGoals;
        if (homeGoals === null || awayGoals === null) {
            this.isPlayed = false;
        }
        else {
            this.isPlayed = true;
        }
        this.homeTeam.calculatePoints();
        this.awayTeam.calculatePoints();
        this.tournament.sortTeams();
    }
    static create(homeTeam, awayTeam, id, tournament) {
        const match = new RoundRobinMatch(homeTeam, awayTeam, id, tournament);
        homeTeam.addMatch(match);
        awayTeam.addMatch(match);
        return match;
    }
}
exports.RoundRobinMatch = RoundRobinMatch;
//# sourceMappingURL=RoundRobinMatch.js.map