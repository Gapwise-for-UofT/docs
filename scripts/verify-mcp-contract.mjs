import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const contract = JSON.parse(
  await readFile(new URL("contracts/mcp-live-surface.json", root), "utf8"),
);
const toolsDoc = await readFile(new URL("src/content/docs/ai/tools.md", root), "utf8");
const permissionsDoc = await readFile(
  new URL("src/content/docs/ai/permissions.md", root),
  "utf8",
);
const homeDoc = await readFile(new URL("src/content/docs/index.mdx", root), "utf8");
const quickstartDoc = await readFile(new URL("src/content/docs/quickstart.md", root), "utf8");

const section = (document, heading, nextHeading) => {
  const start = document.indexOf(heading);
  assert.notEqual(start, -1, `Missing documentation section: ${heading}`);
  const end = nextHeading ? document.indexOf(nextHeading, start + heading.length) : -1;
  return document.slice(start, end === -1 ? undefined : end);
};

const tableTools = (markdown) =>
  [...markdown.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1]);
const bulletTools = (markdown) =>
  [...markdown.matchAll(/^- `([^`]+)`$/gm)].map((match) => match[1]);

const publicReadTools = contract.registeredTools.publicRead;
const privateReadTools = contract.registeredTools.privateRead;
const privateWriteTools = contract.registeredTools.privateWrite;
const allRegisteredTools = [...publicReadTools, ...privateReadTools, ...privateWriteTools];
const uniqueRegisteredTools = new Set(allRegisteredTools);

assert.equal(
  uniqueRegisteredTools.size,
  contract.registeredToolCount,
  "The contract manifest has duplicate or missing registered tools",
);
assert.equal(
  allRegisteredTools.length,
  contract.registeredToolCount,
  "registeredToolCount does not match the manifest tool lists",
);

assert.deepEqual(
  tableTools(section(toolsDoc, "## Public campus intelligence", "## Private read, status, and planning tools")),
  publicReadTools,
  "The documented public tool table drifted from the MCP contract manifest",
);
assert.deepEqual(
  tableTools(section(toolsDoc, "## Private read, status, and planning tools", "## Bounded private write tools")),
  privateReadTools,
  "The documented private read-tool table drifted from the MCP contract manifest",
);
assert.deepEqual(
  tableTools(section(toolsDoc, "## Bounded private write tools", "## Combining private and public tools")),
  privateWriteTools,
  "The documented private write-tool table drifted from the MCP contract manifest",
);
assert.deepEqual(
  bulletTools(section(permissionsDoc, "## Bounded writes", "## Queued does not mean applied")),
  privateWriteTools,
  "The permission guide's write surface drifted from the registered private write tools",
);

assert.match(
  toolsDoc,
  new RegExp(`\\b${contract.registeredToolCount} tools\\b`),
  "The tools guide has a stale registered-tool count",
);
assert.match(
  homeDoc,
  new RegExp(`\\*\\*${contract.registeredToolCount} tools total\\*\\*`),
  "The developer home page has a stale registered-tool count",
);
for (const [count, label] of [
  [publicReadTools.length, "stateless public campus reads"],
  [privateReadTools.length, "permissioned private reads/planning tools"],
  [privateWriteTools.length, "permissioned private write tool"],
]) {
  assert.match(
    homeDoc,
    new RegExp(`\\*\\*${count} ${label}`),
    `The developer home page has a stale ${label} count`,
  );
}
assert.match(
  quickstartDoc,
  new RegExp(
    `\\*\\*${contract.registeredToolCount} tools total: ${publicReadTools.length} public \\+ ${privateReadTools.length + privateWriteTools.length} private\\*\\*`,
  ),
  "The quickstart has a stale public/private tool count",
);
assert.match(
  toolsDoc,
  /Public tools do \*\*not\*\* require a Gapwise account/,
  "The public/private MCP trust boundary must remain explicit",
);
assert.match(
  permissionsDoc,
  /No live MCP tool creates, edits, or deletes an imported academic meeting\./,
  "The academic-timetable immutability boundary must remain explicit",
);
assert.match(
  permissionsDoc,
  /Each write requires its relevant explicit delegation and the current `expectedRevision`\./,
  "The write surface must document delegation and stale-write protection",
);
assert.match(
  permissionsDoc,
  /successful write creates a typed queued action/,
  "The docs must describe writes as queued rather than directly applied",
);
assert.match(
  permissionsDoc,
  /bounded idempotency key/,
  "The exact-retry boundary must remain documented",
);

console.log(
  `Verified ${allRegisteredTools.length} registered MCP tools: ${publicReadTools.length} public reads, ${privateReadTools.length} private reads, and ${privateWriteTools.length} bounded private writes.`,
);
