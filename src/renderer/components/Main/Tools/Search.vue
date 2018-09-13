<template>
  <el-autocomplete
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="Please input"
    @select="handleSelect">
    <i
      class="el-icon-search el-input__icon"
      slot="suffix"
      @click="handleIconClick">
    </i>
    <template slot-scope="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete>
</template>

<script>
  export default {
    props: ['content', 'search'],
    data() {
      return {
        source: '',
        state: '',
      }
    },
    methods: {
      querySearch(queryString, cb) {
        const source = this.source
        const results = queryString ? source.filter(this.createFilter(queryString)) : source
        // call callback function to return suggestion objects
        cb(results)

        if (this.search) {
          this.search(results)
        }
      },
      createFilter(queryString) {
        return (link) => (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      },

      handleSelect(item) {
        const results = this.source.filter(this.createFilter(item.name))
        if (this.search) {
          this.search(results)
        }
      },
      handleIconClick(ev) {
        console.log(ev)
      },
    },
    mounted() {
      this.source = this.content
    },
  }
</script>

<style scoped>
  /* .my-autocomplete {
    li {
      line-height: normal;
      padding: 17px;

      .value {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .link {
        font-size: 12px;
        color: #b4b4b4;
      }
    }
  } */
</style>
