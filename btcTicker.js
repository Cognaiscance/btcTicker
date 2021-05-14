const coin = require('./apis/coinMarketCap')
const rapid = require('./apis/rapid')
const oled = require('./apis/oled')
const {
  rapid: { symbols: rapidSymbols },
  oled: { displayScript },
  ticker: { iterations_per_lookup, fixedTwoRowsDelay },
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
  
const scrollRepeater = async (tickerData) => {
  for (var x = 0; x < iterations_per_lookup; x++) {
    for (var i = 0; i < tickerData.length; i++) {
      await oled.scrolling(tickerData[i])
    }
  }
}

const fixedRepeater = async (tickerData) => {
  for (var x = 0; x < iterations_per_lookup; x++) {
    for (var i = 0; i < tickerData.length; i++) {
      await oled.fixedTwoRows(tickerData[i])
      await delay(fixedTwoRowsDelay)
    }
  }
}

const main = async () => {
  while(true) {
    tickerData = [
      ...await getCoinTickerData(),
      ...await getRapidTickerData(),
    ]

    if (displayScript === 'scrolling') {
      await scrollRepeater(tickerData)
    } else if (displayScript === 'fixedTwoRows') {
      await fixedRepeater(tickerData)
    }
  }
}

main()
