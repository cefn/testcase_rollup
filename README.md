# testcase_rollup

We need to define an operation that takes a path to a single typescript file, and outputs a single javascript bundle for it.

So far we hav been defeated by surprising behaviours of the `input` and `include` parameters. This minimal reproduction is intended to inform discussion to establish what parameters are needed for this apparently simple case.

The bundle _can_ succeed without transpiling more files than necessary but only with a surprising setting to the `include` parameter as detailed below.

## Various include settings

The test cases below are provided as branches to explore alternatives. None currently make much sense. Some rollup plugin configurations seem to transpile more files than the ones referenced by the `input` source .ts file. Others fail to match the `input` file at all. The configuration which works can't be sensibly derived from the input path.

- `main` - set `include` to match `**/*.ts` two directories above relative input directory
  `` const include = `${path.join(inputDirRelative, "../../**/*")}.ts`; ``
  - RESULT: Successful compilation
- `include-exact` - set `include` to match the relative input file itself
  - RESULT: `input` file has syntax error
- `include-wildcard` - set `include` to match `*.ts` within directory of input file
  - RESULT: `input` file has syntax error
- `include-doublestar-wildcard` - set `include` to match `**/*.ts` within directory of input file
  - RESULT: `input` file has syntax error
- `include-none` - omit the `include` parameter altogether
  - RESULT: transpiles all project .ts files in the project, (`rootDir` is implicitly the longest common path of mapreduce.js and prefix.js and `include` is implicitly `**/*.ts` ?)

I believe the `include` property should control the set of files which might be considered for transpilation, (added to those referenced by the `input` file) . However its behaviour is surprising. The success cases and failure cases don't make any sense from my understanding of its intended behaviour.

Many attempts to set the `include` parameter raise a `Syntax Error`, meaning the input file is not matched by the typescript `include`, and is therefore not transpiled beforehand : parsing typescript as javascript raises a syntax error.

## Running the test case

The routine in this minimal reproduction is run like...

```
npm install
ts-node test_rollup.ts
```

N.B. the project doing the bundling is also written in typescript, and therefore has its own tsconfig.json but the configuration _aims_ to ignore this.
