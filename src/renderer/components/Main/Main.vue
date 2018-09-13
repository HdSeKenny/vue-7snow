<template>
  <div class="main-page">
    <div class="left">
      <left-bar></left-bar>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import storage from 'electron-json-storage'
  import LeftBar from './Left/LeftBar'

  export default {
    name: 'main-page',
    components: { LeftBar },
    data() {
      return {
      }
    },
    methods: {

    },

    mounted() {
      window.store = storage
    },
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  .titlebar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-app-region: drag;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  button {
    -webkit-app-region: no-drag;
  }

  .el-notification.right {
    width: 35%;
  }

  .main-page {
    width: 100%;
  }

  .left {
    width: 22%;
    min-height: 580px;
    float: left;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }

  .right {
    width: 70%;
    padding-top: 20px;
    margin-right: 4%;
    float: right;
  }

  /* team person card */
  .el-card__body {
    padding: 10px;
    display: inline-block;
  }

  .el-dialog__body {
     padding: 10px 30px 10px 30px;
  }
  
  .el-notification.right {
    width: 25%;
  }

  .el-card__header {
    padding: 2px 10px;
  }
</style>
