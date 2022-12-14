import { Match } from "../../../lib/Match";
import { RoundRobinTeam } from "../../../lib/roundrobin";
import { HeadToHeadTieBreak } from "../../../lib/roundrobin/tieBreaks/HeadToHeadTieBreak";

describe("HeadToHeadTieBreak", () => {
  const createSut = () => {
    const team1 = new RoundRobinTeam("team1", "");
    const team2 = new RoundRobinTeam("team2", "");
    const sut = new HeadToHeadTieBreak();
    return { sut, team1, team2 };
  };

  describe("attributes", () => {
    it("should have getAttributes method", () => {
      const { sut } = createSut();
      expect(sut).toHaveProperty("getAttributes");
    });

    it("should have reverse attribute set as false by default", () => {
      const { sut } = createSut();
      expect(sut).toHaveProperty("reverse");
      expect(sut.reverse).toBe(false);
    });
  });

  describe("getAttributes", () => {
    it("should call Match.HeadToHead once when getAttributes is called", () => {
      const { sut, team1, team2 } = createSut();
      const spy = jest.spyOn(Match, "headToHeadGoals");

      sut.getAttributes(team1, team2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should return Match.HeadToHead value", () => {
      const { sut, team1, team2 } = createSut();
      const attributes = sut.getAttributes(team1, team2);
      const goals = Match.headToHeadGoals(team1, team2);

      expect(attributes).toEqual(goals);
    });
  });
});
