// @ts-check

const getGitCommitDateFromPath = require("./getGitCommitDateFromPath");
const memoize = require("./utils/memoize");

/**
 * Gets the collection's newest Git commit date.
 *
 * @param      {Array<object>}  collection  The collection
 * @return     {Date | undefined}  The collection newest git commit date.
 */
function getCollectionNewestGitCommitDate(collection) {
  if (!collection || !collection.length) {
    return;
  }

  const timestamps = collection
    .map((item) => getGitCommitDateFromPath(item.inputPath))
    // Timestamps will be undefined for the paths not
    // yet commited to Git. So weeding them out.
    .filter((ts) => Boolean(ts))
    .map((ts) => /** @type Date */ (ts).getTime());

  if (timestamps.length) {
    return new Date(Math.max(...timestamps));
  }
}

module.exports = memoize(getCollectionNewestGitCommitDate);
