import type { EmitFunction } from "../../../../../lib/mapreduce";
import type { Word } from "../../types";
import { normaliseSpelling } from "../common/util";

declare var emit: EmitFunction<string>;

function emitPrefixes(doc: Word) {
  if (doc?.type === "word") {
    const spelling = normaliseSpelling(doc.id);
    const length = spelling.length;
    if (length > 0) {
      for (let last = 1; last <= length; last++) {
        emit(spelling.substr(0, last));
      }
    }
  }
}

emitPrefixes;
