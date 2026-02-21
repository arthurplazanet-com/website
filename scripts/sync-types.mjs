import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REPO = "arthur-plazanet/use-github-actions";
const BRANCH = "dist";
const TYPES_DIR = "src/types";

console.log("Fetching type index from dist branch...");

const indexUrl = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/dist/index.ts`;
const indexResponse = await fetch(indexUrl);

if (!indexResponse.ok) {
  console.error(`Failed to fetch index.ts: ${indexResponse.status}`);
  process.exit(1);
}

const indexContent = await indexResponse.text();

const filePattern = /from\s+['"]\.\/([\w-]+)\.js['"]/g;
const files = [];
let match;
while ((match = filePattern.exec(indexContent)) !== null) {
  files.push(match[1]);
}

if (files.length === 0) {
  console.warn("No type files found in index.ts");
  process.exit(0);
}

console.log(`Found ${files.length} type(s): ${files.join(", ")}`);

await mkdir(TYPES_DIR, { recursive: true });

for (const file of files) {
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/dist/${file}.ts`;
  const dest = join(TYPES_DIR, `${file}.ts`);

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to fetch ${file}.ts: ${response.status}`);
    continue;
  }

  const content = await response.text();
  await writeFile(dest, content);
  console.log(`Synced ${file}.ts`);
}

await writeFile(join(TYPES_DIR, "index.ts"), indexContent);
console.log("Synced index.ts");
console.log("Done!");
