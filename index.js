const textTable = require('text-table')
const path = require('path')
const fs = require('fs')
const Benchmark = require('benchmark')
const http = require('http')
const axios = require('axios')
const got = require('got')
const nodeFetch = require('node-fetch')
const isomorphicFetch = require('isomorphic-fetch')
const superagent = require('superagent')
const ky = require('ky-universal')
const request = require('request')
const { Agent } = require('http')

const badDataError = new Error('ERROR: incorrect data')

const fixtures = {
  16: fs.readFileSync(path.join(__dirname, 'fixtures/16K.txt')).toString(),
  32: fs.readFileSync(path.join(__dirname, 'fixtures/32K.txt')).toString(),
  64: fs.readFileSync(path.join(__dirname, 'fixtures/64K.txt')).toString(),
  256: fs.readFileSync(path.join(__dirname, 'fixtures/256K.txt')).toString(),
  1024: fs.readFileSync(path.join(__dirname, 'fixtures/1024K.txt')).toString(),
  2048: fs.readFileSync(path.join(__dirname, 'fixtures/2048K.txt')).toString()
}

const addTestCases = (suite, options) => {
  suite.add('http.request with default agent', {
    defer: true,
    fn: defer =>
      http.get(options.uri, res => {
        let body = ''
        res.on('data', data => {
          body += data
        })
        res.on('end', () => {
          if (body === fixtures[options.size]) {
            return defer.resolve(body)
          }
          throw badDataError
        })
      })
  })

  suite.add('http.request with http 1.1', {
    defer: true,
    fn: defer =>
      http.get(options.uri, { agent: new Agent({ keepalive: true }) }, res => {
        let body = ''
        res.on('data', data => {
          body += data
        })
        res.on('end', () => {
          if (body === fixtures[options.size]) {
            return defer.resolve(body)
          }
          throw badDataError
        })
      })
  })

  suite.add('http.request with http 1.0', {
    defer: true,
    fn: defer =>
      http.get(options.uri, { agent: false }, res => {
        let body = ''
        res.on('data', data => {
          body += data
        })
        res.on('end', () => {
          if (body === fixtures[options.size]) {
            return defer.resolve(body)
          }
          throw badDataError
        })
      })
  })

  suite.add('http.request with http 1.0 and nodelay', {
    defer: true,
    fn: defer =>
      http.get(options.uri, { agent: false }, res => {
        let body = ''
        res.on('data', data => {
          body += data
        })
        res.on('end', () => {
          if (body === fixtures[options.size]) {
            return defer.resolve(body)
          }
          throw badDataError
        })
      }).setNoDelay(true)
  })

  suite.add('axios', {
    defer: true,
    fn: defer => {
      return axios
        .get(options.uri)
        .then(response => {
          if (response.data === fixtures[options.size]) {
            return defer.resolve()
          }
          throw badDataError
        })
        .catch(err => {
          throw err
        })
    }
  })

  suite.add('got', {
    defer: true,
    fn: defer => {
      return got(options.uri)
        .then(response => {
          if (response.body === fixtures[options.size]) {
            return defer.resolve()
          }
          throw badDataError
        })
        .catch(err => {
          throw err
        })
    }
  })

  suite.add('superagent', {
    defer: true,
    fn: defer => {
      return superagent
        .get(options.uri)
        .then(response => {
          if (response.text === fixtures[options.size]) {
            return defer.resolve()
          }
          throw badDataError
        })
        .catch(err => {
          throw err
        })
    }
  })

  suite.add('isomorphicFetch', {
    defer: true,
    fn: defer => {
      return isomorphicFetch(options.uri)
        .then(response => response.text())
        .then(text => {
          if (text === fixtures[options.size]) {
            return defer.resolve()
          }
          throw badDataError
        })
        .catch(err => {
          throw err
        })
    }
  })

  suite.add('nodeFetch', {
    defer: true,
    fn: defer => {
      return nodeFetch(options.uri)
        .then(response => response.text())
        .then(text => {
          if (text === fixtures[options.size]) {
            return defer.resolve()
          }
          throw badDataError
        })
        .catch(err => {
          throw err
        })
    }
  })

  suite.add('ky-universal', {
    defer: true,
    fn: async defer => {
      try {
        const response = await ky(options.uri)
        const text = await response.text()
        if (text === fixtures[options.size]) {
          return defer.resolve()
        }
        throw badDataError
      } catch (err) {
        throw err
      }
    }
  })

  suite.add('request', {
    defer: true,
    fn: defer => {
      return request(options.uri,function(error, response, body) {
        if (error) {
          throw error
        }
        if (body === fixtures[options.size]) {
          return defer.resolve()
        }
        throw badDataError
      })
    }
  })
}

let benchmarkIndex = 0
let downloadSizeIndex = 0
const onCycle = (totalCases, options, results) => event => {
  const t = event.currentTarget[benchmarkIndex]

  const name = t.name
  const opsPerSecond = parseFloat(t.hz).toFixed(0)
  const rme = parseFloat(t.stats.rme).toFixed(2)
  const runsSampled = t.count

  const output = [name, opsPerSecond, `±${rme}%`, runsSampled]
  console.log(
    `${name} x ${opsPerSecond} ops/sec ±${rme}% (${runsSampled} runs sampled)`
  )

  const uri = options[downloadSizeIndex].uri
  results[uri].push(output)

  benchmarkIndex = benchmarkIndex + 1
  if (benchmarkIndex % (totalCases / options.length) === 0) {
    downloadSizeIndex += 1
  }
}

const createFileSizeSection = (size, results) => {
  return `
### GET ${size}
\`\`\`
${textTable(results, { align: ['l', 'r', 'r', 'r'] })}
\`\`\`
  `
}

const onComplete = (options, results) => () => {
  let template = fs
    .readFileSync(path.join(__dirname, './templates/readme.md'))
    .toString()

  const resultsString = options
    .map(s => createFileSizeSection(`${s.size}K.txt`, results[s.uri]))
    .join('')

  template = template.replace('${results}', resultsString)

  fs.writeFileSync(path.join(__dirname, 'readme.md'), template)
}

const runBenchmarks = ({ downloadSizes }) => {
  const tableHead = [
    ['Module', 'OPS', 'RME', 'Samples'],
    ['---------------', '----------', '----------', '----------']
  ]

  const results = {}
  downloadSizes.map(s => {
    results[s.uri] = [...tableHead]
  })

  const suite = Benchmark.Suite()
  downloadSizes.map(o => addTestCases(suite, o))
  suite.on('cycle', onCycle(suite.length, downloadSizes, results))
  suite.on('complete', onComplete(downloadSizes, results))

  suite.run({
    async: true
  })
}

if (!module.parent) {
  const options = {
    downloadSizes: [16, 32, 64, 256, 1024].map(s => {
      return {
        uri: `http://${process.env.NGINX}/${s}K.txt`,
        size: s
      }
    })
  }

  runBenchmarks(options)
}
