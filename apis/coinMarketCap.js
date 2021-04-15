const request = require('request-promise');

const { coin: { apiKey, symbols } } = require('../config')

const quotes = () => request({
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    'convert': 'USD',
    'symbol': symbols.join(',')
  },
  headers: {
    'X-CMC_PRO_API_KEY': apiKey
  },
  json: true,
  gzip: true
}).catch(error => ({ error: `Error: fetching coin quotes failed -- ${error}` }))

module.exports = { quotes }