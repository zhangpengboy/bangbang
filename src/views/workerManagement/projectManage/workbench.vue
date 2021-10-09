<template>
  <div class="main">
    <!-- tab按钮切换 -->
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="xmsy">项目首页</el-radio-button>
      <el-radio-button label="xmry">项目人员</el-radio-button>
      <el-radio-button label="ysgl">验收管理</el-radio-button>
      <el-radio-button label="qdtj">签到统计</el-radio-button>
      <el-radio-button label="bzgl">班组管理</el-radio-button>
      <el-radio-button label="xxzx">消息中心</el-radio-button>
    </el-radio-group>
    <!-- tab按钮切换end -->

    <!-- 项目首页 -->
    <div v-if="tabPosition == 'xmsy'" class="demand-service">
      <workIndex />

    </div>
    <!-- 项目人员 -->
    <div v-if="tabPosition == 'xmry'" class="demand-service">
      <workProPeople />

    </div>
    <!-- 验收管理 -->
    <div v-if="tabPosition == 'ysgl'" class="demand-service">
      <workYsgl />
    </div>
    <!-- 签到统计 -->
    <div v-if="tabPosition == 'qdtj'" class="demand-service">
      <workSignin />

    </div>
    <!-- 班组管理 -->
    <div v-if="tabPosition == 'bzgl'" class="demand-service">
      <workIndex />

    </div>
    <!-- 消息中心 -->
    <div v-if="tabPosition == 'xxzx'" class="demand-service">
      <workIndex />

    </div>




  </div>
</template>

<script>
  import workIndex from '../component/workIndex.vue'
  import workProPeople from '../component/workProPeople.vue'
  import workSignin from '../component/workSignin.vue'
  import workYsgl from '../component/workYsgl.vue'
  export default {
    components: {
      workIndex,
      workProPeople,
      workSignin,
      workYsgl
    },
    data() {
      return {
        tabPosition: 'xmsy',

      }
    },
    mounted() {

    },
    created() {

    },
    methods: {
      choseNav(index){
        this.banzuIndex = index
      },



    }
  }
</script>

<style lang="scss" scoped="scoped">



</style>
