import { resolve } from "path";
import { spawnAsync } from "./spawn.js";

const cwd = process.cwd();

/**
 * Converts relative paths (relative to current working directory) to absolute
 * path to match Eleventy's `inputPath` Assume Eleventy project root is same as
 * Git repo root.
 *
 * @param {string} filePath Path relative to current working directory.
 * @returns {string} Absolute path
 */
function absolutePath(filePath) {
  return resolve(cwd, filePath);
}

/**
 * Convert Unix Timestamp String to Date object
 *
 * @param {string} ts Unix Timestamp String
 * @returns {Date | undefined}
 */
function timestampToDate(ts) {
  const tsInMilliseconds = parseInt(ts, 10) * 1000;

  // Paths not commited to Git returns empty timestamps, resulting in NaN.
  // So, convert only valid timestamps.
  if (!isNaN(tsInMilliseconds)) {
    return new Date(tsInMilliseconds);
  }
}

/**
 * @param {string} str Git log text
 * @param {string} [timeStampMarker="TS:"] The time stamp marker. Default is
 *   `"TS:"`
 * @returns {Map<string, date>} Map with file path and date.
 */
function parseGitOutput(str, timeStampMarker = "TS:") {
  if (str === undefined) {
    return new Map();
  }

  let currentDate = null;

  const lines = str
    .split("\n")
    // Remove empty lines
    .filter(Boolean);

  const map = new Map();

  for (const line of lines) {
    if (line.startsWith(timeStampMarker)) {
      currentDate = timestampToDate(line.slice(timeStampMarker.length).trim());
    } else if (currentDate) {
      const filePath = absolutePath(line);

      // Only store first occurence, as first occurence is the latest.
      if (!map.has(filePath)) {
        map.set(filePath, currentDate);
      }
    }
  }

  return map;
}

/**
 * Returns a Map of all files in Git repo. The key is file path and value latest
 * commit date.
 *
 * The code is based on Jens' blog post 'Eleventy: How to Work Around the “git
 * Last Modified” Performance Bottleneck,'
 * https://meiert.com/blog/eleventy-git-last-modified/
 *
 * @returns {Promise<Map<string, date>>} Map of file paths and date.
 */
export async function getRepoGitCommitDateMap() {
  let output;
  try {
    output = await spawnAsync("git", ["log", "--format=TS:%at", "--name-only"]);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to run 'git log'");
  }

  return parseGitOutput(output);
}
