import { RoundRobinTeam } from "../roundrobin";
import { RoundRobinMatch } from "../roundrobin/RoundRobinMatch";

/* criará um novo tipo com todas as chaves que forem do tipo passado como parâmetro
[Key in keyof Object] -> faz uma iteração entre todas as chaves do objeto
Object[Key] extends Type ? Key : never -> é uma condição ternária, se o valor da chave for do tipo informado,
a chave será incluida com um tipo literal, que será uma string com o nome da chave ex:{ key: "key"}, caso não, a chave não é incluida.
  [keyof Object] no final retorna apenas os tipos dos VALORES (nesse caso são tipos literais).
  */
type KeysType<Obj, Type> = {
  [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];

export type Round = RoundRobinMatch[];
export type Goal = number | null;
export type SortableAttribute = KeysType<RoundRobinTeam, number>;
export type TieBreakGetAttributes = (team1: RoundRobinTeam, team2: RoundRobinTeam) => [number, number];

export enum Result {
  win = "win",
  draw = "draw",
  lose = "lose",
}
