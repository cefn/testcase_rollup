import path from "path";
import * as rollup from "rollup";
import rollupPluginTypescript from "@rollup/plugin-typescript";

const relativeFile = "./test/lib/testdomain/index/map/prefix.ts";
run(relativeFile);

/** Uses rollup API as documented at https://rollupjs.org/guide/en/#javascript-api */
async function run(relativeFile: string) {
  try {
    const relativeFileDir = path.dirname(relativeFile);
    const absoluteFile = path.resolve(process.cwd(), relativeFile);
    const absoluteFileDir = path.resolve(process.cwd(), relativeFileDir);
    const input: rollup.InputOptions = {
      input: absoluteFile,
      context: absoluteFileDir,
      plugins: [
        rollupPluginTypescript({
          tsconfig: false,
          include: `${path.join(relativeFileDir, "../../**/*")}.ts`,
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
