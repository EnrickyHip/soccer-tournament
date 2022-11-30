/* eslint-disable @typescript-eslint/no-unused-vars */
import { Match } from "../lib/Match";
import Team from "../lib/Team";
import { Tournament } from "../lib/Tournament";

class MatchMock extends Match {
  protected afterPlay(): void {
    //
  }
}

class TeamMock extends Team {
  _tournament: Tournament | null = null;
}

const createTeams = () => {
  const team1 = new TeamMock("team1", "");
  const team2 = new TeamMock("team2", "");
  return { team1, team2 };
};

const createMatches = () => {
  const { team1, team2 } = createTeams();
  const match1 = new MatchMock(team1, team2, 1);
  const match2 = new MatchMock(team1, team2, 2);

  team1.addMatch(match1);
  team1.addMatch(match2);
  team2.addMatch(match1);
  team2.addMatch(match2);

  return { team1, team2, match1, match2 };
};

describe("Match", () => {
  describe("properties", () => {
    it("should have id", () => {
      const { match1 } = createMatches();
      expect(match1).toHaveProperty("id", 1);
    });

    it("should have teams", () => {
      const { match1, team1, team2 } = createMatches();
      expect(match1).toHaveProperty("homeTeam", team1);
      expect(match1).toHaveProperty("awayTeam", team2);
    });

    it("should have null score", () => {
      const { match1 } = createMatches();
      expect(match1).toHaveProperty("score", { homeTeam: null, awayTeam: null });
    });

    it("should not be played", () => {
      const { match1 } = createMatches();
      expect(match1).toHaveProperty("isPlayed", false);
    });
  });

  describe("getTeamScore", () => {
    it("should throw error the team sent does not belongs to the match", () => {
      const { match1 } = createMatches();
      const team = new TeamMock("team", "");

      expect(() => match1.getTeamScore(team)).toThrow("Team passed as an argument does not belongs to this match");
    });

    it("should return selfScore and otherScore", () => {
      const { match1, team2 } = createMatches();
      const [selfScore, otherScore] = match1.getTeamScore(team2);

      expect(selfScore).toBe(match1.score.awayTeam);
      expect(otherScore).toBe(match1.score.homeTeam);
    });
  });

  describe("getMatchesBetween", () => {
    it("should get matches between", () => {
      const { team1, team2, match1, match2 } = createMatches();

      const team3 = new TeamMock("team3", "");
      const match3 = new MatchMock(team1, team3, 3);
      team1.addMatch(match3);
      team3.addMatch(match3);

      const matches = Match.getMatchesBetween(team2, team1);

      expect(matches).toHaveLength(2);
      expect(matches[0]).toEqual(match1);
      expect(matches[1]).toEqual(match2);

      const matches2 = Match.getMatchesBetween(team1, team3);

      expect(matches2).toHaveLength(1);
      expect(matches2[0]).toEqual(match3);
    });

    it("should return a empty array if teams have no matches in common", () => {
      const team1 = new TeamMock("team1", "");
      const team2 = new TeamMock("team3", "");
      const matches = Match.getMatchesBetween(team1, team2);

      expect(matches).toHaveLength(0);
    });
  });

  describe("headToHeadGoals", () => {
    it("should return head-to-head goals", () => {
      const { team1, team2, match1, match2 } = createMatches();

      match1.play(2, 0);
      match2.play(1, 2);

      const goals = Match.headToHeadGoals(team1, team2);
      expect(goals).toEqual([3, 2]);
    });

    it("should call Match.getMatchesBetween", () => {
      const { team1, team2 } = createMatches();
      const spy = jest.spyOn(Match, "getMatchesBetween");

      Match.headToHeadGoals(team1, team2);
      expect(spy).toBeCalledTimes(1);
    });

    it("should call goalsInMatches for both teams", () => {
      const team1 = new TeamMock("team1", "");
      const team2 = new TeamMock("team2", "");

      const spy1 = jest.spyOn(team1, "goalsInMatches");
      const spy2 = jest.spyOn(team2, "goalsInMatches");

      Match.headToHeadGoals(team1, team2);

      expect(spy1).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
    });

    it("should return 0 for both if teams have no matches in common", () => {
      const team1 = new TeamMock("team1", "");
      const team2 = new TeamMock("team2", "");

      const goals = Match.headToHeadGoals(team1, team2);
      expect(goals).toEqual([0, 0]);
    });
  });
});
