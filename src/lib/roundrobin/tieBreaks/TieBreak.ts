import { TieBreakGetAttributes } from "../../types";

export abstract class TieBreak {
  public abstract getAttributes: TieBreakGetAttributes;
  protected _reverse = false;

  public get reverse(): boolean {
    return this._reverse;
  }
}
