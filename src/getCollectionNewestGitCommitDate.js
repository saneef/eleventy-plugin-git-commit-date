// @ts-check
import getGitCommitDateFromPath from "./getGitCommitDateFromPath.js";
import memoize from "./utils/memoize.js";

/**
 * Gets the collection's newest Git commit date.
 *
 * @param {object[]} collection Collection
 * @returns {Promise<Date | undefined>} Newest git commit date among the items
 *   in the collection
 */
async function getCollectionNewestGitCommitDate(collection) {
  if (!collection || !collection.length) {
    return;
  }

  const timestamps = await Promise.all(
    collection.map((item) => getGitCommitDateFromPath(item.inputPath)),
  );

  const dates = timestamps
    // Timestamps will be undefined for the paths not
    // yet commited to Git. So weeding them out.
    .filter((ts) => Boolean(ts))
    .map((ts) => ts.getTime());

  if (dates.length) {
    return new Date(Math.max(...dates));
  }
}

export default memoize(getCollectionNewestGitCommitDate);
