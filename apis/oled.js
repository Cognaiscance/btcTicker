const { execPythonScript, useNightMode } = require('../lib/oled_helper')
const { oled: { title: defaultTitle, fontSize, scrollSpeed } } = require('../config')
module.exports = {
  demo: () => execPythonScript({
    scriptName: 'demo.py'
  }),
  scrollingLrg: ({ title = defaultTitle, text = "", nightMode}) => execPythonScript({
    scriptName: 'scrollingLrg.py',
    args: `"${title}" "${text}" ${useNightMode()} ${scrollSpeed} ${fontSize}`,
  })
}