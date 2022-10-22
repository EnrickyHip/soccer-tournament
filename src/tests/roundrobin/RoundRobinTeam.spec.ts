import { RoundRobinMatch, RoundRobinTeam, RoundRobinTournament } from "../../lib/roundrobin";

describe("RoundRobinTeam", () => {
  class RoundRobinTeamMock extends RoundRobinTeam {}

  const createSut = () => new RoundRobinTeamMock("team", "", 1);

  const createMatch = (sut: RoundRobinTeamMock, id: number) => {
    const tournamentMock = new RoundRobinTournament([], false, {}, []);
    const team2 = new RoundRobinTeamMock("team2", "", 2);
    const match = RoundRobinMatch.create(sut, team2, id, tournamentMock);
    return { match, team2 };
  };

  const createMatches = (sut: RoundRobinTeamMock) => {
    const { match } = createMatch(sut, 1);
    const { match: match2 } = createMatch(sut, 2);
    const { match: match3 } = createMatch(sut, 3);
    const { match: match4 } = createMatch(sut, 4);
    const { match: match5 } = createMatch(sut, 5);
    const { match: match6 } = createMatch(sut, 6);

    return { match, match2, match3, match4, match5, match6 };
  };

  describe("properties", () => {
    it("should have properties", () => {
      const sut = createSut();
      expect(sut).toHaveProperty("wins", 0);
      expect(sut).toHaveProperty("draws", 0);
      expect(sut).toHaveProperty("losses", 0);
      expect(sut).toHaveProperty("goals", 0);
      expect(sut).toHaveProperty("counterGoals", 0);
    });

    it("should calculate goal difference", () => {
      const sut = createSut();
      sut.goals = 4;
      sut.counterGoals = 1;

      expect(sut.goalDifference).toBe(3);
    });

    it("should calculate percentage", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);

      expect(sut).toHaveProperty("percentage", 0);
      match.play(1, 1);

      expect(sut.percentage).toBeCloseTo(33.33);
    });
  });

  it("should set position", () => {
    const sut = createSut();
    sut.position = 10;
    expect(sut.position).toBe(10);
  });

  describe("calculatePoints", () => {
    it("should calculate points", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);
      const { match: match2 } = createMatch(sut, 2);
      const { match: match3 } = createMatch(sut, 3);

      expect(sut.points).toBe(0);
      match.play(2, 1);
      expect(sut.points).toBe(3);
      expect(sut.calculatePoints()).toBe(sut.points);
      match2.play(0, 1);
      expect(sut.points).toBe(3);
      expect(sut.calculatePoints()).toBe(sut.points);
      match3.play(1, 1);
      expect(sut.points).toBe(4);
      expect(sut.calculatePoints()).toBe(sut.points);
    });
  });

  describe("getLastMatches", () => {
    it("should return an empty array if no match was played", () => {
      const sut = createSut();
      const lastMatches = sut.getLastMatches();
      expect(lastMatches.length).toBe(0);
      createMatch(sut, 1);
      expect(lastMatches.length).toBe(0);
    });

    it("should return all matches if number of played matches are less than five", () => {
      const sut = createSut();
      const { match, match2, match3 } = createMatches(sut);

      match.play(1, 2);
      match2.play(1, 2);
      match3.play(1, 2);

      expect(sut.getLastMatches().length).toBe(sut.matchesPlayed);
    });

    it("should return last five matches if team have more than 5 matches played and no parameter is sent", () => {
      const sut = createSut();
      const { match, match2, match3, match4, match5, match6 } = createMatches(sut);

      match.play(1, 2);
      match2.play(1, 2);
      match3.play(1, 2);
      match4.play(1, 2);
      match5.play(1, 2);
      match6.play(1, 2);

      expect(sut.getLastMatches().length).toBe(5);
    });

    it("should return last matches played", () => {
      const sut = createSut();
      const { match, match2, match3, match4, match5, match6 } = createMatches(sut);

      expect(sut.getLastMatches().length).toBe(0);

      match.play(1, 2);
      expect(sut.getLastMatches().length).toBe(1);
      expect(sut.getLastMatches()[0]).toEqual(match);

      match2.play(1, 1);
      expect(sut.getLastMatches().length).toBe(2);
      expect(sut.getLastMatches()[1]).toEqual(match2);

      match3.play(1, 2);
      match4.play(3, 1);
      match5.play(2, 2);
      match6.play(4, 4);
      expect(sut.getLastMatches().length).toBe(5);
      expect(sut.getLastMatches()).toEqual([match2, match3, match4, match5, match6]);
    });

    it("should return specified number of last matches played", () => {
      const sut = createSut();
      const { match, match2, match3, match4, match6 } = createMatches(sut);
      match.play(2, 2);
      match2.play(3, 2);
      match6.play(0, 2);
      match3.play(3, 3);
      match4.play(0, 1);

      const lastMatches = sut.getLastMatches(4);

      expect(lastMatches.length).toBe(4);
      expect(lastMatches).toEqual([match2, match3, match4, match6]);
    });
  });

  describe("getLastResults", () => {
    it("should return an empty array if no match was played", () => {
      const sut = createSut();
      const lastResults = sut.getLastResults();
      expect(lastResults.length).toBe(0);
      createMatch(sut, 1);
      expect(lastResults.length).toBe(0);
    });

    it("should return all results if number of played matches are less than five", () => {
      const sut = createSut();
      const { match, match2, match3 } = createMatches(sut);

      match.play(1, 2);
      match2.play(1, 2);
      match3.play(1, 2);

      expect(sut.getLastResults().length).toBe(sut.matchesPlayed);
    });

    it("should return last five results if team have more than 5 matches played and no parameter is sent", () => {
      const sut = createSut();
      const { match, match2, match3, match4, match5, match6 } = createMatches(sut);

      match.play(1, 2);
      match2.play(1, 2);
      match3.play(1, 2);
      match4.play(1, 2);
      match5.play(1, 2);
      match6.play(1, 2);

      expect(sut.getLastResults().length).toBe(5);
    });

    it("should return last results", () => {
      const sut = createSut();
      const { match, match2, match3, match4, match5, match6 } = createMatches(sut);

      expect(sut.getLastResults().length).toBe(0);

      match.play(1, 2);
      expect(sut.getLastResults().length).toBe(1);
      expect(sut.getLastResults()[0]).toEqual("lose");

      match2.play(1, 1);
      expect(sut.getLastResults().length).toBe(2);
      expect(sut.getLastResults()[1]).toEqual("draw");

      match3.play(1, 2);
      match4.play(3, 1);
      match5.play(2, 2);
      match6.play(4, 4);
      expect(sut.getLastResults().length).toBe(5);
      expect(sut.getLastResults()).toEqual(["draw", "lose", "win", "draw", "draw"]);
    });

    it("should return specified number of last results", () => {
      const sut = createSut();
      const { match, match2, match3, match5, match6 } = createMatches(sut);
      match.play(1, 2);
      match2.play(1, 2);
      match6.play(3, 2);
      match3.play(4, 2);
      match5.play(2, 2);

      const lastResults = sut.getLastResults(4);

      expect(lastResults.length).toBe(4);
      expect(lastResults).toEqual(["lose", "win", "draw", "win"]);
    });
  });

  describe("getResult", () => {
    it("should throw error if the team does not belongs to the match sent", () => {
      const sut = createSut();
      const team2 = new RoundRobinTeamMock("team2", "", 2);
      const team3 = new RoundRobinTeamMock("team3", "", 3);
      const tournamentMock = new RoundRobinTournament([], false, {}, []);
      const match = RoundRobinMatch.create(team2, team3, 1, tournamentMock);

      expect(() => sut.getResult(match)).toThrow("This team does not belongs to the sent match.");
    });

    it("should return 'win' when the team have won the match", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);
      match.play(2, 1);
      expect(sut.getResult(match)).toBe("win");
    });

    it("should return 'draw' when the match was a draw", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);
      match.play(2, 2);
      expect(sut.getResult(match)).toBe("draw");
    });

    it("should return 'lose' when the team have lost the match", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);
      match.play(0, 1);
      expect(sut.getResult(match)).toBe("lose");
    });

    it("should return null if the match was not played yet", () => {
      const sut = createSut();
      const { match } = createMatch(sut, 1);
      expect(sut.getResult(match)).toBeNull();
    });
  });
});
