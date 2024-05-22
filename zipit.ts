import { compress } from "https://deno.land/x/zip@v1.2.5/mod.ts";

console.log(
  await compress("./dist", "zipped/binary-text.zip", { overwrite: true })
);
