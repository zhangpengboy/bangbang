<template>
	<div class="main">

		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input v-model="serach" class="top-content-item-input" placeholder="原因" clearable />
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>类型：</span>
						<el-select v-model="updateType"  placeholder="全部" clearable>
							<el-option v-for="item in allStatus" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>记录来源：</span>
						<el-select v-model="fromType" placeholder="全部" clearable>
							<el-option v-for="item in recommendS" :key="item.value" :label="item.label"
								:value="item.value" />
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
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<div>

			<el-button  type="primary" style="margin: 0 20px;" @click="addfen">新增</el-button>

			<el-button @click="exportTable">导出</el-button>

				</div>
				
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column type='index' label="序号" width="60" />
				<el-table-column prop="id" label="ID" width="100" />
				<el-table-column prop="title" label="记录名称" width="150" />
				<el-table-column prop="reason" label="备注" width="120" />
                <el-table-column prop="updateType" label="类型" width="120" >
                	<template slot-scope="scope">
                        <p v-if="scope.row.scoreIncrement > 0">加分</p>
                        <p v-if="scope.row.scoreIncrement < 0"> 减分</p>
					</template>
				</el-table-column>
                
				<el-table-column prop="scoreIncrement" label="分值">
				</el-table-column>
				<el-table-column prop="projectName" label="所属项目" />
				<el-table-column prop="fromType" label="记录来源">
					<template slot-scope="scope">
						{{scope.row.fromType == 0 ?'系统触发':scope.row.fromType == 1 ?'后台添加':'未知'}}
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" label="时间" >
                <template slot-scope="scope">
						{{formatDateTime(scope.row.updateTime)}}
					</template>
				</el-table-column>
               
				<!-- <el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleLook(scope.row)">查看</el-button>

						<el-button v-if="scope.row.realNameAuth==0" type="text" size="small"
							@click="reanName(scope.row)">实名</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<!-- 表格end -->

			<!-- 分页  -->
			<div class="flex fcenter page" id="page">
				<el-pagination id="page" class="page" background :current-page="PageIndex"
					:page-sizes="[10, 20, 30, 40]" :page-size="PageSize" layout="total, prev, pager, next,sizes, jumper"
					:total="PageCount" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
			<!-- 分页end -->
			<!-- 新增信誉分记录 -->
			<el-dialog title="新增信誉分记录" :visible.sync="realNamePop" width="30%" center>
				<div class="reanNamePoplist">
					<!-- <div class="item">
						<p class="tit">身份证正反面：</p>
						<div class="popIdCard flex alCen">
							<el-upload class="avatar-uploader" action="123" :before-upload="beforeUpload"
								:show-file-list="false" ref="newupload" name="multipartFile" :with-credentials='true'
								:auto-upload="true" :on-success="upIdCard">
								<img v-if="idCard" :src="idCard" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<el-upload class="avatar-uploader" style="margin-left: 10px;" action="123"
								:before-upload="beforeUpload2" :show-file-list="false" ref="newupload"
								name="multipartFile" :auto-upload="true" :with-credentials='true'
								:on-success="upIdCardBack">
								<img v-if="idCardBack" :src="idCardBack" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>

						</div>

					</div> -->
					<div class="item">
						<p class="tit">类型：</p>
						<el-select v-model="Add.type" :disabled='true'  placeholder="全部" clearable>
							<el-option v-for="item in typelist" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
					<div class="item">
						<p class="tit">选择原因：</p>
                        <el-select v-model="Add.eventId"  placeholder="全部" clearable @change="changeReason">
							<el-option v-for="item in ReasonList" :key="item.id" :label="item.reason"
								:value="item.id" />
						</el-select>
					</div>
					<div class="item">
						<p class="tit">分数：</p>
						<input type="text" name="" v-model="Add.score" :disabled='true' placeholder="请输入分数" class="ipt" value="">
					</div>
					<div class="item">
						<p class="tit">所属项目：</p>
						<input type="text" name="" v-model="Add.projectName" placeholder="请输入项目名称" class="ipt" value="">
					</div>
					<div class="item">
						<p class="tit">理由：</p>
						<!-- <input type="textarea" name="" v-model="rnIdnum" placeholder="请输入理由" class="ipt" value=""> -->
                        <textarea name="" id="" cols="30" v-model="Add.reason"  placeholder="请输入理由" rows="10" class="tra"></textarea>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="realNamePop = false">取 消</el-button>
					<el-button type="primary" @click="postAddWorkerBehavioralLog">确 定</el-button>
				</span>
			</el-dialog>


		</div>
	</div>
