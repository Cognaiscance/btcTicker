const coin = require('./apis/coinMarketCap')
const rapid = require('./apis/rapid')
const oled = require('./apis/oled')
const {
  rapid: { symbols: rapidSymbols },
  oled: { displayScript },
} = require('./config')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const formatCoinQuote = (coinObj) =>
  parseFloat(coinObj.quote.USD.price).toFixed(2)
const formatRapidQuote = (data) =>
  parseFloat(data.open).toFixed(2)

const getCoinTickerData = async () => {
  const { error, data } = await coin.quotes()
  if (error) {
    console.log(error)
    return []
  }
  return Object.entries(data).map(([_key, value]) =>
    displayScript === "scrolling" ?
      { text: `${value.symbol} ${formatCoinQuote(value)}` } :
      { r1Text: value.symbol, r2Text: formatCoinQuote(value)}
  )
}

const getRapidTickerData = async () => Promise.all(
  rapidSymbols.map( async (symbol) =>{
    const { error, data } = await rapid.quote(symbol)
    if (error) {
      console.log(error)
      return null
    }
    return displayScript === "scrolling" ?
      { text: `${data.symbol} ${formatRapidQuote(data)}` } :
      { r1Text: data.symbol, r2Text: formatRapidQuote(data)}
  })
)
  
const main = async () => {
  // gather all ticker data
  const tickerData = [
    ...await getCoinTickerData(),
    ...await getRapidTickerData()
  ]

  // set it to cycle through the 
  if (displayScript === 'scrolling') {
    while(true) {
      for (var i = 0; i < tickerData.length; i++) {
        await oled.scrolling(tickerData[i])
      }
    }
  } else if (displayScript === 'fixedTwoRows') {
    while(true) {
      for (var i = 0; i < tickerData.length; i++) {
        await oled.fixedTwoRows(tickerData[i])
        await delay(5000)
      }
    }
  }
}

main()
