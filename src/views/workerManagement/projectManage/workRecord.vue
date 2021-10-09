<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>项目人员：</span>
            <el-input v-model="serachPro" clearable class="top-content-item-input" placeholder="用户账号/名字" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>操作时间：</span>
            <el-date-picker
             clearable
              v-model="searchTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>操作人：</span>
            <el-input v-model="serachPeople" clearable class="top-content-item-input" placeholder="用户账号/手机号" />
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
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="flex alCen">
          <div class="bold">数据列表</div>
          <!-- tab按钮切换 -->
          <div class="flex alCen tab" style="margin-left: 30px;">
            <p :class="['tabItem',banzuIndex==index?'tabItemHov':'']" @click="choseNav(index)" v-for="(item,index) in banzuTabCon">{{item.name}}</p>
          </div>
          <!-- tab按钮切换end -->
        </div>

        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="name" label="手机号" width="120"/>
        <el-table-column prop="name" label="所属班组"/>
        <el-table-column prop="name" label="变更前" v-if="banzuIndex==0" :key="Math.random()"/>
        <el-table-column prop="name" label="变更后" v-if="banzuIndex==0" :key="Math.random()"/>
        <el-table-column prop="name" label="操作时间" v-if="banzuIndex==0" :key="Math.random()"/>
        <el-table-column prop="name" label="进场时间" v-if="banzuIndex==1" :key="Math.random()" />
        <el-table-column label="离队时间" v-if="banzuIndex==1" :key="Math.random()">
         <template slot-scope="scope">
           <p style="color: #D9001B;">{{scope.row.status}}</p>
         </template>
        </el-table-column>
        <el-table-column prop="name" label="操作备注" v-if="banzuIndex==1" :key="Math.random()"/>
        <el-table-column prop="name" label="操作人"/>
        <el-table-column prop="name" label="操作端口"/>

      </el-table>
      <!-- 表格end -->
      <!-- 分页  -->
      <div class="flex fcenter page" id="page">
        <el-pagination
          id="page"
          class="page"
          background
          :current-page="PageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="PageSize"
          layout="total, prev, pager, next,sizes, jumper"
          :total="PageCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 分页end -->

    </div>

  </div>
</template>

<script>
  import {
    getCollectionClass
  } from '../../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         PageIndex:1,
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],
         clientHeight:'',
         serachPro:'',
         searchTime:'',
         serachPeople:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         banzuTabCon:[
           {
             name:'工资修改记录',
             id:1
           },{
             name:'操作离队记录',
             id:2
           }
         ],
         banzuIndex:0,

      }
    },
    created() {
      this.getWebHeing();
      // this.loadDate();
    },
    methods: {
      choseNav(e){
        this.banzuIndex = e
      },
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          status:status
        }
        getCollectionClass(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          this.tableData = data

        })
      },
      search() {
        console.log('查询')
        this.loadDate();
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.loadDate();
      },
      // 导出
      exportTable(){

      },
      /** 选择分页 */
      handleSizeChange(e) {
        this.PageSize = e
        this.PageIndex = 1
        this.loadDate()
      },
      /** 点击分页 */
      handleCurrentChange(e) {
        this.PageIndex = e
        this.loadDate()
      },
      /** 计算页面高度 */
      getWebHeing() {
      	this.$nextTick(() => {
      		this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      			.offsetHeight - document.getElementById('page')
      			.offsetHeight - document.getElementById('boxTop')
      			.offsetHeight - 180;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - document.getElementById('boxTop')
      		  	.offsetHeight - 180;
      		  this.$forceUpdate();
      		}
      	})
      }


    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
  }
.popList{
  .item{
    margin-top: 10px;
    .tit{
      width: 150px;
    }
    .ipt{
      height: 40px;
      flex: 1;
      border: 1px solid #d9d9d9;
      padding-left: 8px;
    }

  }
}
.tab{

  .tabItem{
    border: 1px solid #DCDFE6;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
  }
  .tabItemHov{
    background-color: #1890ff;
    color: #FFFFFF;
  }
}

</style>
