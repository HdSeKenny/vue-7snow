<template>
  <div class="left-bar">
    <div class="logo">
      <img src="~@/assets/logo.png" width="200" height="85">
    </div>
  <div class="select-options">
    <router-link
      :to="option.link"
      class="option"
      v-for="option in selectOptions"
      :key="option.value">
      <i :class="option.icon"></i>
      {{option.value}}
    </router-link>
  </div>
  </div>
</template>

<script>
  const listSource = [
    { value: '装备列表', link: '/main/product', icon: 'el-icon-menu' },
    { value: '增加物品', link: '/main/add-product', icon: 'el-icon-news' },
    { value: '结算信息', link: '/main/history', icon: 'el-icon-tickets' },
    { value: '记事小本', link: '/main/notebook', icon: 'el-icon-edit' },
    { value: '关于逆水', link: '/main/about', icon: 'el-icon-more-outline' },
  ];

  export default {
    name: 'left-bar',
    components: { },
    data() {
      return {
        selectOptions: listSource,
      };
    },
    methods: {},
  };
</script>

<style scoped>
  .logo {
    padding: 0 16px;
  }

  .left-bar {
    padding-top: 30px;
  }
  
  .select-options {
    margin-top: 25px;
  }
  
  .select-options .option {
    padding: 8px 40px;
    margin: 5px 0;
    list-style: none;
    display: block;
    text-decoration: none;
    color: #333;
  }

  .option.router-link-exact-active.router-link-active {
    color: #409EFF;
  }
  
  .option i {
    margin-right: 12px;
  }
</style>
