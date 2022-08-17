import { SortableAttribute } from "../../types";
import { RoundRobinTeam } from "../RoundRobinTeam";
import { AttributeTieBreak } from "./AttributeTieBreak";

describe("AttributeTieBreak", () => {
  const createSut = (attribute: SortableAttribute) => {
    const team1 = new RoundRobinTeam("team1", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    const sut = new AttributeTieBreak(attribute);
    return { sut, team1, team2 };
  };

  it("should have getAttributes method", () => {
    const { sut } = createSut("goals");
    expect(sut).toHaveProperty("getAttributes");
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
