/* eslint-disable @typescript-eslint/no-unused-vars */
import { Match } from "../lib/Match";
import Team from "../lib/Team";
import { Tournament } from "../lib/Tournament";

class tournamentMock extends Tournament {}
class MatchMock extends Match {
  static create(homeTeam: Team, awayTeam: Team, id: number) {
    const match = new MatchMock(homeTeam, awayTeam, id);
    homeTeam.addMatch(match);
    awayTeam.addMatch(match);

    return match;
  }

  protected afterPlay(): void {
    //
  }
}

describe("Team", () => {
  class TeamMock extends Team {
    _tournament: Tournament | null = null;
  }

  const createSut = (name: string, shield: string) => {
    const sut = new TeamMock(name, shield);
    return { sut };
  };

  describe("properties", () => {
    it("should auto increment id", () => {
      const { sut } = createSut("team", "");
      const { sut: sut2 } = createSut("team", "");
      const { sut: sut3 } = createSut("team", "");
      expect(sut).toHaveProperty("id", 1);
      expect(sut2).toHaveProperty("id", 2);
      expect(sut3).toHaveProperty("id", 3);
    });

    it("should have name", () => {
      const { sut } = createSut("Team Name", "");
      expect(sut).toHaveProperty("name", "Team Name");
    });

    it("should have shield", () => {
      const { sut } = createSut("team", "path/to/image");
      expect(sut).toHaveProperty("shield", "path/to/image");
    });
  });

  describe("tournament", () => {
    it("should throw error if team has already been in a tournament", () => {
      const { sut } = createSut("team", "");

      const team2 = new TeamMock("team2", "shield");
      const tournament = new tournamentMock([sut, team2]);

      expect(() => new tournamentMock([sut, team2])).toThrow("This match has already been on a Tournament!");
      expect(() => (sut.tournament = tournament)).toThrow("This match has already been on a Tournament!");
    });

    it("should throw error if the team does not belongs to the sent tournament", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");
      const tournament = new tournamentMock([team2]);

      expect(() => (sut.tournament = tournament)).toThrow("This team does not belongs to the passed tournament!");
    });

    it("should throw error if the team has no tournament", () => {
      const { sut } = createSut("team", "");
      expect(() => sut.tournament).toThrow("this team does not belongs to any tournament!");
    });
  });

  describe("matches", () => {
    it("should return all matches of the team (played or not)", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");

      const match1 = MatchMock.create(sut, team2, 1);
      const match2 = MatchMock.create(sut, team2, 2);

      match1.play(1, 1);

      expect(sut.matches).toHaveLength(2);
      expect(sut.matches).toEqual([match1, match2]);
    });

    it("should return an empty array with team has no matches", () => {
      const { sut } = createSut("team", "");
      expect(sut.matches).toHaveLength(0);
    });
  });

  describe("matchesPlayedArray", () => {
    it("should return all matches played of the team", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");

      MatchMock.create(sut, team2, 1);
      const match2 = MatchMock.create(sut, team2, 2);

      match2.play(1, 1);

      expect(sut.matchesPlayedArray).toHaveLength(1);
      expect(sut.matchesPlayedArray).toEqual([match2]);
    });

    it("should return an empty array with team has no matches played", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");

      MatchMock.create(sut, team2, 1);
      MatchMock.create(sut, team2, 2);

      expect(sut.matchesPlayedArray).toHaveLength(0);
    });
  });

  describe("matchesPlayed", () => {
    it("should return the number of matches played", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");

      const match1 = MatchMock.create(sut, team2, 1);
      const match2 = MatchMock.create(sut, team2, 2);

      expect(sut.matchesPlayed).toBe(0);
      match1.play(1, 1);
      expect(sut.matchesPlayed).toBe(1);
      match2.play(1, 1);
      expect(sut.matchesPlayed).toBe(2);
    });
  });

  describe("goalsInMatches", () => {
    it("should throw error if team does not belongs to some match", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");
      const team3 = new TeamMock("team3", "shield");

      const match1 = MatchMock.create(sut, team2, 1);
      const match2 = MatchMock.create(team2, team3, 2);
      const matches = [match1, match2];

      expect(() => sut.goalsInMatches(matches)).toThrow(
        "This team doest not belong to some match which was passed as an argument",
      );
    });

    it("should return the number of goals of the team in the matches sent", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");
      const team3 = new TeamMock("team3", "shield");

      const match1 = MatchMock.create(sut, team2, 1);
      const match2 = MatchMock.create(sut, team3, 2);
      const matches = [match1, match2];

      const spy1 = jest.spyOn(match1, "getTeamScore");
      const spy2 = jest.spyOn(match2, "getTeamScore");

      expect(sut.goalsInMatches(matches)).toBe(0);
      expect(spy1).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);

      match1.play(2, 1);
      match2.play(2, 0);

      expect(sut.goalsInMatches(matches)).toBe(4);
      expect(spy1).toBeCalledTimes(2);
      expect(spy2).toBeCalledTimes(2);
    });
  });

  describe("addMatch", () => {
    it("should add match", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");

      const match = new MatchMock(sut, team2, 1);
      sut.addMatch(match);

      expect(sut.matches).toHaveLength(1);
      expect(sut.matches).toEqual([match]);
    });

    it("should throw error if match has already been added", () => {
      const { sut } = createSut("team", "");
      const team2 = new TeamMock("team2", "shield");
      const match = new MatchMock(sut, team2, 1);
      sut.addMatch(match);

      expect(() => sut.addMatch(match)).toThrow("Match id already exists!");
    });
  });
});
