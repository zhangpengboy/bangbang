<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" class="top-content-item-input" placeholder="收款单位/收款账号/所属银行" />
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
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="payee" label="收款单位" />
        <el-table-column prop="collectionAccount" label="收款账号" width="200"/>
        <el-table-column prop="bankName" label="所属银行" width="200"/>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.status == 1 ?'启用':'冻结'}}</p>
          </template>
         </el-table-column>
        <el-table-column prop="updater" label="操作人" width="100"/>
        <el-table-column prop="updateTime" label="操作时间" width="200"/>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">{{ scope.row.status==1?'冻结':'启用' }}</el-button>
            <el-button type="text" size="small" @click="dete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->

    </div>

     <!-- 弹窗 -->
     <el-dialog
       :title="dialogtype?'编辑':'新增'"
       :visible.sync="dialogVisible"
       width="30%">
       <div class="popList">
         <div class="item flex alCen">
           <p class="tit">收款单位</p>
           <input type="text" name="" class="ipt" placeholder="请输入收款单位" v-model="danwei" value="" />
         </div>
         <div class="item flex alCen">
           <p class="tit">收款账号</p>
           <input type="text" name="" class="ipt" placeholder="请输入收款账号" v-model="zhanghao" value="" />
         </div>
         <div class="item flex alCen">
           <p class="tit">所属银行</p>
           <input type="text" name="" class="ipt" placeholder="请输入所属银行" v-model="bank" value="" />
         </div>
       </div>

       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="trueContent">确 定</el-button>
       </span>
     </el-dialog>

  </div>
</template>

<script>
  import {
    getCollectionClass,
    insertOneCollection,
    updateOneCollection,
    removeCollection,
    updateStatusCollection
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
         dialogVisible:false,
         dialogtype:0,
         danwei:'',
         zhanghao:'',
         bank:'',
         loading:false,
         editID:0,
         serach:'',
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
          status:status,
          keyword:this.serach
        }
        getCollectionClass(params).then(res => {
          this.loading = false;
          var data = res.data.list
          for(var i=0;i<data.length;i++){
            if(data[i].updateTime){
              data[i].updateTime = formatDate(data[i].updateTime)
            }else{
              data[i].updateTime = formatDate(data[i].createTime)
            }

          }
          console.log('res', data)
          this.tableData = data

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
      add(){
        this.dialogVisible = true;
        this.dialogtype = 0
      },
      edit(row){
        this.danwei = row.payee;
        this.zhanghao = row.collectionAccount;
        this.bank = row.bankName;
        this.editID = row.id;
        this.dialogVisible = true;
        this.dialogtype = 1
      },
      // 新增or编辑
      trueContent(){
        console.log(this.dialogtype);
        if(this.dialogtype){
          console.log('编辑')
          var params = {
            bankName:this.bank,
            collectionAccount:this.zhanghao,
            payee:this.danwei,
            id:this.editID
          }
          updateOneCollection(params).then(res => {
            this.loading = false;
            var data = res.data
            console.log('res', data)
            this.loadDate();
            this.dialogVisible = false;
          })

        }else{
          console.log('新增')
          var params = {
            bankName:this.bank,
            collectionAccount:this.zhanghao,
            payee:this.danwei
          }
          insertOneCollection(params).then(res => {
            this.loading = false;
            var data = res.data
            console.log('res', data)
            this.loadDate();
            this.dialogVisible = false;
          })

        }
      },
      changeStatus(row){
        console.log(row);
        var params = {
          id:row.id,
          status:row.status?'0':'1'
        }
        updateStatusCollection(params).then(res => {
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
          removeCollection(params).then(res => {
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
