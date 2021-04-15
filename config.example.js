module.exports = {
  coin: {
    apiKey: "get-your-own-free-api-key", //sign up at pro.coinmarketcap.com
    symbols: ['btc', 'ltc'],
  },
  oled: {
    fontSize: 18,
    scrollSpeed: 3, // 0 - 10 -> (slow) - (fast)
    nightMode: "daylight", // "off", "on", "daylight"
    timezoneOffset: -5, // used to calculate daylight setting for nightMode
    startNightHour: 19, // hour in military time to start using nightMode
    endNightHour: 7,
  },
}