export default {
  files: ["tests/**/*", "!tests/utils.js"],
  watchMode: {
    ignoreChanges: ["tests/output/**"],
  },
};
