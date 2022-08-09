import { ClassificationOptions, ClassificationProtocol } from "../types/interfaces";
import { RoundRobinTeam } from "./RoundRobinTeam";
declare class Classification implements ClassificationProtocol {
    private readonly classification;
    constructor(classification: ClassificationOptions);
    get(team: RoundRobinTeam): string | null;
    private isClassified;
}
export default Classification;
