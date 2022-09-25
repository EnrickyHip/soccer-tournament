import { RoundRobinTeam } from "../roundrobin";
import { RoundRobinMatch } from "../roundrobin/RoundRobinMatch";
declare type KeysType<Obj, Type> = {
    [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];
export declare type Round = RoundRobinMatch[];
export declare type Goal = number | null;
export declare type SortableAttribute = KeysType<RoundRobinTeam, number>;
export declare type TieBreakGetAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];
export declare enum Result {
    win = "win",
    draw = "draw",
    lose = "lose"
}
export {};
