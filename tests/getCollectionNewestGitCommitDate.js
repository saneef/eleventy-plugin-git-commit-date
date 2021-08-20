const test = require("ava");
const path = require("path");
const fs = require("fs/promises");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const getCollectionNewestGitCommitDate = require("../src/getCollectionNewestGitCommitDate.js");

const outputBase = path.join("tests/output/");

test("Get newest commit date of collection", (t) => {
  const collection = [
    { inputPath: path.join(__dirname, "./fixtures/sample.md") },
    { inputPath: path.join(__dirname, "./fixtures/another-sample-file.md") },
  ];
  const date = getCollectionNewestGitCommitDate(collection);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Shouldn't get commit date from an empty collection", async (t) => {
  const collection = [];

  t.is(getCollectionNewestGitCommitDate(collection), undefined);
});

test("Shouldn't get commit date from collection of uncommited files", async (t) => {
  const collection = [
    { inputPath: path.join(outputBase, "test-01.md") },
    { inputPath: path.join(outputBase, "test-02.md") },
  ];

  await rimraf(outputBase);

  await fs.mkdir(outputBase, { recursive: true });
  await Promise.all(collection.map((p) => fs.writeFile(p.inputPath, "")));

  t.is(getCollectionNewestGitCommitDate(collection), undefined);

  await rimraf(outputBase);
});
