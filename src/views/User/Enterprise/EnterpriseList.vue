<template>
  <div class="main">

    <!-- 头部  -->
    <div class="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" class="top-content-item-input" placeholder="ID/用户名称/手机号" clearable/>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>需求单数量：</span>
            <div class="flex alCen flex1">
              <el-input v-model="xqMinNum" type="number" class="numIpt" placeholder="请输入" clearable></el-input>
              <div style="margin: 0 10px;">-</div>
              <el-input v-model="xqMaxNum" type="number" class="numIpt" placeholder="请输入" clearable></el-input>
            </div>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>服务单数量：</span>
            <div class="flex alCen flex1">
              <el-input v-model="fwMinNum" type="number" class="numIpt" placeholder="请输入" clearable></el-input>
              <div style="margin: 0 10px;">-</div>
              <el-input v-model="fwMaxNum" type="number" class="numIpt" placeholder="请输入" clearable></el-input>
            </div>
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
            <span>状态：</span>
            <el-select v-model="statusvalue" placeholder="全部" clearable>
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
        <el-table-column prop="enterpriseName" label="企业名称" width="150"/>
        <el-table-column prop="realName" label="名称"/>
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
            {{scope.row.enterpriseAuth == 0 ?'未提交':scope.row.enterpriseAuth == 1 ?'审核中':scope.row.enterpriseAuth == 2 ?'已通过':scope.row.enterpriseAuth == 3 ?'已驳回':''}}
          </template>
        </el-table-column>
        <el-table-column prop="briefCount" label="需求单数量"/>
        <el-table-column prop="orderCount" label="服务单数量"/>
        <el-table-column prop="enterpriseStatus" label="状态">
          <template slot-scope="scope">
            {{scope.row.enterpriseStatus == 0 ?'正常':scope.row.enterpriseStatus == 1 ?'冻结':''}}
          </template>
        </el-table-column>
        <el-table-column prop="updaterName" label="操作人" />
        <el-table-column prop="updateTime" label="操作时间" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleLook(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="changeSte(scope.row)">{{ scope.row.enterpriseStatus==1?'激活':'冻结' }}</el-button>
            <el-button v-if="scope.row.realNameAuth==0" type="text" size="small" @click="reanName(scope.row)">实名</el-button>
            <el-button v-if="scope.row.enterpriseAuth==0" type="text" size="small" @click="authen(scope.row)">企业认证</el-button>
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
      <el-dialog
        title="添加实名"
        :visible.sync="realNamePop"
        width="30%"
        center
      >
        <div class="reanNamePoplist">
          <div class="item">
            <p class="tit">身份证正反面：</p>
            <div class="popIdCard flex alCen">
              <el-upload
                class="avatar-uploader"
                action="123"
                :before-upload="beforeUpload"
                :show-file-list="false"
                ref="newupload"
                name="multipartFile"
                :with-credentials='true'
                :auto-upload="true"
                :on-success="upIdCard"
              >
                <img v-if="idCard" :src="idCard" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <el-upload
                class="avatar-uploader"
                style="margin-left: 10px;"
                action="123"
                :before-upload="beforeUpload2"
                :show-file-list="false"
                ref="newupload"
                name="multipartFile"
                :auto-upload="true"
                :with-credentials='true'
                :on-success="upIdCardBack"
              >
                <img v-if="idCardBack" :src="idCardBack" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>

            </div>

          </div>
          <div class="item">
            <p class="tit">姓名：</p>
            <input type="text" name="" v-model="rnName" placeholder="请填姓名" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">性别：</p>
            <input type="text" name="" v-model="rnGender" placeholder="请输入性别" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">民族：</p>
            <input type="text" name="" v-model="rnNation" placeholder="请输入民族" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">年龄：</p>
            <input type="text" name="" v-model="rnAge" placeholder="请输入年龄" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">身份证号：</p>
            <input type="text" name="" v-model="rnIdnum" placeholder="请输入身份证号" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">籍贯：</p>
            <input type="text" name="" v-model="rnNativePlace" placeholder="请输入籍贯" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">户籍地：</p>
            <input type="text" name="" v-model="rnHouse" placeholder="请输入户籍地" class="ipt" value="">
          </div>
          <div class="item">
            <p class="tit">身份证有效期起始时间：</p>
             <el-date-picker
                v-model="rnvalidityStartTime"
                class="ipt"
                type="date"
                placeholder="选择起始日期">
              </el-date-picker>
          </div>
          <div class="item">
            <p class="tit">身份证有效期截止时间：</p>
            <el-date-picker
               v-model="rnvalidityEndTime"
               class="ipt"
               type="date"
               placeholder="选择截止日期">
             </el-date-picker>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="realNamePop = false">取 消</el-button>
          <el-button type="primary" @click="realNameTrue">确 定</el-button>
        </span>
      </el-dialog>

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
                  :action="adminUrl"
                  :file-list="fileUris"
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
  	qiYeQueryPage,
    enterQiYeApply,
    qiyeupdateUserStatus,
    exportCsvQiye,
    uploadIdCard,
    uploadIdCardByAli,
    getPreSignFile,
    uploadpublic,
    qiYeRealNameAuth,
    getByOrderAndBrief
} from '../../../api/user.js'

