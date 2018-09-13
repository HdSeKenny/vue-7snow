<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          class="search-product"
          placeholder="按出售价格搜索"
          suffix-icon="el-icon-search"
          v-model="productSearchValue">
        </el-input>
      </el-col>
      <el-col :span="12">
        <p class="total">总数：{{displayedProducts.length}}</p>
      </el-col>
    </el-row>

    <div class="products-table">
      <el-table :data="splitProducts" style="width: 100%; text-align: center" :header-cell-style="headerCellStyle" :cell-style="getCellStyle"
        border>
        <el-table-column prop="date.format" label="时间" sortable width="120"></el-table-column>
        <el-table-column prop="type.value" label="种类" width="80"></el-table-column>
        <el-table-column prop="quality.value" label="品质" width="70" :filters="productQualities" :filter-method="filterQualities" filter-placement="bottom-end">
        </el-table-column>
        <el-table-column prop="price.value" label="出售价格" width="100"></el-table-column>
        <el-table-column prop="allocationString.value" label="分配" width="140">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left" width="200">
              <strong>分配人员 :</strong>
              <hr class="hr-popover" />
              <el-tag v-for="tag in scope.row.teamMembers.value" :key="tag.name" :type="tag.type" size="small" style="margin: 3px;">{{tag.name}}</el-tag>
              <div slot="reference" class="name-wrapper"><span>{{scope.row.allocationString.value}}</span></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleCheckout(scope.$index, scope.row)">结算</el-button>
            <el-dropdown>
              <el-button type="primary" size="mini">编辑</el-button>
              <el-dropdown-menu slot="dropdown">
                <div @click="handleEdit(scope.$index, scope.row)">
                  <el-dropdown-item><i class="el-icon-edit"></i> 修改</el-dropdown-item>
                </div>
                <div @click="handleDelete(scope.$index, scope.row)">
                  <el-dropdown-item><i class="el-icon-delete"></i> 删除</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
  </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="42%" :before-close="handleCloseDialog" v-show="checkoutProductRow">
        <div class="checkout-info">
          <P class="info"> 出售价格：<span class="value">{{checkoutProductRow.price.value}}</span></p>
          <P class="info"> 竞拍人员：<span class="value">{{checkoutProductRow.auctionMember.value}}</span></p>
          <P class="info"> 竞拍价格：<span class="value">{{checkoutProductRow.auctionPrice.value}}</span></p>
          <p class="info"> 分配人员：
            <el-tag v-for="tag in checkoutProductRow.teamMembers.value" :key="tag.name" :type="tag.type" size="mini">{{tag.name}}</el-tag>
          </p>
          <P class="info">税收：<span class="value">{{Math.trunc(checkoutProductRow.price.value * revenue)}}</span></p>
          <div class="info">
            结算结果：
            <div class="result" v-show="checkoutProductRow.auctionPrice.value">
              <p>
                <span class="value money">{{checkoutProductRow.auctionMember.value}}(竞拍)</span> 获得铜钱：
                <span class="value money">{{auctionMemberPrice}}</span>
              </p>
              <p>其他每人分得铜钱：<span class="value money">{{memberPrice}}</span></p>
            </div>
            <div class="result" v-show="!checkoutProductRow.auctionPrice.value">
              <p>分配人员每人获得铜钱：<span class="value money">{{memberPrice}}</span></p>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCheckout" :disabled="false">结算</el-button>
        </span>
      </el-dialog>
        <div class="pager" v-show="totalPages > 1">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="splitedSize"
          :total="products.length"
          @current-change="pagerChange"
          :current-page="currentPage">
        </el-pagination>
      </div>

  </div>
</template>

