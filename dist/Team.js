"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(name, shield, id) {
        this.matchesObject = {};
        this.name = name;
        this.shield = shield;
        this.id = id;
    }
    get matches() {
        return Object.values(this.matchesObject);
    }
    get matchesPlayedArray() {
        return Object.values(this.matchesObject).filter((match) => match.isPlayed);
    }
    get matchesPlayed() {
        return this.matchesPlayedArray.length;
    }
    goalsInMatches(matches) {
        return matches.reduce((goals, match) => {
            if (match.homeTeam !== this && match.awayTeam !== this) {
                throw new Error("This team doest not belong to some match which was passed as an argument");
            }
            const [selfScore] = match.getTeamScore(this);
            return goals + selfScore;
        }, 0);
    }
    //* esse método não é recomendado o uso na lib
    addMatch(match) {
        if (this.matchesObject[match.id])
            throw new Error("Match id already exists!");
        else
            this.matchesObject[match.id] = match;
    }
}
exports.default = Team;
//# sourceMappingURL=Team.js.map