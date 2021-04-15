const coin = require('./apis/coinMarketCap')
const oled = require('./apis/oled')

const getFormattedQuote = (coinObj) =>
  parseFloat(coinObj.quote.USD.price).toFixed(2)

const fetch = async () => {
  const { error, data = [] } = await coin.quotes()
  
  for (const [key, value] of Object.entries(data)) {
    console.log('Starting ticker run.')
    const results = await oled.scrollingLrg({
      text: `${value.symbol}: ${getFormattedQuote(value)}`,
    })
    console.log(results)
  }
  console.log('Starting fixedTwoRows')
  const results = await oled.fixedTwoRows({
    r1Text: "BTC:",
    r2Text: getFormattedQuote(data.BTC),
  })
  console.log(results)
}

fetch()
