// @ts-check
import memoize from "./utils/memoize.js";
import { spawnAsync } from "./utils/spawn.js";

/**
 * Gets the Git commit date from path.
 *
 * The code is based on @vuepress/plugin-last-updated,
 * https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-last-updated/
 *
 * @param {string} filePath The file path
 * @returns {Promise<Date | undefined>} Commit date if path is commited to Git,
 *   otherwise `undefined`
 */
async function getGitCommitDateFromPath(filePath) {
  let output;

  try {
    output = await spawnAsync("git", ["log", "-1", "--format=%at", filePath]);
  } catch (e) {
    console.log(e);
    throw new Error("Fail to run 'git log'");
  }

  const ts = parseInt(output, 10) * 1000;

  // Paths not commited to Git returns empty timestamps, resulting in NaN.
  // So, convert only valid timestamps.
  if (!isNaN(ts)) {
    return new Date(ts);
  }
}

export default memoize(getGitCommitDateFromPath);
