<template>
  <div class="xmsy">


  <div class="flex js-sb">
    <div class="aside">
      <p class="sign">
        <span class="lableTxt">邦宁项目</span>
      </p>
      <div class="head flex alCen column">
        <img src="../../../assets/images/xiangmu.png" class="avatar">
        <p class="proName">中铁广州一期项目</p>
        <p class="order">所属订单【2021948933493】</p>
      </div>
      <div class="nav" >
        <div class="flex alCen js-sa nav1">
          <div class="navItem">
            <p class="num">45人</p>
            <p class="txt">在场人数</p>
          </div>
          <div class="navItem">
            <p class="num">45人</p>
            <p class="txt">退场人数</p>
          </div>
        </div>
        <div class="flex alCen js-sa">
          <div class="navItem">
            <p class="num">45人</p>
            <p class="txt">劳务人数</p>
          </div>
          <div class="navItem">
            <p class="num">45人</p>
            <p class="txt">管理人员</p>
          </div>
        </div>
      </div>
      <div class="echartCon">
        <div class="charts" id="charts"></div>
        <div class="list">
          <p class="item">已验收工程总量：<span style="color: #0079FE;"> 344㎡</span></p>
          <p class="item">总工程量：<span style="color: #0079FE;"> 344㎡</span></p>
        </div>
      </div>

    </div>
    <div class="container">
      <div class="list">
        <div class="item flex alCen js-sb">
            <p class="li li3">项目名称：中体水电费</p>
            <p class="li li3">项目类别：计件</p>
            <p class="li li3">项目人数：342人</p>
        </div>
        <div class="item flex alCen js-sb">
            <p class="li li1">项目地点：是否AS防抖安抚水电费</p>
        </div>
        <div class="item flex alCen js-sb">
            <p class="li li3">所属企业：是否AS防抖安抚水电费</p>
            <p class="li li6">企业社会信用码：2132322323</p>
        </div>
        <div class="item flex alCen js-sb">
            <p class="li li3">进场日期：9292-23-23</p>
            <p class="li li3">服务结束日期：20202-21-2</p>
            <p class="li li3">服务周期：342天</p>
        </div>
        <div class="item flex alCen js-sb">
            <p class="li li3">竣工日期：<span style="color:#FF0000 ;">进行中</span></p>
        </div>
      </div>
      <div class="nav flex alCen">
        <p class="navItem">项目创建者</p>
        <p class="navItem navItem2">12342132</p>
        <p class="navItem">姓名</p>
        <p class="navItem">李大刀</p>
      </div>
      <div class="main">
        <div class="flex js-sb alCen">
          <p class="tit bold">项目经理</p>
          <el-button type="primary" @click="addxmjl">新增</el-button>
        </div>
         <el-table
          :data="tableData"
          stripe border
          style="width: 100%; margin-top: 20px;">
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="name" label="账号" />
          <el-table-column prop="name" label="添加日期" />
          <el-table-column prop="name" label="添加者" />
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jlRemove(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main">
        <div class="flex js-sb alCen">
          <p class="tit bold">班组长</p>
          <el-button type="primary" @click="addBzz">新增</el-button>
        </div>
         <el-table
          :data="tableData"
          stripe border
          style="width: 100%; margin-top: 20px;">
          <el-table-column prop="name" label="班组名称" />
          <el-table-column prop="name" label="负责人" />
          <el-table-column prop="name" label="账号" />
          <el-table-column prop="name" label="添加日期" />
          <el-table-column prop="name" label="添加者" />
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="bzzRemove(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main">
        <div class="flex js-sb alCen">
          <p class="tit bold">项目附件</p>
          <el-button type="primary" @click="addXmfj">新增</el-button>
        </div>
         <el-table
          :data="tableData"
          stripe border
          style="width: 100%; margin-top: 20px;">
          <el-table-column type='index' label="序号" width="60"/>
          <el-table-column prop="name" label="文档名称" />
          <el-table-column prop="name" label="上传事件" />
          <el-table-column prop="name" label="上传人" />
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="fjRemove(scope.row)">移除</el-button>
              <el-button type="text" size="small" @click="seeFj(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>

  <!-- 新增项目经理弹窗 -->
  <el-dialog
    title="新增项目经理"
    :visible.sync="dialogxmjl"
    width="30%">
    <div class="popxmjl">
        <div class="head flex alCen js-sb">
          <p>手机号</p>
          <input type="" placeholder="请输入" class="ipt"/>
          <el-button type="primary" @click="searchXmjl">查询</el-button>
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
          <p>项目经理邀请码</p>
          <img src="../../../assets/images/xiangmu.png" class="code">
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogxmjl = false">取 消</el-button>
      <el-button type="primary" @click="setWork">设为项目经理</el-button>
    </span>
  </el-dialog>
  <!-- 新增班组长弹窗 -->
  <el-dialog
    title="新增班组长"
    :visible.sync="dialogBzz"
    width="30%">
    <div class="popxmjl">
        <div class="head flex alCen js-sb">
          <p>手机号</p>
          <input type="" placeholder="请输入" class="ipt"/>
          <el-button type="primary" @click="searchXmjl">查询</el-button>
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
        <div class="choseCon flex alCen">
          <p style="margin-right: 20px;">选择班组</p>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in bzOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="codeCon flex ">
          <p>班组长邀请码</p>
          <img src="../../../assets/images/xiangmu.png" class="code">
        </div>
        <p class="tips">当前班组已有班组长，重新设定会替换之前的班组长！</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogBzz = false">取 消</el-button>
      <el-button type="primary" @click="setWorkBzz">设为班组长</el-button>
    </span>
  </el-dialog>
  <!-- 新增附件弹窗 -->
  <el-dialog
    title="添加"
    :visible.sync="dialogFj"
    width="30%">
    <div class="popFj">
        <div class="head flex alCen">
            <p>输入文件名称</p>
            <input type="" class="ipt" />
        </div>
        <div class="box flex alCen js-center">
          <img src="../../../assets/images/iconUp.png" class="iconUp">
        </div>
        <p class="tips">支持 <span style="color: #E64242">jpg jpeg png pdf docx</span>  格式</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFj = false">取消</el-button>
      <el-button type="primary" @click="addFj">确定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
  	props:{

  	},
    data() {
      return{
        chart: null,
        tableData:[
          {name:'带饭',status:1},
          {name:'带饭',status:1}
        ],
        dialogxmjl:false,
        dialogBzz:false,
        dialogFj:false,
        bzOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }

    },
    mounted() {
      this.initChart()
    },
    methods:{
      // 添加项目经理
      addxmjl(){
        this.dialogxmjl = true
      },
      // 移除
      jlRemove(row){
        console.log(row)
        this.$confirm('确定要移除'+row.name +'吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


        })
      },
      // 查询
      searchXmjl(){

      },
      // 设置
      setWork(){

      },
      // 添加班组长
      addBzz(){
        this.dialogBzz = true
      },
      bzzRemove(row){
        console.log(row)
        this.$confirm('确定要移除'+row.name +'吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


        })
      },
      setWorkBzz(){

      },
      // 添加项目附件
      addXmfj(){
        this.dialogFj = true
      },
      fjRemove(row){
        console.log(row)
        this.$confirm('确定要移除'+row.name +'吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


        })
      },
      // 确定添加附件
      addFj(){

      },
      // 查看
      seeFj(row){

      },

      initChart() {
        this.chart = echarts.init(document.getElementById('charts'))
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#333'
              }
            }
          },
          grid: {
            left: '10%',
            right: '10%',
            borderWidth: 0,
            top: 150,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '5%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['已验收工程量', '总工程量']
          },
          // calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisLabel: {
              interval: 0
            },
            data:[
              '木工班组', '电工班组', '泥工班组', '焊工班组', '钢筋工班组'
            ]
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '已验收工程量',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '8%',
            itemStyle: {
              normal: {
                color: 'rgba(24,140,34,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: [79,17, 25,20,19]
          },{
            name: '总工程量',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                color: 'rgba(255,191,139,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: [ 37, 95,38,20,24 ]
          }
          ]
        })
      }

    }
  }

