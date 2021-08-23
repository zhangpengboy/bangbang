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
            <div class="item flex alCen js-sb" v-for="(item,index) in 3">
              <input type="text" name="" placeholder="请输入" class="ipt" value="" />
              <img src="../../assets/images/icon-edit.png" @click="edit(index)" class="iconedit">
              <img src="../../assets/images/icon-delete.png" @click="dele(index)" class="iconedit">
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
            <div class="item flex alCen js-center" v-for="(item,index) in 12">
              <p class="txt">装修木工</p>
              <img src="../../assets/images/icon-close.png" class="iconClose" @click="detItem(index)">
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
  export default {
    data() {
      return {
        loading:false,

      }
    },
    created() {

    },
    methods: {
         // 编辑分类
         edit(index){
           console.log(index)
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
               this.$message({
                 type: 'success',
                 message: '类别名称: ' + value
               });
             }
           });
         },
         // 分类删除
         dele(index){
           console.log(index)
           this.$confirm('确定要删除该类别?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             this.$message({
               type: 'success',
               message: '删除成功!'
             });
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
              this.$message({
                type: 'success',
                message: '类别名称: ' + value
              });
            }


          });
        },
        // 删除工种
        detItem(index){
          console.log(index)
          this.$confirm('确定要删除该工种?', '提示', {
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
              this.$message({
                type: 'success',
                message: '类别名称: ' + value
              });
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
            height: 40px;
            padding-left: 5px;
            box-sizing: border-box;
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
