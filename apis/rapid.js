var unirest = require("unirest");

const { rapid: { apiKey, symbols } } = require('../config')
console.log(apiKey)
console.log(symbols.join(', '))

module.exports = {
  quotes: () => {
    var req = unirest("GET", "https://twelve-data1.p.rapidapi.com/quote");

    req.query({
      "symbol": "AMZN",
      "interval": "5min",
      "format": "json",
      "outputsize": "30"
    });

    req.headers({
      "x-rapidapi-key": "d2778969bbmsh06e0d6d8671dfdbp1ec548jsn6baa55757038",
      "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
      "useQueryString": true
    });

    return new Promise((resolve, reject) => {
      req.end(function (res) {
        if (res.error) {
          return reject(res.error)
        }
        resolve(res.body)
      })
    })
    
  },
  quotes1: () => request({
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
