# eleventy-plugin-git-commit-date

This Eleventy plugin provides two [template filters](https://www.11ty.dev/docs/filters/):

1. `getGitCommitDateFromPath`: Gets Git commit date from path. E.g. `{{ page.inputPath | getGitCommitDateFromPath }}`.
2. `getCollectionNewestGitCommitDate`: Get Git commit date of the newest committed file from a collection. E.g. `{{ collections.all | getCollectionNewestGitCommitDate }}`.

🌏 This plugin is made primarily to populate `<updated>` fields in an RSS feed. Here is [a blog post on how to use this plugin](https://saneef.com/tutorials/fix-dates-on-eleventy-rss-feeds/) with [`eleventy-plugin-rss`](https://www.11ty.dev/docs/plugins/rss/).

⚠️ Getting Git commit date is a bit slow (\~50ms for each path). So, use it sparingly. It's recommended to call this filter within a production flag.

## Usage

### 1. Install

```sh
npm install eleventy-plugin-git-commit-date
```

### 2. Add to Eleventy config

```js
// .eleventy.js

const pluginGitCommitDate = require("eleventy-plugin-git-commit-date");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginGitCommitDate);
};
```

### 3. Use in templates

```nunjucks
Using {{ page.inputPath | getGitCommitDateFromPath }} will display the git commit date of the file using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)

Using {{ collections.all | getCollectionNewestGitCommitDate }} will display the git commit date of newest file in the collection using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)
```

## Credits

* [@zachleat](https://github.com/11ty/eleventy/issues/142) suggested the use of Git commit dates instead of modified date.
* The code is based on [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated).
