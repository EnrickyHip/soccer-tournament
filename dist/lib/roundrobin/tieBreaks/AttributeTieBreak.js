"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTieBreak = void 0;
class AttributeTieBreak {
    constructor(attribute, reverse = false) {
        this.getAttributes = (team1, team2) => {
            return [team1[this.attribute], team2[this.attribute]];
        };
        this.attribute = attribute;
        this.reverse = reverse;
    }
}
exports.AttributeTieBreak = AttributeTieBreak;
//# sourceMappingURL=AttributeTieBreak.js.map