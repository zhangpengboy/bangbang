<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" clearable class="top-content-item-input" placeholder="用户ID/账号/手机号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>所属项目：</span>
            <el-input v-model="project" clearable class="top-content-item-input" placeholder="输入项目名称/服务单号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>查询时间：</span>
            <div class="flex alCen flex1">
              <el-date-picker
              clearable
                v-model="startDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <div style="margin: 0 10px;">至</div>
              <el-date-picker
              clearable
                v-model="endDate"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
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
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="name" label="工人"  width="100"/>
        <el-table-column prop="name" label="手机号" width="120"/>
        <el-table-column prop="name" label="所属项目"/>
        <el-table-column prop="name" label="所属班组"/>
        <el-table-column prop="name" label="工作模式">
         <template slot-scope="scope">
           <p v-if="scope.row.status == 1">计时</p>
           <p style="color: #D9001B;" v-if="scope.row.status == 0">计件</p>
         </template>
        </el-table-column>
         <el-table-column prop="name" label="评价时间"/>
        <el-table-column prop="name" label="综合评分" width="150">
          <template slot-scope="scope">
             <el-rate
               v-model="scope.row.status"
               disabled
               show-score
               text-color="#ff9900"
               score-template="{value}"
             />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="评价内容"/>
        <el-table-column prop="name" label="评价者"/>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="deledtOne(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="seeScore(scope.row)">综合评价</el-button>
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

      <!-- 弹窗 -->
      <el-dialog
        title="综合评价"
        :visible.sync="dialogVisible"
        width="40%">
        <div class="popList">
            <div class="popItem flex alCen js-sb" v-for="item in 3">
              <div class="lf">
                <p class="tit bold">工作效率评分</p>
                <div class="flex scroeCon">
                  <p class="num bold">3.7</p>
                  <p class="score">分</p>
                </div>
                <el-rate
                  v-model="3.7"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </div>
              <div class="rt flex">
                  <div class="start">
                    <div class="startCon">
                       <img src="../../../assets/images/start.png" class="iconStart" v-for="item in 5">
                    </div>
                    <div class="startCon">
                       <img src="../../../assets/images/start.png" class="iconStart" v-for="item in 4">
                    </div>
                    <div class="startCon">
                       <img src="../../../assets/images/start.png" class="iconStart" v-for="item in 3">
                    </div>
                    <div class="startCon">
                       <img src="../../../assets/images/start.png" class="iconStart" v-for="item in 2">
                    </div>
                    <div class="startCon">
                       <img src="../../../assets/images/start.png" class="iconStart">
                    </div>

                  </div>
                  <div class="progress">
                    <div class="progressCon">
                      <el-progress :percentage="60" :show-text='true' :stroke-width='20' :width='200' color="#ff7e00"></el-progress>
                    </div>
                    <div class="progressCon">
                      <el-progress :percentage="40" :show-text='true' :stroke-width='20' :width='200' color="#ff7e00"></el-progress>
                    </div>
                    <div class="progressCon">
                      <el-progress :percentage="10" :show-text='true' :stroke-width='20' :width='200' color="#ff7e00"></el-progress>
                    </div>
                    <div class="progressCon">
                      <el-progress :percentage="6" :show-text='true' :stroke-width='20' :width='200' color="#ff7e00"></el-progress>
                    </div>
                    <div class="progressCon">
                      <el-progress :percentage="100" :show-text='true' :stroke-width='20' :width='200' color="#ff7e00"></el-progress>
                    </div>

                  </div>
              </div>
            </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>

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
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],
         clientHeight:'',
         serach:'',
         project:'',
         startDate:'',
         endDate:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         dialogVisible:false,

      }
    },
    created() {
      this.getWebHeing();
      // this.loadDate();
    },
    methods: {
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
      deledtOne(row){
        console.log(row)
        this.$confirm('确定要删除该条评价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
        }).catch(() => {

        })
      },
      // 查看评价
      seeScore(row){
        console.log(row)
        this.dialogVisible = true
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

  }
}

// 弹窗
.popList{
  .popItem{
    margin-bottom: 20px;
    color: #000000;
    .lf{
      .tit{
        font-size: 16px;

      }
      .scroeCon{
        margin: 15px 0;
        align-items: flex-end;
        .num{
          font-size: 30px;
        }
        .score{
          font-size: 16px;
        }
      }
    }
    .rt{
      .start{
        .startCon{
          margin-bottom: 13px;
          .iconStart{
            width: 15px;
            margin-left: 5px;
          }
        }
      }
      .progress{
        margin-left: 20px;
        .progressCon{
          width: 280px;
          margin-bottom: 10px;

        }
      }
    }
  }
}
.progressCon{
  ::v-deep .el-progress__text{
    font-size: 16px!important;
  }
}


</style>
