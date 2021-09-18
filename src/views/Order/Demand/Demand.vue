<template>
	<div class="main" v-loading="loading">

		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keywords" @keyup.enter.native="handelSearch"
							placeholder="需求单ID/名称/手机号">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>类型：</span>
						<el-select v-model="type_name" placeholder="选择类型">
							<el-option v-for="item in typeList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>跟进人：</span>
						<el-input class="top-content-item-input" v-model="updator" @keyup.enter.native="handelSearch"
							placeholder="请输入跟进人">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>地区：</span>
						<el-select v-model="address" filterable placeholder="选择地区">
							<el-option v-for="item in addressList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>

				<div class="top-content-btn">
					<el-button type="primary" @click="handelSecurity">打开安全帽</el-button>
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->

		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button>导出</el-button>
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="ID" width="200">
				</el-table-column>
				<el-table-column prop="createName" label="名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column  label="类型">
					<template slot-scope="scope">
						{{scope.row.type == 1?'劳务派遣':'劳务分包'}}
					</template>
				</el-table-column>
				<el-table-column label="语音" width="140">
					<template slot-scope="scope">
						<template v-for="(item,index) in scope.row.voices">
							<m-audio :key="index" :showDuration="false" class="demand-deltails-box-item-mp3"
								v-if="index == 0" :src="item.url" text="点这里播放">
							</m-audio>
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="content" label="需求" width="300">
				</el-table-column>
				<el-table-column prop="city" label="地区">
				</el-table-column>
				<el-table-column prop="address" label="服务单">
				</el-table-column>
				<el-table-column prop="updateName" label="跟进人">
				</el-table-column>
				<el-table-column label="创建时间" width="120">
					<template slot-scope="scope">
						<span>{{formatDate(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="操作时间" width="120">
					<template slot-scope="scope">
						<!-- <p>{{scope.row.updateTime}}</p> -->
						<span>{{formatDate(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="100">
					<template slot-scope="scope">
						<div v-if="scope.row.status == 0">未发报价单</div>
						<div v-else-if="scope.row.status == 1">已发报价单</div>
						<div v-else-if="scope.row.status == 2">已取消</div>
						<div v-else-if="scope.row.status == 3">已转至服务单</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
						<template v-if="scope.row.status != 2 ">
							<el-button type="text" size="small" @click="handleSumbitRelationship(scope.row)">
								{{scope.row.contactStatus == 0?'确认联系':'恢复未联系'}}
							</el-button>
							<el-button type="text" v-if="scope.row.orderId == 0" size="small"
								@click="handleCreate(scope.row)">创建报价单</el-button>
						</template>

						<el-button v-if="scope.row.status == 0 || scope.row.status == 1" type="text" size="small"
							@click="handleClose(scope.row)">取消</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->

		</div>
	</div>
</template>

<script>
	import {
		getBriel,
		UpdateBriel
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				address:"", // 选中地区
				addressList:[{
					value: "",
					label: "全部"
				}], // 地区列表
				type_name:"", // 选中类型
				typeList:[{
					value: "",
					label: "全部"
				},{
					value: 1,
					label: "劳务派遣"
				},{
					value: 2,
					label: "劳务分包"
				}], // 类型列表
				tableData: [], // 表单列表
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				serach: "", // 搜索
				value: "", // 选中
				options: [{
					value: "",
					label: "全部"
				}],
				keywords: "", // 输入查询
				updator: "", // 跟进人ID
				loading: false,
				clientHeight:0
			}
		},
		async mounted() {
			this.getBriel();
			this.getWebHeing();
		},
		methods: {
			// 鼠标经过
			handleMouseoverImg(item, index) {
				this.current = index;
			},
			// 鼠标移出
			handleMouseoutImg(item, index) {
				this.current = null;
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
					this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
						.offsetHeight - document.getElementById('page')
						.offsetHeight - document.getElementById('boxTop')
						.offsetHeight - 180;
					this.$forceUpdate();
				})
			},
			/** 打开安全帽 */
			handelSecurity() {
				this.$router.push({
					path: '/order/security'
				})
			},
			/** 重置 */
			handleReset() {
				this.keywords = '';
				this.value = '';
				this.pageIndex = 1;
				this.type_name = '';
				this.address = '';
				this.getBriel();
			},

			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : ''
			},
			/** 取消订单 */
			handleClose(row) {
				this.$confirm('是否取消需求单?', '确认提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {};
					param.id = row.id;
					param.status = 2;
					this.UpdateBriel(param, true);
				}).catch(() => {

				});


			},
			/** 查看 */
			handleLook(row) {
				this.$router.push({
					path: '/order/demand-details',
					query: {
						id: row.id
					}
				})
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getBriel();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getBriel();
			},
			// 搜索
			handelSearch() {
				this.pageIndex = 1;
				this.getBriel();
			},
			/** 打开服务单 */
			handleCreate(row) {
				// console.log(row);
				this.$router.push({
					path: '/order/demand-details',
					query: {
						id: row.id
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
					this.UpdateBriel(row);
				}).catch(() => {

				});
			},
			/** 更新需求单状态 */
			async UpdateBriel(data, isshow = false) {
				let param = {}
				if (isshow) {
					param = data;
				} else {
					param.id = data.id;
					param.contactStatus = data.contactStatus ? 0 : 1;
				}

				// param.status = data.status;
				this.loading = true;
				try {
					let res = await UpdateBriel(param);
					console.log(res);
					this.loading = false;
					this.$message.success('操作成功');
					this.getBriel();
				} catch (e) {
					this.loading = false
					console.log(e)
					//TODO handle the exception
				}
			},
			/** 获取企业服务单 */
			async getBriel() {
				let param = {};
				param.pageIndex = this.pageIndex;
				param.pageSize = this.pageSize;
				param.keywords = this.keywords.trim();
				param.updator = this.updator;
				param.type = this.type_name;
				param.city = this.address;
				this.loading = true;
				try {
					let res = await getBriel(param);
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
