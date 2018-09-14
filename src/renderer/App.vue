<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import ElectronTitlebarWindows from 'electron-titlebar-windows'

  import { remote } from 'electron' // eslint-disable-line
  
  const mainWindow = remote.BrowserWindow

  export default {
    name: 'sevensnow',

    methods: {
      init() {
        document.querySelector('.titlebar-minimize').addEventListener('click', () => {
          const window = mainWindow.getFocusedWindow()
          window.minimize()
        })

        document.querySelector('.titlebar-resize').addEventListener('click', () => {
          const window = mainWindow.getFocusedWindow()
          window.maximize()
        })

        document.querySelector('.titlebar-close').addEventListener('click', () => {
          const window = mainWindow.getFocusedWindow()
          window.close()
        })
      }
    },

    mounted() {
      if (process.platform === 'win32') {
        const titlebar = new ElectronTitlebarWindows()
        titlebar.appendTo(document.body)

        document.onreadystatechange = () => {
          if (document.readyState === 'complete') {
            this.init()
          }
        }
      }
    }
  }
</script>
