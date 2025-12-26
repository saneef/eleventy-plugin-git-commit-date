module.exports = {
  files: ["tests/**/*", "!tests/utils.js"],
  watchMode: {
    ignoreChanges: ["tests/output/**"],
  },
};