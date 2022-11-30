import Team from "../lib/Team";
import { Tournament } from "../lib/Tournament";

class TournamentMock extends Tournament {}
class TeamMock extends Team {
  _tournament: Tournament | null = null;
}

const createSut = () => {
  const team = new TeamMock("team", "shield");
  const team2 = new TeamMock("team2", "shield2");
  const sut = new TournamentMock([team, team2]);
  return { sut, team, team2 };
};

describe("Tournament", () => {
  it("should add teams to the tournament", () => {
    const { sut, team, team2 } = createSut();
    expect(sut.teams).toEqual([team, team2]);
  });

  it("should have empty matches", () => {
    const { sut } = createSut();
    expect(sut.matches).toEqual([]);
  });

  it("should add tournament to each team", () => {
    const { sut, team, team2 } = createSut();

    expect(team.tournament).toBe(sut);
    expect(team2.tournament).toBe(sut);
  });
});
