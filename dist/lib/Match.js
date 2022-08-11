"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(homeTeam, awayTeam, id, tournament) {
        this.isPlayed = false;
        this.score = { homeTeam: null, awayTeam: null };
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.tournament = tournament;
    }
    getTeamScore(team) {
        if (team !== this.homeTeam && team !== this.awayTeam) {
            throw new Error("Team passed as an argument does not belongs to this match");
        }
        const { homeTeam: homeTeamGoals, awayTeam: awayTeamGoals } = this.score;
        const selfScore = this.homeTeam === team ? homeTeamGoals : awayTeamGoals;
        const otherScore = this.homeTeam === team ? awayTeamGoals : homeTeamGoals;
        return [selfScore, otherScore];
    }
    static getMatchesBetween(team1, team2) {
        return team1.matches.filter((match) => {
            const { homeTeam, awayTeam } = match;
            return (homeTeam === team1 && awayTeam === team2) || (homeTeam === team2 && awayTeam === team1);
        });
    }
    static headToHeadGoals(team1, team2) {
        const matches = Match.getMatchesBetween(team1, team2);
        const team1Goals = team1.goalsInMatches(matches);
        const team2Goals = team2.goalsInMatches(matches);
        return [team1Goals, team2Goals];
    }
}
exports.Match = Match;
//# sourceMappingURL=Match.js.map