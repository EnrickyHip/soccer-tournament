import { TieBreak } from "../types/interfaces";
import RoundRobinSort from "./RoundRobinSort";
import { RoundRobinTeam } from "./RoundRobinTeam";
import { CustomTieBreak, tieBreaks } from "./tieBreaks";

describe("RoundRobinSort", () => {
  const createSut = (tiebreaks: TieBreak[]) => {
    const sut = new RoundRobinSort(tiebreaks);
    return { sut };
  };

  it("should have property currentAttribute", () => {
    const { sut } = createSut([]);
    expect(sut).toHaveProperty("currentAttribute", "position");
  });

  describe("customSort", () => {
    it("should change currentAttribute on call customSort", () => {
      const { sut } = createSut([]);
      sut.customSort("goals");
      expect(sut.currentAttribute).toBe("goals");
    });

    it("should keep the last attribute on call customSort with no attributes", () => {
      const { sut } = createSut([]);
      const teamA = { goals: 2, points: 1 } as RoundRobinTeam;
      const teamB = { goals: 4, points: 4 } as RoundRobinTeam;
      const teamC = { goals: 0, points: 2 } as RoundRobinTeam;
      const teams = [teamA, teamB, teamC];

      teams.sort(sut.customSort("goals"));
      teams.sort(sut.positionSort());
      teams.sort(sut.customSort());

      expect(sut.currentAttribute).toBe("goals");

      expect(teams).not.toEqual([teamB, teamC, teamA]);
      expect(teams).toEqual([teamB, teamA, teamC]);
    });

    it("should sort teams by attributes", () => {
      const { sut } = createSut([]);

      const teamA = { goals: 2 } as RoundRobinTeam;
      const teamB = { goals: 4 } as RoundRobinTeam;
      const teamC = { goals: 0 } as RoundRobinTeam;
      const teams = [teamA, teamB, teamC];

      teams.sort(sut.customSort("goals"));
      expect(teams).toEqual([teamB, teamA, teamC]);

      teamA.wins = 1;
      teamB.wins = 4;

      teams.sort(sut.customSort("wins"));
      expect(teams).toEqual([teamB, teamA, teamC]);

      teams.sort(sut.customSort("wins", false));
      expect(teams).toEqual([teamB, teamA, teamC]);
    });

    it("should invert sort direction if send reverse as true", () => {
      const { sut } = createSut([]);

      const teamA = { counterGoals: 2 } as RoundRobinTeam;
      const teamB = { counterGoals: -2 } as RoundRobinTeam;
      const teamC = { counterGoals: 0 } as RoundRobinTeam;

      const teams = [teamA, teamB, teamC];

      teams.sort(sut.customSort("counterGoals", true));
      expect(teams).toEqual([teamB, teamC, teamA]);
    });

    it("should sort by position", () => {
      const { sut } = createSut([]);
      const teamA = { position: 2 } as RoundRobinTeam;
      const teamB = { position: 3 } as RoundRobinTeam;
      const teamC = { position: 1 } as RoundRobinTeam;

      const teams = [teamA, teamB, teamC];

      teams.sort(sut.customSort("position"));
      expect(teams).toEqual([teamC, teamA, teamB]);

      teams.sort(sut.customSort("position", true));
      expect(teams).toEqual([teamB, teamA, teamC]);
    });
  });

  describe("positionSort", () => {
    it("should sort by points", () => {
      const { sut } = createSut([]);

      const teamA = { points: 3 } as RoundRobinTeam;
      const teamB = { points: 6 } as RoundRobinTeam;
      const teamC = { points: 0 } as RoundRobinTeam;
      const teams = [teamA, teamB, teamC];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamB, teamA, teamC]);
    });

    it("should use tie breaks if points are equal", () => {
      const { sut } = createSut([tieBreaks.goalDifference]);

      const teamA = { points: 4, goalDifference: 3 } as RoundRobinTeam;
      const teamB = { points: 0, goalDifference: -5 } as RoundRobinTeam;
      const teamC = { points: 4, goalDifference: 2 } as RoundRobinTeam;
      const teams = [teamA, teamB, teamC];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamA, teamC, teamB]);
    });

    it("should use the next tie break if another one is equal", () => {
      const { sut } = createSut([tieBreaks.goalDifference, tieBreaks.goals]);
      const teamA = { points: 3, goalDifference: -2, goals: 1 } as RoundRobinTeam;
      const teamB = { points: 3, goalDifference: 1, goals: 3 } as RoundRobinTeam;
      const teamC = { points: 3, goalDifference: 1, goals: 2 } as RoundRobinTeam;

      const teams = [teamA, teamB, teamC];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamB, teamC, teamA]);
    });

    it("should sort by name if every attribute is equal", () => {
      const { sut } = createSut([tieBreaks.goalDifference, tieBreaks.goals]);
      const teamA = { name: "A", points: 2, goalDifference: 0, goals: 2 } as RoundRobinTeam;
      const teamB = { name: "B", points: 2, goalDifference: 0, goals: 2 } as RoundRobinTeam;
      const teamC = { name: "C", points: 2, goalDifference: 0, goals: 2 } as RoundRobinTeam;

      const teams = [teamB, teamC, teamA];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamA, teamB, teamC]);
    });

    it("should not change position if name is equal", () => {
      const { sut } = createSut([tieBreaks.goalDifference, tieBreaks.goals]);
      const teamA = { name: "A", points: 2, goalDifference: 0, goals: 2 } as RoundRobinTeam;
      const teamA2 = { name: "A", points: 2, goalDifference: 0, goals: 2 } as RoundRobinTeam;

      const teams = [teamA, teamA2];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamA, teamA2]);
    });

    it("should reverse the order if the attribute reverse of a tie break is set to true", () => {
      const counterGoalsTieBreak = new CustomTieBreak((team1, team2) => [team1.counterGoals, team2.counterGoals], true);

      const { sut } = createSut([counterGoalsTieBreak]);
      const teamA = { name: "A", points: 3, counterGoals: 2 } as RoundRobinTeam;
      const teamB = { name: "B", points: 3, counterGoals: 1 } as RoundRobinTeam;

      const teams = [teamA, teamB];

      teams.sort(sut.positionSort());
      expect(teams).toEqual([teamB, teamA]);
    });
  });
});
