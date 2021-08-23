<template>
  <div class="attendance">
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
        <el-table-column prop="name" label="收款单位" />
        <el-table-column prop="name" label="收款账号" width="200"/>
        <el-table-column prop="name" label="所属银行" width="200"/>
        <el-table-column prop="name" label="状态" width="100"/>
        <el-table-column prop="name" label="操作人" width="100"/>
        <el-table-column prop="name" label="操作时间" width="200"/>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">启用</el-button>
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
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '启用',
             value: '0'
           }, {
             label: '停用',
             value: '1'
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

      }
    },
    created() {

    },
    methods: {
      search() {
        console.log('查询')
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
      },
      add(){
        this.dialogVisible = true;
        this.dialogtype = 0
      },
      edit(){
        this.dialogVisible = true;
        this.dialogtype = 1
      },
      // 新增or编辑
      trueContent(){
        console.log(this.dialogtype);
        if(this.dialogtype){
          console.log('编辑')
          this.dialogVisible = false;
        }else{
          console.log('新增')
          console.log(this.danwei)
          console.log(this.zhanghao)
          console.log(this.bank)

          this.dialogVisible = false;
        }
      },
      changeStatus(){
        console.log(1)
      },
      dete(){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
