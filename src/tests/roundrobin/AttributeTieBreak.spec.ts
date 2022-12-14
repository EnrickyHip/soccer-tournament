import { SortableAttribute } from "../../lib/types";
import { RoundRobinTeam } from "../../lib/roundrobin/RoundRobinTeam";
import { AttributeTieBreak } from "../../lib/roundrobin/tieBreaks/AttributeTieBreak";

describe("AttributeTieBreak", () => {
  const createSut = (attribute: SortableAttribute, reverse = false) => {
    const sut = new AttributeTieBreak(attribute, reverse);
    return { sut };
  };

  describe("attributes", () => {
    it("should have getAttributes method", () => {
      const { sut } = createSut("goals");
      expect(sut).toHaveProperty("getAttributes");
    });

    it("should have reverse attribute set as false by default", () => {
      const { sut } = createSut("goals");
      expect(sut).toHaveProperty("reverse");
      expect(sut.reverse).toBe(false);
    });

    it("should change reverse if sent true in the reverse parameter", () => {
      const { sut } = createSut("goals", true);
      expect(sut.reverse).toBe(true);
    });
  });

  describe("getAttributes", () => {
    it("should return each team attribute", () => {
      const { sut } = createSut("goals");
      const team1 = { goals: 2 } as RoundRobinTeam;
      const team2 = { goals: 3 } as RoundRobinTeam;

      const attributes = sut.getAttributes(team1, team2);
      expect(attributes).toEqual([team1.goals, team2.goals]);
    });
  });
});
