<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <Filters :data="filterData" @search="search" />
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="handleAdd()">新增班组</el-button>
      </div>
      <!-- 表格  -->
      <Table :data="tableData" :columns="columns" :height="clientHeight+'px'">
        <template slot="handle">
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
        </template>
      </Table>
      <!-- 表格end -->
      <!-- 分页  -->
      <div class="flex fcenter page" id="page">
        <el-pagination
          id="page"
          class="page"
          background
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next,sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 分页end -->

    </div>

    <el-dialog :title="isEdit ? '编辑班组' : ' 新增班组'" :visible.sync="visible" width="40%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="班组名称" prop="name">
                <el-input v-model="form.name"  placeholder="请输入班组名称" />
            </el-form-item>
            <el-form-item label="考勤地点" prop="address">
                <el-input v-model="form.address"  placeholder="请输入考勤地点" />
            </el-form-item>
            <el-form-item label="考勤范围" prop="range">
                <el-input v-model="form.range"  placeholder="请输入考勤范围" />
            </el-form-item>
            <div class="area">
                <div v-for="(item, index) in form.teams" :key="index">
                    <el-form-item label="考勤组名称" :prop="'teams.'+index+'.title'" :rules="rules.title" label-width="120px">
                        <el-input v-model="item.title" placeholder="输入考勤组名称" style="width: 87%" />
                    </el-form-item>
                    <el-form-item label="考勤时间" required  label-width="120px">
                        <div class="flex">
                            <el-form-item :prop="'teams.'+index+'.jobStartTime'" :rules="rules.jobStartTime">
                                <el-time-select
                                    v-model="item.jobStartTime"
                                    :picker-options="{
                                        step: '00:15'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            ~
                            <el-form-item :prop="'teams.'+index+'.jobEndTime'" :rules="rules.jobEndTime">
                                <el-time-select
                                    v-model="item.jobEndTime"
                                    :picker-options="{
                                        start: item.jobStartTime,
                                        step: '00:15'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="午休时间" required  label-width="120px">
                        <div class="flex">
                            <el-form-item :prop="'teams.'+index+'.restStartTime'" :rules="rules.restStartTime">
                                <el-time-select
                                    v-model="item.restStartTime"
                                    :picker-options="{
                                        step: '00:15'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            ~
                            <el-form-item :prop="'teams.'+index+'.restEndTime'" :rules="rules.restEndTime">
                                <el-time-select
                                    v-model="item.restEndTime"
                                    :picker-options="{
                                        start: item.restStartTime,
                                        step: '00:15'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            <el-button type="danger" style="margin-left: 10px" @click="delTeam(index)" v-if="index !==0">删除</el-button>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item  label-width="120px">
                    <el-button type="primary" @click="addTeam">添加</el-button>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import Filters from '../../../components/Filters/index.vue'
  import Table from '@/components/Table'
  export default {
    components: {
      Filters,
      Table
    },
    data() {
      return {
        filterData: [
          {type: 'input',prop: 'no', title: '班组名称', placeholder: '输入名称'},
          {type: 'input', prop: 'jia', title: '班组负责人', placeholder: '输入名字/手机号'}
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '班组名称'},
          {prop: 'name', label: '班组负责人'},
          {prop: 'name', label: '创建时间'},
          {prop: 'name', label: '创建人'},
          {prop: 'name', label: '班组人数'},
          {prop: 'name', label: '关联考勤组'},
          {slot: "handle"},
        ],
         tableData:[
           {name: '你好', status: 0},
           {name: '你好a', status: 1}
         ],
         loading:false,
         clientHeight:0,
         current: 1, // 页码
         pageSize: 10, // 显示多少条数据
         total: 0, // 总条数
         visible: false,
         isEdit: false,
         form: {
             name: '',
             address: '',
             range: '',
             teams: [{title: '', jobStartTime: '', jobEndTime: '', restStartTime: '', restEndTime: ''}]
         },
         rules: {
             name: [{required: true, message: '请输入班组名称', trigger: 'blur'}],
            address: [{required: true, message: '请输入考勤地点', trigger: 'blur'}],
            range: [{required: true, message: '请输入考勤范围', trigger: 'blur'}],
            title: [{required: true, message: '输入考勤组名称', trigger: 'blur'}],
            title: [{required: true, message: '输入考勤组名称', trigger: 'blur'}],
            title: [{required: true, message: '输入考勤组名称', trigger: 'blur'}],
            jobStartTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
            jobEndTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
            jobEndTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
            restStartTime: [{required: true, message: '请选择午休时间', trigger: 'blur'}],
            restEndTime: [{required: true, message: '请选择午休时间', trigger: 'blur'}],
         }

      }
    },
    created() {
      this.getWebHeing();
      // this.loadData('');
    },
    methods: {
      loadData(){
        console.log('加载数据！！')
      },
      search(e) {
        console.log('查询', e)
        this.loadData();
      },
      /** 选择分页 */
      handleSizeChange(e) {
        this.pageSize = e
        this.current = 1
        this.loadData()
      },
      /** 点击分页 */
      handleCurrentChange(e) {
        this.current = e
        this.loadData()
      },
      /** 计算页面高度 */
      getWebHeing() {
      	this.$nextTick(() => {
      		this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      			.offsetHeight - document.getElementById('page')
      			.offsetHeight - document.getElementById('boxTop')
      			.offsetHeight - 180;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - document.getElementById('boxTop')
      		  	.offsetHeight - 180;
      		  this.$forceUpdate();
      		}
      	})
      },

      handleAdd() {
          this.visible = true
          this.isEdit = false
      },
      handleEdit() {
          this.visible = true
           this.isEdit = true
      },
      submit() {
          this.$refs.form.validate(valid => {
              if (valid) {
                  alert('submit!');
              } else {
                   console.log('error submit!!');
              }
          })
      },
      delTeam(index){
        this.form.teams.splice(index, 1)
      },
      addTeam(){
          this.form.teams.push({title: '', jobStartTime: '', jobEndTime: '', restStartTime: '', restEndTime: ''})
      },
    
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    border: 1px solid #E9E9E9;
  }

  .top, .box {
      border: 0;
  }

  .flex {
      display: flex;
      align-items: center;
  }

  .area {
      padding-top: 22px;
      border: 1px dashed #E9E9E9;
  }
</style>
