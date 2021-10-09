<template>
  <div class="xmry">
    <!-- tab按钮切换 -->
    <div class="flex alCen tab" style="margin-bottom: 30px;">
      <p :class="['tabItem',banzuIndex==index?'tabItemHov':'']" @click="choseNav(index)" v-for="(item,index) in banzuTabCon">{{item.name}}</p>
    </div>
    <!-- tab按钮切换end -->
    <!-- 头部  -->
    <div class="top" id="top">
      <!-- <div class="top-title ">数据筛选</div> -->
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>项目人员：</span>
            <el-input v-model="proProple" clearable class="top-content-item-input" placeholder="用户账号/名字" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>进场时间：</span>
            <div class="flex alCen flex1">
              <el-date-picker
              clearable
                v-model="joinStartDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <div style="margin: 0 10px;">至</div>
              <el-date-picker
              clearable
                v-model="joinEndDate"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>退场时间：</span>
            <div class="flex alCen flex1">
              <el-date-picker
              clearable
                v-model="laveStartDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <div style="margin: 0 10px;">至</div>
              <el-date-picker
              clearable
                v-model="laveEndDate"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>

      </div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='raLoad'>重置</el-button>
          <el-button type="primary" @click="seeRecoed">操作记录</el-button>
          <el-button type="primary" @click="addPeople">添加人员</el-button>
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
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="name" label="手机号" width="120"/>
        <el-table-column prop="name" label="工种"/>
        <el-table-column prop="name" label="工作模式"/>
        <el-table-column prop="name" label="班组负责人"/>
        <el-table-column prop="name" label="进场时间"/>
        <el-table-column prop="name" label="退场时间"/>
        <el-table-column prop="name" label="身份证号"/>
        <el-table-column prop="name" label="银行卡号"/>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">在场</p>
            <p style="color: #D9001B;" v-if="scope.row.status == 0">离队</p>
          </template>
         </el-table-column>
         <el-table-column label="工资标准">
          <template slot-scope="scope">
            <p style="color: #D9001B;">{{scope.row.name}}</p>
          </template>
         </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <template>
              <el-button type="text" size="small" @click="editWages(scope.row)">编辑工资</el-button>
              <el-button type="text" size="small" @click="leave(scope.row)">离队</el-button>
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
    <!-- 编辑弹窗 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogEdit"
      width="30%">
      <div class="popEdit">
          <div class="item flex alCen">
            <p class="tit">工程量</p>
            <input type="number" class="ipt"/>
            <input type="text" class="ipt"/>
          </div>
          <div class="item flex alCen">
            <p class="tit">单价</p>
            <input type="number" class="ipt"/>
            <p class="tit">每平方50元</p>
          </div>
          <div class="item flex alCen">
            <p class="tit">预计总施工服务费：400元</p>
          </div>
          <div class="item flex alCen">
            <p class="tit">总工期：30天</p>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="trueEdit">确定</el-button>
      </span>
    </el-dialog>
    <!-- 离队弹窗 -->
    <el-dialog
      title="操作离队"
      :visible.sync="dialogLeave"
      width="30%">
      <div class="popEdit">
          <div class="item flex alCen">
            <p class="tit">姓名</p>
            <input type="text" class="ipt flex1"/>
          </div>
          <div class="item flex alCen">
            <p class="tit">进场时间</p>
            <el-date-picker
            clearable
              v-model="StartDatepop"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </div>
          <div class="item flex alCen">
            <p class="tit">退场时间</p>
            <el-date-picker
            clearable
              v-model="laveStartDatepop"
              type="date"
              placeholder="选择退场日期">
            </el-date-picker>
          </div>
          <div class="item flex alCen">
            <p class="tit">备注</p>
            <textarea rows="" class="textArea flex1" cols="" placeholder="填写退场原因"></textarea>
          </div>
          <div class="item flex alCen">
            <p>是否重新开启该岗位的招聘订单</p>
            <el-radio-group v-model="resource">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLeave = false">取 消</el-button>
        <el-button type="primary" @click="trueLeave">确定</el-button>
      </span>
    </el-dialog>
    <!-- 添加人员弹窗 -->
    <el-dialog
      title="添加人员"
      :visible.sync="dialogAdd"
      width="30%">
      <div class="popxmjl">
          <div class="head flex alCen js-sb">
            <p>手机号</p>
            <input type="" placeholder="请输入" class="ipt"/>
            <el-button type="primary" @click="searchPeople">查询</el-button>
          </div>
          <div class="main2 flex">
            <div class="lf">
              <p class="tit">头像</p>
              <div class="avaCon flex alCen js-center">
                 <img src="../../../assets/images/icon-close.png" class="avatar" >
              </div>
              <p class="nowPro">当前所属项目</p>
            </div>
            <div class="rt">
              <p class="tit">信息</p>
              <div class="flex alCen js-sb item">
                <p>姓名：的功夫</p>
                <p>手机号：42343434</p>
              </div>
              <div class="flex alCen js-sb item">
                <p>性别：男</p>
                <p>实名状态：一十名</p>
              </div>
              <p class="nowPro">中体味都是法国的</p>
            </div>
          </div>
          <div class="codeCon flex ">
            <p>工人邀请二维码</p>
            <img src="../../../assets/images/xiangmu.png" class="code">
          </div>
          <div class="choseCon flex alCen item">
            <p class="tit">选择班组</p>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in bzOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <p class="tit">设置进场时间</p>
            <el-date-picker
            clearable
              v-model="addJoinTime"
              type="date"
              placeholder="选择进场日期">
            </el-date-picker>
          </div>
          <div class="item">
            <p class="tit">工程量</p>
            <input type="" class="ipt" />
            <input type="" class="ipt" />
          </div>
          <div class="item">
            <p class="tit">单价</p>
            <input type="" class="ipt" />
            <p class="tit">每平方50元</p>
          </div>
          <div class="item">
            <p class="">预计总施工服务费：300元</p>
          </div>
          <div class="item">
            <p class="tit">总工期</p>
            <input type="" class="ipt" />
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="trueAdd">确定</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
 export default{
 	props:{

 	},
   data() {
     return{
       banzuTab:'1',
       banzuTabCon:[
         {
           name:'班组1',
           id:1
         },{
           name:'班组2',
           id:2
         },{
           name:'班组3',
           id:3
         }

       ],
       banzuIndex:0,
       PageIndex:1,
       tableData:[
         {name:'你好',status:0},
         {name:'你好a',status:1}
       ],
       proProple:'',
       PageIndex: 1, // 页码
       PageSize: 10, // 显示多少条数据
       PageCount: 0, // 总条数
       joinStartDate:'',
       joinEndDate:'',
       laveStartDate:'',
       laveEndDate:'',
       dialogEdit:false,
       dialogLeave:false,
       StartDatepop:'',
       laveStartDatepop:'',
       resource:'1',
       dialogAdd:false,
       bzOptions: [{
         value: '选项1',
         label: '黄金糕'
       }, {
         value: '选项2',
         label: '双皮奶'
       }],
       value: '',
       addJoinTime:'',

     }

   },
   mounted() {

   },
   methods:{
     search() {
       console.log('查询')
       this.loadDate();
     },
     // 操作记录
     seeRecoed(){
         this.$router.push({ path: '/workerManagement/workRecord'})
     },
     // 添加人员
     addPeople(){
        this.dialogAdd = true
     },
     searchPeople(){

     },
     trueAdd(){
       this.dialogAdd = false
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
     // 编辑工资
     editWages(row){
       this.dialogEdit = true
     },
     trueEdit(){
        this.dialogEdit = false
     },
     // 离队
     leave(row){
         this.dialogLeave = true
     },
     trueLeave(){
       console.log(this.resource)
       this.dialogLeave = false
     }



   }
 }

</script>

<style lang="scss" scoped="scoped">
  .xmry{
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
  .popEdit{
    .item{
      margin-bottom: 30px;
      .tit{
        min-width: 100px;
      }
      .ipt{
        height: 30px;
        margin-right: 20px;
      }
      .textArea{
        height: 150px;
        padding: 15px;
        box-sizing: border-box;
      }
    }
  }
  .popxmjl{
    .head{
      margin-top: 15px;
      .ipt{
        height: 35px;
        width: 300px;
      }
    }
    .main2{
      border: 1px solid #efefef;
      margin-top: 30px;
      .lf{
        width: 150px;
        border-right: 1px solid #efefef;
        .tit{
          line-height: 30px;
          border-bottom: 1px solid #efefef;
          text-align: center;
          background-color: #ededed;
        }
        .avaCon{
          height: 100px;
          .avatar{
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .nowPro{
          border-top: 1px solid #efefef;
          line-height: 30px;
          text-align: center;
        }
      }
      .rt{
        flex: 1;
        .tit{
          line-height: 30px;
          border-bottom: 1px solid #efefef;
          text-align: center;
          background-color: #ededed;
        }
        .item{
          height: 50px;
          padding: 0 15px;
           border-bottom: 1px solid #efefef;
        }
        .nowPro{
          border-top: 1px solid #efefef;
          line-height: 30px;
          text-align: center;
        }
      }

    }
    .codeCon{
      margin-top: 35px;
      .code{
        margin-left: 30px;
        width: 100px;
        height: 100px;
      }
    }
    .choseCon{
      margin-top: 30px;
    }
    .tips{
      margin-top: 30px;
      color: #C03639;
    }
    .item{
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .tit{
        width: 150px;
      }
      .ipt{
        margin-right: 10px;
        height: 30px;
      }
    }

  }
  }

</style>
