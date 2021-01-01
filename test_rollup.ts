import path from "path";
import * as rollup from "rollup";
import rollupPluginTypescript from "@rollup/plugin-typescript";

/** Uses rollup API as documented at https://rollupjs.org/guide/en/#javascript-api */
async function run() {
  try {
    const relativeFile = "./test/lib/testdomain/index/map/prefix.ts";
    const relativeFileDir = path.dirname(relativeFile);
    const absoluteFile = path.resolve(process.cwd(), relativeFile);
    const absoluteFileDir = path.resolve(process.cwd(), relativeFileDir);
    const input: rollup.InputOptions = {
      input: absoluteFile,
      context: absoluteFileDir,
      plugins: [
        rollupPluginTypescript({
          // rootDir: process.cwd(),
          // outDir: absoluteFileDir,
          tsconfig: false,
          //          tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
          include: `./test/lib/testdomain/**/*.ts`,
          alwaysStrict: false,
          noImplicitUseStrict: true,
          target: "es5",
          strict: true,
        }),
      ],
      treeshake: false,
    };
    const output: rollup.OutputOptions = {
      dir: absoluteFileDir,
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

run();
