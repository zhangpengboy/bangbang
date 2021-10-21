<template>
     <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status" v-for="item in data" :key="item.prop">
            <span>{{item.title}}：</span>
            <el-input v-model="form[item.prop]" clearable class="top-content-item-input" :placeholder="item.placeholder" v-if="item.type === 'input'" />
            <el-select v-model="form[item.prop]" clearable :placeholder="item.placeholder" v-if="item.type === 'select'">
              <el-option
                v-for="inner in item.options"
                :key="inner.value"
                :label="inner.label"
                :value="inner.value"
              />
            </el-select>
            <el-date-picker v-if="item.type === 'date'"
              v-model="form[item.prop]"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span v-if="item.type === 'daterange'">
              <el-date-picker
                v-model="form[item.prop]"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <span>~</span>
              <el-date-picker
                v-model="form[item.prop2]"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </span>
          </div>
        </div>
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='reset'>重置</el-button>
        </div>
      </div>
</template>

<script>
export default {
    name: 'Filters',
    props: {
        data: {
            type: Array,
            default: ()=>[]
        }
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        search() {
            this.$emit('search', this.form)
        },
        reset() {
          for (let key in this.form) {
            this.form[key] = undefined
          }
          this.$emit('search', this.form)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>