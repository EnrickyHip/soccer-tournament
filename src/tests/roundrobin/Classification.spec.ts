import { RoundRobinTeam } from "../../lib/roundrobin";
import Classification from "../../lib/roundrobin/Classification";
import { ClassificationOptions } from "../../lib/types";

const classification = {
  classified1: { min: 2, max: 4 },
  relegated: { min: 18, max: 20 },
};

const createSut = (classification: ClassificationOptions) => {
  const sut = new Classification(classification);
  const team = new RoundRobinTeam("team", "", 1);
  return { sut, team };
};

describe("Classification", () => {
  it("should have get method", () => {
    const { sut } = createSut(classification);
    expect(sut).toHaveProperty("get");
  });

  describe("get", () => {
    it("should get classification", () => {
      const { sut } = createSut(classification);
      expect(sut.get()).toBe(classification);
    });
  });

  describe("getTeamClassification", () => {
    it("should return 'first'", () => {
      const { sut } = createSut(classification);
      const team = { position: 1 } as RoundRobinTeam;
      expect(sut.getTeamClassification(team)).toBe("first");
    });

    it("should return 'classified1'", () => {
      const { sut } = createSut(classification);

      const team = { position: 1 } as RoundRobinTeam;
      const team2 = { position: 2 } as RoundRobinTeam;
      const team3 = { position: 3 } as RoundRobinTeam;
      const team4 = { position: 4 } as RoundRobinTeam;
      const team5 = { position: 5 } as RoundRobinTeam;

      expect(sut.getTeamClassification(team)).not.toBe("classified1");
      expect(sut.getTeamClassification(team2)).toBe("classified1");
      expect(sut.getTeamClassification(team3)).toBe("classified1");
      expect(sut.getTeamClassification(team4)).toBe("classified1");
      expect(sut.getTeamClassification(team5)).not.toBe("classified1");
    });

    it("should return 'relegated'", () => {
      const { sut } = createSut(classification);

      const team = { position: 17 } as RoundRobinTeam;
      const team2 = { position: 18 } as RoundRobinTeam;
      const team3 = { position: 19 } as RoundRobinTeam;
      const team4 = { position: 20 } as RoundRobinTeam;
      const team5 = { position: 21 } as RoundRobinTeam;

      expect(sut.getTeamClassification(team)).not.toBe("relegated");
      expect(sut.getTeamClassification(team2)).toBe("relegated");
      expect(sut.getTeamClassification(team3)).toBe("relegated");
      expect(sut.getTeamClassification(team4)).toBe("relegated");
      expect(sut.getTeamClassification(team5)).not.toBe("relegated");
    });

    it("should return null", () => {
      const { sut } = createSut(classification);

      const team = { position: 4 } as RoundRobinTeam;
      const team2 = { position: 5 } as RoundRobinTeam;
      const team3 = { position: 17 } as RoundRobinTeam;
      const team4 = { position: 20 } as RoundRobinTeam;

      expect(sut.getTeamClassification(team)).not.toBeNull();
      expect(sut.getTeamClassification(team2)).toBeNull();
      expect(sut.getTeamClassification(team3)).toBeNull();
      expect(sut.getTeamClassification(team4)).not.toBeNull();
    });
  });
});
