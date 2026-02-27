import test from "ava";
import { getGitCommitDateFromPath } from "../index.js";

test("Get commit date of a committed file", async (t) => {
  const filePath = "./tests/fixtures/sample.md";
  const date = await getGitCommitDateFromPath(filePath);
  t.truthy(date);
  t.is(date.toISOString(), "2021-08-19T09:57:47.000Z");
});

test("Should not get commit date of a uncommitted file", async (t) => {
  const filePath = "./tests/fixtures/file-that-dont-exist.md";

  t.is(await getGitCommitDateFromPath(filePath), undefined);
});
