const remote = require('remote')
const BrowserWindow = remote.require('browser-window')

function init() {
  document.getElementById('min-btn').addEventListener('click', () => {
    const window = BrowserWindow.getFocusedWindow()
    window.minimize()
  })

  document.getElementById('max-btn').addEventListener('click', () => {
    const window = BrowserWindow.getFocusedWindow()
    window.maximize()
  })

  document.getElementById('close-btn').addEventListener('click', () => {
    const window = BrowserWindow.getFocusedWindow()
    window.close()
  })
}

// exports = module.exports = function menu() {
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init()
  }
}
// }
