<template>
  <div class="product-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="货物列表" name="first" class="product-list" v-loading="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" sortable width="180" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="180">
          </el-table-column>
          <el-table-column prop="address" label="Address" :formatter="formatter">
          </el-table-column>
          <el-table-column prop="tag" label="Tag" width="100" :filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
            :filter-method="filterTag" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未结算" name="second">Config</el-tab-pane>
      <el-tab-pane label="结算记录" name="third">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    name: 'product-page',
    components: {},
    data() {
      return {
        activeName: 'first',
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home',
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office',
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home',
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office',
        }],
        loading: true,
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      formatter(row, column) {
        console.log(column);
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column.property;
        return row[property] === value;
      },
    },

    created() {
      console.log('created ====>');
    },

    mounted() {
      this.loading = false;
      console.log('mounted =====>');
    },

    updated() {
      console.log('updated =====>');
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