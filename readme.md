# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for all the popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

## Usage

```
$ node index.js
```

## Example Output

### 64 KB File

```
http.request x 1,242 ops/sec ±3.26% (76 runs sampled)
axios x 831 ops/sec ±4.25% (70 runs sampled)
got x 847 ops/sec ±4.27% (70 runs sampled)
nodeFetch x 1,080 ops/sec ±4.14% (74 runs sampled)
request x 836 ops/sec ±3.98% (70 runs sampled)
req-fast x 1,068 ops/sec ±2.37% (80 runs sampled)
request-promise x 777 ops/sec ±3.79% (73 runs sampled)
request-promise-native x 808 ops/sec ±3.70% (73 runs sampled)
superagent x 994 ops/sec ±5.50% (65 runs sampled)
```

### 256 KB File

```
http.request x 815 ops/sec ±2.81% (77 runs sampled)
axios x 465 ops/sec ±4.23% (73 runs sampled)
got x 429 ops/sec ±4.93% (74 runs sampled)
nodeFetch x 714 ops/sec ±10.79% (63 runs sampled)
request x 420 ops/sec ±5.68% (69 runs sampled)
req-fast x 646 ops/sec ±2.33% (80 runs sampled)
request-promise x 422 ops/sec ±5.81% (71 runs sampled)
request-promise-native x 415 ops/sec ±6.07% (63 runs sampled)
superagent x 425 ops/sec ±14.26% (45 runs sampled)
```

### 1024 KB File

```
http.request x 393 ops/sec ±2.43% (78 runs sampled)
axios x 212 ops/sec ±3.79% (71 runs sampled)
got x 188 ops/sec ±4.19% (67 runs sampled)
request x 211 ops/sec ±4.04% (70 runs sampled)
req-fast x 212 ops/sec ±4.08% (71 runs sampled)
request-promise x 198 ops/sec ±4.44% (70 runs sampled)
request-promise-native x 204 ops/sec ±4.25% (71 runs sampled)
superagent x 315 ops/sec ±2.79% (60 runs sampled)
```

### 4096 KB File

```
http.request x 115 ops/sec ±3.95% (76 runs sampled)
axios x 56.49 ops/sec ±5.50% (57 runs sampled)
got x 48.93 ops/sec ±7.39% (48 runs sampled)
request x 57.85 ops/sec ±5.96% (56 runs sampled)
req-fast x 58.09 ops/sec ±6.37% (57 runs sampled)
request-promise x 58.49 ops/sec ±5.20% (57 runs sampled)
request-promise-native x 60.92 ops/sec ±4.49% (60 runs sampled)
superagent x 102 ops/sec ±2.58% (50 runs sampled)
```

## Metrics

- ops/sec 5 KB
- ops/sec 50 KB
- ops/sec 250 KB
- POST
- https://reevoo.github.io/blog/2014/09/12/http-shooting-party/

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
