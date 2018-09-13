<template>
  <div class="add-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="关于逆水塞OL" name="first">
        <p>版本: 1.0.0</p>
        <p>图标设计：玉兰饼</p>
        <p>产品SB策划：酸辣汤</p>
        <p>程序开发：筱龙虾</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import data from '../../../../schema/data'

  export default {
    name: 'about-page',
    components: {},
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {

    },

    created() {
      console.log('created ====>')
    },

    mounted() {
      console.log('mounted =====>')
    },

    updated() {
      console.log('updated =====>')
      console.log(this.productTypeValue)
    },
  }
</script>

<style scoped>

</style>