import { Doc, Id } from "../../../lib/mapreduce";

export type Spelling = Id;
export class Word implements Doc {
  readonly type = "word";
  readonly id: Spelling;
  constructor(spelling: Spelling) {
    this.id = spelling;
  }
}
