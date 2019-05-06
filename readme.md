# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

**Versions Tested**

- `node@11.10.0`
- `axios@0.18.0`
- `got@9.6.0`
- `superagent@5.0.5`
- `isomorphic-fetch@2.2.1`
- `node-fetch@2.5.0`
- `ky@0.10.0`
- `ky-universal@0.2.0`

## Usage

```
$ docker-compose build
$ docker-compose run benchmark sh
$ node index.js
```

## Results

\
### GET 16K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1609      ±3.95%         106
axios                  1255      ±2.87%          79
got                     977      ±2.80%          66
superagent             1523      ±2.90%         100
isomorphicFetch        1410      ±3.02%          93
nodeFetch              1332      ±2.79%          87
ky-universal           1273      ±3.86%          87
```
  
### GET 32K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1472      ±3.29%          93
axios                  1025      ±3.62%          74
got                    1086      ±2.95%          71
superagent             1507      ±2.51%          92
isomorphicFetch        1339      ±2.75%          88
nodeFetch              1334      ±2.63%          84
ky-universal           1197      ±3.82%          83
```
  
### GET 64K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1211      ±3.51%          77
axios                   914      ±3.31%          65
got                     872      ±2.86%          59
superagent             1232      ±2.18%          80
isomorphicFetch         995      ±2.72%          75
nodeFetch              1079      ±1.91%          71
ky-universal            877      ±3.14%          67
```
  
### GET 256K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            703      ±3.04%          42
axios                   474      ±3.67%          36
got                     427      ±3.22%          28
superagent              702      ±1.96%          44
isomorphicFetch         539      ±2.19%          35
nodeFetch               551      ±2.01%          37
ky-universal            459      ±2.75%          30
```
  
### GET 1024K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            246      ±3.17%          19
axios                   184      ±2.01%          12
got                     206      ±2.00%          13
superagent              255      ±1.92%          16
isomorphicFetch         197      ±1.46%          12
nodeFetch               186      ±2.12%          13
ky-universal            205      ±2.15%          13
```
  

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
