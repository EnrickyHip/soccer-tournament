"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(homeTeam, awayTeam, id) {
        this.isPlayed = false;
        this.score = { homeTeam: null, awayTeam: null };
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }
    //* seria mais interessante mandar um score inteiro talvez...
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
    }
    getTeamScore(team) {
        const { homeTeam: homeTeamGoals, awayTeam: awayTeamGoals } = this.score;
        const selfScore = this.homeTeam.name === team.name ? homeTeamGoals : awayTeamGoals;
        const otherScore = this.homeTeam.name === team.name ? awayTeamGoals : homeTeamGoals;
        return [selfScore, otherScore];
    }
    //? não sei se é uma boa ideia instanciar um objeto da classe dentro da própria classe (mesmo sendo estático????)
    static create(teams, id) {
        const homeTeam = teams[0];
        const visitingTeam = teams[1];
        const match = new Match(homeTeam, visitingTeam, id);
        homeTeam.addMatch(match);
        visitingTeam.addMatch(match);
        return match;
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