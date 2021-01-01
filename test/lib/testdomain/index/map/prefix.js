function normaliseSpelling(spelling) {
    return spelling.toLowerCase().replace(/[^a-z]/g, "-");
}

function emitPrefixes(doc) {
    if ((doc === null || doc === void 0 ? void 0 : doc.type) === "word") {
        var spelling = normaliseSpelling(doc.id);
        var length_1 = spelling.length;
        if (length_1 > 0) {
            for (var last = 1; last <= length_1; last++) {
                emit(spelling.substr(0, last));
            }
        }
    }
}
emitPrefixes;
