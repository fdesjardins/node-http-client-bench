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


### GET 16K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1403      ±2.36%          84
axios                  1090      ±3.24%          72
got                     806      ±3.47%          55
superagent             1344      ±2.16%          82
isomorphicFetch        1180      ±3.07%          73
nodeFetch              1154      ±3.34%          74
```
  
### GET 32K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1378      ±1.42%          84
axios                  1029      ±3.48%          70
got                     906      ±3.00%          57
superagent             1338      ±1.86%          80
isomorphicFetch        1082      ±2.75%          68
nodeFetch              1051      ±3.22%          72
```
  
### GET 64K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1157      ±2.02%          68
axios                   912      ±3.34%          58
got                     809      ±3.08%          56
superagent             1113      ±1.76%          69
isomorphicFetch         784     ±18.11%          58
nodeFetch               891      ±3.07%          59
```
  
### GET 256K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            660      ±2.13%          41
axios                   517      ±2.82%          32
got                     409      ±4.80%          29
superagent              627      ±2.79%          37
isomorphicFetch         466      ±4.35%          33
nodeFetch               455      ±4.37%          33
```
  
### GET 1024K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            191      ±2.97%          14
axios                   161      ±1.33%          11
got                     184      ±2.51%          11
superagent              202      ±2.91%          14
isomorphicFetch         161      ±1.07%          11
nodeFetch               160      ±1.57%          11
```
  

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
