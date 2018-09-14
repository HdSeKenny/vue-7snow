<template>
  <div class="left-bar">
    <div class="logo">
      <img src="~@/assets/logo.png" width="150" height="70">
    </div>
    <div class="select-options">
      <router-link
        :to="option.link"
        class="option"
        v-for="option in listSource"
        :key="option.value">
        <i :class="option.icon"></i>
        {{option.value}}
      </router-link>
    </div>
    <div class="bar-footer">
      <p> © 2018 Kenny <span class="version" @click="open('https://github.com/HdSeKenny/vue-7snow')">V 1.0</span></p>
    </div>
  </div>
</template>

<script>
  const listSource = [
    { value: '装备列表', link: '/main/product', icon: 'el-icon-menu' },
    { value: '增加物品', link: '/main/add-product', icon: 'el-icon-news' },
    { value: '团队信息', link: '/main/team', icon: 'el-icon-tickets' },
    { value: '记事小本', link: '/main/notebook', icon: 'el-icon-edit' },
    { value: '关于逆水', link: '/main/about', icon: 'el-icon-more-outline' },
  ]

  export default {
    name: 'left-bar',
    components: { },
    data() {
      return {
        listSource,
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      },
    },
  }
</script>

<style scoped>
  .logo {
    margin-top: 5px;
    padding: 0 30px;
  }

  .left-bar {
    padding-top: 30px;
  }
  
  .select-options {
    margin-top: 25px;
  }
  
  .select-options .option {
    padding: 8px 50px;
    margin: 5px 0;
    list-style: none;
    display: block;
    text-decoration: none;
    color: #333;
    -webkit-app-region: no-drag;
  }

  .option.router-link-exact-active.router-link-active {
    color: #409EFF;
  }
  
  .option i {
    margin-right: 12px;
  }

  .bar-footer {
    -webkit-app-region: no-drag;
    position: absolute;
    bottom: 20px;
    left: 45px;
    font-size: 12px;
    color: #bbb;
  }

  .bar-footer .version {
    color: #409EFF;
  }

  .bar-footer .version:hover {
    cursor: pointer;
  }
</style>
