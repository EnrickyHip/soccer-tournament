import { ClassificationOptions } from "../types/interfaces";
import Classification from "./Classification";
import { RoundRobinTeam } from "./RoundRobinTeam";

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
      const { sut, team } = createSut(classification);
      team.setPosition(1);
      expect(sut.getTeamClassification(team)).toBe("first");
    });

    it("should return 'classified1'", () => {
      const { sut, team } = createSut(classification);

      team.setPosition(1);
      expect(sut.getTeamClassification(team)).not.toBe("classified1");
      team.setPosition(2);
      expect(sut.getTeamClassification(team)).toBe("classified1");
      team.setPosition(3);
      expect(sut.getTeamClassification(team)).toBe("classified1");
      team.setPosition(4);
      expect(sut.getTeamClassification(team)).toBe("classified1");
      team.setPosition(5);
      expect(sut.getTeamClassification(team)).not.toBe("classified1");
    });

    it("should return 'relegated'", () => {
      const { sut, team } = createSut(classification);

      team.setPosition(17);
      expect(sut.getTeamClassification(team)).not.toBe("relegated");
      team.setPosition(18);
      expect(sut.getTeamClassification(team)).toBe("relegated");
      team.setPosition(19);
      expect(sut.getTeamClassification(team)).toBe("relegated");
      team.setPosition(20);
      expect(sut.getTeamClassification(team)).toBe("relegated");
      team.setPosition(21);
      expect(sut.getTeamClassification(team)).not.toBe("relegated");
    });

    it("should return null", () => {
      const { sut, team } = createSut(classification);

      team.setPosition(4);
      expect(sut.getTeamClassification(team)).not.toBeNull();
      team.setPosition(5);
      expect(sut.getTeamClassification(team)).toBeNull();
      team.setPosition(17);
      expect(sut.getTeamClassification(team)).toBeNull();
      team.setPosition(18);
      expect(sut.getTeamClassification(team)).not.toBeNull();
    });
  });
});
