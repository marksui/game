#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const outFile = outIndex >= 0 ? args[outIndex + 1] : "data/extra-decks.generated.js";
const inputFiles = args.filter((arg, index) => arg !== "--out" && index !== outIndex + 1 && !arg.startsWith("--"));

const levelNames = new Set(["soft", "warm", "hot", "fantasy"]);
const topLevelKeys = new Set(["flight", "truth", "truthDare", "truthDecks", "dice", "sync", "mini", "miniGameDecks"]);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function assertCard(card, path) {
  if (!card || typeof card !== "object" || Array.isArray(card)) {
    fail(`${path} must be an object`);
    return;
  }
  if (typeof card.title !== "string" || !card.title.trim()) fail(`${path}.title is required`);
  if (typeof card.text !== "string" || !card.text.trim()) fail(`${path}.text is required`);
}

function validateCardArray(cards, path) {
  if (!Array.isArray(cards)) {
    fail(`${path} must be an array`);
    return;
  }
  cards.forEach((card, index) => assertCard(card, `${path}[${index}]`));
}

function validateLevelDeck(deck, path) {
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) {
    fail(`${path} must be an object`);
    return;
  }
  Object.entries(deck).forEach(([level, cards]) => {
    if (!levelNames.has(level)) fail(`${path}.${level} is not a supported level`);
    validateCardArray(cards, `${path}.${level}`);
  });
}

function validateTruthDeck(deck, path) {
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) {
    fail(`${path} must be an object`);
    return;
  }
  Object.entries(deck).forEach(([level, kinds]) => {
    if (!levelNames.has(level)) fail(`${path}.${level} is not a supported level`);
    if (!kinds || typeof kinds !== "object" || Array.isArray(kinds)) {
      fail(`${path}.${level} must be an object`);
      return;
    }
    if (kinds.truth !== undefined) validateCardArray(kinds.truth, `${path}.${level}.truth`);
    if (kinds.dare !== undefined) validateCardArray(kinds.dare, `${path}.${level}.dare`);
  });
}

function validateMiniDeck(deck, path) {
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) {
    fail(`${path} must be an object`);
    return;
  }
  Object.entries(deck).forEach(([game, levels]) => validateLevelDeck(levels, `${path}.${game}`));
}

function validatePack(pack, file) {
  if (!pack || typeof pack !== "object" || Array.isArray(pack)) {
    fail(`${file} must contain one deck pack object`);
    return;
  }

  Object.keys(pack)
    .filter((key) => !key.startsWith("_") && !topLevelKeys.has(key))
    .forEach((key) => fail(`${file}.${key} is not a supported deck section`));

  if (pack.flight) validateLevelDeck(pack.flight, `${file}.flight`);
  if (pack.truth) validateTruthDeck(pack.truth, `${file}.truth`);
  if (pack.truthDare) validateTruthDeck(pack.truthDare, `${file}.truthDare`);
  if (pack.truthDecks) validateTruthDeck(pack.truthDecks, `${file}.truthDecks`);
  if (pack.dice) validateLevelDeck(pack.dice, `${file}.dice`);
  if (pack.sync) validateLevelDeck(pack.sync, `${file}.sync`);
  if (pack.mini) validateMiniDeck(pack.mini, `${file}.mini`);
  if (pack.miniGameDecks) validateMiniDeck(pack.miniGameDecks, `${file}.miniGameDecks`);
}

function countCards(value) {
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + (isPromptCard(item) ? 1 : countCards(item)), 0);
  if (!value || typeof value !== "object") return 0;
  return Object.entries(value)
    .filter(([key]) => !key.startsWith("_"))
    .reduce((sum, [, item]) => sum + countCards(item), 0);
}

function isPromptCard(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value.title === "string" &&
      typeof value.text === "string",
  );
}

if (!inputFiles.length) {
  fail("Usage: node tools/build-extra-decks.mjs data/pack-a.json [data/pack-b.json] --out data/extra-decks.generated.js");
}

const packs = [];
for (const file of inputFiles) {
  const pack = JSON.parse(await readFile(file, "utf8"));
  validatePack(pack, basename(file));
  packs.push(pack);
}

if (process.exitCode) process.exit();

const js = [
  "window.NIGHT_VOYAGE_EXTRA_DECKS = ",
  JSON.stringify(packs, null, 2),
  ";\n",
].join("");

await writeFile(outFile, js, "utf8");
console.log(`Wrote ${outFile} with ${packs.length} pack(s), ${countCards(packs)} card(s).`);
