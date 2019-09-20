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

### GET 16K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1754      ±4.09%         114
http.request with http 1.1                    1903      ±2.48%         117
http.request with http 1.0                    1932      ±2.29%         116
http.request with http 1.0 and nodelay        2025      ±1.73%         121
axios                                         1507      ±2.39%         102
got                                           1148      ±3.40%          75
superagent                                    1779      ±1.95%         105
isomorphicFetch                               1495      ±3.00%          96
nodeFetch                                     1424      ±3.35%          97
ky-universal                                   472      ±1.69%          27
request                                       1437      ±3.92%          93
```

### GET 32K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1795      ±1.96%         104
http.request with http 1.1                    1748      ±1.64%         103
http.request with http 1.0                    1781      ±1.97%         106
http.request with http 1.0 and nodelay        1820      ±1.48%         103
axios                                         1316      ±2.74%          81
got                                           1105      ±2.60%          76
superagent                                    1615      ±2.41%         109
isomorphicFetch                               1362      ±2.59%          89
nodeFetch                                     1391      ±2.10%          87
ky-universal                                   447      ±1.71%          28
request                                       1388      ±2.41%          85
```

### GET 64K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent               1344      ±2.35%          81
http.request with http 1.1                    1377      ±2.18%          82
http.request with http 1.0                    1417      ±2.38%          86
http.request with http 1.0 and nodelay        1363      ±2.33%          89
axios                                         1073      ±2.48%          68
got                                            962      ±2.39%          67
superagent                                    1391      ±2.25%          84
isomorphicFetch                               1099      ±2.72%          73
nodeFetch                                     1099      ±1.92%          69
ky-universal                                   426      ±2.06%          27
request                                       1069      ±3.68%          67
```

### GET 256K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent                805      ±1.77%          47
http.request with http 1.1                     866      ±1.92%          52
http.request with http 1.0                     891      ±1.51%          51
http.request with http 1.0 and nodelay         815      ±2.10%          51
axios                                          534      ±2.79%          36
got                                            529      ±1.55%          32
superagent                                     800      ±1.88%          46
isomorphicFetch                                564      ±1.92%          33
nodeFetch                                      555      ±1.49%          37
ky-universal                                   309      ±1.46%          19
request                                        607      ±4.22%          39
```

### GET 1024K.txt
```
Module                                         OPS         RME     Samples
---------------                         ----------  ----------  ----------
http.request with default agent                278      ±2.46%          17
http.request with http 1.1                     289      ±1.51%          18
http.request with http 1.0                     299      ±1.95%          18
http.request with http 1.0 and nodelay         285      ±1.36%          18
axios                                          219      ±1.42%          14
got                                            232      ±2.23%          14
superagent                                     280      ±2.09%          17
isomorphicFetch                                205      ±1.22%          13
nodeFetch                                      206      ±1.31%          12
ky-universal                                   181      ±1.71%          11
request                                        212      ±2.02%          13
```


## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
