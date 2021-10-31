<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>项目名称：</span>
            <el-input v-model="project" clearable class="top-content-item-input" placeholder="输入项目名称/服务单号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>项目联系人：</span>
            <el-input v-model="concat" clearable class="top-content-item-input" placeholder="用户ID/账号/手机号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>项目类型：</span>
            <el-select v-model="proTypevalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allproType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>劳务模式：</span>
            <el-select v-model="laowuvalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allLaowu"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>状态：</span>
            <el-select v-model="statusvalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allstatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

        </div>


      </div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='raLoad'>重置</el-button>
        </div>
      </div>

    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'" :cell-style="cellStyle">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="briefId" label="项目ID" />
        <el-table-column label="项目名称"  width="120">
          <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
            <p class="label" v-if="scope.row.type == 0">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="项目人数" />
        <el-table-column prop="orderId" label="所属服务单"/>
        <el-table-column prop="creatorName" label="项目联系人"/>
        <el-table-column prop="name" label="进场时间"/>
        <el-table-column prop="name" label="竣工时间"/>
        <el-table-column prop="name" label="服务周期"/>
        <el-table-column prop="name" label="延期天数">
          <template slot-scope="scope">
            <!-- <p :style="scope.row.status == 1?'color: #D9001B;':''">30天</p> -->
          </template>
        </el-table-column>
        <el-table-column prop="address" label="项目地点" width="200"/>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1" style="color: #D9001B">延期中</p>
            <p v-if="scope.row.status == 0" style="color: #0079FE;">进行中</p>
            <p v-if="scope.row.status == 2">已竣工</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="seeDetail(scope.row)">项目详情</el-button>
            <el-button type="text" size="small" @click="toWorkbench(scope.row)">工作台</el-button>
            <el-button type="text" size="small" @click="userWork(scope.row)">用工协议</el-button>
          </template>
        </el-table-column>

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

      <!-- 编辑弹窗 -->
      <el-dialog
        title="编辑项目"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="popList">
          <div class="item flex alCen">
            <p class="tit">项目名称</p>
            <input type="text" name="" class="ipt" placeholder="请输入项目名称" v-model="proName" value="" />
          </div>
          <div class="item flex alCen">
            <p class="tit">项目联系人</p>
            <input type="text" name="" class="ipt" placeholder="请输入项目联系人" v-model="concatPeople" value="" />
          </div>
          <div class="item flex alCen">
            <p class="tit">项目进场时间</p>
            <el-date-picker
             clearable
             class="flex1"
              v-model="startDate"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </div>
          <div class="item flex alCen">
            <p class="tit">项目竣工时间</p>
            <el-date-picker
              clearable
              class="flex1"
              v-model="endDate"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editPro">确 定</el-button>
        </span>
      </el-dialog>

    </div>

  </div>
</template>

<script>
  import {
    getProjectList,
    getProjectCsv
  } from '@/api/project'

  export default {
    data() {
      return {
        clientHeight:0,
         allproType: [
           {
             label: '邦宁项目',
             value: '0'
           }, {
             label: '用户自建',
             value: '1'
           }
         ],
         proTypevalue: '',
         allLaowu:[
           {
             label: '计时工',
             value: '0'
           }, {
             label: '计件工',
             value: '1'
           }
         ],
         laowuvalue:'',
         allstatus:[
           {
             label: '进行中',
             value: '0'
           }, {
             label: '已完工',
             value: '1'
           }
         ],
         statusvalue:'',
         project:'',
         concat:'',
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         dialogVisible:false,
         proName:'',
         concatPeople:'',
         startDate:'',
         endDate:'',



      }
    },
    created() {
      this.getWebHeing();
      this.loadDate();
    },
    methods: {
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize: this.PageSize,
          pageNum: this.PageIndex,
          // status:status
        }
        getProjectList(params).then(res => {
          var data = res.data.list
          console.log('res', data)
          this.tableData = data
        }).finally(()=>{
          this.loading = false;
        })
      },
      search() {
        console.log('查询')
        this.loadDate();
      },
      // 重置
      raLoad(){
        this.proTypevalue = '';
        this.laowuvalue = '';
        this.statusvalue = '';
        this.project = '';
        this.concat = '';
        this.PageIndex = 1;
        this.loadDate();
      },
      // 导出
      exportTable(){
        this.loading = true;
        getProjectCsv({
          pageSize: this.PageSize,
          pageNum: this.PageIndex,
        }).then(res=>{
        console.log("🚀 ~ file: projectList.vue ~ line 275 ~ exportTable ~ res", res)
        }).finally(()=>{
          this.loading = false
        })
      },
      // 编辑
      edit(){
        this.dialogVisible = true
      },
      editPro(){
          if(this.proName==''){
            this.$message({
              type: 'warning',
              message: '请输入项目名称'
            })
          }else if(this.concatPeople==''){
            this.$message({
              type: 'warning',
              message: '请输入项目联系人'
            })
          }else if(this.startDate==''){
            this.$message({
              type: 'warning',
              message: '请选择进场时间'
            })
          }else if(this.endDate==''){
            this.$message({
              type: 'warning',
              message: '请选择结束时间'
            })
          }else{
            console.log(this.proName)
            console.log(this.concatPeople)
            console.log(this.startDate)
            console.log(this.endDate)

          }
      },
      // 项目详情
      seeDetail(row){
        
        this.$router.push({ path: '/workerManagement/project-detail', query: { id: row.id }})
      },
      // 工作台
      toWorkbench(){

      },
      // 用工协议
      userWork(){

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
      cellStyle({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 1) {
              return `position:relative;`;
          } else {
              return ''
          }
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
      },


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
    .flex1{
      flex: 1;
    }
  }
}

  .box{
    .label{
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 40px solid #333333;
      border-left: 40px solid transparent;
      position: absolute;
      top: 0;
      right: 0;
      .lableTxt{
        width: 40px;
        color: #FFFFFF;
        text-align: center;
        transform: rotate(45deg);
        position: absolute;
        padding: 10px 0;
        right: -7px;
        top: -45px;
        font-size: 12px;
      }
    }
  }



</style>
