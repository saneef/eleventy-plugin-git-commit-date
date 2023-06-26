// @ts-check
const path = require("path");
const spawn = require("cross-spawn");

/**
 * Gets the Git commit date from path, filtering commits by regex.
 *
 * @param      {string}  filePath  The file path
 * @param      {Object}  options   Filter options
 * @param      {RegExp}  options.keep Whitelisting regex. Commit subjects matching this regex are kept.
 * @param      {RegExp}  options.ignore Blacklisting regex. Commit subjects matching this regex are ignored.
 *
 * @return     {Date}  The git commit date if path is commited to Git.
 */
module.exports = function (filePath, options) {
  return options ? getGitCommitDateFiltered(filePath, options) : getGitCommitDateFast(filePath);
};

function getGitCommitDateFast(filePath) {
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
}

function getGitCommitDateFiltered(filePath, options) {
  const { keep, ignore } = options || {};

  function matchesWhitelist(subject) {
    return keep ? subject.match(keep) : true;
  }
  function matchesBlacklist(subject) {
    return ignore ? !subject.match(ignore) : true;
  }

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

    // Filter commits which match filter options.
    const filtered = commits.filter(s => {
      const subject = s.substring(s.indexOf(' ') + 1);
      return matchesWhitelist(subject) && matchesBlacklist(subject);
    });

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
}