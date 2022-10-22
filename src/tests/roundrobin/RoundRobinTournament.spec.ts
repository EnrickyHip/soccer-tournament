import { RoundRobinTeam, RoundRobinTournament } from "../../lib/roundrobin";
import Classification from "../../lib/roundrobin/Classification";

describe("RoundRobinTournament", () => {
  afterEach(() => jest.clearAllMocks);

  const createSut = (secondRound: boolean) => {
    const team1 = new RoundRobinTeam("team1", "", 1);
    const team2 = new RoundRobinTeam("team2", "", 2);
    const team3 = new RoundRobinTeam("team3", "", 3);
    const team4 = new RoundRobinTeam("team4", "", 4);
    const teams = [team1, team2, team3, team4];
    const sut = new RoundRobinTournament(teams, secondRound, {}, []);
    return { teams, sut };
  };

  describe("properties", () => {
    it("should have teams", () => {
      const { sut, teams } = createSut(false);
      expect(sut).toHaveProperty("teams", teams);
    });

    it("should have classification", () => {
      const { sut } = createSut(false);
      expect(sut.classification).toBeInstanceOf(Classification);
    });
  });

  describe("rounds", () => {
    it("should create rounds", () => {
      const { sut } = createSut(false);
      expect(sut.rounds).toHaveLength(3);
    });

    it("should create the double number of rounds", () => {
      const { sut } = createSut(true);
      expect(sut.rounds).toHaveLength(6);
    });
  });

  describe("matches", () => {
    it("should create matches", () => {
      const { sut } = createSut(false);
      expect(sut.matches).toHaveLength(6);
    });

    it("should create the double number of matches", () => {
      const { sut } = createSut(true);
      expect(sut.matches).toHaveLength(12);
    });
  });

  describe("sortTeams", () => {
    it("should call positionSort", () => {
      const { sut } = createSut(false);
      const spy = jest.spyOn(sut["sort"], "positionSort");
      sut.sortTeams();

      expect(spy).toBeCalledTimes(1);
    });

    it("should call customSort if some attribute is sent", () => {
      const { sut } = createSut(false);
      const spy = jest.spyOn(sut["sort"], "customSort");

      sut.sortTeams();
      expect(spy).toBeCalledTimes(0);

      sut.sortTeams("goals");
      expect(spy).toBeCalledTimes(1);
    });

    it("should call customSort if sortAttribute of sut.sort is not 'position' and no attribute is sent", () => {
      const { sut } = createSut(false);
      const spy = jest.spyOn(sut["sort"], "customSort");

      sut["sort"].currentAttribute = "goals";
      sut.sortTeams();
      expect(spy).toBeCalledTimes(1);
    });
  });
});
