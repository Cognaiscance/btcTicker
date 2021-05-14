module.exports = {
  coin: {
    apiKey: "get-your-own-free-api-key", //sign up at pro.coinmarketcap.com
    symbols: ['btc', 'ltc'],
  },
  rapid: {
    apiKey: "get-your-own-free-api-key", //rapidapi.com
    symbols: ['TSLA', "AMZN"]
  },
  oled: {
    displayScript: "scrolling", // scrolling, fixedTwoRows
    title: "BTC ticker",
    fontSize: 14,
    scrollSpeed: 2, // 1 - 3: (slowest) - (fastest)
    nightMode: "daylight", // "off", "on", "daylight"
    timezoneOffset: -6, // used to calculate daylight setting for nightMode
    startNightHour: 19, // hour in military time to start using nightMode
    endNightHour: 7,
  },
  ticker: {
    iterations_per_lookup: 200, // how many display cycles happen between fetching new data
    fixedTwoRowsDelay: 5000, //milliseconds
  }
}