export default {
  data() {
    return {
      tableData: [], // 表单列表
      PageIndex: 1, // 页码
      PageSize: 10, // 显示多少条数据
      PageCount: 0, // 总条数
      serach: '', // 搜索
      xqMinNum:'',
      xqMaxNum:'',
      fwMinNum:'',
      fwMaxNum:'',
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

      realNamePop: false,
      idCard: '',
      idCardUp: '', //上传用的
      idCardBack: '',
      idCardBackUp:'',
      qiyeRZPop: false,
      // 实名认证
      rnName:'',
      rnGender:'',
      rnNation:'',
      rnAge:'',
      rnIdnum:"",
      rnNativePlace:'',
      rnHouse:'',
      rnUserId :'',
      rnvalidityStartTime:'',
      rnvalidityEndTime:'',


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
    this.getList()
    // this.getByOrderAndBrief();
  },
  methods: {
    getByOrderAndBrief(){
      var params = {
        orderMinCount:this.fwMinNum,
        orderMaxCount: this.fwMaxNum,
        briefMinCount	: this.xqMinNum,
        briefMaxCount: this.xqMaxNum
      }
      getByOrderAndBrief(params).then(res => {
        var data = res.data
        console.log(data.join(','))
        this.ids = data.join(',')

      })
    },
    getList() {
       var params = {
        id:this.serach,
        pageNum: this.PageIndex,
        pageSize: this.PageSize,
        userStatus: this.statusvalue,
        orderMinCount:this.fwMinNum,
        orderMaxCount: this.fwMaxNum,
        briefMinCount	: this.xqMinNum,
        briefMaxCount: this.xqMaxNum
      }
      qiYeQueryPage(params).then(res => {
        var data = res.data
        console.log('res', data)
        this.PageCount = data.total
        this.tableData = data.list
      })
    },
    search() {
      console.log('查询')
      this.getList();
    },
    // 重置
    raLoad(){
        this.serach='';
        this.statusvalue = '';
        this.xqMinNum = '';
        this.xqMaxNum = '';
        this.fwMinNum = '';
        this.fwMaxNum = '';
        this.PageIndex = 1;
        this.getList();
    },
    // 导出
    exportTable(){
      console.log('导出');
      var query = {
        id:this.serach,
        pageNum: this.PageIndex,
        pageSize: this.PageSize,
        userStatus: this.statusvalue
      }
      console.log(query);
      exportCsvQiye(query).then(res => {
        console.log(res)
        var responseURL = res.request.responseURL;
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
    /** 查看企业 */
    handleLook(row) {
     this.$router.push({ path: '/User/enterprisedetails', query: { id: row.id,joinType:2 }})

    },
    /** 选择分页 */
    handleSizeChange(e) {
      this.PageSize = e
      this.PageIndex = 1
      this.getList();
    },
    /** 点击分页 */
    handleCurrentChange(e) {
      this.PageIndex = e
      this.getList();
    },

    // 激活冻结
    changeSte(row) {
      var that = this;
      console.log(row)
      if (row.enterpriseStatus == 1) { // 冻结去激活
        this.$confirm('是否确定激活用户', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            userId:row.id,
            userStatus: 0
          }
          console.log(params)
          qiyeupdateUserStatus(params).then(res => {
            console.log(res)
            if(res.code==200){
              that.$message({
                type: 'success',
                message: '操作成功!'
              })
              that.getList()
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
            userStatus: 1
          }
          qiyeupdateUserStatus(params).then(res => {
            console.log(res)
            if(res.code==200){
              that.$message({
                type: 'success',
                message: '操作成功!'
              })
              that.getList()
            }
          })

        }).catch(() => {})
      }
    },
    /** 实名 */
    reanName(row) {
      console.log(row)
      this.rnUserId = row.id
      this.realNamePop = true
    },
    upIdCard(res, file) {
      console.log(res)
    },
    upIdCardBack(res, file) {
      console.log(res)
      console.log(file)
    },
    beforeUpload (file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       data.append('side', 'face')
       uploadIdCardByAli(data).then(res => {
         console.log(res)
         this.rnName = res.data.realName
         this.rnGender = res.data.gender
         this.rnNation = res.data.nation
         this.rnAge = res.data.age
         this.rnIdnum = res.data.idNo
         this.idCardUp = res.data.idCardUri
         this.getIdUrl(1,res.data.idCardUri)
       })
       return false
    },
    // 解析身份证照片
    getIdUrl(type,url){
    	var query = {
    		uri:url
    	}
    	 getPreSignFile(query).then(res => {
    	   console.log(res)
         if(type==1){
           this.idCard = res.data
         }else{
           this.idCardBack = res.data
         }
    	 })
    },
    beforeUpload2(file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       data.append('side', 'back')
       uploadIdCardByAli(data).then(res => {
         console.log(res)
         this.rnvalidityStartTime = res.data.startDate
         this.rnvalidityEndTime = res.data.endDate
         this.idCardBackUp = res.data.idCardUri
         this.getIdUrl(2,res.data.idCardUri)
       })
       return false
    },
    // 添加实名
    realNameTrue(){
      var gender = 0;
      if(this.rnGender=='男'){
        gender = 0
      }else{
        gender = 1
      }
       var params = {
         age:this.rnAge,
         gender:gender,
         householdRegister:this.rnHouse,
         idCardReverseUri:this.idCardBackUp,
         idCardUri:this.idCardUp,
         idNo:this.rnIdnum,
         nation:this.rnNation,
         nativePlace:this.rnNativePlace,
         realName:this.rnName,
         userId:this.rnUserId,
         validityEndTime:this.rnvalidityEndTime,
         validityStartTime:this.rnvalidityStartTime
       }
       qiYeRealNameAuth(params).then(res => {
         console.log(res)
         if(res.code==200){
           this.$message({
             type: 'success',
             message: '提交成功!'
           })
            this.realNamePop = false
            this.getList();
         }
       })

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
        enterQiYeApply(params).then(res => {
          console.log(res)
          if(res.code==200){
            this.qiyeRZPop = false
             this.$message({
               type: 'success',
               message: '提交成功!'
             })
            this.getList()

          }
        })
     }
  }
}
</script>

<style lang="scss">
.reanNamePoplist{

  .item{
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .tit{
      width: 100px;
      text-align: right;
    }
    .ipt{
      flex:1;
      height: 35px;
      padding: 0 8px;
      box-sizing: border-box;
    }
  }
}

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

.numIpt{
  width: 110px;
}

</style>
