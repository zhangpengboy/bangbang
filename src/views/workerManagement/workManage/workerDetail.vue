<template>
  <div class="main">
      <!-- tab按钮切换 -->
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="joinPro">参加项目</el-radio-button>
        <el-radio-button label="userdetail">用户详情</el-radio-button>
      </el-radio-group>
      <!-- tab按钮切换end -->

      <!-- 参加项目 -->
      <div v-if="tabPosition == 'joinPro'" class="demand-service joinPro">
        <joinProject />

      </div>

      <!-- 用户详情 -->
      <div v-if="tabPosition == 'userdetail'" class="demand-service">
          <userDetail :bizCardInfo="bizCardInfo" :workPhotoList="workPhotoList" :zhenshuPhotoList="zhenshuPhotoList"/>

      </div>

    </div>

  </div>
</template>

<script>
  import userDetail from '../component/userDetail.vue'
  import joinProject from '../component/joinProject.vue'
  import {
    getworkerById
  } from '@/api/project'

  export default {
    components: {
    	userDetail,
      joinProject
    },
    data() {
      return {
        tabPosition: 'userdetail',
        bizCardInfo:{
          realName:'zhangsan',
          grade:'324',
          workYears:2,
          behavioralScore:1
        },
        adminUrl:'/api/commons/file/admin/v1/upload/public',
        isEditUserInfo:false,
        workPhotoList:[],
        zhenshuPhotoList:[],



      }
    },
    created() {
      this.getworkerById()
    },
    methods: {

      getworkerById() {
        getworkerById({id: this.$route.query.id}).then(res => {
          console.log('res', res.data)
          this.bizCardInfo = res.data

        })
      }


    }
  }
</script>

<style lang="scss" scoped="scoped">




</style>
