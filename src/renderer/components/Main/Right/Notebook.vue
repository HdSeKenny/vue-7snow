<template>
  <div class="notebook-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="列表" name="first">
        <el-button type="text" size="medium" disabled>此版块正在建设中...</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'notebook-page',
    components: {},
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {},
  }
</script>

<style scoped>

</style>