"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Classification {
    constructor(classification, tournament) {
        this.classification = classification;
        this.tournament = tournament;
    }
    get(team) {
        if (!this.tournament.teams.includes(team)) {
            throw new Error("Team passed as argument does not belongs to this tournament!");
        }
        const { position } = team;
        if (position === 1)
            return "first";
        for (const key in this.classification) {
            if (this.isClassified(position, key))
                return key;
        }
        return null;
    }
    isClassified(position, classification) {
        const classified = this.classification[classification];
        return position >= classified.min && position <= classified.max;
    }
}
exports.default = Classification;
//# sourceMappingURL=Classification.js.map