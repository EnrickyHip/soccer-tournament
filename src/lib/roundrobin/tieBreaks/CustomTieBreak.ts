import { TieBreak } from "../../types/interfaces";
import { TieBreakGetAttributes } from "../../types/types";

export class CustomTieBreak implements TieBreak {
  public getAttributes: TieBreakGetAttributes;
  public reverse: boolean;

  /**
   * Create a custom tie break.
   *
   *
   * This is how you can create a tie break based on counter goals:
   *
   * ```js
   * const counterGoalsTieBreak = new CustomTieBreak(
   *    (team1, team2) => [team1.counterGoals, team2.counterGoals],
   *    true,
   * );
   * ```
   * If the teams are tied in points and all previous tie breaks, it will sort them by less counter goals. If `false` or no value was sent on the reverse argument, it would be ordered by MORE counter goals.
   *
   * To add more logic to `getAttributes`, is interesing to declare it as a normal function or assign it to a variable before calling the `CustomTieBreak` constructor.
   *
   * option 1:
   *
   * ```js
   * function getCounterGoals(team1, team2) {
   *   return [team1.counterGoals, team2.counterGoals];
   * }
   * const counterGoalsTieBreak = new CustomTieBreak(getCounterGoals, true);
   *
   * ```
   *
   * option 2:
   *
   * ```js
   * const getCounterGoals = (team1, team2) => [team1.counterGoals, team2.counterGoals];
   * const counterGoalsTieBreak = new CustomTieBreak(getCounterGoals, true);
   * ```
   *
   *
   * Using TypeScript, when you create a normal function, you need to explicit the types of the arguments and its return. If you assign to a variable, you can just use the type aliases `TieBreakGetAttributes`.
   *
   * option 1:
   *
   * ```js
   * function getCounterGoals(team1: RoundRobinTeam, team2: RoundRobinTeam): [number, number] {
   *   return [team1.counterGoals, team2.counterGoals];
   * }
   * ```
   *
   * option 2:
   *
   * ```js
   * const getCounterGoals: TieBreakGetAttributes = (team1, team2) => [team1.counterGoals, team2.counterGoals];
   * ```
   *
   *
   *
   * @param getAttributes - A function that receive two teams and return an array with a desired attribute for each team. It is not restricted to teams object properties. It can be any value or statistic extracted from the teams. But it must be two numbers.
   * @param reverse - Boolean value to reverse the order of the sort. The default value is false.
   */

  constructor(getAttributes: TieBreakGetAttributes, reverse = false) {
    this.getAttributes = getAttributes;
    this.reverse = reverse;
  }
}
