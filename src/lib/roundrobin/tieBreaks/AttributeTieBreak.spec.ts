import { SortableAttribute } from "../../types";
import { RoundRobinTeam } from "../RoundRobinTeam";
import { AttributeTieBreak } from "./AttributeTieBreak";

describe("AttributeTieBreak", () => {
  const createSut = (attribute: SortableAttribute, reverse = false) => {
    const team1 = new RoundRobinTeam("team1", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    const sut = new AttributeTieBreak(attribute, reverse);
    return { sut, team1, team2 };
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
      const { sut, team1, team2 } = createSut("goals");

      team1.goals = 2;
      team2.goals = 3;

      const attributes = sut.getAttributes(team1, team2);
      expect(attributes).toEqual([team1.goals, team2.goals]);
    });
  });
});
