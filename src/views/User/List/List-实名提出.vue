<template>
  <div class="main" v-loading="loading">

    <!-- 头部  -->
    <div class="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" class="top-content-item-input" placeholder="ID/项目名称" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>实名状态：</span>
            <el-select v-model="reamNamevalue" placeholder="全部">
              <el-option
                v-for="item in reamNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>企业认证：</span>
            <el-select v-model="authvalue" placeholder="全部">
              <el-option
                v-for="item in authOptions"
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
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>工人等级：</span>
            <el-select v-model="gradevalue" multiple placeholder="全部">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>用户登录：</span>
            <el-select v-model="loginvalue" placeholder="全部">
              <el-option
                v-for="item in loginOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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

      </div>
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical">
        <div class="bold">数据列表</div>
        <el-button @click="exportTable">导出</el-button>
      </div>

      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="realName" label="名称" width="120"/>
        <el-table-column prop="phone" label="手机号码" width="120"/>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
          	{{scope.row.gender == 0 ?'男':scope.row.gender == 1 ?'女':'未知'}}
          </template>
        </el-table-column>
        <el-table-column prop="realNameAuth" label="实名状态">
          <template slot-scope="scope">
            	{{scope.row.realNameAuth == 0 ?'未实名':'已实名'}}
            </template>
        </el-table-column>
        <el-table-column prop="enterpriseAuthStatus" label="企业认证">
          <template slot-scope="scope">
            {{scope.row.enterpriseAuthStatus == 0 ?'未提交':scope.row.enterpriseAuthStatus == 1 ?'审核中':scope.row.enterpriseAuthStatus == 2 ?'已通过':scope.row.enterpriseAuthStatus == 3 ?'已驳回':''}}
          </template>
        </el-table-column>
        <el-table-column prop="workerGrade" label="工人等级">
          <template slot-scope="scope">
            {{scope.row.workerGrade == 0 ?'普通工人':scope.row.workerGrade == 1 ?'铜牌工人':scope.row.workerGrade == 2 ?'银牌工人':scope.row.workerGrade == 3 ?'金牌工人':''}}
          </template>
        </el-table-column>

        <el-table-column prop="userType" label="用户登录">
          <template slot-scope="scope">
            {{scope.row.userType == 0 ?'企业端':scope.row.userType == 1 ?'工人端':scope.row.userType == 2 ?'管理端':''}}
          </template>
        </el-table-column>
        <el-table-column prop="userStatus" label="状态">
          <template slot-scope="scope">
            {{scope.row.userStatus == 0 ?'正常':scope.row.userStatus == 1 ?'冻结':''}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" />
        <el-table-column prop="updaterName" label="操作人" />
        <el-table-column prop="updateTime" label="操作时间" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleLook(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="changeSte(scope.row)">{{ scope.row.userStatus==1?'激活':'冻结' }}</el-button>
            <el-button v-if="scope.row.realNameAuth==0" type="text" size="small" @click="reanName(scope.row)">实名</el-button>
            <el-button v-if="scope.row.enterpriseAuthStatus==0" type="text" size="small" @click="authen(scope.row)">企业认证</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->

      <!-- 分页  -->
      <div class="flex fcenter page">
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

      <!-- 实名弹窗 -->
      <realName :realNamePop.sync='realNamePop'/>

      <!-- 企业认证 -->
      <el-dialog
        title="添加企业认证"
        :visible.sync="qiyeRZPop"
        width="30%"
        center
      >
        <div class="reanNamePoplist reanNamePoplist2">
          <div class="item">
            <p class="tit">资料上传：</p>
            <div class="popIdCard flex alCen">

                <el-upload
                  name="multipartFile"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :file-list="fileUris"
                  :action="adminUrl"
                  :on-success="qiyeUp"
                  :on-remove="qiyeRemove"
                  :limit='3'
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="fileUris" alt="" />
                </el-dialog>

            </div>

          </div>
          <div class="item">
            <p class="tit">企业名称：</p>
            <input type="text" name="" v-model="enterpriseName" placeholder="请填企业名称" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">营业执照注册号：</p>
            <input type="text" name="" v-model="businessLicenseRegistrationNo" placeholder="请输入营业执照注册号" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">法人姓名：</p>
            <input type="text" name="" v-model="legalRepresentativeName" placeholder="请输入法人姓名" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">运营者姓名：</p>
            <input type="text" name="" v-model="operatorName" placeholder="请输入运营者姓名" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">运营者联系电话：</p>
            <input type="text" name="" v-model="operatorMobileNo" placeholder="请输入运营者联系电话" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">身份证号：</p>
            <input type="text" name="" v-model="operatorIdNo" placeholder="请输入身份证号" class="ipt" value="">
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qiyeRZPop = false">取 消</el-button>
          <el-button type="primary" @click="renZhTrue">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {
  	getuserqueryPage,
    updateUserStatus,
    uploadIdCard,
    realNameAuth,
    qiYeApply,
    exportCsvUser,
    uploadIdCardByAli,
    getPreSignFile,
    uploadpublic
} from '../../../api/user.js'

import realName from '../components/real-name.vue';

export default {
  components:{
    realName
  },
  data() {
    return {
      loading: false,
      tableData: [{
        type: 0,
        name: '工人1'
      }, {
        type: 1,
        name: '工人2'
      }], // 表单列表
      PageIndex: 1, // 页码
      PageSize: 10, // 显示多少条数据
      PageCount: 0, // 总条数
      serach: '', // 搜索
      reamNameOptions: [
        {
          label: '未实名',
          value: '0'
        }, {
          label: '已实名',
          value: '1'
        }
      ], // 实名状态
      reamNamevalue: '', // 选中
      authOptions: [
        {
          label: '未认证',
          value: '1'
        }, {
          label: '已认证',
          value: '2'
        }
      ], // 企业认证
      authvalue: '',
      gradeOptions: [ // 工人等级
        {
          label: '普通工人',
          value: '0'
        }, {
          label: '铜牌工人',
          value: '1'
        }, {
          label: '银牌工人',
          value: '2'
        }, {
          label: '金牌工人',
          value: '3'
        }
      ],
      gradevalue: [],
      loginOptions: [ // 用户登录
        {
          label: '企业端',
          value: '0'
        }, {
          label: '工人端',
          value: '1'
        }, {
          label: '后台端',
          value: '2'
        }
      ],
      loginvalue: '',
      allStatus: [
        {
          label: '正常',
          value: '0'
        }, {
          label: '冻结',
          value: '1'
        }
      ],
      statusvalue: '',

      // 实名认证
      realNamePop:false,
      rnUserId :'',
      rnUserType:'',


      qiyeRZPop: false,
      // 企业认证
      enterpriseName:'',
      businessLicenseRegistrationNo:'',
      legalRepresentativeName:'',
      operatorName:'',
      operatorMobileNo:'',
      operatorIdNo:'',
      qyuserId:'',
      fileUris:[], //证件
      dialogVisible:false,
      adminUrl: '/api/commons/file/admin/v1/upload/public',

    }
  },
  created() {
    this.getUser()
  },
  methods: {
    

    getUser() {
       this.loading = true;
       var query = {
        id:this.serach,
        enterpriseAuthStatus: this.authvalue,
        grades: this.gradevalue.join(',') ,
        pageNum: this.PageIndex,
        pageSize: this.PageSize,
        realNameAuth: this.reamNamevalue,
        userStatus: this.statusvalue,
        userType: this.loginvalue
      }
      getuserqueryPage(query).then(res => {
        var data = res.data
        console.log('res', data)
        this.loading = false;
        this.PageCount = data.total
        this.tableData = data.list
      })
    },
    search() {
      console.log('查询')
      this.getUser()
    },
    // 重置
    raLoad(){
        this.serach='';
        this.reamNamevalue = '';
        this.authvalue = '';
        this.gradevalue = [];
        this.loginvalue = '';
        this.statusvalue = '';
        this.PageIndex = 1;
        this.getUser()
    },
    // 导出
    exportTable(){
      console.log('导出');
      var query = {
        id:this.serach,
        enterpriseAuthStatus: this.authvalue,
        grades: this.gradevalue.join(',') ,
        pageNum: this.PageIndex,
        pageSize: this.PageSize,
        realNameAuth: this.reamNamevalue,
        userStatus: this.statusvalue,
        userType: this.loginvalue
      }
      console.log(query);
      exportCsvUser(query).then(res => {
        console.log(res)
        var responseURL = res.responseURL;
        window.open(responseURL,'_blank')
      }).catch(res=>{
        console.log(res)
        this.$message({
            message:'下载失败！',
            type:'error',
            showClose:true
        })
      })



    },

    /** 查看，区分工人和企业跳转不同页面 */
    handleLook(row) {
      console.log(row.userType)
      if(row.userType==0){ //企业端
        this.$router.push({ path: '/User/enterprisedetails', query: { id: row.id ,userType:row.userType ,joinType:1 }})
      }else if(row.userType==1){ //工人端
         this.$router.push({ path: '/User/userdetail', query: { id: row.id ,userType:row.userType,joinType:1 }})
      }


    },
    /** 选择分页 */
    handleSizeChange(e) {
      this.PageSize = e
      this.PageIndex = 1
      this.getUser()
    },
    /** 点击分页 */
    handleCurrentChange(e) {
      this.PageIndex = e
      this.getUser()
    },
    /** 实名 */
    reanName(row) {
      console.log(row)
      this.rnUserId = row.id
      this.rnUserType = row.userType
      this.realNamePop = true
    },
    // 激活冻结
    changeSte(row) {
      var that = this;
      console.log(row)
      if (row.userStatus == 1) { // 冻结去激活
        this.$confirm('是否确定激活用户', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            userId:row.id,
            userStatus: 0,
            userType: row.userType
          }
          console.log(params)
          updateUserStatus(params).then(res => {
            console.log(res)
            if(res.code==200){
              that.$message({
                type: 'success',
                message: '操作成功!'
              })
              that.getUser()
            }
          })

        }).catch(() => {})
      }else{
        this.$confirm('是否确定冻结用户', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            userId:row.id,
            userStatus: 1,
            userType: row.userType
          }
          updateUserStatus(params).then(res => {
            console.log(res)
            if(res.code==200){
              that.$message({
                type: 'success',
                message: '操作成功!'
              })
              that.getUser()
            }
          })

        }).catch(() => {})
      }
    },
    // 企业认证
    authen(row) {
      console.log(row)
      this.qyuserId = row.id
      this.qiyeRZPop = true
    },


    //图片上传数组
    qiyeUp(res,file) {
      var obj = {};
      obj.url = res.data
      obj.name = file.raw.uid
      this.fileUris.push(obj);

      console.log(this.fileUris)
    },
    // 企业图片删除
    qiyeRemove(file,fileList) {
      console.log(file.name)
      for(var i=0;i<this.fileUris.length;i++){
        if(this.fileUris[i].name==file.name){
              this.fileUris.splice(i,1)
            }
      }
      console.log(this.fileUris);

    },

     // 企业认证
     renZhTrue(){
       var fileUris = [];
       this.fileUris.forEach((item)=>{
         fileUris.push(item.url)
       })
        var params = {
          businessLicenseRegistrationNo:this.businessLicenseRegistrationNo,
          enterpriseName:this.enterpriseName,
          fileUris:fileUris.join(','),
          legalRepresentativeName:this.legalRepresentativeName,
          operatorIdNo:this.operatorIdNo,
          operatorMobileNo:this.operatorMobileNo,
          operatorName:this.operatorName,
          userId:this.qyuserId
        }
        qiYeApply(params).then(res => {
          console.log(res)
          if(res.code==200){
             this.qiyeRZPop = false
              this.$message({
                type: 'success',
                message: '提交成功!'
              })
          }
        })
     }
  }
}
</script>

<style lang="scss">


.el-upload--picture-card{
  width: 120px;
  height: 120px;
  line-height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
.reanNamePoplist2{
  .item{
    .tit{
      width: 120px;
    }
  }

}

</style>
