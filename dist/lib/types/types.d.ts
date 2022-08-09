import { MatchProtocol, RoundRobinTeamProtocol } from "./interfaces";
declare type KeysType<Obj, Type> = {
    [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];
export declare type Round = MatchProtocol[];
export declare type Goal = number | null;
export declare type Result = "win" | "draw" | "lose";
export declare type SortableAttribute = KeysType<RoundRobinTeamProtocol, number>;
export {};
