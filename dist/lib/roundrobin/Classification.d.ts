import { ClassificationOptions, ClassificationProtocol, RoundRobinTeamProtocol, RoundRobinTournamentProtocol } from "../types/interfaces";
declare class Classification implements ClassificationProtocol {
    private readonly classification;
    private readonly tournament;
    constructor(classification: ClassificationOptions, tournament: RoundRobinTournamentProtocol);
    get(team: RoundRobinTeamProtocol): string | null;
    private isClassified;
}
export default Classification;
