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

${results}

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/node-http-client-bench
[travis-image]: https://img.shields.io/travis/fdesjardins/node-http-client-bench.svg?style=flat
