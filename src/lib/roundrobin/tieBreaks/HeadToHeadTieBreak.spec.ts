import { Match } from "../../Match";
import { RoundRobinTeam } from "../RoundRobinTeam";
import { HeadToHeadTieBreak } from "./HeadToHeadTieBreak";

describe("HeadToHeadTieBreak", () => {
  const createSut = () => {
    const team1 = new RoundRobinTeam("team1", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    const sut = new HeadToHeadTieBreak();
    return { sut, team1, team2 };
  };

  it("should have getAttributes method", () => {
    const { sut } = createSut();
    expect(sut).toHaveProperty("getAttributes");
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
