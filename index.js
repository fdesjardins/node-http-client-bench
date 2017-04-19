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

const fixtureURI = 'http://localhost:8888/1024K'

// Test Cases

// suite.add('http.request', {
//   defer: true,
//   fn: defer => http.get(fixtureURI, res => {
//     let body = ''
//     res.on('data', data => {
//       body += data
//     })
//     res.on('end', () => defer.resolve(body))
//   })
// })
//
// suite.add('axios', {
//   defer: true,
//   fn: defer => axios.get(fixtureURI).then(() => defer.resolve())
// })
//
// suite.add('got', {
//   defer: true,
//   fn: defer => got(fixtureURI).then(() => defer.resolve())
// })

// suite.add('nodeFetch', {
//   defer: true,
//   fn: defer => nodeFetch(fixtureURI).then(() => defer.resolve())
// })

// suite.add('isomorphicFetch', {
//   defer: true,
//   fn: defer => isomorphicFetch(fixtureURI).then(() => defer.resolve())
// })

suite.add('request', {
  defer: true,
  fn: defer => request(fixtureURI, () => defer.resolve())
})

suite.add('req-fast', {
  defer: true,
  fn: defer => reqFast(fixtureURI, () => defer.resolve())
})

suite.add('request-promise', {
  defer: true,
  fn: defer => requestPromise(fixtureURI).then(() => defer.resolve())
})

suite.add('request-promise-native', {
  defer: true,
  fn: defer => requestPromiseNative(fixtureURI).then(() => defer.resolve())
})

suite.add('superagent', {
  defer: true,
  fn: defer => superagent.get(fixtureURI).end(() => defer.resolve())
})

suite.on('cycle', event => {
  console.log(event.target.toString())
})

suite.run({ async: true })
