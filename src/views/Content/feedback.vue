<template>
	<div class="main" v-loading="loading">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword" @keyup.enter.native="handelSearch"
							placeholder="输入标题名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status_name" placeholder="选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

				</div>

				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->

		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border>

				<el-table-column prop="sorted" label="排序" width="50">
				</el-table-column>
				<el-table-column prop="id" label="用户Id">
				</el-table-column>
				<el-table-column prop="creatorName" label="姓名">
				</el-table-column>
				<el-table-column prop="phone" label="手机号">
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template slot-scope="scope">
						<span>{{matchingType(scope.row.type)}} </span>
					</template>
					
				</el-table-column>
                <el-table-column prop="content" label="建议内容">
				</el-table-column>
				<el-table-column label="图片">
					<template slot-scope="scope">
						<img :src="scope.row.urlList" style="width: 80px;height: 80px;">
					</template>
				</el-table-column>
                
				<el-table-column prop="scene" label="位置" width="100">
					<template slot-scope="scope">
						<div>{{scope.row.scene == 0?'企业端':'工人端'}}</div>
					</template>
					
				</el-table-column>
				<el-table-column prop="createTime" label="反馈时间" width="120">
					<template slot-scope="scope">
						<span>{{formatDate(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->

		</div>



		<el-dialog title="查看详情" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
			<div class="detailshow">
			<div class="detailshow-list">
				<div class="detailshow-list-left"> 用户ID:</div>
				<div class="detailshow-list-right"> <el-input v-model="editData.id" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>

			<div class="detailshow-list">
				<div class="detailshow-list-left"> 名称:</div>
				<div class="detailshow-list-right"> <el-input v-model="editData.creatorName" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>

			<div class="detailshow-list">
				<div class="detailshow-list-left"> 手机号码：</div>
				<div class="detailshow-list-right"> <el-input v-model="editData.phone" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>
			
			<div class="detailshow-list">
				<div class="detailshow-list-left"> 类型：</div>
				<div class="detailshow-list-right"> <el-input :value="matchingType(editData.type)" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>

			<div class="detailshow-list" style="margin:10px 0">
				<div class="detailshow-list-left"> 建议内容：</div>
				<div class="detailshow-list-right"> <el-input v-model="editData.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :rows="5" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>

			<div class="detailshow-list" style="pad">
				<div class="detailshow-list-left"> 图片</div>
				<div class="detailshow-list-right"> 
				<div v-for="(item,i) in editData.urlList" :key="i">
					<el-image style="width: 100px; height: 100px; margin: 0 10px" :src="item" :preview-src-list="editData.urlList"></el-image>
				</div>
				</div>
			</div>
			
			<div class="detailshow-list">
				<div class="detailshow-list-left">位置：</div>
				<div class="detailshow-list-right"> <el-input :value="editData.scene == 0?'企业端':'工人端'" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>

			<div class="detailshow-list">
				<div class="detailshow-list-left"> 反馈时间：</div>
				<div class="detailshow-list-right"> <el-input :value="formatDateTime(editData.createTime)" :disabled="true" placeholder="请输入内容"></el-input></div>
			</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button  size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button  size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>


	</div>
</template>
<script>
	import {
		getFeedback,
	} from '../../api/user.js'
	import moment from 'moment'
	import Uploads from '../../components/Upload/Pulibc.vue'
	import UploadImg from '../../components/UploadImg/UploadImg.vue'
	export default {
		data() {
			return {
				keyword: "",
				status_name: "",
				statusList: [],
				tableData: [],
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				dialogVisible: false,
				editData:{},
				loading:false,
				typeList:[{
					lable:'产品功能',
					value:1, 
				},{
					value:2,
					lable:'平台规则及政策'
				},{
					value:99,
					lable:'其他'
				}]
			}
		},
		mounted() {
			this.getRecommend();
		},
		components: {
			UploadImg,
			Uploads
		},
		watch: {
			dialogVisible(val) {
				if (!val) {
					this.ruleForm = {
						id: null,
						title: "", // 标题
						imgUrl: "", // url图片
						subTitle: "", // 小标题
						link: "", // 链接
						sorted: "" // 排序
					}
					this.imgUrl = ''
				}
			}
		},
		methods: {
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			/** 获取列表数据 */
			async getRecommend() {
				this.loading = true;
				let param = {}
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.status = this.status_name;
				param.keyword = this.keyword;
				let res = await getFeedback(param);
				this.pageCount = res.data.total;
				this.tableData = res.data.list;
				this.loading = false;
			},
			/** 查看详情 */
			handleEdit(row) {
				this.editData = JSON.parse(JSON.stringify(row));
				this.dialogVisible = true;
				this.ruleForm = this.editData;
				this.imgUrl = row.imgUrl
			},
			// 匹配类型
			matchingType(val){
				if(val){
				return this.typeList.find((item) => item.value == val).lable
				}
			},
			/** 取消对话框 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 搜索 */
			handelSearch() {
				this.getRecommend();
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.status_name = '';
				this.keyword = this.keyword;
				this.getRecommend();
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getRecommend();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getRecommend();
			},
		}
	}
</script>
<style lang="scss" scoped="scoped">
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
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
	}

	.avatar {
		width: 80px;
		height: 80px;
		display: block;
	}
	.detailshow{
  .detailshow-list{
    display: flex;
    justify-content: start;
    height: auto;
    line-height: 50px;
    .detailshow-list-left{
      width: 30%;
      text-align: center;
    }
    .detailshow-list-right{
      width: 70%;
      display: flex;
      justify-content: start;
    }
  }
}
</style>
