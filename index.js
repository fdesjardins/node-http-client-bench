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
const requestPromise = require('request-promise')
const requestPromiseNative = require('request-promise-native')
const superagent = require('superagent')

// Benchmark.options.minSamples = 100

const addTestCases = (suite, uri) => {
  suite.add('http.request', {
    defer: true,
    fn: defer => http.get(uri, res => {
      let body = ''
      res.on('data', data => {
        body += data
      })
      res.on('end', () => defer.resolve(body))
    })
  })
  suite.add('axios', {
    defer: true,
    fn: defer => axios.get(uri).then(() => defer.resolve())
  })
  suite.add('got', {
    defer: true,
    fn: defer => got(uri).then(() => defer.resolve())
  })
  suite.add('superagent', {
    defer: true,
    fn: defer => superagent.get(uri).end(() => defer.resolve())
  })
  suite.add('request', {
    defer: true,
    fn: defer => request(uri, () => defer.resolve())
  })
  suite.add('isomorphicFetch', {
    defer: true,
    fn: defer => isomorphicFetch(uri).then(() => defer.resolve())
  })
  suite.add('nodeFetch', {
    defer: true,
    fn: defer => nodeFetch(uri).then(() => defer.resolve())
  })
  suite.add('req-fast', {
    defer: true,
    fn: defer => reqFast(uri, () => defer.resolve())
  })
}

//
//
// suite.add('request-promise', {
//   defer: true,
//   fn: defer => requestPromise(fixtureURI).then(() => defer.resolve())
// })
//
// suite.add('request-promise-native', {
//   defer: true,
//   fn: defer => requestPromiseNative(fixtureURI).then(() => defer.resolve())
// })
//

let benchmarkIndex = 0
let downloadSizeIndex = 0
const onCycle = (totalCases, uris, results) => event => {
  const t = event.currentTarget[benchmarkIndex]

  const name = t.name
  const opsPerSecond = parseFloat(t.hz).toFixed(0)
  const rme = parseFloat(t.stats.rme).toFixed(2)
  const runsSampled = t.count

  const output = [ name, opsPerSecond, `±${rme}%`, runsSampled ]
  console.log(`${name} x ${opsPerSecond} ops/sec ±${rme}% (${runsSampled} runs sampled)`)

  const uri = uris[downloadSizeIndex]
  results[uri].push(output)

  benchmarkIndex = (benchmarkIndex + 1)
  if (benchmarkIndex % (totalCases / uris.length) === 0) {
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

const onComplete = (uris, results) => () => {
  let template = fs.readFileSync(path.join(__dirname, './templates/readme.md')).toString()

  const resultsString = uris.map(s => createFileSizeSection(s, results[s])).join('')

  template = template.replace('${results}', resultsString)

  fs.writeFileSync(path.join(__dirname, 'readme.md'), template)
}

const runBenchmarks = (uris) => {
  const tableHead = [
    [ 'Module', 'OPS', 'RME', 'Samples' ],
    [ '---------------', '----------', '----------', '----------' ]
  ]

  const results = {}
  uris.map(s => { results[s] = [ ...tableHead ] })

  const suite = Benchmark.Suite(uris)
  uris.map(uri => {
    addTestCases(suite, uri)
  })
  suite.on('cycle', onCycle(suite.length, uris, results))
  suite.on('complete', onComplete(uris, results))

  suite.run({
    async: true
  })
}

if (!module.parent) {
  const createFixtureUri = filesize => `http://localhost:8888/${filesize}K`
  const downloadSizes = [ 64, 256, 1024, 2056 ]
  const uris = downloadSizes.map(s => createFixtureUri(s))
  runBenchmarks(uris)
}
