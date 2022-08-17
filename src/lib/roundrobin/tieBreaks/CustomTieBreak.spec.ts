import { RoundRobinTeam } from "../RoundRobinTeam";
import { CustomTieBreaker } from "./CustomTieBreaker";

describe("CustomTieBreak", () => {
  const customMethod = (team1: RoundRobinTeam, team2: RoundRobinTeam): [number, number] => {
    return [team1.name.length, team2.name.length];
  };

  const createSut = (customMethod: (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number]) => {
    const sut = new CustomTieBreaker(customMethod);
    const team1 = new RoundRobinTeam("team", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    return { sut, team1, team2 };
  };

  it("should have a custom method on getAttributes", () => {
    const { sut } = createSut(customMethod);
    expect(sut).toHaveProperty("getAttributes", customMethod);
  });

  describe("getAttributes", () => {
    it("should return the return of the custom method", () => {
      const { sut, team1, team2 } = createSut(customMethod);

      const attributes = sut.getAttributes(team1, team2);
      const customReturn = customMethod(team1, team2);

      expect(attributes).toEqual(customReturn);
    });
  });
});
