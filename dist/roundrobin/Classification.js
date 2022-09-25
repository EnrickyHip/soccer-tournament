"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Classification {
    constructor(classification) {
        this.classification = classification;
    }
    get() {
        return this.classification;
    }
    getTeamClassification(team) {
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