const test = require("ava");
const path = require("path");
const fs = require("fs/promises");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const getGitCommitDateFromPath = require("../src/getGitCommitDateFromPath.js");

const outputBase = path.join("tests/output/");
const tempFileName = "test.md";

test("Get commit date of a committed file", (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = getGitCommitDateFromPath(filePath);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Should not get commit date of a uncommitted file", async (t) => {
  const filePath = path.join(outputBase, tempFileName);
  await rimraf(outputBase);

  await fs.mkdir(outputBase, { recursive: true });
  await fs.writeFile(filePath, "");

  t.is(getGitCommitDateFromPath(filePath), undefined);

  await rimraf(outputBase);
});
