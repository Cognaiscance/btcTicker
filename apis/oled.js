const { execPythonScript, useNightMode, scrollSpeed, fontSize } = require('../lib/oled_helper')

module.exports = {
  demo: () => execPythonScript({
    scriptName: 'demo.py'
  }),
  scrollingLrg: ({ title = "", text = "", nightMode}) => execPythonScript({
    scriptName: 'scrollingLrg.py',
    args: `"${title}" "${text}" ${useNightMode()} ${scrollSpeed} ${fontSize}`,
  })
}