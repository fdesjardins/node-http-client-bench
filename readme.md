# node-http-client-bench [![Build Status][travis-image]][travis-url]

Benchmarks for popular Node.js HTTP client libraries.

These benchmarks use Nginx in a docker container to serve static files of several sizes.

**Versions Tested**

- `node@11.10.0`
- `axios@0.18.0`
- `got@9.6.0`
- `superagent@4.1.0`
- `isomorphic-fetch@2.2.1`
- `node-fetch@2.3.0`
- `ky@0.9.0`
- `ky-universal@0.1.0`

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
http.request           1781      ±2.69%         105
axios                  1440      ±2.55%          98
got                    1071      ±2.45%          72
superagent             1789      ±2.49%         109
isomorphicFetch        1465      ±2.72%          97
nodeFetch              1506      ±2.60%          91
ky-universal           1488      ±3.66%          97
```

### GET 32K.txt

```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1812      ±2.99%         107
axios                  1392      ±2.40%          94
got                    1087      ±2.31%          71
superagent             1655      ±2.47%         100
isomorphicFetch        1344      ±2.39%          90
nodeFetch              1399      ±2.40%          92
ky-universal           1334      ±3.83%         100
```

### GET 64K.txt

```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request           1370      ±2.73%          81
axios                  1073      ±3.11%          69
got                     897      ±3.04%          61
superagent             1385      ±1.81%          83
isomorphicFetch        1156      ±1.86%          68
nodeFetch              1141      ±1.81%          73
ky-universal            987      ±3.53%          73
```

### GET 256K.txt

```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            769      ±2.26%          45
axios                   494      ±3.36%          34
got                     465      ±2.31%          29
superagent              780      ±1.54%          48
isomorphicFetch         580      ±2.00%          36
nodeFetch               571      ±1.89%          34
ky-universal            513      ±1.87%          33
```

### GET 1024K.txt

```
Module                  OPS         RME     Samples
---------------  ----------  ----------  ----------
http.request            276      ±3.00%          21
axios                   208      ±2.05%          14
got                     220      ±1.99%          13
superagent              258      ±1.78%          16
isomorphicFetch         201      ±1.48%          12
nodeFetch               202      ±1.71%          12
ky-universal            219      ±1.33%          14
```

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
