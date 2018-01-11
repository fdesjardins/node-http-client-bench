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
http.request           1687      ±2.74%         105
axios                  1353      ±2.53%          84
got                    1441      ±2.15%          87
superagent             1650      ±1.62%          98
isomorphicFetch        1474      ±1.45%          87
nodeFetch              1567      ±1.39%          99
```
  
### GET 32K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1674      ±0.97%          92
axios                  1294      ±2.39%          83
got                    1383      ±2.08%          80
superagent             1606      ±1.26%          93
isomorphicFetch        1429      ±1.32%          81
nodeFetch              1380      ±1.89%          79
```
  
### GET 64K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1358      ±1.19%          78
axios                   765     ±17.62%          68
got                    1170      ±2.23%          72
superagent             1286      ±0.96%          75
isomorphicFetch        1200      ±0.94%          69
nodeFetch              1204      ±1.14%          68
```
  
### GET 256K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            786      ±1.41%          45
axios                   526      ±2.47%          32
got                     612      ±2.74%          40
superagent              773      ±1.44%          46
isomorphicFetch         654      ±1.27%          39
nodeFetch               649      ±0.99%          39
```
  
### GET 1024K.txt
```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            228      ±1.53%          15
axios                   175      ±1.19%          15
got                     216      ±1.34%          16
superagent              217      ±1.45%          16
isomorphicFetch         190      ±1.38%          15
nodeFetch               173      ±1.70%          17
```
  

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
