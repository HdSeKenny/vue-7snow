<template>
  <div class="upload">
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'upload-box',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
    },
  }
</script>
<style>
  .el-upload.el-upload--picture-card {
    width: 90px;
    height: 90px;
    line-height: 100px;
  }
</style>
