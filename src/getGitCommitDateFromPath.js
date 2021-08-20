// @ts-check
const path = require("path");
const spawn = require("cross-spawn");

/**
 * Gets the Git commit date from path.
 *
 * The code is based on @vuepress/plugin-last-updated,
 * https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-last-updated/
 *
 * @param      {string}  filePath  The file path
 *
 * @return     {Date}  The git commit date if path is commited to Git.
 */
module.exports = function (filePath) {
  let output;

  try {
    output = spawn.sync(
      "git",
      ["log", "-1", "--format=%at", path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    );
  } catch {
    throw new Error("Fail to run 'git log'");
  }

  if (output && output.stdout) {
    const ts = parseInt(output.stdout.toString("utf-8"), 10) * 1000;

    // Paths not commited to Git returns empty timestamps, resulting in NaN.
    // So, convert only valid timestamps.
    if (!isNaN(ts)) {
      return new Date(ts);
    }
  }
};
