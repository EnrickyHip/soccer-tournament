import { ClassificationOptions, ClassificationProtocol, RoundRobinTournamentProtocol } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";
declare class Classification implements ClassificationProtocol {
    private readonly classification;
    private readonly tournament;
    constructor(classification: ClassificationOptions, tournament: RoundRobinTournamentProtocol);
    get(team: RoundRobinTeam): string | null;
    private isClassified;
}
export default Classification;
