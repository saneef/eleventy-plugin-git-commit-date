// @ts-check
import getCollectionNewestGitCommitDate from "./src/getCollectionNewestGitCommitDate.js";
import getGitCommitDateFromPath from "./src/getGitCommitDateFromPath.js";

export default function (eleventyConfig) {
  eleventyConfig.addAsyncFilter(
    "getGitCommitDateFromPath",
    getGitCommitDateFromPath,
  );
  eleventyConfig.addAsyncFilter(
    "getCollectionNewestGitCommitDate",
    getCollectionNewestGitCommitDate,
  );
}

export { getCollectionNewestGitCommitDate, getGitCommitDateFromPath };
