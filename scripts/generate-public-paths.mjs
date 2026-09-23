import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("src", "app");
const paths = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === "admin" || entry.name.startsWith("_")) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(file);
    else if (entry.name === "page.tsx") {
      const relative = path.relative(root, directory).split(path.sep).join("/");
      if (/[[\]()@]/.test(relative)) throw new Error("Public analytics paths need explicit static-route generation.");
      paths.push(relative ? `/${relative}/` : "/");
    }
  }
}
await collect(root);
await writeFile(path.resolve("src", "lib", "public-paths.generated.ts"),
  `// Generated from static pages; package-admin verifies the published export.\nexport const publishedPaths: readonly string[] = ${JSON.stringify(paths.sort())};\n`);
