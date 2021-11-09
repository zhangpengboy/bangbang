<template>
	<div class="attendance" v-loading="loading">

		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<!-- <el-button type="primary" @click="exportTable">导出</el-button> -->
			</div>
			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border>
				<el-table-column type='index' label="序号" width="80" />
				<el-table-column prop="name" label="功能名称" width="280" />
				<el-table-column label="状态" width="120">
					<template slot-scope="scope">
						<p style="color: #03BF16;" v-if="scope.row.status == 0">正常</p>
						<p style="color: #D9001B;" v-if="scope.row.status == 1">停用</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160">
					<template slot-scope="scope">
						<template>
							<el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
							<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
							<el-button type="text" size="small" @click="upStatue(scope.row)">
								{{scope.row.status==1?'启用':'停用'}}
							</el-button>
						</template>

					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->

			<!-- 合伙人弹窗 -->
			<el-dialog :title="dialogtype?'查看':'编辑'" :visible.sync="dialogVisible" width="576px">
				<div class="popList">
					<div class="item flex alCen">
						<p class="tit">合伙人时限</p>
						<input type="text" name="" class="ipt" :disabled="dialogtype" placeholder="请输入认证工人奖励"
							v-model="expire" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" />
						<input type="text" class=" ipt-unit" placeholder="年" :disabled="true" />
					</div>
					<div class="item flex alCen">
						<p class="tit">单个人分润上限</p>
						<input type="text" name="" class="ipt" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							:disabled="dialogtype" placeholder="请输入施工费用分佣" v-model="maxRebate" />
						<input type="text" class=" ipt-unit" placeholder="元" :disabled="true" />
					</div>
					<div class="item flex alCen">
						<p class="tit">成为合伙人赠送积分</p>
						<input type="text" name="" class="ipt" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							:disabled="dialogtype" placeholder="请输入施工费用分佣" v-model="integral" />
					</div>
				</div>

				<span slot="footer" class="dialog-footer" v-if="dialogtype">
					<el-button @click="dialogVisible = false">确 定</el-button>
				</span>
				<span slot="footer" class="dialog-footer" v-else>
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="editHHR">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 邀请好友弹窗 -->
			<el-dialog :title="dialogtype?'查看':'编辑'" :visible.sync="dialogVisible1" width="576px">
				<div class="popList">
					<div class="item flex alCen">
						<p class="tit">奖励</p>
						<input type="text" class="ipt" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							:disabled="dialogtype" placeholder="请输入邀请好友奖励" v-model="invitationAwardFee"   />
					</div>
				</div>

				<span slot="footer" class="dialog-footer" v-if="dialogtype">
					<el-button @click="dialogVisible1 = false">确 定</el-button>
				</span>
				<span slot="footer" class="dialog-footer" v-else>
					<el-button @click="dialogVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="editYQHY">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 积分 -->
			<el-dialog :title="dialogtype?'查看':'编辑'" :visible.sync="dialogVisible2" width="576px">
				<div class="popList">
					<div class="item flex alCen">
						<p class="tit">积分抵扣服费比例</p>
						<input type="text" class="ipt-currency" :disabled="true" placeholder="100积分=">
						<input type="text" class="ipt" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							:disabled="dialogtype" placeholder="请输入邀请好友奖励" v-model="exchangeRate"   />
						<input type="text" class=" ipt-unit" placeholder="元" :disabled="true" />
					</div>
				</div>

				<span slot="footer" class="dialog-footer" v-if="dialogtype">
					<el-button @click="dialogVisible2 = false">确 定</el-button>
				</span>
				<span slot="footer" class="dialog-footer" v-else>
					<el-button @click="dialogVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="handleEditIntegral">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 积分end -->

		</div>

	</div>
</template>

