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
          <userDetail :bizCardInfo="bizCardInfo" :workPhotoList="workPhotoList" :zhenshuPhotoList="zhenshuPhotoList" :projectList="projectList"/>

      </div>

    </div>

  </div>
</template>

<script>
  import userDetail from '../component/userDetail.vue'
  import joinProject from '../component/joinProject.vue'
  import {
    getworkerById,
    getProjectExperienceList
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
        workPhotoList:[], //工作照片
        zhenshuPhotoList:[],//证书
        projectList:[],//项目经验


      }
    },
    created() {
      this.getworkerById()
      this.getProjectExperienceList()
    },
    methods: {
      // 工人用户信息
      getworkerById() {
        getworkerById({id: this.$route.query.id}).then(res => {
          // console.log('res', res.data)
          this.bizCardInfo = res.data

        })
      },
        //工人项目经验
       getProjectExperienceList() {
        getProjectExperienceList({userId: this.$route.query.id}).then(res => {
          this.projectList = res.data.records
          console.log(this.projectList)
        })
      }


    }
  }
</script>

<style lang="scss" scoped="scoped">




</style>