</template>

<script>
	import {
		getuserWorkerBehavioralLog,
		gongRenRealNameAuth,
		uploadIdCard,
		gongrenupdateUserStatus,
		exportCsvGongren,
		uploadIdCardByAli,
		getPreSignFile,
		uploadpublic,
        postAddWorkerBehavioralLog,
        getCreditScore
	} from '../../../api/user.js'

	import moment from 'moment'
	export default {
		data() {
			return {
				tableData: [], // 表单列表
				PageIndex: 1, // 页码
				PageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				serach: '', // 搜索
				gradevalue: [],
				allStatus: [{
					label: '全部',
					value: ''
				},{
					label: '扣分',
					value: '0'
				}, {
					label: '加分',
					value: '1'
				}],
                typelist: [{
					label: '扣分',
					value: 2
				}, {
					label: '加分',
					value: 1
				}],
				recommendS:[{
					label: '系统触发',
					value: '0'
				},{
					label: '后台添加',
					value: '1'
				}],
				recommend:'',
				statusvalue: '',

				realNamePop: false,
				idCard: '',
				idCardUp: '', //上传用的
				idCardBack: '',
				idCardBackUp: '',
				// 实名认证
				rnName: '',
				rnGender: '',
				rnNation: '',
				rnAge: '',
				rnIdnum: "",
				rnNativePlace: '',
				rnHouse: '',
				rnUserId: '',
				rnvalidityStartTime: '',
				rnvalidityEndTime: '',
				clientHeight: 0,
                fromType:'',
                updateType:'',
                userId:'',//用户id
                //新增记录对象
                Add:{
                eventId:'',
                projectName:'',
                reason:'',
                score:'',
                type:''
                },
                ReasonList:[],//新增记录原因数据


			}
		},
		created() {
            this.userId = this.$route.query.id
			this.getList();
			this.getWebHeing();
            // 获取原因信息
            this.getReason()
		},
		methods: {
			/** 计算页面高度 */
			getWebHeing() {
				this.$nextTick(() => {
					this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
						.offsetHeight - document.getElementById('page')
						.offsetHeight - document.getElementById('boxTop')
						.offsetHeight - 180;
				})
				window.addEventListener('resize', () => {
					if (document.getElementById('top') != null) {
						this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
							.offsetHeight - document.getElementById('page')
							.offsetHeight - document.getElementById('boxTop')
							.offsetHeight - 180;
						this.$forceUpdate();
					}

				})
			},
			getList() {
				console.log(this.gradevalue.join(','))
				var params = {
					keyword: this.serach,
					pageNum: this.PageIndex,
					pageSize: this.PageSize,
					updateType: this.updateType,
					fromType:this.fromType,
                    userId:this.userId
				}
				getuserWorkerBehavioralLog(params).then(res => {
					var data = res.data
					// console.log('res', data)
					this.PageCount = data.total
					this.tableData = data.list
				})
			},
			search() {
				this.PageIndex = 1
				console.log('查询')
				this.getList()
			},
			// 重置
			raLoad() {
				this.serach = '';
				this.reamNamevalue = '';
				this.authvalue = '';
				this.gradevalue = [];
				this.loginvalue = '';
				this.statusvalue = '';
				this.PageIndex = 1;
				this.getList()
			},
			// 导出
			exportTable() {
				let url = '/api/user/admin/userWorkerBehavioralLog/v1.1/exportXls';
				let param =
					`?id=${this.serach}&grades=${this.gradevalue}&pageNum=${this.PageIndex}&PageSize=${this.PageSize}&userStatus=${this.statusvalue}`
				window.open(url+param);
			},
			/** 查看工人 */
			handleLook(row) {
				// this.$router.push({ path: '/User/enterprisedetails', query: { id: row.id,joinType:2 }})
				this.$router.push({
					path: '/User/workrtDetail',
					query: {
						id: row.id,
						joinType: 2
					}
				})

			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.PageSize = e
				this.PageIndex = 1
				this.getList()
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.PageIndex = e
				this.getList()
			},
			// 给工人激活冻结
			workerStatusChange(row) {
				if (row.workerStatus) {
					this.changeUserStatus(row.id, 1)
				} else {
					this.changeUserStatus(row.id, 0)
				}
			},
			// 修改用户状态封装
			changeUserStatus(userId, userStatus) {
				var that = this;
				var params = {
					userId: userId,
					userStatus: userStatus
				}
				gongrenupdateUserStatus(params).then(res => {
					console.log(res)
					if (res.code == 200) {
						that.$message({
							type: 'success',
							message: '操作成功!'
						})
						that.getList()
					}
				})
			},

			/** 实名 */
			reanName(row) {
				console.log(row)
				this.rnUserId = row.id
				this.idCard = '',
					this.idCardUp = '',
					this.idCardBack = '',
					this.idCardBackUp = '',
					this.rnName = '',
					this.rnGender = '',
					this.rnNation = '',
					this.rnAge = '',
					this.rnIdnum = "",
					this.rnNativePlace = '',
					this.rnHouse = '',
					this.rnvalidityStartTime = '',
					this.rnvalidityEndTime = '',
					this.realNamePop = true
			},
			beforeUpload(file) {
				console.log(file)
				let data = new FormData()
				data.append('multipartFile', file)
				data.append('side', 'face')
				data.append('watermarkSkip',true)
				uploadIdCardByAli(data).then(res => {
					console.log(res)
					this.rnName = res.data.realName
					this.rnGender = res.data.gender
					this.rnNation = res.data.nation
					this.rnAge = res.data.age
					this.rnIdnum = res.data.idNo
					this.idCardUp = res.data.idCardUri
					this.getIdUrl(1, res.data.idCardUri)
				})
				return false
			},
			// 解析身份证照片
			getIdUrl(type, url) {
				var query = {
					uri: url
				}
				getPreSignFile(query).then(res => {
					console.log(res)
					if (type == 1) {
						this.idCard = res.data
					} else {
						this.idCardBack = res.data
					}
				})
			},
			beforeUpload2(file) {
				console.log(file)
				let data = new FormData()
				data.append('multipartFile', file)
				data.append('side', 'back')
				data.append('watermarkSkip',true)
				uploadIdCardByAli(data).then(res => {
					console.log(res)
					this.rnvalidityStartTime = res.data.startDate
					this.rnvalidityEndTime = res.data.endDate
					this.idCardBackUp = res.data.idCardUri
					this.getIdUrl(2, res.data.idCardUri)
				})
				return false
			},
			upIdCard(res, file) {
				console.log(res)
			},
			upIdCardBack(res, file) {
				console.log(res)
				console.log(file)
			},
            //添加信誉分弹窗
            addfen(){
                this.realNamePop = true
            },
            //时间处理
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
            //新增记录
            postAddWorkerBehavioralLog(){
                    if(!this.Add.eventId){
                        this.$message({
							type: 'error',
							message: '请选择原因!'
						})
                        return
                    }
                      if(!this.Add.projectName){
                        this.$message({
							type: 'error',
							message: '请填写项目名称!'
						})
                        return
                    }
                      if(!this.Add.reason){
                        this.$message({
							type: 'error',
							message: '请填写项目理由!'
						})
                        return
                    }

                postAddWorkerBehavioralLog({
                    eventId:this.Add.eventId ,
                    projectName:this.Add.projectName,
                    reason:this.Add.reason,
                    userId:this.userId,
                }).then(res => {
                    // console.log(res)
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
                    this.Add.eventId =''
                    this.Add.projectName =''
                    this.Add.reason=''
                    this.realNamePop = false
					this.getList()
					
                })
            },
            //获取原因数据
            getReason(){
                let param = {};
					param.pageNum = 1;
					param.pageSize = 999;
					getCreditScore(param).then(res=>{
                        // console.log(res.data.list)
                       this.ReasonList = res.data.list
                    })
            },
            //新增原因选择
            changeReason(e){
                let arrayTitles = this.ReasonList.filter((item) => item.id == e);
                this.Add.type = arrayTitles[0].type
                this.Add.score = arrayTitles[0].score
            }

		}
	}
</script>

<style lang="scss">
	.reanNamePoplist {

		.item {
			font-size: 14px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;

			.tit {
				width: 100px;
				text-align: right;
			}

			.ipt {
				flex: 1;
				height: 35px;
				padding: 0 8px;
				box-sizing: border-box;
			}
            .tra{
                width: 80%;
                padding: 10px;
            }
		}
	}

	.el-upload--picture-card {
		width: 120px;
		height: 120px;
		line-height: 120px;
	}

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
		width: 110px;
		height: 110px;
		line-height: 110px;
		text-align: center;
	}

	.avatar {
		width: 110px;
		height: 110px;
		display: block;
	}

	.reanNamePoplist2 {
		.item {
			.tit {
				width: 120px;
			}
		}

	}

	.numIpt {
		width: 100px;
	}

	.el-rate__icon {
		font-size: 16px;
		margin-right: 4px;
	}
</style>
