<template>
  <div class="product-page">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="寄售中" name="first">
        <List :handleConfirmCheckout="handleConfirmCheckout" :activeName="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="结算记录" name="second">
        <History :isMax="isMax" :productQualities="productQualities" :activeName="activeName" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import utils from '../utils'
  import List from './Product/List'
  import History from './Product/History'

  export default {
    name: 'product-page',
    components: { List, History },
    data() {
      return {
        activeName: 'first',
        loading: true,
        productQualities: [],
        isMax: false,
      }
    },

    watch: {
      $route: 'fetchData',
    },

    methods: {
      fetchData() {
        utils.storageGetPromise('products').then((data) => {
          this.productQualities = (data && data.product_quality) ?
            data.product_quality.map((q) => {
              q.text = q.value
              return q
            }) : []
        })
          .catch((err) => { throw err })
      },

      handleTabClick() {},

      handleConfirmCheckout(rowProduct, success) {
        this.isMax = true
        utils.storageGetPromise('checkout_histories').then((histories) => {
          if (!histories.length) {
            histories = [rowProduct]
          }
          else {
            histories.push(rowProduct)
          }

          utils.storageSetPromise('checkout_histories', histories).then(() => {
            this.activeName = 'second'
            this.$notify({
              title: '结算成功',
              type: 'success',
              duration: 2000,
            })
            success()
          })
        })
      },
    },

    created() {
      this.fetchData()
    },

    mounted() {
      this.loading = false
    },

    updated() {
    }
  }
</script>

<style>
  .hr-popover {
    border: 1px solid #ebeef5
  }

  .checkout-info .el-tag--mini {
    margin-right: 10px;
  }

  .checkout-info .info {
    margin: 5px 0;
  }

  .checkout-info .info:last-child {
    margin-top: 10px;
  }
  
  .checkout-info .info .result {
    margin-top: 15px;
    margin-left: 10px;
  }

  .checkout-info .info .result p {
    margin: 5px 0;
  }

  .checkout-info .value {
    font-size: 16px;
    font-weight: 500;
    color: #409EFF;
  }

  .money {
    color: #F56C6C;
  }

  .checkout-histories {
    min-height: 385px;
  }

  .checkout-histories .history {
    width: 31.7%;
    font-size: 14px;
    margin: 3px 2% 3px 0;
    display: inline-block;
  }
  .checkout-histories .history.third {
    margin-right: 0;
  }

  .checkout-histories .history:hover {
    cursor: pointer;
  }

  .checkout-histories .history .quality {
    font-size: 18px;
    font-weight: 600;
  }

  .checkout-histories .history .header {
    width: 100%;
  }

  .checkout-histories .history .body {
    font-size: 11px;
  }

  .pager {
    margin-top: 15px;
    text-align: center;
  }

  .total {
    margin: 8px 0 8px 0;
    text-align: right;
    font-size: 19px;
    font-weight: 600;
  }

  .search-product, .search-history {
    margin-bottom: 10px;
  }
</style>