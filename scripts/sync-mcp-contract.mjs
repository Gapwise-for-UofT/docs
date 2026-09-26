import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const check = args.includes("--check");
assert.ok(check !== args.includes("--write"), "Choose --check or --write");
const source = resolve(root, args.find((arg) => arg.startsWith("--source="))?.slice(9) ?? "../ai/contracts/mcp-live-surface.json");
const target = resolve(root, "contracts/mcp-live-surface.json");
const bytes = await readFile(source, "utf8").catch(() => {
  throw new Error(`AI contract missing at ${source}. Check out GapwiseHQ/ai beside Docs or pass --source=<manifest>.`);
});
const manifest = JSON.parse(bytes);
assert.equal(manifest.contractVersion, 2, "Unsupported MCP manifest contractVersion");
assert.equal(Object.values(manifest.registeredTools).flat().length, manifest.registeredToolCount);
if (check) {
  assert.equal(await readFile(target, "utf8"), bytes, "Docs MCP manifest differs from AI. Run npm run mcp-contract:sync and update the catalog.");
} else {
  await writeFile(target, bytes);
}
console.log(`Docs MCP manifest ${check ? "verified against" : "synced from"} ${source}.`);
