import test from "ava";
import { getCollectionNewestGitCommitDate } from "../index.js";

test("Get newest commit date of collection", async (t) => {
  const collection = [
    { inputPath: "./tests/fixtures/sample.md" },
    { inputPath: "./tests/fixtures/another-sample-file.md" },
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
  const collection = [
    { inputPath: "./tests/fixtures/file-that-dont-exist.md" },
    { inputPath: "./tests/fixtures/another-file-that-dont-exist.md" },
  ];

  t.is(await getCollectionNewestGitCommitDate(collection), undefined);
});
