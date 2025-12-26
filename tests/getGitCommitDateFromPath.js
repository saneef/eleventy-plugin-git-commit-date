import test from "ava";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import { getGitCommitDateFromPath } from "../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("Get commit date of a committed file", async (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = await getGitCommitDateFromPath(filePath);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Should not get commit date of a uncommitted file", async (t) => {
  const outputBase = path.join(__dirname, "/output/single-file-path");
  const filePath = path.join(outputBase, "test.md");
  await rimraf(outputBase);

  await mkdir(outputBase, { recursive: true });
  await writeFile(filePath, "");

  t.is(await getGitCommitDateFromPath(filePath), undefined);

  await rimraf(outputBase);
});
