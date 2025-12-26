// @ts-check
import getCollectionNewestGitCommitDate from "./src/getCollectionNewestGitCommitDate.js";
import getGitCommitDateFromPath from "./src/getGitCommitDateFromPath.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter(
    "getGitCommitDateFromPath",
    getGitCommitDateFromPath,
  );
  eleventyConfig.addFilter(
    "getCollectionNewestGitCommitDate",
    getCollectionNewestGitCommitDate,
  );
}

export { getCollectionNewestGitCommitDate, getGitCommitDateFromPath };
