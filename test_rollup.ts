import path from "path";
import * as rollup from "rollup";
import rollupPluginTypescript from "@rollup/plugin-typescript";

const inputFileRelative = "./test/lib/testdomain/index/map/prefix.ts";
run(inputFileRelative);

/** Uses rollup API as documented at https://rollupjs.org/guide/en/#javascript-api */
async function run(inputFileRelative: string) {
  try {
    const inputDirRelative = path.dirname(inputFileRelative);
    const inputFileAbsolute = path.resolve(process.cwd(), inputFileRelative);
    const inputDirAbsolute = path.resolve(process.cwd(), inputDirRelative);
    const include = [
      inputFileRelative,
      "./lib/mapreduce.ts",
      "./test/lib/testdomain/index/common/util.ts",
    ];
    const input: rollup.InputOptions = {
      input: inputFileAbsolute,
      context: inputDirAbsolute,
      plugins: [
        rollupPluginTypescript({
          //          include,
          tsconfig: false,
          target: "es5",
          strict: true,
          alwaysStrict: false,
          noImplicitUseStrict: true,
        }),
      ],
      treeshake: false,
    };
    const output: rollup.OutputOptions = {
      dir: inputDirAbsolute,
      format: "es",
    };
    const bundle = await rollup.rollup(input);
    await bundle.write(output);
  } catch (error) {
    console.log(error);
    return;
  }
  console.log("Success!");
}
