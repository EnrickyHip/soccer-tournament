import { RoundRobinMatch } from "./RoundRobinMatch";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { RoundRobinTournament } from "./RoundRobinTournament";

describe("RoundRobinTeam", () => {
  class RoundRobinTeamMock extends RoundRobinTeam {}
  const createSut = () => new RoundRobinTeamMock("team", "", 1);
  const createMatch = (sut: RoundRobinTeamMock, id: number) => {
    const tournament = new RoundRobinTournament([], false, {}, []);
    const team2 = new RoundRobinTeamMock("team2", "", 2);
    const match = RoundRobinMatch.create([sut, team2], id, tournament);
    return { match, team2, tournament };
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
    sut.setPosition(10);
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

  it("should return last five matches played", () => {
    const sut = createSut();
    const { match } = createMatch(sut, 1);
    const { match: match2 } = createMatch(sut, 2);
    const { match: match3 } = createMatch(sut, 3);
    const { match: match4 } = createMatch(sut, 4);
    const { match: match5 } = createMatch(sut, 5);
    const { match: match6 } = createMatch(sut, 6);

    expect(sut.lastMatches.length).toBe(0);

    match.play(1, 2);
    expect(sut.lastMatches.length).toBe(1);
    expect(sut.lastMatches[0]).toEqual(match);

    match2.play(1, 1);
    expect(sut.lastMatches.length).toBe(2);
    expect(sut.lastMatches[1]).toEqual(match2);

    match3.play(1, 2);
    match4.play(3, 1);
    match5.play(2, 2);
    match6.play(4, 4);
    expect(sut.lastMatches.length).toBe(5);
    expect(sut.lastMatches).toEqual([match2, match3, match4, match5, match6]);
  });

  it("should return last five results", () => {
    const sut = createSut();
    const { match } = createMatch(sut, 1);
    const { match: match2 } = createMatch(sut, 2);
    const { match: match3 } = createMatch(sut, 3);
    const { match: match4 } = createMatch(sut, 4);
    const { match: match5 } = createMatch(sut, 5);
    const { match: match6 } = createMatch(sut, 6);

    expect(sut.lastResults.length).toBe(0);

    match.play(1, 2);
    expect(sut.lastResults.length).toBe(1);
    expect(sut.lastResults).toEqual(["lose"]);

    match2.play(1, 1);
    expect(sut.lastResults.length).toBe(2);
    expect(sut.lastResults).toEqual(["lose", "draw"]);

    match3.play(1, 2);
    match4.play(3, 1);
    match5.play(2, 2);
    match6.play(4, 4);
    expect(sut.lastResults.length).toBe(5);
    expect(sut.lastResults).toEqual(["draw", "lose", "win", "draw", "draw"]);
  });
});