<script>
	import {
		awardSettingGet,
		awardSettingupdateOne
	} from '../../api/user.js'
	import {
		formatDate
	} from '@/utils/validate'
	export default {
		data() {
			return {
				tableData: [{
						id: 0,
						name: '合伙人',
						status: 0
					},
					{
						id: 1,
						name: '邀请好友',
						status: 0
					},
					{
						id: 2,
						name: '积分抵扣服务费比例',
						status: 0
					}
				],
				loading: false,
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				id: 0,
				expire: '', //合伙人时限 单位年
				integral: '', //合伙人分佣
				maxRebate: '', // 个人分润上限
				invitationAwardFee: '', //邀请奖励
				dialogtype: true, //编辑or查看
				editData: {},
				exchangeRate: ""

			}
		},
		created() {
			this.loadDate();
		},
		watch: {
			dialogVisible(val) {
				if (!val) {
					console.log(this.editData)
					this.expire = this.editData.partnerSetting.expire;
					this.integral = this.editData.partnerSetting.integral;
					this.maxRebate = this.editData.partnerSetting.maxRebate
				}
			},
			dialogVisible1(val) {
				if (!val) {
					this.invitationAwardFee = this.editData.invitationSetting.award;
					// this.
				}
			},
			dialogVisible2(val){
				if(!val){
					this.exchangeRate = this.editData.integralSetting.exchangeRate
				}
			},
		},
		methods: {
			// handleInvitationAwardFee(val){
			// 	console.log('执行11')
			// 	val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			// },
			loadDate() {
				this.loading = true;
				var params = {}
				awardSettingGet(params).then(res => {
					this.loading = false;
					var data = res.data
					console.log('res', data)
					this.id = data.id
					this.tableData[0].status = data.partnerSetting.status;
					this.tableData[1].status = data.invitationSetting.status;
					this.tableData[2].status = data.integralSetting.status;
					this.editData = data;
					this.invitationAwardFee = data.invitationSetting.award
					this.expire = data.partnerSetting.expire
					this.integral = data.partnerSetting.integral
					this.maxRebate = data.partnerSetting.maxRebate;
					this.exchangeRate = data.integralSetting.exchangeRate

				})
			},
			search() {
				console.log('查询')
				this.loadDate(this.statusvalue);
			},
			// 重置
			raLoad() {
				this.statusvalue = '';
				this.PageIndex = 1;
				this.loadDate(this.statusvalue);
			},
			// 导出
			exportTable() {

			},
			// 启用停用
			upStatue(row) {
				console.log(row)
				if (row.status == 0) {
					this.$confirm('是否确定停用该功能?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (row.id == 0) {
							this.getAwardSettingupdateOne(1, true)
						} else if(row.id == 1) {
							this.getAwardSettingupdateOne(2, true)
						} else if(row.id == 2){
							this.getAwardSettingupdateOne(3, true)
						}

					}).catch(() => {

					})
				} else {
					this.$confirm('是否确定启用该功能?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (row.id == 0) {
							this.getAwardSettingupdateOne(1, true)
						} else if(row.id == 1) {
							this.getAwardSettingupdateOne(2, true)
						} else if(row.id == 2){
							this.getAwardSettingupdateOne(3, true)
						}
					}).catch(() => {

					})
				}
			},
			// 修改停用启用状态
			changeStatue(index, status) {
				if (index == 0) {
					var params = {
						id: this.id,
						partnerStatus: status
					}
				} else {
					var params = {
						id: this.id,
						invitationStatus: status
					}
				}
				awardSettingupdateOne(params).then(res => {
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
						this.dialogVisible = false
						// this.loadDate();
					}

				})
			},

			// 查看
			see(row) {
				this.dialogtype = true
				if (row.id == 0) {
					console.log('合伙人')
					this.dialogVisible = true
				} else if (row.id == 1) {
					console.log('邀请好友')
					this.dialogVisible1 = true
				} else {
					this.dialogVisible2 = true;
				}

			},
			// 编辑
			edit(row) {
				console.log(row)
				console.log(this.editData)
				this.dialogtype = false
				if (row.id == 0) {
					console.log('合伙人')
					this.dialogVisible = true

				} else if (row.id == 1) {
					console.log('邀请好友')
					this.dialogVisible1 = true
				} else {
					this.dialogVisible2 = true;
				}

			},
			getTypeStatus(status){
				
			},
			/** 编辑方法 */
			getAwardSettingupdateOne(type, isEdit) {
				var params = {}
				switch (type) {
					case 1:
						params.partnerSetting = {
							expire: this.expire,
							integral: this.integral,
							maxRebate: this.maxRebate,
							status: isEdit ? Number(!this.tableData[0].status) : this.tableData[0].status
						}
						break;
					case 2:
						params.invitationSetting = {
							award: this.invitationAwardFee,
							status:isEdit ? Number(!this.tableData[1].status) : this.tableData[1].status
						}
						break;
					case 3:
						params.integralSetting = {
							exchangeRate: this.exchangeRate,
							status: isEdit? Number(!this.tableData[2].status): this.tableData[2].status
						}
						break;
				}
					
		
				awardSettingupdateOne(params).then(res => {
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
						this.dialogVisible = false;
						this.dialogVisible1 = false;
						this.dialogVisible2 = false;
						this.loadDate();
					}
				})
			},
			// 编辑合伙人
			editHHR() {
				console.log();
				if (!Boolean(Number(this.expire)) || this.expire < 1) {
					return this.$message.error('请输入合伙人时限')
				}
				if(!Number(this.integral) || this.integral < 1){
					return this.$message.error('请输入正确的积分')
				}
				if(!Number(this.maxRebate) || this.maxRebate < 1){
					return this.$message.error('请输入正确个人分润上限')
				}
				
				this.getAwardSettingupdateOne(1);
			},
			/** 编辑积分 */
			handleEditIntegral() {
				if(!Number(this.exchangeRate) || this.exchangeRate < 1){
					return this.$message.error('请输入正确的积分')
				}
				
				this.getAwardSettingupdateOne(3);
			},
			// 编辑邀请好友
			editYQHY() {
				if (!Boolean(Number(this.invitationAwardFee))) {
					return this.$message.error('请输入正确邀请好友奖励')
				}
				this.getAwardSettingupdateOne(2);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.attendance {
		padding-top: 15px;
	}

	.popList {
		.item {
			margin-top: 10px;

			.tit {
				width: 150px;
			}

			.ipt {
				height: 40px;
				flex: 1;
				border: 1px solid #d9d9d9;
				padding-left: 8px;
			}

			.ipt-unit {
				height: 40px;
				width: 40px;
				text-align: center;
				margin-left: 10px;
			}
			.ipt-currency{
				height: 40px;
				width: 80px;
				text-align: center;
				margin-left: 10px;
			}

		}
	}

	.popList {
		.item {
			margin-top: 10px;

			.tit {
				width: 150px;
			}

			.ipt {
				height: 40px;
				flex: 1;
				border: 1px solid #d9d9d9;
				padding-left: 8px;
			}

		}
	}
</style>
