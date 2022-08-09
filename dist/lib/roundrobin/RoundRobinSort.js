"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoundRobinSort {
    constructor(tieBreaks) {
        this.sortAttribute = "position";
        this.customSort = (attribute, sentDirection) => {
            if (attribute)
                this.sortAttribute = attribute;
            const direction = sentDirection || 1;
            return (team1, team2) => {
                if (attribute !== "position") {
                    if (team1[this.sortAttribute] < team2[this.sortAttribute])
                        return 1 * direction;
                    if (team1[this.sortAttribute] > team2[this.sortAttribute])
                        return -1 * direction;
                }
                if (team1.position > team2.position)
                    return 1 * direction;
                if (team1.position < team2.position)
                    return -1 * direction;
                return 0;
            };
        };
        this.positionSort = (team1, team2) => {
            if (team1.points > team2.points)
                return -1; // -1 still the same
            if (team1.points < team2.points)
                return 1; // 1 changes the position
            for (const tieBreaker of this.tieBreaks) {
                const [team1attribute, team2attribute] = tieBreaker.getAttributes(team1, team2);
                if (team1attribute < team2attribute)
                    return 1;
                if (team1attribute > team2attribute)
                    return -1;
            }
            if (team1.name > team2.name)
                return 1;
            if (team1.name < team2.name)
                return -1;
            return 0;
        };
        this.tieBreaks = tieBreaks;
    }
}
exports.default = RoundRobinSort;
//# sourceMappingURL=RoundRobinSort.js.map