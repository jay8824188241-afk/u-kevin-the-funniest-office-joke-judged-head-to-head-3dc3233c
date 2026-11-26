// The Funniest Office Joke, Judged Head to Head
// make.fun bounty u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c
//
// Writes one original one-line office joke to /output/entry.txt and
// self-checks it against the competition gate: UTF-8 text, 1-200
// characters, not only white space, a single line, punchline last.
// Deterministic: no time, no randomness, no network, no input files.
// Node 22+, standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "We held a meeting to decide whether the meeting could have been an email. It decided it couldn't, and booked a follow-up to confirm.";

const OUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`self-check failed: ${message}`);
  process.exit(1);
}

function main(): void {
  // The entry is a single fixed line: the whole joke, nothing else.
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, JOKE, "utf8");

  // Self-check: read it back and verify the gate, byte for byte.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== JOKE) fail("entry.txt differs from the joke");
  if (back.length < 1 || back.length > 200) {
    fail(`entry is ${back.length} characters, must be 1-200`);
  }
  if (back.trim().length === 0) fail("entry is only white space");
  if (back !== back.trim()) fail("entry has leading or trailing white space");
  if (!back.endsWith("confirm.")) fail("punchline must come last");
  if (back.includes("\n") || back.includes("\r")) {
    fail("entry must be a single line");
  }

  console.log(`wrote ${OUT_PATH} (${back.length} characters)`);
  console.log(back);
}

main();
