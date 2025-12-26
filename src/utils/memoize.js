/**
 * Memoize function
 *
 * The code is adapted from MemoizeFunction() of Eleventy project
 * See https://github.com/11ty/eleventy/blob/5a65b244235bfcb64ecf085bfc65a99a670e9df4/src/Util/MemoizeFunction.js
 *
 * @param      {Function}  fn The function to memoize
 * @return     {Function}
 */
function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    if (args.filter(Boolean).length > 1) {
      console.warn("memoize() only supports single argument functions");
      return fn(...args);
    }

    const [cacheKey] = args;

    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, fn(...args));
    }

    return cache.get(cacheKey);
  };
}

module.exports = memoize;
