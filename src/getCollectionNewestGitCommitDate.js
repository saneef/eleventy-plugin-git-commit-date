// @ts-check
import getGitCommitDateFromPath from "./getGitCommitDateFromPath.js";
import memoize from "./utils/memoize.js";

/**
 * Gets the collection's newest Git commit date.
 *
 * @param {object[]} collection The collection
 * @returns {Date | undefined} The collection newest git commit date.
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

export default memoize(getCollectionNewestGitCommitDate);
