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

const suite = new Benchmark.Suite()

const fixtureURI = filesize => `http://localhost:8888/${filesize}K`

const tableHead = [
  [ 'Module', 'ops/sec', 'RME', 'Samples' ],
  [ '---------------', '----------', '----------', '----------' ]
]

const downloadSizes = [ 64, 256, 1024 ]

const results = {}
downloadSizes.map(s => { results[s] = [ ...tableHead ] })

// Test Cases

downloadSizes.map(size => {
  const uri = fixtureURI(size)
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
})

// suite.add('nodeFetch', {
//   defer: true,
//   fn: defer => nodeFetch(fixtureURI(size)).then(() => defer.resolve())
// })
//
// suite.add('req-fast', {
//   defer: true,
//   fn: defer => reqFast(fixtureURI, () => defer.resolve())
// })
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
suite.on('cycle', event => {
  const t = event.currentTarget[benchmarkIndex]

  const name = t.name
  const opsPerSecond = parseFloat(t.hz).toFixed(0)
  const rme = parseFloat(t.stats.rme).toFixed(2)
  const runsSampled = t.count

  const output = [ name, opsPerSecond, `±${rme}%`, runsSampled ]
  console.log(`${name} x ${opsPerSecond} ops/sec ±${rme}% (${runsSampled} runs sampled)`)

  const downloadSize = downloadSizes[downloadSizeIndex]
  results[downloadSize].push(output)

  benchmarkIndex = (benchmarkIndex + 1)
  if (benchmarkIndex % (suite.length / downloadSizes.length) === 0) {
    downloadSizeIndex += 1
  }
})

const createFileSizeSection = (size, results) => {
  return `
### GET ${size}KB File
\`\`\`
${textTable(results, { align: [ 'l', 'r', 'r', 'r' ] })}
\`\`\`
  `
}

suite.on('complete', () => {
  let template = fs.readFileSync(path.join(__dirname, './templates/readme.md')).toString()

  const resultsString = downloadSizes.map(s => createFileSizeSection(s, results[s])).join('')

  template = template.replace('${results}', resultsString)

  fs.writeFileSync(path.join(__dirname, 'readme.md'), template)
})

suite.run({
  async: true,
  minSamples: 30,
  maxTime: 1000000
})
