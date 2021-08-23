<template>
  <div class="attendance">
    <!-- 头部  -->
    <div class="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>状态：</span>
            <el-select v-model="statusvalue" placeholder="全部">
              <el-option
                v-for="item in allStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='raLoad'>重置</el-button>
        </div>
      </div>
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="name" label="半径范围" width="180" />
        <el-table-column prop="name" label="状态" width="120"/>
        <el-table-column prop="name" label="手机号码" width="120"/>
        <el-table-column prop="name" label="操作人" />
        <el-table-column prop="name" label="操作时间" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">启用</el-button>
            <el-button type="text" size="small" @click="dete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->

    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '启用',
             value: '0'
           }, {
             label: '停用',
             value: '1'
           }
         ],
         statusvalue: '',
         PageIndex:1,
         tableData:[
           {name:'你好'},
           {name:'你好a'}
         ]

      }
    },
    created() {

    },
    methods: {
      search() {
        console.log('查询')
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
      },
      // 新增
      add(){
        this.$prompt('请输入半径范围', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else{
            this.$message({
              type: 'success',
              message: '范围: ' + value
            });
          }
        })
      },
      // 编辑
      edit(){
        this.$prompt('请输入半径范围', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else{
            this.$message({
              type: 'success',
              message: '范围: ' + value
            });
          }
        })
      },
      changeStatus(){

      },
      dete(){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        })
      },

    }
  }
</script>

<style lang="scss" scoped="scoped">

</style>
