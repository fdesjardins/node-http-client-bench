# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

## Usage

```
$ npm run readme
```

## Results

### GET 64KB File
```
Module              ops/sec         RME     Samples
---------------  ----------  ----------  ----------
http.request           1107      ±3.65%          74
axios                   832      ±5.10%          58
got                     905      ±4.41%          60
superagent             1139      ±4.36%          72
request                 765      ±5.20%          56
isomorphicFetch        1113      ±4.36%          70
```

### GET 256KB File
```
Module              ops/sec         RME     Samples
---------------  ----------  ----------  ----------
http.request            807      ±2.79%          47
axios                   431      ±5.74%          37
got                     476      ±5.19%          35
superagent              858      ±6.33%          58
request                 440      ±3.82%          33
isomorphicFetch         716     ±13.21%          59
```

### GET 1024KB File
```
Module              ops/sec         RME     Samples
---------------  ----------  ----------  ----------
http.request            409      ±1.90%          23
axios                    92     ±11.55%          13
got                     114     ±12.87%          16
superagent              353      ±8.56%          29
request                  91     ±11.73%          14
isomorphicFetch         566     ±19.09%          61
```

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
