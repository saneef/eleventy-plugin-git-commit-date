# eleventy-plugin-git-commit-date

This Eleventy plugin adds two [filters](https://www.11ty.dev/docs/filters/) to your templates:

1. `getGitCommitDateFromPath`: Returns Git commit date from path. E.g. `{{ page.inputPath | getGitCommitDateFromPath }}`.
2. `getCollectionNewestGitCommitDate`: Returns Git commit date of the newest committed file from a collection. E.g. `{{ collections.all | getCollectionNewestGitCommitDate }}`.

⚠️ Getting Git commit date is a bit slow. So, use this sparingly. This plugin was made primarily to populate `<updated>` field in RSS Feed.

## Usage

### Install

```sh
npm install eleventy-plugin-git-commit-date
```

### Add to Eleventy config

```js
// .eleventy.js

const pluginGitCommitDate = require("eleventy-plugin-git-commit-date");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginGitCommitDate);
};
```

### Use in templates

```nunjucks
Using {{ page.inputPath | getGitCommitDateFromPath }} will display the git commit date of the file using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)

Using {{ collections.all | getCollectionNewestGitCommitDate }} will display the git commit date of newest file in the collection using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)
```
