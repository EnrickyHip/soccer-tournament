import { RoundRobinMatch, RoundRobinTeam, RoundRobinTournament } from "../../lib/roundrobin";

const createSut = () => {
  const tournamentMock = new RoundRobinTournament([]);
  const team1 = new RoundRobinTeam("team1", "", 1);
  const team2 = new RoundRobinTeam("team2", "", 2);
  const sut = RoundRobinMatch.create(team1, team2, 1, tournamentMock);
  return { sut, team1, team2, tournament: tournamentMock };
};

describe("RoundRobinMatch", () => {
  describe("create", () => {
    it("should create match", () => {
      const { sut } = createSut();
      expect(sut).toBeInstanceOf(RoundRobinMatch);
    });

    it("should call addMatch on each team", () => {
      const { team1, team2, tournament } = createSut();

      const spyTeam1 = jest.spyOn(team1, "addMatch");
      const spyTeam2 = jest.spyOn(team2, "addMatch");

      const sut = RoundRobinMatch.create(team1, team2, 2, tournament);

      expect(spyTeam1).toBeCalledWith(sut);
      expect(spyTeam2).toBeCalledWith(sut);
    });
  });

  describe("Properties", () => {
    it("should have property homeTeam", () => {
      const { sut, team1 } = createSut();
      expect(sut).toHaveProperty("homeTeam", team1);
    });

    it("should have property awayTeam", () => {
      const { sut, team2 } = createSut();
      expect(sut).toHaveProperty("awayTeam", team2);
    });

    it("should have property id", () => {
      const { sut } = createSut();
      expect(sut).toHaveProperty("id", 1);
    });
  });

  describe("play", () => {
    it("should play match", () => {
      const { sut } = createSut();

      expect(sut.isPlayed).toBe(false);
      sut.play(2, 0);
      expect(sut.isPlayed).toBe(true);
      expect(sut.score).toEqual({ homeTeam: 2, awayTeam: 0 });
    });

    it("should unplay match", () => {
      const { sut } = createSut();

      sut.play(2, 0);
      sut.play(2, null);
      expect(sut.isPlayed).toBe(false);
      expect(sut.score).toEqual({ homeTeam: 2, awayTeam: null });
    });

    it("should call 'calculatePoints()' on each team", () => {
      const { sut, team1, team2 } = createSut();
      const team1Spy = jest.spyOn(team1, "calculatePoints");
      const team2Spy = jest.spyOn(team2, "calculatePoints");

      sut.play(2, 0);

      expect(team1Spy).toBeCalledTimes(1);
      expect(team2Spy).toBeCalledTimes(1);
    });

    it("should call tournament.sortTeams()", () => {
      const { sut, tournament } = createSut();
      const spy = jest.spyOn(tournament, "sortTeams");

      sut.play(2, 0);
      sut.play(null, 0);
      expect(spy).toBeCalledTimes(2);
    });
  });
});
