"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(name, shield, id) {
        this.matchesObject = {};
        this.matchesPlayedObject = {};
        this.name = name;
        this.shield = shield;
        this.id = id;
    }
    get matches() {
        return Object.values(this.matchesObject);
    }
    get matchesPlayedArray() {
        return Object.values(this.matchesPlayedObject);
    }
    get matchesPlayed() {
        return this.matchesPlayedArray.length;
    }
    goalsInMatches(matches) {
        return matches.reduce((goals, match) => {
            const [selfScore] = match.getTeamScore(this);
            return goals + selfScore;
        }, 0);
    }
    addMatch(match) {
        this.matchesObject[match.id] = match;
    }
}
exports.default = Team;
//# sourceMappingURL=Team.js.map