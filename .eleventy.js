// @ts-check
const getGitCommitDateFromPath = require("./src/getGitCommitDateFromPath");
const getCollectionNewestGitCommitDate = require("./src/getCollectionNewestGitCommitDate");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter(
    "getGitCommitDateFromPath",
    getGitCommitDateFromPath
  );
  eleventyConfig.addFilter(
    "getCollectionNewestGitCommitDate",
    getCollectionNewestGitCommitDate
  );
};

module.exports.getGitCommitDateFromPath = getGitCommitDateFromPath;
module.exports.getCollectionNewestGitCommitDate =
  getCollectionNewestGitCommitDate;
