"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoundRobinSort {
    constructor(tieBreaks) {
        this.currentAttribute = "position";
        this.customSort = (attribute = this.currentAttribute, reverse = false) => {
            this.currentAttribute = attribute;
            const direction = reverse ? -1 : 1;
            return (team1, team2) => {
                if (attribute !== "position") {
                    if (team1[this.currentAttribute] < team2[this.currentAttribute])
                        return 1 * direction;
                    if (team1[this.currentAttribute] > team2[this.currentAttribute])
                        return -1 * direction;
                }
                if (team1.position > team2.position)
                    return 1 * direction;
                if (team1.position < team2.position)
                    return -1 * direction;
                return 0;
            };
        };
        this.positionSort = () => {
            return (team1, team2) => {
                if (team1.points < team2.points)
                    return 1; // 1 changes the position
                if (team1.points > team2.points)
                    return -1; // -1 still the same
                for (const tieBreak of this.tieBreaks) {
                    const [team1attribute, team2attribute] = tieBreak.getAttributes(team1, team2);
                    const direction = tieBreak.reverse ? -1 : 1;
                    if (team1attribute < team2attribute)
                        return 1 * direction;
                    if (team1attribute > team2attribute)
                        return -1 * direction;
                }
                if (team1.name > team2.name)
                    return 1;
                if (team1.name < team2.name)
                    return -1;
                return 0;
            };
        };
        this.tieBreaks = tieBreaks;
    }
}
exports.default = RoundRobinSort;
//# sourceMappingURL=RoundRobinSort.js.map