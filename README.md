# testcase_rollup

We need to define an operation that takes a path to a single typescript file, and outputs a single javascript bundle including it and its imports using rollup.

Two configurations currently succeed at compiling the input file. Neither makes much sense as described below.

I am hoping there is a parameter which achieves what is **_really_** needed.

- Provide `include` so it explicitly lists all \*.ts files which are imported.
  - Problem: you have to inspect and manually list the recursive imports of any file in order to bundle it
  - This defeats the purpose of a bundling library, since I will have to recursively inspect and list all imports, meaning I am effectively building my own bundling library and could just use typescript transpile.
- Omit `include` (comment the include parameter)
  - Problem: rollup attempts to transpile all files in the whole project, not just the imported files
  - I believe `rootDir` becomes implicitly the longest common path of mapreduce.js and prefix.js (which is the project root folder) and `include` is implicitly "\*_/_.ts". Hence rollup transpiles all project files.

This repository is a minimal repro of the issue, with the aim of finding parameters for typescript and rollup to be able to transpile and bundling ONLY a file and its imports.

## Running the test case

The routine in this minimal reproduction is run like...

```
npm install
ts-node test_rollup.ts
```

N.B. the project doing the bundling is also written in typescript, and therefore has its own tsconfig.json but the configuration _aims_ to ignore this using the `tsconfig:false` parameter to the rollup typescript plugin.
