<template>
  <div class="main">

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
        <el-button>导出</el-button>
      </div>

      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="realName" label="名称" width="150"/>
        <el-table-column prop="phone" label="手机号码" width="120"/>
        <el-table-column label="实名状态">
          <template slot-scope="scope">
          	{{scope.row.realNameAuth == 0 ?'未实名':'已实名'}}
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
          	{{scope.row.gender == 0 ?'男':scope.row.gender == 1 ?'女':'未知'}}
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="工人等级" :formatter="gradeFormat"/>
        <el-table-column prop="workYears" label="工龄"/>
        <el-table-column prop="workDays" label="工作时长"/>
        <el-table-column prop="behavioralScore" label="行为分"/>
        <el-table-column label="工人评分" width="150">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.workerScore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
         </template>
        </el-table-column>
        <el-table-column prop="userStatus" label="状态">
          <template slot-scope="scope">
          	{{scope.row.userStatus == 1 ?'冻结':'正常'}}
          </template>
         </el-table-column>
        <el-table-column prop="updater" label="操作人" />
        <el-table-column prop="updateTime" label="操作时间" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleLook(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="changeSte(scope.row)">{{ scope.row.userStatus==1?'激活':'冻结' }}</el-button>
            <el-button v-if="scope.row.realNameAuth==0" type="text" size="small" @click="reanName(scope.row)">实名</el-button>
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
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="realNamePop = false">取 消</el-button>
          <el-button type="primary" @click="realNameTrue">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
import {
  	gongRenQueryPage,
    gongRenRealNameAuth,
    uploadIdCard,
    gongrenupdateUserStatus
} from '../../../api/user.js'

export default {
  data() {
    return {
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
      idCardBack: '',
      // 实名认证
      rnName:'',
      rnGender:'',
      rnNation:'',
      rnAge:'',
      rnIdnum:"",
      rnNativePlace:'',
      rnHouse:'',
      rnUserId :'',
      rnUserType:'',



    }
  },
  created() {
    this.getList()
  },
  methods: {
     gradeFormat(row){
       if (row.grade == 0) {
         return "普通工人";
       }else if (row.grade == 1) {
         return "铜牌工人";
       }else if (row.grade == 2) {
         return "银牌工人";
       }else if (row.grade == 3) {
         return "金牌工人";
       }
     },
    getList() {
       var params = {
        id:this.serach,
        pageNum: this.PageIndex,
        pageSize: this.PageSize,
        grades: this.gradevalue.join(','),
        userStatue: this.statusvalue
      }
      gongRenQueryPage(params).then(res => {
        var data = res.data
        console.log('res', data)
        this.PageCount = data.total
        this.tableData = data.list
      })
    },
    search() {
      console.log('查询')
      this.getList()
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
        this.getList()
    },
    /** 查看工人 */
    handleLook(row) {
     // this.$router.push({ path: '/User/enterprisedetails', query: { id: row.id,joinType:2 }})
     this.$router.push({ path: '/User/userdetail', query: { id: row.id ,joinType:2 }})

    },
    /** 选择分页 */
    handleSizeChange(e) {
      this.PageSize = e
      this.PageIndex = 1
      this.getList()
    },
    /** 点击分页 */
    handleCurrentChange(e) {
      this.PageIndex = e
      this.getList()
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
            userType: 1
          }
          console.log(params)
          gongrenupdateUserStatus(params).then(res => {
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
            userStatus: 1,
            userType: 1
          }
          gongrenupdateUserStatus(params).then(res => {
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
      this.rnUserType = row.userType
      this.realNamePop = true
    },
    beforeUpload (file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       uploadIdCard(data).then(res => {
         console.log(res)

       })
       return false
    },
    beforeUpload2(file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       uploadIdCard(data).then(res => {
         console.log(res)

       })
       return false
    },
    upIdCard(res, file) {
      console.log(res)
    },
    upIdCardBack(res, file) {
      console.log(res)
      console.log(file)
    },
    // 添加实名
    realNameTrue(){
      console.log(this.rnName);
      console.log(this.rnGender);
      console.log(this.rnNation);
      console.log(this.rnAge);
      console.log(this.rnIdnum);
      console.log(this.rnNativePlace);
      console.log(this.rnHouse);
       var params = {
         age:this.rnAge,
         gender:this.rnGender,
         householdRegister:this.rnHouse,
         idCardReverseUri:'http://183.60.156.101:9001/test/20210817/a966352ef9764a0e81e983e801ebbcfa.png',
         idCardUri:'http://183.60.156.101:9001/test/20210817/a966352ef9764a0e81e983e801ebbcfa.png',
         idNo:this.rnIdnum,
         nation:this.rnNation,
         nativePlace:this.rnNativePlace,
         realName:this.rnName,
         userId:this.rnUserId,
         userType:this.rnUserType
       }
       gongRenRealNameAuth(params).then(res => {
         console.log(res)
         if(res.code==200){
           this.$message({
             type: 'success',
             message: '提交成功!'
           })
            this.realNamePop = false

         }
       })

    },


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
  width: 100px;
}

.el-rate__icon{
  font-size: 16px;
  margin-right: 4px;
}

</style>
