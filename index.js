const textTable = require('text-table')
const path = require('path')
const fs = require('fs')
const Benchmark = require('benchmark')
const http = require('http')
const axios = require('axios')
const got = require('got')
const nodeFetch = require('node-fetch')
const isomorphicFetch = require('isomorphic-fetch')
const request = require('request')
const reqFast = require('req-fast')
const superagent = require('superagent')

// Benchmark.options.minSamples = 200
//
// const benchmarkOptions = {
//   minSamples: 10000
// }

const badDataError = ''

const fixtures = {
  64: fs.readFileSync(path.join(__dirname, 'fixtures/64K.txt')).toString(),
  256: fs.readFileSync(path.join(__dirname, 'fixtures/256K.txt')).toString(),
  1024: fs.readFileSync(path.join(__dirname, 'fixtures/1024K.txt')).toString(),
  2048: fs.readFileSync(path.join(__dirname, 'fixtures/2048K.txt')).toString()
}

const addTestCases = (suite, options) => {
  suite.add('http.request', {
    defer: true,
    fn: defer => http.get(options.uri, res => {
      let body = ''
      res.on('data', data => {
        body += data
      })
      res.on('end', () => {
        if (body === fixtures[options.size]) {
          return defer.resolve(body)
        }
        throw new Error('ERROR: incorrect data')
      })
    })
  })

  // suite.add('axios', {
  //   defer: true,
  //   fn: defer => axios.get(uri).then(() => defer.resolve()).catch(err => defer.resolve(err))
  // })

  suite.add('got', {
    defer: true,
    fn: defer => {
      return got(options.uri).then(response => {
        if (response.body === fixtures[options.size]) {
          return defer.resolve()
        }
        throw new Error('ERROR: incorrect data')
      })
      .catch(err => {
        throw err
      })
    }
  })

  suite.add('superagent', {
    defer: true,
    fn: defer => {
      return superagent.get(options.uri)
        .then(response => {
          if (response.text === fixtures[options.size]) {
            return defer.resolve()
          }
          throw new Error('ERROR: incorrect data')
        })
        .catch(err => {
          throw err
        })
    }
  })
  // suite.add('request', {
  //   defer: true,
  //   fn: defer => request(uri, () => defer.resolve())
  // })
  // suite.add('isomorphicFetch', {
  //   defer: true,
  //   fn: defer => isomorphicFetch(uri).then(() => defer.resolve()).catch(err => defer.resolve(err))
  // })
  // suite.add('nodeFetch', {
  //   defer: true,
  //   fn: defer => nodeFetch(uri).then(() => defer.resolve()).catch(err => defer.resolve(err))
  // })
  // suite.add('req-fast', {
  //   defer: true,
  //   fn: defer => reqFast(uri, () => defer.resolve())
  // })
}

let benchmarkIndex = 0
let downloadSizeIndex = 0
const onCycle = (totalCases, options, results) => event => {
  const t = event.currentTarget[benchmarkIndex]

  const name = t.name
  const opsPerSecond = parseFloat(t.hz).toFixed(0)
  const rme = parseFloat(t.stats.rme).toFixed(2)
  const runsSampled = t.count

  const output = [ name, opsPerSecond, `±${rme}%`, runsSampled ]
  console.log(`${name} x ${opsPerSecond} ops/sec ±${rme}% (${runsSampled} runs sampled)`)

  const uri = options[downloadSizeIndex].uri
  results[uri].push(output)

  benchmarkIndex = (benchmarkIndex + 1)
  if (benchmarkIndex % (totalCases / options.length) === 0) {
    downloadSizeIndex += 1
  }
}

const createFileSizeSection = (size, results) => {
  return `
### GET ${size}
\`\`\`
${textTable(results, { align: [ 'l', 'r', 'r', 'r' ] })}
\`\`\`
  `
}

const onComplete = (options, results) => () => {
  let template = fs.readFileSync(path.join(__dirname, './templates/readme.md')).toString()

  const resultsString = options.map(s => createFileSizeSection(s.uri, results[s.uri])).join('')

  template = template.replace('${results}', resultsString)

  fs.writeFileSync(path.join(__dirname, 'readme.md'), template)
}

const runBenchmarks = (options) => {
  const tableHead = [
    [ 'Module', 'OPS', 'RME', 'Samples' ],
    [ '---------------', '----------', '----------', '----------' ]
  ]

  const results = {}
  options.map(s => { results[s.uri] = [ ...tableHead ] })

  const suite = Benchmark.Suite()
  options.map(o => addTestCases(suite, o))
  suite.on('cycle', onCycle(suite.length, options, results))
  suite.on('complete', onComplete(options, results))

  suite.run({
    async: true
  })
}

if (!module.parent) {
  const createFixtureUri = filesize => `http://${process.env.NGINX}/${filesize}K.txt`
  const downloadSizes = [ 64, 256, 1024 ]
  const options = downloadSizes.map(s => {
    return {
      uri: createFixtureUri(s),
      size: s
    }
  })
  runBenchmarks(options)
}
