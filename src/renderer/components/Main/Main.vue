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
  import LeftBar from './Left/LeftBar';

  export default {
    name: 'main-page',
    components: { LeftBar },
    data() {
      return {
      };
    },
    methods: {

    },
  };
</script>

<style scoped>
  .main-page {
    width: 100%;
  }

  .left {
    width: 30%;
    min-height: 560px;
    float: left;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }

  .right {
    width: 62%;
    padding-top: 20px;
    margin-right: 4%;
    float: right;
  }

</style>
