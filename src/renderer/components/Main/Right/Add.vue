<template>
  <div class="add-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="增加物品" name="first">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="sized-input" label="选择种类 *" :label-width="labelWidth">
                <el-autocomplete v-model="productTypeValue" :fetch-suggestions="querySearchAsync" placeholder="可手动输入物品">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="sized-input" label="选择品质 *" :label-width="labelWidth">
                <el-select v-model="productQualityValue" placeholder="选择">
                  <el-option v-for="item in productQuality" :key="item.value" :label="item.value" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="sized-input" label="出售价格 *" :label-width="labelWidth">
                <el-input-number v-model="price" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="sized-input" label="竞拍人员" :label-width="labelWidth">
                <el-input v-model="auctionMember"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="sized-input" label="竞拍价格" :label-width="labelWidth">
                <el-input-number v-model="auctionPrice" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="sized-input" label="分配人员 *" :label-width="labelWidth">
                <el-select v-model="allocationValue" placeholder="选择">
                  <el-option v-for="item in allocation" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="sized-input" label="备注信息" :label-width="labelWidth">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="Please input" v-model="markInfo">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="sized-input" label="" :label-width="labelWidth" v-show="teamMembers.length">
                <el-tag
                  v-for="tag in teamMembers"
                  :key="tag.name"
                  closable
                  @close="handleClose(tag)"
                  :type="tag.type" size="mini">
                  {{tag.name}}
                </el-tag>
                <div class="" v-show="allocationValue === 'custom'">
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="otherPersonName"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 外人</el-button>
                </div>
              </el-form-item>
              <el-form-item class="sized-input" label="" :label-width="labelWidth" v-show="!teamMembers.length">
                <span>你还没有配置你的团队</span>
                <router-link to="/main/team">
                  <el-button type="text" size="mini">去配置</el-button>
                </router-link >
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="上传图片" :label-width="labelWidth">
                <!-- <Upload></Upload> -->
                <el-button type="text" size="mini" disabled>还在设计中...</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="add-btn" label="" :label-width="labelWidth">
                <el-button type="primary" @click="addProduct">添加物品到仓库</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleCloseDialog">
      <div class="" v-show="missedInfo.length">
        <span class="product-err" v-for="(info, index) in missedInfo" :key="index"> {{info}}</span>
      </div>

      <div class="" v-show="!missedInfo.length">
        <div class="product-info" v-for="(v, key, index) in product" :key="index" v-show="v.value">
          <span class="name">{{v.name}}:</span>
          <div v-if="v.name === '分配人员'" class="value">
            <el-tag
              v-for="tag in v.value"
              :key="tag.name"
              :type="tag.type" size="small">
              {{tag.name}}
            </el-tag>
          </div>
          <div v-else  class="value">
            {{v.value}}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddProduct" :disabled="!!missedInfo.length">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import data from '../../../../schema/product'
  import Upload from '../Tools/Upload'
  import utils from '../utils'
  import Search from '../Tools/Search'
  import Dialog from '../Tools/Dialog'
  
  export default {
    name: 'add-page',
    components: { Upload, Search, Dialog },
    data() {
      return {
        activeName: 'first',
        labelPosition: 'left',
        labelWidth: '80px',
        productTypes: [],
        timeout: null,
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
        productQuality: [],
        productTypeValue: '',
        productQualityValue: '紫',
        otherProductTypeValue: '',
        markInfo: '',
        isAuction: false,

        // 分配
        allocationValue: '固定队',
        allocation: [
          { label: '固定队', value: 'myTeam' },
          { label: '自定义', value: 'custom' },
        ],
  
        tags: [
          { name: 'Tag 1', type: '' },
          { name: 'Tag 2', type: 'success' },
          { name: 'Tag 3', type: 'info' },
          { name: 'Tag 4', type: 'warning' },
          { name: 'Tag 5', type: 'danger' },
        ],

        teamMembers: [],
        fetchedKeys: [
          'product',
          'myTeam',
          // 'gangMembers',
        ],

        inputVisible: false,
        otherPersonName: '',

        price: undefined,
        auctionPrice: undefined,
        auctionMember: '',

        missedInfo: [],
        product: undefined,
        dialogVisible: false,
        dialogTitle: '',
      }
    },
    watch: {
      $route: 'fetchData',
    },

    methods: {
      fetchData() {
        const fetchPromises = this.fetchedKeys.map((key) => utils.storageGetPromise(key))
        Promise.all(fetchPromises).then((results) => {
          // order => product, myTeam, gangMembers
          const product = results[0]
          const myTeam = results[1]
          // const gangMembers = results[2]

          // product logical
          if (Object.keys(product).length) {
            this.productTypes = product.product_types
            this.productQuality = product.product_quality
          }
          else {
            utils.storageSetPromise('products', data).then(() => {
              this.productTypes = data.product_types
              this.productQuality = data.product_quality
            })
          }

          // team members logical
          if (myTeam.length) {
            this.teamMembers = myTeam
          }

          // gang members logical
          // if (gangMembers.length) {
          //   this.gangMembers = gangMembers
          // }
          // else {
          //   this.gangMembers = dataTeam.all_persons
          //   utils.storageSetPromise('gangMembers', this.gangMembers)
          // }
        })
          .catch((err) => {
            throw err
          })
      },

      querySearchAsync(queryString, cb) {
        const results = queryString ?
          this.productTypes.filter(this.createFilter(queryString)) : this.productTypes

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500 * Math.random())
      },

      createFilter(queryString) {
        return (type) => (type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      },

      handleClose(member) {
        this.teamMembers.splice(this.teamMembers.findIndex((m) => m.name === member.name), 1)
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        if (this.otherPersonName) {
          this.teamMembers.push({
            name: this.otherPersonName,
            value: this.otherPersonName,
            type: 'warning',
          })
        }
        this.inputVisible = false
        this.otherPersonName = ''
      },

      addProduct() {
        const dateNow = moment()
        const product = {
          type: {
            name: '种类',
            value: this.productTypeValue,
            need: true,
          },
          quality: {
            name: '品质',
            value: this.productQualityValue,
            need: true,
          },
          price: {
            name: '价格',
            value: this.price,
            need: true,
          },
          auctionMember: {
            name: '竞拍者',
            value: this.auctionMember,
          },
          auctionPrice: {
            name: '竞拍价',
            value: this.auctionPrice,
          },
          teamMembers: {
            name: '分配人员',
            value: this.teamMembers,
            need: true,
          },
          markInfo: {
            name: '备注',
            value: this.markInfo,
          },
          date: {
            name: '添加时间',
            value: `${dateNow.format('L')} ${dateNow.format('LT')}`,
            no_format: dateNow,
            format: dateNow.format('YY-MM-DD HH:mm'),
          },
          status: {
            name: '状态',
            value: '寄售中',
          },
          allocationString: {
            name: '分配',
            value: this.cutDownAllocationString(),
          },
        }

        const missedInfo = []
        Object.keys(product).forEach((key) => {
          const { name, value, need } = product[key]
          if ((need && !value) || (name === '分配人员' && !value.length)) {
            missedInfo.push(name)
          }
        })
  
        this.dialogVisible = true
        if (missedInfo.length) {
          this.missedInfo = missedInfo
          this.dialogTitle = '你需要完善以下的信息:'
        }
        else {
          product.id = dateNow.format().split(/[+:-]+/).join('')
          this.missedInfo = []
          this.product = product
          this.dialogTitle = '检查下物品信息:'
        }
      },

      cutDownAllocationString() {
        const names = this.teamMembers.map((tm) => tm.name)
        return `${names.slice(0, 2).join(', ')}...`
      },

      handleCloseDialog() {
        this.dialogVisible = false
      },

      confirmAddProduct() {
        utils.storageGetPromise('products_list')
          .then((data) => {
            let list = data
            if (!list.length) {
              list = [this.product]
            }
            else {
              list.push(this.product)
            }
  
            utils.storageSetPromise('products_list', list)
              .then(() => {
                this.dialogVisible = false
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 2000,
                })
                this.$router.push('/main/product')
              })
          })
      },
    },

    created() {
      this.fetchData()
    },
  }
</script>

<style scoped>
  .sized-input .el-input,
  .sized-input .el-input-number,
  .sized-input .el-select,
  .sized-input .el-autocomplete,
  .sized-input .el-textarea {
    width: 200px;
  }

  .add-btn {
    margin-top: 20px;
  }

  .sized-input .el-tag--mini {
    margin-right: 10px;
  }

   .sized-input .el-button--mini {
     padding: 5px 10px;
   }

   .product-err {
     color: #F56C6C;
     font-size: 18px;
   }

   .product-info {
     margin: 10px 0;
   }

   .product-info .name {
     display: inline-block;
     font-weight: 600;
   }

    .product-info .value {
     display: inline-block;
     margin-left: 10px;
     color: #409EFF;
   }

</style>