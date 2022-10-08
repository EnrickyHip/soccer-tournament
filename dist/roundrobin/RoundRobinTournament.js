"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobinTournament = void 0;
const roundrobin_tournament_js_1 = __importDefault(require("roundrobin-tournament-js"));
const Classification_1 = __importDefault(require("./Classification"));
const RoundRobinMatch_1 = require("./RoundRobinMatch");
const RoundRobinSort_1 = __importDefault(require("./RoundRobinSort"));
class RoundRobinTournament {
    constructor(teams, secondRound, classification, tieBreaks) {
        this.matches = [];
        this.teams = teams;
        this.secondRound = secondRound;
        this.classification = new Classification_1.default(classification);
        this.sort = new RoundRobinSort_1.default(tieBreaks);
        this.rounds = this.createRounds();
        this.sortTeams();
    }
    createRounds() {
        const rounds = (0, roundrobin_tournament_js_1.default)(this.teams, this.secondRound);
        return this.createMatches(rounds);
    }
    createMatches(rounds) {
        return rounds.map((round) => {
            return round.map((teams) => {
                const id = this.matches.length;
                const newMatch = RoundRobinMatch_1.RoundRobinMatch.create(teams[0], teams[1], id, this);
                this.matches.push(newMatch);
                return newMatch;
            });
        });
    }
    sortTeams(attribute, reverse = false) {
        this.teams.sort(this.sort.positionSort());
        this.teams.forEach((team, index) => {
            team.setPosition(index + 1);
        });
        if (attribute !== undefined || this.sort.currentAttribute !== "position") {
            this.teams.sort(this.sort.customSort(attribute, reverse));
        }
    }
}
exports.RoundRobinTournament = RoundRobinTournament;
//# sourceMappingURL=RoundRobinTournament.js.map