# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

**Versions Tested**

- `node@12.10.0`
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

### GET 16K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1889      ±4.64%         129
http.request with http 1.1                    1862      ±2.17%         115
http.request with http 1.0                    1914      ±2.30%         121
http.request with http 1.0 and nodelay        2022      ±1.94%         122
axios                                         1606      ±2.22%          99
got                                           1125      ±2.87%          74
superagent                                    1673      ±2.21%         103
isomorphicFetch                               1531      ±3.14%          97
nodeFetch                                     1508      ±2.99%          96
ky-universal                                   475      ±1.65%          30
request                                       1406      ±3.81%          94
```

### GET 32K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1757      ±1.66%         100
http.request with http 1.1                    1731      ±2.06%         103
http.request with http 1.0                    1766      ±2.05%         106
http.request with http 1.0 and nodelay        1805      ±1.70%         105
axios                                         1359      ±2.50%          87
got                                           1152      ±2.63%          77
superagent                                    1701      ±1.89%          98
isomorphicFetch                               1442      ±2.73%          92
nodeFetch                                     1424      ±2.47%          88
ky-universal                                   460      ±2.02%          30
request                                       1358      ±3.55%          87
```

### GET 64K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1489      ±1.91%          87
http.request with http 1.1                    1407      ±2.48%          87
http.request with http 1.0                    1414      ±2.18%          88
http.request with http 1.0 and nodelay        1373      ±2.17%          82
axios                                         1083      ±3.22%          73
got                                            967      ±2.69%          63
superagent                                    1305      ±3.35%          80
isomorphicFetch                               1063      ±2.38%          71
nodeFetch                                     1102      ±2.43%          72
ky-universal                                   411      ±2.40%          25
request                                       1065      ±4.28%          70
```

### GET 256K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent                849      ±3.14%          54
http.request with http 1.1                     859      ±2.23%          52
http.request with http 1.0                     839      ±2.16%          50
http.request with http 1.0 and nodelay         818      ±2.82%          51
axios                                          565      ±2.40%          37
got                                            534      ±1.65%          34
superagent                                     766      ±2.16%          47
isomorphicFetch                                576      ±2.41%          40
nodeFetch                                      588      ±2.13%          40
ky-universal                                   310      ±1.39%          20
request                                        635      ±3.52%          40
```

### GET 1024K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent                270      ±2.66%          18
http.request with http 1.1                     278      ±1.05%          18
http.request with http 1.0                     290      ±1.61%          18
http.request with http 1.0 and nodelay         282      ±1.98%          18
axios                                          219      ±1.55%          13
got                                            226      ±1.87%          13
superagent                                     286      ±2.22%          17
isomorphicFetch                                205      ±1.15%          12
nodeFetch                                      213      ±1.06%          13
ky-universal                                   177      ±1.75%          11
request                                        206      ±2.52%          13
```


## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
