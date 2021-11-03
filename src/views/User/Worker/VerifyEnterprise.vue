<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" class="top-content-item-input" placeholder="用户ID/账号" />
          </div>
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
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="id" label="ID"  width="120"/>
        <el-table-column prop="operatorName" label="名称" />
        <el-table-column prop="operatorMobileNo" label="手机号码" width="120"/>
        <el-table-column label="审核内容">
           <template slot-scope="scope">
             <el-button type="text" size="small" @click="checkdetail(scope.row)">查看信息</el-button>
           </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <!-- 1：审核中；2：已通过；3：已驳回； -->
            <p style="color:#F59A23 ;" v-if="scope.row.enterpriseAuth  == 1">审核中</p>
            <p style="color: #D9001B;" v-if="scope.row.enterpriseAuth  == 3">已驳回</p>
            <p style="color: #03BF16;" v-if="scope.row.enterpriseAuth  == 2">审核通过</p>
          </template>
         </el-table-column>
         <el-table-column prop="createTime" label="申请时间" width="200">
           <template slot-scope="scope">
						{{formatDate(scope.row.createTime)}}
					</template>
         </el-table-column>
        <el-table-column prop="updaterName " label="操作人"/>
        <el-table-column prop="updateTime" label="操作时间" width="200">
          <template slot-scope="scope">
						{{formatDate(scope.row.updateTime)}}
					</template>
        
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <template v-if="scope.row.enterpriseAuth == 1">
              <el-button type="success" size="small" @click="agree(scope.row)">同意</el-button>
              <el-button type="danger" size="small" @click="refuse(scope.row)">拒绝</el-button>
            </template>

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

    </div>

  <el-dialog
  title="查看信息"
  :visible.sync="detailshow"
  width="30%"
  :before-close="handleClose">
 <div class="detailshow">
   <div class="detailshow-list">
     <div class="detailshow-list-left"> 企业名称：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.enterpriseName" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>

   <div class="detailshow-list">
     <div class="detailshow-list-left"> 统一社会信用代码：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.businessLicenseRegistrationNo" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>

   <div class="detailshow-list">
     <div class="detailshow-list-left"> 法人：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.legalRepresentativeName" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>
   
   <div class="detailshow-list">
     <div class="detailshow-list-left"> 运营者姓名：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.legalRepresentativeName" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>

   <div class="detailshow-list">
     <div class="detailshow-list-left"> 运营者身份证号：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.operatorIdNo" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>

   <div class="detailshow-list">
     <div class="detailshow-list-left"> 运营者手机号码：</div>
     <div class="detailshow-list-right"> <el-input v-model="detaildata.operatorMobileNo" :disabled="true" placeholder="请输入内容"></el-input></div>
   </div>

   <div class="detailshow-list" style="pad">
     <div class="detailshow-list-left"> 资料照片：</div>
     <div class="detailshow-list-right"> 
       <div v-for="(item,i) in detaildata.fileUris" :key="i">
          <el-image style="width: 100px; height: 100px; margin: 0 10px" :src="item"></el-image>
       </div>
     </div>
   </div>
 </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="detailshow = false">取 消</el-button>
    <el-button size="small" type="primary" @click="detailshow = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import {
    getCollectionClass,
    getUserRealNameApply,
    getUpdateEnterpriseAuthStatus
  } from '../../../api/user.js'
	import moment from 'moment'
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '审核中',
             value: '1'
           }, {
             label: '审核通过',
             value: '2'
           }, {
             label: '已驳回',
             value: '3'
           }
         ],
         statusvalue: '',
         PageIndex:1,
         tableData:[
           {name:'你好'},
           {name:'你好a'}
         ],
         serach:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
		     clientHeight:0,
		    detailshow:false, //详情弹窗
        detaildata:{},
      }
    },
    created() {
      this.getWebHeing();
      this.loadDate('');
    },
    methods: {
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
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          status:status
        }
        getUserRealNameApply(params).then(res => {
          this.loading = false;
          console.log(res)
          var data = res.data.list
          // fileUris
          data.forEach(item => {
            item.fileUris = item.fileUris.split(",")
          });
          console.log('res', data)
          this.tableData = data
          this.PageCount = res.data.total

        })
      },
      search() {
        console.log('查询')
        this.loadDate(this.statusvalue);
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.loadDate(this.statusvalue);
      },
      // 导出
      exportTable(){

      },
      agree(row){
        console.log(row)
        this.$confirm('是否同意申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getUpdateEnterpriseAuthStatus({id:row.id,result:true}).then(res=>{
            console.log(res)
            if(res.code == 200){
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
              this.loadDate(this.statusvalue);
            }
               
          })
         
        }).catch(() => {

        })
      },
      refuse(row){
        console.log(row)
        this.$confirm('是否拒绝申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getUpdateEnterpriseAuthStatus({
					id:row.id,
          result:false
				}).then(res=>{
            console.log(res)
               if(res.code == 200){
               this.$message({
              type: 'success',
              message: '审核已驳回!'
            })
            this.loadDate(this.statusvalue);
               }
          })
        }).catch(() => {

        })
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
    formatDate(value) {
				return moment(value).format('YYYY-MM-DD')
			},
      //查看详细信息
      checkdetail(row){
      console.log(row)
      this.detaildata = row
      this.detailshow = true
      },
      //详细信息弹窗
      handleClose(){
        this.detailshow = false
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
.detailshow{
  .detailshow-list{
    display: flex;
    justify-content: start;
    height: auto;
    line-height: 50px;
    .detailshow-list-left{
      width: 30%;
      text-align: center;
    }
    .detailshow-list-right{
      width: 70%;
      display: flex;
      justify-content: start;
    }
  }
}
</style>
