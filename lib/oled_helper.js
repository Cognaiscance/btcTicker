const { exec } = require("child_process")
const { oled: {
  fontSize,
  scrollSpeed,
  nightMode,
  timezoneOffset,
  startNightHour,
  endNightHour,
} } = require('../config')

module.exports = {
  fontSize,
  scrollSpeed,
  useNightMode: () => {
    if (nightMode === 'on') {
      return true
    }
    if (nightMode === 'off') {
      return false
    }
    // return daylight calculated value
    let hour = new Date().getUTCHours() + timezoneOffset
    if (hour > 24) hour = hour - 24
    return hour > startNightHour || hour < endNightHour
  },
  execPythonScript: ({ scriptName, args = '' }) => new Promise((resolve, reject) => {
    exec(`python scripts/${scriptName} ${args}`, (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }
      return resolve({ stderr, stdout })
    })
  }).catch(error => ({ error: `Error: failed to run ${scriptName} -- ${error}` })),
}
