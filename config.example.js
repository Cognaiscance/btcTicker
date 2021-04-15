module.exports = {
  coin: {
    apiKey: "get-your-own-free-api-key", //sign up at pro.coinmarketcap.com
    symbols: ['btc', 'ltc'],
  },
  oled: {
    title: "BTC Ticker",
    fontSize: 18,
    scrollSpeed: 2, // 1 - 3: (slowest) - (fastest)
    nightMode: "daylight", // "off", "on", "daylight"
    timezoneOffset: -6, // used to calculate daylight setting for nightMode
    startNightHour: 19, // hour in military time to start using nightMode
    endNightHour: 7,
  },
}