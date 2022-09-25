"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobinTeam = void 0;
const Team_1 = __importDefault(require("../Team"));
const types_1 = require("../types");
/**
 * Create a Team for a Round Robin Tournament.
 */
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
    get position() {
        return this._position;
    }
    /**
     * Get the last played matches of the team.
     * @param total - Number of matches you want to return. The default value is 5.
     * @returns An Array cointaning the matches objects.
     */
    getLastMatches(total = 5) {
        return this.matchesPlayedArray.slice(-total);
    }
    /**
     * Get the result of the last played matches of the team. The possible results are "win", "draw", and "lose".
     * @param total The total results you want to get. The default values is 5.
     * @returns An array of the last results of the team.
     */
    getLastResults(total = 5) {
        return this.getLastMatches(total).map((match) => {
            return this.getResult(match);
        });
    }
    /**
     * Get the result of a sent match.
     * @param match - The match to get the result.
     * @returns The possible returns are the strings: "win", "draw" or "lose". If the match was not played yet, it returns `null`.
     */
    getResult(match) {
        if (match.homeTeam !== this && match.awayTeam !== this) {
            throw new Error("This team does not belongs to the sent match.");
        }
        if (!match.isPlayed)
            return null;
        const [selfScore, otherScore] = match.getTeamScore(this);
        if (selfScore > otherScore)
            return types_1.Result.win;
        if (otherScore > selfScore)
            return types_1.Result.lose;
        return types_1.Result.draw;
    }
    /**
     * Set the position of the team.
     * @package
     * @param position the position to set.
     *
     * We do not recommend to change the team position this way.
     */
    setPosition(position) {
        this._position = position;
    }
    /**
     * This method is used internaly to calculate total wins, draws, losses, goals and counter goals.
     * @returns The team total points.
     * If you want the team's total points, it's recommended to use `team.points`.
     */
    calculatePoints() {
        this.resetValues();
        this.matchesPlayedArray.forEach((match) => {
            this.calculateMatch(match);
        });
        return this.points;
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