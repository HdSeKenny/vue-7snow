<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          class="search-history"
          placeholder="按出售价格搜索"
          suffix-icon="el-icon-search"
          v-model="historySearchValue">
        </el-input>
      </el-col>
      <el-col :span="12">
        <p class="total">总数：{{displayedHistories.length}}</p>
      </el-col>
    </el-row>

    <div class="checkout-histories" v-show="splitedHistories.length">
      <el-card shadow="hover" class="history" v-for="(ch, idx) in splitedHistories"
        :key="idx" :class="(idx + 1) % 3 === 0 ? 'third' : ''">
        <div slot="header" class="clearfix">
          <span class="quality" :style="getQualityColor(ch.quality.value)">{{ch.quality.value}}</span>
          <span>{{ch.type.value}}</span>
        </div>
        <div class="body">
          <el-popover placement="right" width="100" trigger="hover">
            <el-tag v-for="tag in ch.teamMembers.value" :key="tag.name" :type="tag.type"
              size="mini" style="margin: 3px;">{{tag.name}}</el-tag>
            <div slot="reference">
              <div>出售日期：<strong>{{ch.date.format}}</strong></div>
              <div>结算日期：<strong>{{ch.soldDate.format}}</strong></div>
              <div>出售价格：<strong class="money">{{ch.price.value}}</strong></div>
              <span>分配人员：<strong>{{ch.allocationString.value}}</strong></span>
            </div>
          </el-popover>
        </div>
      </el-card>
    </div>
    <div class="pager" v-show="totalPages > 1">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="9"
        :total="checkoutHistories.length"
        @current-change="pagerChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="" v-show="!checkoutHistories.length">
      <el-button type="text" size="large" disabled>No data found...</el-button>
    </div>
  </div>
</template>

<script>
  import utils from '../../utils'

  export default {
    name: 'product-page',
    components: {},
    props: ['isMax', 'productQualities', 'activeName'],
    data() {
      return {
        checkoutHistories: [],
        displayedHistories: [],
        splitedHistories: [],
        totalPages: 0,
        currentPage: 1,
        historyValue: '',
        historySearchValue: '',
      }
    },

    watch: {
      historySearchValue(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.searchHistories(newVal)
        }
      },

      activeName(a, b) {
        if (a !== b) {
          this.fetchData()
        }
      },
    },

    methods: {
      fetchData() {
        utils.storageGetPromise('checkout_histories').then((histories) => {
          this.checkoutHistories = histories.length ? histories : []
          this.displayedHistories = this.checkoutHistories
          this.setSplitedHistories()
        })
          .catch((err) => { throw err })
      },

      pagerChange(a) {
        this.splitedHistories = this.chunkHistories[a - 1]
        this.currentPage = a
      },

      setSplitedHistories() {
        this.chunkHistories = utils.chunkArray(this.displayedHistories, 9)
        this.totalPages = this.chunkHistories.length

        const currentPage = (this.currentPage > this.totalPages) ? 1 : this.currentPage
        this.currentPage = this.isMax ? this.totalPages : currentPage
        this.splitedHistories = this.totalPages ? this.chunkHistories[this.currentPage - 1] : []
      },
  
      getQualityColor(qualityValue) {
        const quality = this.productQualities.find((pq) => pq.value === qualityValue)
        return {
          color: quality ? quality.name : '',
        }
      },

      searchHistories(price) {
        if (price.trim()) {
          this.displayedHistories = this.checkoutHistories.filter((ch) => ch.price.value.toString().includes(price))
        }
        else {
          this.displayedHistories = this.checkoutHistories
        }

        this.setSplitedHistories()
      }
    },

    created() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>