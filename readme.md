# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

## Usage

```
$ docker-compose build
$ docker-compose run benchmark sh
$ node index.js
```

## Results

### GET 64K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            980      ±2.31%          57
axios                   700      ±4.09%          46
got                     814      ±3.49%          53
superagent              956      ±2.24%          54
isomorphicFetch         853      ±1.50%          48
nodeFetch               893      ±1.02%          48
```

### GET 256K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            548      ±1.49%          29
axios                   369      ±4.18%          25
got                     404      ±3.55%          27
superagent              530      ±1.18%          28
isomorphicFetch         461      ±1.46%          26
nodeFetch               445      ±1.60%          26
```

### GET 1024K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            132      ±2.28%           9
axios                   110      ±2.94%           8
got                     126      ±2.43%           9
superagent              130      ±2.30%           9
isomorphicFetch         109      ±3.07%           8
nodeFetch               109      ±3.07%           8
```


## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
