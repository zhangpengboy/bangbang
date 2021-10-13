<template>
  <div class="attendance"  v-loading="loading">

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="80" />
        <el-table-column prop="name" label="功能名称" width="280"/>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p style="color: #03BF16;" v-if="scope.row.status == 0">正常</p>
            <p style="color: #D9001B;" v-if="scope.row.status == 1">停用</p>
          </template>
         </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <template>
              <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="upStatue(scope.row)">{{scope.row.status==1?'启用':'停用'}}</el-button>
            </template>

          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->

      <!-- 合伙人弹窗 -->
      <el-dialog
        :title="dialogtype?'查看':'编辑'"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="popList">
          <div class="item flex alCen">
            <p class="tit">认证工人奖励</p>
            <input type="text" name="" class="ipt"  :disabled="dialogtype" placeholder="请输入认证工人奖励" v-model="authAwardFee" value="" />
          </div>
          <div class="item flex alCen">
            <p class="tit">施工费用分佣</p>
            <input type="text" name="" class="ipt" :disabled="dialogtype" placeholder="请输入施工费用分佣" v-model="commissionAward" value="" />
          </div>
        </div>

        <span slot="footer" class="dialog-footer" v-if="dialogtype">
          <el-button @click="dialogVisible = false">确 定</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editHHR">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 邀请好友弹窗 -->
      <el-dialog
        :title="dialogtype?'查看':'编辑'"
        :visible.sync="dialogVisible1"
        width="30%">
        <div class="popList">
          <div class="item flex alCen">
            <p class="tit">奖励</p>
            <input type="text" name="" class="ipt" :disabled="dialogtype" placeholder="请输入邀请好友奖励" v-model="invitationAwardFee" value="" />
          </div>
        </div>

        <span slot="footer" class="dialog-footer" v-if="dialogtype">
          <el-button @click="dialogVisible1 = false">确 定</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="editYQHY">确 定</el-button>
        </span>
      </el-dialog>

    </div>

  </div>
</template>

<script>
  import {
    awardSettingGet,
    awardSettingupdateOne
  } from '../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         tableData:[
           {id:0,name:'合伙人',status:0},
           {id:1,name:'邀请好友',status:0}
         ],
         loading:false,
         dialogVisible:false,
         dialogVisible1:false,
         id:0,
         authAwardFee:'',  //合伙人奖励
         commissionAward:'',  //合伙人分佣
         invitationAwardFee:'', //邀请奖励
         dialogtype:true, //编辑or查看
		 editData:{}

      }
    },
    created() {
      this.loadDate();
    },
	watch:{
		dialogVisible(val){
			if(!val){
				this.authAwardFee = this.editData.authAwardFee;
				this.commissionAward = this.editData.commissionAward;
				
			}
		},
		dialogVisible1(val){
			if(!val){
				this.invitationAwardFee = this.editData.invitationAwardFee
			}
		}
	},
    methods: {
      loadDate(){
        this.loading = true;
        var params = {}
        awardSettingGet(params).then(res => {
          this.loading = false;
          var data = res.data
          console.log('res', data)
          this.id = data.id
          this.tableData[0].status = data.partnerStatus
          this.tableData[1].status = data.invitationStatus;
		  this.editData = data;
          this.invitationAwardFee = data.invitationAwardFee
          this.authAwardFee = data.authAwardFee
          this.commissionAward = data.commissionAward

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
      // 启用停用
      upStatue(row){
        console.log(row)
        if(row.status==0){
          this.$confirm('是否确定停用该功能?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              if(row.id==0){
                this.changeStatue(0,1)
              }else{
                this.changeStatue(1,1)
              }

          }).catch(() => {

          })
        }else{
          this.$confirm('是否确定启用该功能?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(row.id==0){
              this.changeStatue(0,0)
            }else{
              this.changeStatue(1,0)
            }
          }).catch(() => {

          })
        }
      },
      // 修改停用启用状态
      changeStatue(index,status){
        if(index==0){
          var params = {
            id:this.id,
            partnerStatus:status
          }
        }else{
          var params = {
            id:this.id,
            invitationStatus:status
          }
        }
        awardSettingupdateOne(params).then(res => {
          if(res.code==200){
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogVisible = false
            this.loadDate();
          }

        })
      },

      // 查看
      see(row){
        this.dialogtype = true
        if(row.id==0){
          console.log('合伙人')
          this.dialogVisible = true

        }else{
          console.log('邀请好友')
          this.dialogVisible1 = true

        }

      },
      // 编辑
      edit(row){
		  console.log(row)
		  console.log(this.editData)
        this.dialogtype = false
        if(row.id==0){
          console.log('合伙人')
          this.dialogVisible = true

        }else{
          console.log('邀请好友')
          this.dialogVisible1 = true

        }

      },
      // 编辑合伙人
      editHHR(){
		console.log();
		if(!Boolean(Number(this.authAwardFee))){
			return this.$message.error('请输入正确认证工人奖励')
		}
        var params = {
          id:this.id,
          authAwardFee:this.authAwardFee,
          commissionAward:this.commissionAward
        }
        awardSettingupdateOne(params).then(res => {
          if(res.code==200){
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogVisible = false
            this.loadDate();
          }

        })
      },
      // 编辑邀请好友
      editYQHY(){
        var params = {
          id:this.id,
          invitationAwardFee:this.invitationAwardFee,
        }
        awardSettingupdateOne(params).then(res => {
          if(res.code==200){
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.dialogVisible1 = false
            this.loadDate();
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


</style>
