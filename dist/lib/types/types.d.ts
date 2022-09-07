import { Match } from "../Match";
import { RoundRobinTeam } from "../roundrobin";
declare type KeysType<Obj, Type> = {
    [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];
export declare type Round = Match[];
export declare type Goal = number | null;
export declare type Result = "win" | "draw" | "lose";
export declare type SortableAttribute = KeysType<RoundRobinTeam, number>;
export declare type TieBreakGetAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
export {};
