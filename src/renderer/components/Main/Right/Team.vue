<template>
  <div class="add-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="团队成员" name="first">
        <div class="" v-show="!teamMembers.length">
          <p>你还没有配置过你的团队</p>
          <el-button type="primary" class="config-team" @click="configTeam">配置团队</el-button>
        </div>
        <div class="" v-show="teamMembers.length">
          <div v-for="member in teamMembers" :key="member.value">
            <el-card shadow="hover" class="person-block">
              <img :src="member.avatar" alt="card-p" class="person-card-avatar" >
              <p class="person-name">{{member.name}}</p>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选择人员" name="second">
        <el-row :gutter="20" class="search-row">
          <el-col :span="8">
            <search :content="gangMembers" :search="searchTeamMembers"></search>
          </el-col>
          <el-col :span="16">
            <span>You have selected <span class="member-length">{{teamMembers.length}}</span> members</span>
            <el-button class="make-sure-btn" type="primary" @click="chooseTeamMembers" :disabled="!teamMembers.length">确定选择</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="12" v-show="showError" class="alert-row">
          <el-alert :title="errorMessage" class="alert-err" type="error" @close="handleCloseAlert" show-icon></el-alert>
        </el-row>
        <el-row :gutter="12" v-for="(group, index) in splitedMembers" :key="index" >
          <el-col :span="8" v-for="person in group" :key="person.nickname" >
            <div class="" @click="selectMemeber(person)">
              <el-card shadow="hover" class="person-block">
                <img :src="person.avatar" alt="card-p" class="person-card-avatar" >
                <p class="person-name">{{person.name}}
                  <i class="el-icon-star-on" v-show="person.selected"></i></p>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="添加帮会成员" name="third">
        <el-button type="text" size="medium" disabled>此版块正在建设中...</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import storage from 'electron-json-storage'
  import dataTeam from '../../../../schema/team'
  import Search from '../Tools/Search'
  import utils from '../utils'

  export default {
    name: 'team-page',
    components: { Search },
    data() {
      return {
        activeName: 'first',
        searchPersonValue: '',
        visible: false,
        splitedMembers: [],
        gangMembers: [],
        teamMembers: [],
        splitSize: 3,
        fetchedKeys: ['myTeam', 'gangMembers'],
        errorMessage: '',
        showError: false,
      }
    },
    watch: {
      $route: 'fetchData',
    },
  
    methods: {
      fetchData() {
        const fetchPromises = this.fetchedKeys.map((key) => utils.storageGetPromise(key))
        Promise.all(fetchPromises).then((results) => {
          const myTeam = results[0]
          const gangMembers = results[1]
          this.teamMembers = myTeam.length ? myTeam : []
          if (gangMembers.length) {
            this.gangMembers = gangMembers
          } else {
            this.gangMembers = dataTeam.all_persons
            this.updatedGangMembers()
          }
          this.splitedMembers = this.chunkArray(this.gangMembers, this.splitSize)
        })
          .catch((err) => {
            throw err
          })
      },
      /**
       * Returns an array with arrays of the given size.
       *
       * @param arr {Array} array to split
       * @param size {Integer} Size of every group
       */
      chunkArray(arr, size) {
        const arrLength = arr.length
        const tempArray = []

        let myChunk
        for (let index = 0; index < arrLength; index += size) {
          myChunk = arr.slice(index, index + size)
          // Do something if you want with the group
          tempArray.push(myChunk)
        }

        return tempArray
      },

      configTeam() {
        this.activeName = 'second'
      },

      searchTeamMembers(results) {
        this.gangMembers = this.chunkArray(results, this.splitSize)
      },

      selectMemeber(person) {
        const memeberIdx = this.gangMembers.findIndex(p => p.name === person.name)
        const member = this.gangMembers[memeberIdx]
        if (memeberIdx > -1) {
          member.selected = !member.selected
          this.splitedMembers = this.chunkArray(this.gangMembers, this.splitSize)
          this.teamMembers = this.gangMembers.filter((tm) => tm.selected)
        }

        if (!this.teamMembers.length) {
          this.showError = true
          this.errorMessage = '至少选一个人吧。'
          const errorAlert = document.querySelector('.alert-err')
          errorAlert.style.display = ''
        }
        else {
          this.showError = false
        }
      },

      chooseTeamMembers() {
        this.updatedGangMembers()
        storage.set('myTeam', this.teamMembers, (error) => {
          if (error) throw error
          this.activeName = 'first'
        })
      },

      updatedGangMembers() {
        utils.storageSetPromise('gangMembers', this.gangMembers)
      },

      handleCloseAlert() {
        this.showError = false
      },
    },

    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },

    mounted() {
      window.store = storage
    },
  }
</script>

<style scoped>
  .config-team {
    margin-top: 10px;
  }

  .person-block {
    margin: 3px 0;
  }

  .person-block:hover {
    cursor: pointer;
  }

  .person-card-avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    display: inline-block;
  }  

  .person-name {
    margin: 4px 0 0 0;
    float: right;
  }

  .person-name i {
    color: #409EFF;
    margin-left: 30px;
  }

  .search-row {
    margin-bottom: 15px;
  }

  .make-sure-btn {
    margin-left: 40px;
  }

  .member-length {
    color: #409EFF;
    margin: 0 5px;
    font-style: italic;
    font-size: 20px;
  }

  .alert-row {
    margin-bottom: 15px;
  }
</style>