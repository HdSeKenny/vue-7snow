<template>
  <div class="add-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="增加物品" name="first">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="选择种类">
                <el-select v-model="productTypeValue" placeholder="选择">
                  <el-option v-for="item in productTypes" :key="item.value" :label="item.value" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-input
                v-model="otherProductTypeValue"
                v-show="productTypeValue === '其他'"
                autoComplete
                placeholder="手动输入物品"></el-input>
            </el-col>
          </el-row>
          <el-form-item label="选择品质">
            <el-select v-model="productQualityValue" placeholder="选择">
              <el-option v-for="item in productQuality" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import data from '../../../../schema/data';

  export default {
    name: 'add-page',
    components: {},
    data() {
      const productTypes = data.product_types;
      const productQuality = data.product_quality;
      return {
        activeName: 'first',
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
        productTypes,
        productQuality,
        productTypeValue: '',
        productQualityValue: '',
        otherProductTypeValue: '',
      };
    },
    methods: {

    },

    created() {
      console.log('created ====>');
    },

    mounted() {
      console.log('mounted =====>');
    },

    updated() {
      console.log('updated =====>');
      console.log(this.productTypeValue);
    },
  };
</script>

<style scoped>
  .product-list {
    /* border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 20px; */
  }
</style>