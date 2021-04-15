const { execPythonScript, useNightMode } = require('../lib/oled_helper')
const { oled: { title: defaultTitle, fontSize, scrollSpeed } } = require('../config')
module.exports = {
  demo: () => execPythonScript({
    scriptName: 'demo.py'
  }),
  scrollingLrg: ({ title = defaultTitle, text = ""}) => execPythonScript({
    scriptName: 'scrollingLrg.py',
    args: `"${title}" "${text}" ${useNightMode()} ${scrollSpeed} ${fontSize}`,
  }),
  fixedTwoRows: ({ title = defaultTitle, r1Text = "", r2Text = ""}) => execPythonScript({
    scriptName: 'fixedTwoRows.py',
    args: `"${title}" "${r1Text}" "${r2Text}" ${useNightMode()} ${fontSize}`,
  })
}