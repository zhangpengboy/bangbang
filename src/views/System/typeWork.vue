<template>
  <div class="typeWork"  v-loading="loading">
      <div class="main flex">
        <div class="aside">
          <p class="tit">类别</p>
          <div class="head flex alCen">
            <div class="txt">编辑</div>
            <div class="txt">删除</div>
          </div>
          <div class="list">
            <div class="item flex alCen js-sb" v-for="(item,index) in allClass">
              <div class="ipt" :class="activeIndex==index?'iptHov':''" @click="choseClass(item,index)">
                {{item.labelName}}
              </div>
              <img src="../../assets/images/icon-edit.png" @click="edit(item,index)" class="iconedit">
              <img src="../../assets/images/icon-delete.png" @click="dele(item,index)" class="iconedit">
            </div>
          </div>
          <div class="addCon flex alCen js-center" @click="addClass">
            <img src="../../assets/images/icon-add.png" class="iconAdd">
            <p class="add">添加</p>
          </div>
        </div>
        <div class="container">
          <p class="tit">工种</p>
          <div class="list flex alCen">
            <div class="item flex alCen js-center" v-for="(item,index) in gongzhong">
              <p class="txt">{{item.labelName}}</p>
              <img src="../../assets/images/icon-close.png" class="iconClose" @click="detItem(item,index)">
            </div>
            <div class="add flex alCen js-center" @click="addItem">
              <img src="../../assets/images/icon-add.png" class="iconAdd">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {
    	gettypeWorkClass,
      insertOneTw,
      updateOneTw,
      removeOneTw
  } from '../../api/user.js'
  export default {
    data() {
      return {
        loading:false,
        allClass:[],
        gongzhong:[],
        activeIndex:0,
        activeClassID:0,  //当前选中的分类id
      }
    },
    created() {
      this.getList()
    },
    methods: {
      choseClass(item,index){
        this.activeIndex = index;
        this.activeClassID = item.id
        this.getGongzhong(this.activeClassID);
      },
      getList() {
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          type:0,
          parentId:0
        }
        gettypeWorkClass(params).then(res => {
          this.loading = false;
          var data = res.data
          console.log('res', data)
          this.allClass = data.list
          if(data.list!=0){
            this.activeClassID = data.list[0].id
            this.getGongzhong(this.activeClassID);
          }
        })
      },
      getGongzhong(id){
        console.log('获取工种')
        var params = {
          pageSize:20,
          pageNum:1,
          type:0,
          parentId:id
        }
        gettypeWorkClass(params).then(res => {
          console.log(res)
          this.gongzhong = res.data.list
        })

      },
       // 编辑分类
       edit(item,index){
         console.log(item)
         this.$prompt('请输入类别名称', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           inputValue:item.labelName
         }).then(({ value }) => {
           if(value==null){
             this.$message({
               type: 'success',
               message: '不能为空 '
             });
           }else{
             var params = {
               id:item.id,
               labelName:value,
               parentId:item.parentId,
               type:0
             }
             updateOneTw(params).then(res => {
               var data = res.data
               console.log('res', data)
               this.getList()

             })
           }
         });
       },
       // 分类删除
       dele(item,index){
         console.log(item)
         this.$confirm('确定要删除该类别?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.deleteFun(item.id,1)

         })
       },
      // 添加分类
      addClass(){
        this.$prompt('请输入类别名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else{
            var params = {
              labelName:value,
              parentId:0,
              type:0,
            }
            insertOneTw(params).then(res => {
              console.log(res)
              if(res.code==200){
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.getList()
              }

            })
          }
        });
      },
      // 删除工种
      detItem(item,index){
        console.log(index)
        this.$confirm('确定要删除该工种?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFun(item.id,2)
        }).catch(() => {

      })
      },
      // 执行删除
      deleteFun(id,type){
        var params = {
          id:id
        }
        removeOneTw(params).then(res => {
          console.log(res)
          if(res.code==200){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            if(type==2){
              this.getGongzhong(this.activeClassID);
            }else{
              this.getList()
            }

          }

        })
      },

      // 添加工种
      addItem(){
        this.$prompt('请输入工种名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==null){
            this.$message({
              type: 'success',
              message: '不能为空 '
            });
          }else{
            var params = {
              labelName:value,
              parentId:this.activeClassID,
              type:0,
            }
            insertOneTw(params).then(res => {
              console.log(res)
              if(res.code==200){
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.getGongzhong(this.activeClassID);
              }

            })
          }

        });
      }

    }
  }
</script>

<style lang="scss" scoped="scoped">
.typeWork{
  .main{
    margin-top: 15px;
    border: 1px solid #d9d9d9;
    padding: 40px 20px;
    box-sizing: border-box;
    .aside{
      width: 300px;
      border-right: 1px solid #d9d9d9;
      padding-right: 20px;
      min-height: 500px;
      .tit{
        font-size: 16px;
      }
      .head{
        justify-content: flex-end;
        .txt{
          color: #c30000;
          margin-left: 15px;
        }
      }
      .list{
        margin-top: 20px;
        .item{
          margin-bottom: 15px;
          .ipt{
            border: 1px solid #d9d9d9;
            width: 180px;
            line-height: 40px;
            padding-left: 5px;
            box-sizing: border-box;
          }
          .iptHov{
            border: 1px solid #000095;
          }
          .iconedit{
            cursor: pointer;
            margin-left: 15px;
            width: 23px;
          }
        }
      }
      .addCon{
        margin-top: 30px;
        width: 250px;
        height: 40px;
        border: 1px dashed #d9d9d9;
        cursor: pointer;
        .iconAdd{
          width: 13px;
        }
        .add{
          color: #c30000;
          margin-left: 15px;
        }
      }
    }
    .container{
      flex: 1;
      margin-left: 15px;
      .tit{
        font-size: 16px;
      }
      .list{
        margin-top: 30px;
        flex-wrap: wrap;
        .item{
          width: 220px;
          height: 40px;
          position: relative;
          border: 1px solid #d9d9d9;
          margin: 0 15px 15px 0;
          .txt{
            font-size: 14px;
          }
          .iconClose{
            width: 15px;
            position: absolute;
            top:0;
            right: 0;
          }
        }
        .add{
          width: 40px;
          height: 40px;
          position: relative;
          border: 1px dashed #d9d9d9;
          margin: 0 15px 15px 0;
          .iconAdd{
            width: 15px;
          }
        }
      }
    }
  }

}
</style>
