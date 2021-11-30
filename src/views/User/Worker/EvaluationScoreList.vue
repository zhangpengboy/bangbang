<template>
	<div class="main">

		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input v-model="serach" class="top-content-item-input" placeholder="项目名称/评价人" clearable />
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>选择时间：</span>
						  <el-date-picker
                            v-model="time"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            value-format="timestamp"
                            >
                          </el-date-picker>
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

			<el-button @click="exportTable">导出</el-button>

				</div>
				
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column type='index' label="序号" width="60" />
				<el-table-column prop="title" label="项目名称" width="150" />
				<el-table-column prop="teamTypeName" label="所属工种" width="120" />
				<el-table-column label="评分">
					<template slot-scope="scope">
						<el-rate v-model="scope.row.score" class="mt10" disabled show-score text-color="#ff9900" core-template="{value}" />
					</template>
				</el-table-column>
				<el-table-column prop="content " label="评价内容"></el-table-column>
				<el-table-column prop="images" label="评价图片" :formatter="gradeFormat" >
                    <template slot-scope="scope">
                        <div class="imgList" >
                    <el-image class="imgList-img"  v-for="(item,i) in scope.row.images" :key="i"
                        style="width: 100px; height: 100px"
                        :src="item" 
                        :preview-src-list="scope.row.images">
                    </el-image>
                        </div>
						
					</template>
                	</el-table-column>
				<el-table-column prop="createName" label="评价人"/>
				<el-table-column prop="updateTime" label="操作时间" >
                    <template slot-scope="scope">
						{{formatDate(scope.row.updateTime)}}
					</template>
                </el-table-column>
				<!-- <el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleLook(scope.row)">查看</el-button>
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


		</div>
	</div>
</template>

<script>
import config from '@/store/modules/config.js';
	import {
		getUserProjectCommentList,
		gongRenRealNameAuth,
		uploadIdCard,
		gongrenupdateUserStatus,
		exportCsvGongren,
		uploadIdCardByAli,
		getPreSignFile,
		uploadpublic
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
				clientHeight: 0,
                userId:'',
                  pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: '',//筛选时间

			}
		},
		created() {
             this.userId = this.$route.query.id
			this.getList();
			this.getWebHeing();
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
			gradeFormat(row) {
				if (row.workerGrade == 0) {
					return "普通工人";
				} else if (row.workerGrade == 1) {
					return "铜牌工人";
				} else if (row.workerGrade == 2) {
					return "银牌工人";
				} else if (row.workerGrade == 3) {
					return "金牌工人";
				}
			},
			getList() {
                console.log(this.time)
				var params = {
					keyword: this.serach,
					pageIndex: this.PageIndex,
                    pageSize: this.PageSize,
                    startTime:this.time[0],
                    endTime:this.time[1],
                    userId:this.userId
				}
				getUserProjectCommentList(params).then(res => {
					var data = res.data
					console.log('res', data)
					this.PageCount = data.total
					this.tableData = data.records
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
                this.time = ''
				this.PageIndex = 1;
				this.getList()
			},
			// 导出
			exportTable() {
				let url = '/api/bill/admin/brief/comment/1.1.0/projectComment/export';
				let param =`?keyword=${this.serach}&startTime=${this.time[0]}&PageIndex=${this.PageIndex}&PageSize=${this.PageSize}&endTime=${this.time[1]}&userId=${this.userId}`
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
		
			upIdCard(res, file) {
				console.log(res)
			},
			upIdCardBack(res, file) {
				console.log(res)
				console.log(file)
			},
            //时间处理
			formatDate(value) {
				return moment(value).format('YYYY-MM-DD')
			},

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
     .imgList{
        display: flex;
        justify-content: start;
        .imgList-img{
            margin: 0 10px;
        }
    }
</style>
