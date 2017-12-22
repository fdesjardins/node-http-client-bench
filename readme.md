# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

## Usage

```
$ npm run readme
```

## Results

### GET http://bench_nginx/64K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1109      ±2.17%          61
got                     881      ±3.84%          55
superagent             1064      ±1.25%          58
```
  
### GET http://bench_nginx/256K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            592      ±1.03%          32
got                     428      ±3.41%          27
superagent              560      ±1.65%          30
```
  
### GET http://bench_nginx/1024K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            142      ±2.92%          10
got                     137      ±2.87%          10
superagent              140      ±2.90%          10
```
  

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
