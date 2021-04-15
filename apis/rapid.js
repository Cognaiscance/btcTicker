var unirest = require("unirest");

const { rapid: { apiKey, symbols } } = require('../config')

module.exports = {
  quote: (symbol) => new Promise((resolve, reject) => {
    var req = unirest("GET", "https://twelve-data1.p.rapidapi.com/quote");

    req.query({
      "symbol": symbol,
      "interval": "5min",
      "format": "json",
      "outputsize": "30"
    });

    req.headers({
      "x-rapidapi-key": "d2778969bbmsh06e0d6d8671dfdbp1ec548jsn6baa55757038",
      "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
      "useQueryString": true
    });

    req.end(function (res) {
      if (res.error) {
        return reject({ error: `Error: failed to fetch rapid quotes - ${res.error}` })
      }
      resolve({ data: res.body })
    })
  }),
}
