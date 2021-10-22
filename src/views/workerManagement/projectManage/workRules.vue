<template>
    <div>
        <div class="topbox">
            <div><span style="margin-right: 50px">考勤组名称：木工考勤组</span><span>生效时间：2021/06/08 12:00:33</span></div>
            <el-button type="primary">保存</el-button>
        </div>
        <div class="contentbox">
            <div class="tit">特殊规则</div>
            <div class="row">
                <div class="inner">
                    <span class="lf">迟到早退<span style="color: #f00">*</span></span>
                    超过 <el-input v-model="time"  style="width: 100px;margin: 0 10px;"/> 分钟 <span style="margin-left: 20px">则算迟到/早退</span>
                </div>
                <div><el-switch v-model="onoff" style="margin-right: 5px" />{{onoff ? '启用': '关闭'}}</div>
            </div>
            <div class="row">
                <div class="inner">
                    <span class="lf">旷工<span style="color: #f00">*</span></span>
                    超过 <el-input v-model="time2"  style="width: 100px;margin: 0 10px;"/> 小时 <span style="margin-left: 20px">则算旷工</span>
                </div>
                <div><el-switch v-model="onoff2" style="margin-right: 5px" />{{onoff2 ? '启用': '关闭'}}</div>
            </div>
            <div class="row">
                <div class="inner">
                    <span class="lf">上班签到后<span style="color: #f00">*</span></span>
                    超过 <el-input v-model="time3"  style="width: 100px;margin: 0 10px;"/> 小时 <span style="margin-left: 20px">才能进行下班签到</span>
                </div>
                <div><el-switch v-model="onoff3" style="margin-right: 5px" />{{onoff3 ? '启用': '关闭'}}</div>
            </div>
             <div class="row">
                <div class="inner">
                    <span class="lf">工作日设置<span style="color: #f00">*</span></span>
                </div>
                <div><el-switch v-model="onoff4" style="margin-right: 5px" />{{onoff4 ? '启用': '关闭'}}</div>
            </div>
            <Table :data="tableData" :columns="columns" @selection-change="handleSelectionChange"></Table>
            <div class="row" style="margin-top: 20px;">
                <div class="inner">
                    <span class="lf">特殊日期<span style="color: #f00">*</span></span>
                    <el-button @click="handleAdd(0)">添加</el-button><span style="color: #999;margin-left: 20px">必须打卡日期<span style="color: #f00">*</span></span>
                </div>
                <div><el-switch v-model="onoff5" style="margin-right: 5px" />{{onoff5 ? '启用': '关闭'}}</div>
            </div>
            <Table :data="tableData2" :columns="columns2">
                <template slot="handle">
                    <el-table-column label="操作" align="center">
                        <template slot-scope="{row}">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
            </Table>
            <div class="row" style="margin-top: 20px;">
                <div class="inner">        
                    <el-button @click="handleAdd(1)">添加</el-button><span style="color: #999;margin-left: 20px">必须休息日期<span style="color: #f00">*</span></span>
                </div>
                <div><el-switch v-model="onoff6" style="margin-right: 5px" />{{onoff6 ? '启用': '关闭'}}</div>
            </div>
            <Table :data="tableData3" :columns="columns3">
                <template slot="handle">
                    <el-table-column label="操作" align="center">
                        <template slot-scope="{row}">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
            </Table>
            <div class="tit">加班规则</div>
             <div class="row">
                <div class="inner">
                    <span class="lf">下班后<span style="color: #f00">*</span></span>
                    超过 <el-input v-model="time4"  style="width: 100px;margin: 0 10px;"/> 分钟 <span style="margin-left: 20px">则计入加班</span>
                </div>
                <div><el-switch v-model="onoff7" style="margin-right: 5px" />{{onoff ? '启用': '关闭'}}</div>
            </div>
        </div>

        <el-dialog :title="isRest? '添加休息日期': '添加特殊日期'" :visible.sync="visible" width="30%">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="date">
                    <el-date-picker v-model="form.date" placeholder="请选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <div style="color: blue">默认考勤时间：9：00~18：30</div>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Table from '@/components/Table'

export default {
    components: {
        Table
    },
    data() {
        return {
            onoff: true,
            onoff2: false,
            onoff3: false,
            onoff4: false,
            onoff5: false,
            onoff6: false,
            onoff7: false,
            time: '30',
            time2: '',
            time3: '',
            time4: '',
            columns: [
                {type: "selection", width: 60, align: 'center'},
                {prop: 'week', label: '工作日', align: 'center'},
                {prop: 'time', label: '班次时间', align: 'center'},
            ],
            tableData:[
                {week: '周一', time: '默认考勤时间：9：00~18：30'},
                {week: '周二', time: '默认考勤时间：9：00~18：30'},
                {week: '周三', time: '默认考勤时间：9：00~18：30'},
                {week: '周四', time: '默认考勤时间：9：00~18：30'},
                {week: '周五', time: '默认考勤时间：9：00~18：30'},
                {week: '周六', time: '休息'},
                {week: '周日', time: '休息'},
            ],
            multipleSelection: [],
            columns2: [
                {prop: 'date', label: '日期', align: 'center'},
                {prop: 'time', label: '考勤时间', align: 'center'},
                {slot: 'handle'}
            ],
            tableData2:[
                {date: '2021/09/09', time: '默认考勤时间：9：00~18：30'},
                {date: '2021/09/09', time: '默认考勤时间：9：00~18：30'}
            ],
            columns3: [
                {prop: 'date', label: '日期', align: 'center'},
                {prop: 'time', label: '考勤时间', align: 'center'},
                {slot: 'handle'}
            ],
            tableData3:[
                {date: '2021/09/09', time: '休息'},
                {date: '2021/09/09', time: '休息'}
            ],
            visible: true,
            isRest: false,
            form: {
                date: ''
            },
            rules: {
                date: [{required: true, message: '请选择日期', trigger: 'blur'}]
            }
        }
    },
    methods: {
        handleSelectionChange(val) {
           this.multipleSelection = val
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    alert('submit')
                }
            })
        },
        handleAdd(n) {
            this.isRest = n === 1 ? true : false;
            this.visible = true
        }
    }
}
</script>

<style lang="scss" scoped>
.topbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #f2f2f2;
    color: #000;
    margin: 15px 0;
}

.contentbox {
    padding: 0 20px 20px;
    background-color: #f2f2f2;

    .tit {
        margin-bottom: 20px;
        padding: 20px 0 15px 0;
        color: #000;
        border-bottom: 1px solid #ccc;
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .inner {
            flex: 1;
            display: flex;
            align-items: center;
        }

        .lf {
            display: block;
            width: 100px;
            margin-right: 100px;
        }
    }
}
</style>