<template>
	<div class="main" v-loading="loading">

		<!-- 头部  -->
		<div class="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="creator" @keyup.enter.native="handelSearch" placeholder="用户ID/账号">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>跟进人：</span>
						<el-select v-model="updator" placeholder="选择跟进人">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary"查询</el-button>
					<el-button>重置</el-button>
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
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSzie * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="ID" width="200">
				</el-table-column>
				<el-table-column prop="createName" label="名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column label="语音">
					<template slot-scope="scope">
						<template v-for="(item,index) in scope.row.voices">
							<m-audio :key="index" class="demand-deltails-box-item-mp3" v-if="index == 0" :src="item"
								text="点这里播放">
							</m-audio>
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="content" label="需求">
				</el-table-column>
				<el-table-column prop="address" label="服务单">
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateTime" label="操作时间">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						{{scope.row.status == 1 ?'正常':'已取消'}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small"  @click="handleSumbitRelationship(scope.row)">{{scope.row.contactStatus == 0?'确认联系':'恢复未联系'}}
						</el-button>
						<el-button type="text" size="small" @click="handleCreate(scope.row)">创建服务单</el-button>
						<el-button v-if="scope.row.status == 1 " type="text" size="small">取消</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSzie" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->

		</div>
	</div>
</template>

<script>
	import {
		getBriel,UpdateBriel
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				tableData: [], // 表单列表
				pageIndex: 1, // 页码
				pageSzie: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				serach: "", // 搜索
				value: "", // 选中
				options: [],
				creator: "", // 输入查询
				updator: "", // 跟进人ID
				loading: false
			}
		},
		mounted() {
			this.getBriel();
		},
		methods: {
			/** 查看 */
			handleLook() {
				console.log('执行111')
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSzie = e;
				this.pageIndex = 1;
				this.getBriel();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getBriel();
			},
			// 搜索
			handelSearch(){
				this.pageIndex = 1;
				this.getBriel();
			},
			/** 打开服务单 */
			handleCreate(row) {
				console.log(row);
				this.$router.push({
					path: '/order/demand-details',
					query:{
						id:row.id
					}
				})
			},
			/** 确认需求单状态 */
			handleSumbitRelationship(row) {
				// console.log(row)
				this.$confirm('是否修改成已联系状态?', '确认提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// let {id,contactStatus,status} = row;
					this.UpdateBriel(row);
					// console.log(row)
				}).catch(() => {
					
				});
			},
			/** 更新需求单状态 */
			async UpdateBriel(data){
				let param = {}
				param.id = data.id;
				param.contactStatus = data.contactStatus;
				// param.status = data.status;
				this.loading = true;
				try{
					let res = await UpdateBriel(param);
					console.log(res);
					this.loading = false;
					this.$message.success('操作成功');
					this.getBriel();
				}catch(e){
					this.loading = false
					console.log(e)
					//TODO handle the exception
				}
			},
			/** 获取企业服务单 */
			async getBriel() {
				let param = {};
				param.pageIndex = this.pageIndex;
				param.pageSzie = this.pageSzie;
				param.creator = this.creator;
				param.updator = this.updator;
				this.loading = true;
				try {
					let res = await getBriel(param);
					console.log('获取企业服务单::', res);
					this.tableData = res.data.records;
					this.PageCount = res.data.total;
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
		}
	}
</script>

<style>
</style>
