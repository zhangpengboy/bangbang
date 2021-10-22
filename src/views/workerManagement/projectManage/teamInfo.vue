<template>
    <div class="container">
        <div class="topbox">
            <div class="inner">
                <div class="tit">班组名称</div>
                <div class="cont" style="width: 300px">木工班组</div>
                <div class="tit">班组长</div>
                <div class="cont">老铁：13798393939</div>
                <div class="cont">老王：13798393939</div>
            </div>
            <el-button type="primary" @click="showForm(0)">新增考勤组</el-button>
        </div>
        <div class="midbox">
            <div class="head">
                <div>
                    <span style="font-weight: bold">考情一组（23人）</span>
                    <span>上班时间 9：00 下班时间12：00</span>
                    <span style="margin-right: 10px;">广州市黄浦区云升科学园B1栋802</span>
                    <i class="el-icon-location"></i>
                </div>
                <div>
                    <el-button type="primary" @click="showForm(1)">编辑</el-button>
                    <el-button type="danger" @click="handleDel">删除</el-button>
                    <i class="el-icon-s-tools" style="font-size: 20px;vertical-align: middle;margin-left: 10px;cursor: pointer;" @click="seeRules()"></i>
                </div>
            </div>
            <ul class="list">
                <li class="itm" v-for="i in 10" :key="i">
                <div class="type">班组长</div>
                <div class="img">
                    <el-image style="width: 100px; height: 100px"></el-image>
                </div>
                <div class="name">张三</div>
                </li>
            </ul>
        </div>
        <div class="botbox">
            <el-button type="primary" @click="moveVisible = true">转移</el-button>
        </div>

         <el-dialog :title="isEdit ? '编辑考勤组' : ' 新增考勤组'" :visible.sync="visible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
                <el-form-item label="考勤组名称" prop="name" :rules="rules.name">
                    <el-input v-model="form.name" placeholder="输入考勤组名称" style="width: 87%" />
                </el-form-item>
                <el-form-item label="考勤时间" required >
                    <div class="flex">
                        <el-form-item prop="jobStartTime" :rules="rules.jobStartTime">
                            <el-time-select
                                v-model="form.jobStartTime"
                                :picker-options="{
                                    step: '00:15'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                        ~
                        <el-form-item prop="jobEndTime" :rules="rules.jobEndTime">
                            <el-time-select
                                v-model="form.jobEndTime"
                                :picker-options="{
                                    start: form.jobStartTime,
                                    step: '00:15'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="午休时间" required >
                    <div class="flex">
                        <el-form-item prop="restStartTime" :rules="rules.restStartTime">
                            <el-time-select
                                v-model="form.restStartTime"
                                :picker-options="{
                                    step: '00:15'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                        ~
                        <el-form-item prop="restEndTime" :rules="rules.restEndTime">
                            <el-time-select
                                v-model="form.restEndTime"
                                :picker-options="{
                                    start: form.restStartTime,
                                    step: '00:15'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="考勤地点" prop="address">
                    <el-input v-model="form.address"  placeholder="请输入考勤地点" />
                </el-form-item>
                <el-form-item label="考勤范围" prop="range">
                    <el-input v-model="form.range"  placeholder="请输入考勤范围" />
                </el-form-item>
                <template v-if="!isEdit">
                    <div>选择已关联考勤组成员</div>
                    <div>
                        <el-input
                            placeholder="搜索手机号/姓名"
                            v-model="filterText">
                        </el-input>
                    </div>
                    <div>
                        <el-tree
                            ref="tree"
                            :data="treeData"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :filter-node-method="filterNode"
                            :props="defaultProps">
                        </el-tree>
                    </div>
                </template>
            </el-form>
            <span slot="footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="转移班组成员" :visible.sync="moveVisible" width="30%">
            <el-form ref="moveForm" :model="moveForm" :rules="moveRules" label-width="120px" label-position="left">
                <el-form-item label="转移至" prop="target">
                    <el-select v-model="moveForm.target">
                        <el-option v-for="i in 3" :value="i" :label="i+1" :key="i"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="选择考勤组" prop="form">
                    <el-select v-model="moveForm.form">
                        <el-option v-for="i in 3" :value="i" :label="i+1" :key="i"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="moveVisible = false">取消</el-button>
                <el-button type="primary" @click="submitMove">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            isEdit: false,
            form: {
                name: '',
                address: '',
                range: '',
                jobStartTime: '', 
                jobEndTime: '', 
                restStartTime: '', 
                restEndTime: ''
            },
            rules: {
                name: [{required: true, message: '输入考勤组名称', trigger: 'blur'}],
                address: [{required: true, message: '请输入考勤地点', trigger: 'blur'}],
                range: [{required: true, message: '请输入考勤范围', trigger: 'blur'}],
                jobStartTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
                jobEndTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
                jobEndTime: [{required: true, message: '请选择考勤时间', trigger: 'blur'}],
                restStartTime: [{required: true, message: '请选择午休时间', trigger: 'blur'}],
                restEndTime: [{required: true, message: '请选择午休时间', trigger: 'blur'}],
            },
            moveVisible: false,
            moveForm: {
                target: '',
                form: ''
            },
            moveRules: {
                target: [{required: true, message: '请选择班组', trigger: 'blur'}],
                form: [{required: true, message: '请选择考勤组', trigger: 'blur'}],
            },
            treeData: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
                }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            filterText: ''
        }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
        seeRules(id) {
            this.$router.push({path: '/workerManagement/workRules', query: { id }})
        },
        handleDel(id) {
            this.$confirm('请将考勤组成员转移后才可删除','确认提示',{
                confirmButtonText: '知道了',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                console.log(11)
            })
        },
        submit() {
            // console.log(this.$refs.tree.getCheckedKeys(true));
            this.$refs.form.validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                }
            })
        },
        submitMove() {
            this.$refs.moveForm.validate(valid =>{
                if (valid) {
                    alert('moveForm submit!')
                }
            })
        },
        showForm(n, id) {
            this.isEdit = n === 1 ? true : false;
            this.visible = true
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 15px;
    padding: 15px 20px;
    border: 1px solid #ccc;

    ::v-deep .el-dialog__body {
        height: 400px;
        overflow-y: auto;
    }
}

.topbox {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .inner {
        display: flex;
        align-items: center;
    }

    .tit {
        margin-right: 20px;
    }

    .cont {
        margin-right: 20px;
        min-width: 100px;
        padding: 8px 10px;
        border: 1px solid #ccc;
    }
}

.midbox {
    height: 500px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    overflow-y: auto;

    .head {
        padding: 8px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ccc;

        span {
            margin-right: 50px;
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .itm {
            width: calc(20% - 20px);
            list-style: none;
            padding: 5px 20px;
            border: 1px solid #ccc;
            margin: 0 15px 15px 0;
            color: #333;
            box-sizing: border-box;

            &:nth-child(5n) {
                margin-right: 0;
            }
        }

        .type {
            text-align: right;
        }

        .img {
            margin: 0 auto;
            text-align: center;
        }
    }
}

.botbox {
    text-align: right;
}
</style>