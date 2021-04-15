const request = require('request-promise');

const { rapid: { apiKey, symbols } } = require('../config')
console.log(apiKey)
console.log(symbols.join(', '))

module.exports = {
  quotes: () => request({
    method: 'GET',
    uri: 'https://twelve-data1.p.rapidapi.com/quote',
    qs: {
      'symbol': symbols.join(','),
      'interval': '5min',
      'format': 'json',
      'outputsize': '30',
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'useQueryString': true,
    },
  }).catch(error => ({ error: `Error: fetching rapi quotes failed -- ${error}` }))
}