<script>
  import utils from '../../utils'

  export default {
    name: 'product-page',
    props: ['handleConfirmCheckout', 'activeName'],
    components: {},
    data() {
      return {
        products: [],
        productQualities: [],
        headerCellStyle: {
          textAlign: 'center',
        },

        dialogVisible: false,
        dialogTitle: '结算信息',

        checkoutProductRow: {
          price: {},
          auctionMember: {},
          auctionPrice: {},
          teamMembers: {},
        },
        checkoutResult: '',
        revenue: 0.025,
        memberPrice: '',
        auctionMemberPrice: '',

        totalPages: 0,
        currentPage: 1,
        splitedSize: 6,
        productSearchValue: '',

        chunkProducts: [],
        splitProducts: [],
        displayedProducts: []
      }
    },
    watch: {
      productSearchValue(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.searchProducts(newVal)
        }
      }
      // activeName(a, b) {
      //   if (a !== b) {
      //     this.fetchData()
      //   }
      // },
    },
    methods: {
      fetchData() {
        Promise.all([
          utils.storageGetPromise('products_list'),
          utils.storageGetPromise('products'),
        ])
          .then((data) => {
            const products = data[0]
            const versions = data[1]
            this.productQualities = (versions && versions.product_quality) ?
              versions.product_quality.map((q) => {
                q.text = q.value
                return q
              }) : []
            this.products = products.length ? products : []
            this.displayedProducts = this.products
            this.setSplitedHistories()
          })
          .catch((err) => { throw err })
      },

      filterQualities(value, row) {
        return row.quality.value === value
      },

      handleEdit() {
        console.log('hello')
      },

      handleDelete() {

      },

      handleCheckout(value, row) {
        const { price, auctionMember, auctionPrice, teamMembers } = row
        const membersNum = teamMembers.value.length
        const actualPrice = price.value * (1 - this.revenue)
        if (auctionMember.value && auctionPrice.value) {
          this.memberPrice = Math.trunc((actualPrice - auctionPrice.value) / membersNum)
          this.auctionMemberPrice = auctionPrice.value + this.memberPrice
        }
        else {
          this.memberPrice = Math.trunc(actualPrice / membersNum)
        }

        this.checkoutProductRow = row
        this.checkoutProductRow.memberPrice = this.memberPrice
        this.checkoutProductRow.auctionMemberPrice = this.auctionMemberPrice
        this.dialogVisible = true
      },

      getCellStyle(scope) {
        const { row, columnIndex } = scope
        const qualityValue = row.quality.value
        const { name } = this.productQualities.find((pq) => pq.value === qualityValue)

        let styles = {}
        if (columnIndex === 2) {
          styles = {
            color: name,
            fontWeight: '600',
            fontSize: '16px',
            textDecoration: 'underline',
          }
        }
        else if (columnIndex === 4) {
          styles = {
            color: '#409EFF',
            fontSize: '12px',
          }
        }

        return styles
      },

      confirmCheckout() {
        this.checkoutProductRow.soldDate = utils.getTimeConfigObj('结算时间')
        this.dialogVisible = false
        this.handleConfirmCheckout(this.checkoutProductRow)
      },

      handleCloseDialog() {
        this.dialogVisible = false
      },

      pagerChange(a) {
        // this.chunkProducts = utils.chunkArray(this.displayedHistories, this.splitedSize)
        this.splitProducts = this.chunkProducts[a - 1]
        this.currentPage = a
      },

      setSplitedHistories() {
        this.chunkProducts = utils.chunkArray(this.displayedProducts, this.splitedSize)
        this.totalPages = this.chunkProducts.length
  
        const currentPage = (this.currentPage > this.totalPages) ? 1 : this.currentPage
        this.currentPage = this.isMax ? this.totalPages : currentPage
        this.splitProducts = this.totalPages ? this.chunkProducts[this.currentPage - 1] : []
      },

      searchProducts(price) {
        if (price.trim()) {
          this.displayedProducts = this.products.filter((p) => p.price.value.toString().includes(price))
        }
        else {
          this.displayedProducts = this.products
        }

        this.setSplitedHistories()
      }
    },

    created() {
      this.fetchData()
    },

    mounted() {
      // console.log(this.products)
      // this.setSplitedHistories()
    },

    updated() {
      // this.setSplitedHistories()
    }
  }
</script>

<style scoped>
  .products-table {
    min-height: 390px;
  }
</style>