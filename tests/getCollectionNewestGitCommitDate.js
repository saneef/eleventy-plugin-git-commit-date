import test from "ava";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import { getCollectionNewestGitCommitDate } from "../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("Get newest commit date of collection", async (t) => {
  const collection = [
    { inputPath: path.join(__dirname, "./fixtures/sample.md") },
    { inputPath: path.join(__dirname, "./fixtures/another-sample-file.md") },
  ];
  const date = await getCollectionNewestGitCommitDate(collection);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Shouldn't get commit date from an empty collection", async (t) => {
  const collection = [];

  t.is(await getCollectionNewestGitCommitDate(collection), undefined);
});

test("Shouldn't get commit date from collection of uncommited files", async (t) => {
  const outputBase = path.join(__dirname, "output/collection");
  const collection = [
    { inputPath: path.join(outputBase, "test-01.md") },
    { inputPath: path.join(outputBase, "test-02.md") },
  ];

  await rimraf(outputBase);

  await mkdir(outputBase, { recursive: true });
  await Promise.all(collection.map((p) => writeFile(p.inputPath, "")));

  t.is(await getCollectionNewestGitCommitDate(collection), undefined);

  await rimraf(outputBase);
});
