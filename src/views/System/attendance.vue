<template>
  <div class="attendance"  v-loading="loading">
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
        <el-table-column prop="radius" label="半径范围" width="180" />
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.status == 1 ?'启用':'停用'}}</p>
          </template>
         </el-table-column>
        <!-- <el-table-column prop="name" label="手机号码" width="180"/> -->
        <el-table-column prop="updater" label="操作人" />
        <el-table-column prop="updateTime" label="操作时间" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">{{ scope.row.status==1?'停用':'启用' }} </el-button>
            <el-button type="text" size="small" @click="dete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->

    </div>


  </div>
</template>

<script>
  import {
    	getAttendanceClass,
      insertOneAttendance,
      updateOneAttendance,
      removeAttendance,
      updateStatusAttendance
  } from '../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '启用',
             value: '1'
           }, {
             label: '停用',
             value: '0'
           }
         ],
         statusvalue: '',
         PageIndex:1,
         tableData:[
           {name:'你好'},
           {name:'你好a'}
         ],
         loading:false,

      }
    },
    created() {
      this.loadDate('');
    },
    methods: {
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          status:status
        }
        getAttendanceClass(params).then(res => {
          var data = res.data.list
          this.loading = false;
          console.log(data)
          for(var i=0;i<data.length;i++){
            if(data[i].updateTime){
              data[i].updateTime = formatDate(data[i].updateTime)
            }else{
              data[i].updateTime = formatDate(data[i].createTime)
            }

          }
          console.log(data)
          this.tableData = data

        })
      },
      search() {
        this.loadDate(this.statusvalue);
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.loadDate(this.statusvalue);
      },
      // 新增
      add(){
        this.$prompt('请输入半径范围1', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var reg = /^[0-9]+.?[0-9]*$/;
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else if(reg.test(value)==false){
            this.$message({
              type: 'success',
              message: '格式不正确 '
            });
          }else if(value>999999){
            this.$message({
              type: 'success',
              message: '超出最大范围 '
            });
          }else{
            var params = {
              radius:value,
              status:1
            }
            insertOneAttendance(params).then(res => {
              console.log(res)
              this.loadDate();

            })
          }
        })
      },
      // 编辑
      edit(row){
        console.log(row);
        this.$prompt('请输入半径范围', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:row.radius
        }).then(({ value }) => {
          var reg = /^[0-9]+.?[0-9]*$/;
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else if(reg.test(value)==false){
            this.$message({
              type: 'success',
              message: '格式不正确 '
            });
          }else if(value>999999){
            this.$message({
              type: 'success',
              message: '超出最大范围 '
            });
          }else{
            var params = {
              id:row.id,
              radius:value,
              status:row.status
            }
            updateOneAttendance(params).then(res => {
              var data = res.data
              console.log(data)
               this.loadDate();
            })
          }
        })
      },
      changeStatus(row){
        console.log(row);
        var params = {
          id:row.id,
          radius:row.radius,
          status:row.status?'0':'1'
        }
        updateOneAttendance(params).then(res => {
          var data = res.data
          console.log(data)
           this.loadDate();
        })
      },
      dete(row){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id:row.id
          }
          removeAttendance(params).then(res => {
            var data = res.data
            console.log(data)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
             this.loadDate();
          })
        }).catch(() => {

        })
      },

    }
  }
</script>

<style lang="scss" scoped="scoped">

</style>
