const coin = require('./apis/coinMarketCap')
const rapid = require('./apis/rapid')
const oled = require('./apis/oled')

const formatCoinQuote = (coinObj) =>
  parseFloat(coinObj.quote.USD.price).toFixed(2)
const formatRapidQuote = (rapidData) =>
  parseFloat(rapidData.open).toFixed(2)

const main = async () => {
  // const { error, data = [] } = await coin.quotes()
  const { error, data = [] } = await rapid.quote("TSLA")
  // console.log(data)
  // console.log(error)
  
//   for (const [key, value] of Object.entries(data)) {
//     console.log('Starting ticker run.')
//     const results = await oled.scrollingLrg({
//       text: `${value.symbol}: ${formatCoinQuote(value)}`,
//     })
//     console.log(results)
//   }
  console.log('Starting fixedTwoRows')
  const results = await oled.fixedTwoRows({
    r1Text: "TSLA:",
    r2Text: formatRapidQuote(data),
  })
  console.log(results)
}

main()
