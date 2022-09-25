import Team from "../Team";
import { Result } from "../types";
import { RoundRobinMatch } from "./RoundRobinMatch";
/**
 * Create a Team for a Round Robin Tournament.
 */
export declare class RoundRobinTeam extends Team<RoundRobinMatch> {
    wins: number;
    draws: number;
    losses: number;
    goals: number;
    counterGoals: number;
    private _position;
    get points(): number;
    get goalDifference(): number;
    get percentage(): number;
    get position(): number;
    /**
     * Get the last played matches of the team.
     * @param total - Number of matches you want to return. The default value is 5.
     * @returns An Array cointaning the matches objects.
     */
    getLastMatches(total?: number): RoundRobinMatch[];
    /**
     * Get the result of the last played matches of the team. The possible results are "win", "draw", and "lose".
     * @param total The total results you want to get. The default values is 5.
     * @returns An array of the last results of the team.
     */
    getLastResults(total?: number): Result[];
    /**
     * Get the result of a sent match.
     * @param match - The match to get the result.
     * @returns The possible returns are the strings: "win", "draw" or "lose". If the match was not played yet, it returns `null`.
     */
    getResult(match: RoundRobinMatch): Result | null;
    /**
     * Set the position of the team.
     * @package
     * @param position the position to set.
     *
     * We do not recommend to change the team position this way.
     */
    setPosition(position: number): void;
    /**
     * This method is used internaly to calculate total wins, draws, losses, goals and counter goals.
     * @returns The team total points.
     * If you want the team's total points, it's recommended to use `team.points`.
     */
    calculatePoints(): number;
    private calculateMatch;
    private resetValues;
}