</script>

<style lang="scss" scoped="scoped">
.xmsy{
  .aside{
    width: 500px;
    background-color: #f0f0f0;
    position: relative;
    padding: 35px 25px;
    box-sizing: border-box;
    .sign{
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 60px solid #333333;
      border-right: 60px solid transparent;
      position: absolute;
      top: 0;
      left: 0;
      .lableTxt{
        width: 60px;
        color: #FFFFFF;
        text-align: center;
        transform: rotate(-45deg);
        position: absolute;
        padding: 10px 0;
        left: -7px;
        top: -54px;
        font-size: 12px;
      }
    }
    .head{
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .proName{
        font-weight: bold;
        font-size: 24px;
        margin-top: 15px;
      }
      .order{
        margin-top: 10px;
        font-size: 14px;
      }
    }
    .nav{
      margin-top: 50px;
      .nav1{
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #c3c3c3;
      }
      .navItem{
        text-align: center;
        .num{
          font-size: 25px;
          color: #0079fe;
        }
        .txt{
          margin-top: 15px;
          font-size: 14px;
        }
      }
    }
    .echartCon{
      position: relative;
     .charts{
       width: 100%;
       height: 500px;
     }
      .list{
        position: absolute;
        top:54px;
        right: 0;
        .item{
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }


  }
  .container{
    margin-left: 15px;
    flex: 1;
    .list{
      .item{
        margin-bottom: 15px;
        .li{
         line-height: 48px;
         background-color: #efefef;
         padding: 0 15px;
         box-sizing: border-box;
        }
        .li1{
          width: 100%;
        }
        .li3{
          width: 32%;
        }
        .li6{
          width: 66%;
        }

      }
    }
    .nav{
      margin-top: 20px;
      border: 1px solid #889AA4;
      .navItem{
        text-align: center;
        width: 20%;
        line-height: 42px;
        border-right: 1px solid #889AA4;
      }
      .navItem2{
        width: 40%;
      }
      .navItem:last-child{
        border:0;
      }
    }
    .main{
      margin-top: 30px;

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

}
.popFj{
  .head{

    .ipt{
      margin-left: 10px;
      height: 35px;
    }
  }
  .box{
    margin-top: 20px;
    width: 100%;
    height: 160px;
    border: 1px dashed #999999;
    border-radius: 8px;
    .iconUp{
      width: 60px;
      cursor: pointer;
    }
  }
  .tips{
    margin-top: 20px;
  }
}
</style>
