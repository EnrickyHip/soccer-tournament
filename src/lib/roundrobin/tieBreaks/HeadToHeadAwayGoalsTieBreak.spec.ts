import { Match } from "../../Match";
import { RoundRobinMatch } from "../RoundRobinMatch";
import { RoundRobinTeam } from "../RoundRobinTeam";
import { RoundRobinTournament } from "../RoundRobinTournament";
import { HeadToHeadAwayGoalsTieBreak } from "./HeadToHeadAwayGoalsTieBreak";

describe("HeadToHeadAwayGoalsTieBreak", () => {
  const createSut = () => {
    const team1 = new RoundRobinTeam("team1", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    const sut = new HeadToHeadAwayGoalsTieBreak();
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
      const spy = jest.spyOn(Match, "getMatchesBetween");

      sut.getAttributes(team1, team2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should get teams head-to-head away goals", () => {
      const { sut, team1, team2 } = createSut();
      const team3 = new RoundRobinTeam("team3", "", 3);
      const tournamentMock = new RoundRobinTournament([], false, {}, []);

      const match1 = RoundRobinMatch.create([team1, team2], 1, tournamentMock);
      const match2 = RoundRobinMatch.create([team2, team1], 2, tournamentMock);
      const match3 = RoundRobinMatch.create([team2, team3], 3, tournamentMock);
      const match4 = RoundRobinMatch.create([team3, team1], 4, tournamentMock);
      const match5 = RoundRobinMatch.create([team2, team1], 5, tournamentMock);

      match1.play(2, 3);
      match2.play(2, 1);
      match3.play(1, 1);
      match4.play(2, 2);
      match5.play(2, 2);

      expect(sut.getAttributes(team1, team2)).toEqual([3, 3]);
      expect(sut.getAttributes(team1, team3)).toEqual([2, 0]);
      expect(sut.getAttributes(team2, team3)).toEqual([0, 1]);
    });
  });
});
