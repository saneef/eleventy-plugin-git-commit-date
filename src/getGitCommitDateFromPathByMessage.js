// @ts-check
const path = require("path");
const spawn = require("cross-spawn");

/**
 * Gets the Git commit date from path, filtering commits that match a regex pattern.
 *
 * @param      {string}  filePath  The file path
 * @param      {RegExp}  regex     The regex to match against
 *
 * @return     {Date}  The git commit date if path is commited to Git.
 */
module.exports = function (filePath, regex) {
  let output;

  try {
    output = spawn.sync(
      "git",
      ["log", "--follow", "--format=%at %s", path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    );
  } catch {
    throw new Error("Fail to run 'git log'");
  }

  if (output && output.stdout) {
    const commits = output.stdout.toString("utf-8").split('\n');

    // Filter commits which match the regex.
    const filtered = !regex ? commits : commits.filter(s => s.substring(s.indexOf(' ') + 1).match(regex));

    if (filtered && filtered[0]) {
      // Grab latest commit timestamp.
      const s = filtered[0];
      const ts = parseInt(s.substring(0, s.indexOf(' ')), 10) * 1000;

      // Paths not commited to Git returns empty timestamps, resulting in NaN.
      // So, convert only valid timestamps.
      if (!isNaN(ts)) {
        return new Date(ts);
      }
    }
  }
};