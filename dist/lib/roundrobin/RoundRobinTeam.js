"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobinTeam = void 0;
const Team_1 = __importDefault(require("../Team"));
class RoundRobinTeam extends Team_1.default {
    constructor() {
        super(...arguments);
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.goals = 0;
        this.counterGoals = 0;
        this._position = 0;
    }
    get points() {
        return this.wins * 3 + this.draws;
    }
    get goalDifference() {
        return this.goals - this.counterGoals;
    }
    get percentage() {
        if (this.points === 0)
            return 0;
        return (this.points * 100) / (this.matchesPlayed * 3);
    }
    get lastMatches() {
        return this.matchesPlayedArray.slice(-5);
    }
    get lastResults() {
        return this.lastMatches.map((match) => {
            const [selfScore, otherScore] = match.getTeamScore(this);
            if (selfScore > otherScore)
                return "win";
            if (otherScore > selfScore)
                return "lose";
            return "draw";
        });
    }
    get position() {
        return this._position;
    }
    //* esse método não é recomendado o uso na lib
    setPosition(position) {
        this._position = position;
    }
    //* esse método não é recomendado o uso na lib
    playMatch(match) {
        if (!this.matchesObject[match.id]) {
            throw new Error("this team does not belongs to the sent match");
        }
        if (match.score.homeTeam === null || match.score.awayTeam === null) {
            delete this.matchesPlayedObject[match.id];
        }
        else {
            this.matchesPlayedObject[match.id] = match;
        }
        this.calculatePoints();
    }
    calculatePoints() {
        this.resetValues();
        this.matchesPlayedArray.forEach((match) => {
            this.calculateMatch(match);
        });
    }
    calculateMatch(match) {
        const [selfScore, otherScore] = match.getTeamScore(this);
        this.goals += selfScore;
        this.counterGoals += otherScore;
        if (selfScore > otherScore) {
            this.wins += 1;
        }
        else if (otherScore > selfScore) {
            this.losses += 1;
        }
        else {
            this.draws += 1;
        }
    }
    resetValues() {
        this.goals = 0;
        this.counterGoals = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
    }
}
exports.RoundRobinTeam = RoundRobinTeam;
//# sourceMappingURL=RoundRobinTeam.js.map