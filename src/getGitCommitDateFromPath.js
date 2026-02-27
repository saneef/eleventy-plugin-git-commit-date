// @ts-check
import { getRepoGitCommitDateMap } from "./utils/git.js";

async function initGetGitCommitDateFromPath() {
  const fileMap = await getRepoGitCommitDateMap();

  function getGitCommitDateFromPath(filePath) {
    return fileMap.get(filePath);
  }

  return getGitCommitDateFromPath;
}

/**
 * Gets the Git commit date from path.
 *
 * @param {string} filePath The file path
 * @returns {Date | undefined} Commit date if path is commited to Git, otherwise
 *   `undefined`
 */
const getGitCommitDateFromPath = await initGetGitCommitDateFromPath();

export default getGitCommitDateFromPath;
