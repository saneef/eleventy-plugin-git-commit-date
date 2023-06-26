const test = require("ava");
const path = require("path");
const fs = require("fs/promises");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const getGitCommitDateFromPathByMessage = require("../src/getGitCommitDateFromPathByMessage.js");

const outputBase = path.join("tests/output/");
const tempFileName = "test.md";

test("Get commit date of a committed file (unfiltered)", (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = getGitCommitDateFromPathByMessage(filePath);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Get commit date of a committed file (filtered 1)", (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = getGitCommitDateFromPathByMessage(filePath, { keep: /^First/ });
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:24:06.000Z");
});

test("Get commit date of a committed file (filtered 2)", (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = getGitCommitDateFromPathByMessage(filePath, { ignore: /dummy files/ });
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:24:06.000Z");
});

test("Get commit date of a committed file (no match)", (t) => {
  const filePath = path.join(__dirname, "./fixtures/sample.md");
  const date = getGitCommitDateFromPathByMessage(filePath, { keep: /never gonna give you up/ });
  t.is(date, undefined);
});

test("Should not get commit date of a uncommitted file", async (t) => {
  const filePath = path.join(outputBase, tempFileName);
  await rimraf(outputBase);

  await fs.mkdir(outputBase, { recursive: true });
  await fs.writeFile(filePath, "");

  t.is(getGitCommitDateFromPathByMessage(filePath), undefined);

  await rimraf(outputBase);
});