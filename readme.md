# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for all the popular Node.js HTTP client libraries

## Usage

```
$ node index.js
```

## Example Output

```
http.request x 1,462 ops/sec ±3.95% (75 runs sampled)
axios x 993 ops/sec ±4.94% (68 runs sampled)
got x 1,070 ops/sec ±4.12% (72 runs sampled)
nodeFetch x 1,209 ops/sec ±2.58% (79 runs sampled)
request x 1,062 ops/sec ±4.55% (75 runs sampled)
req-fast x 1,151 ops/sec ±2.65% (77 runs sampled)
request-promise x 931 ops/sec ±3.79% (74 runs sampled)
request-promise-native x 981 ops/sec ±3.79% (76 runs sampled)
superagent x 1,189 ops/sec ±2.33% (76 runs sampled)
```

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
