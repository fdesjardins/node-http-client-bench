# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

## Usage

```
$ npm run readme
```

## Results

### GET http://localhost:8888/64K
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
superagent             1131      ±3.26%          74
```
  
### GET http://localhost:8888/256K
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
superagent              969      ±2.98%          63
```
  
### GET http://localhost:8888/1024K
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
superagent              360      ±1.00%          35
```
  
### GET http://localhost:8888/2056K
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
superagent             1336      ±1.57%          79
```
  

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
