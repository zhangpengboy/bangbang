<template>
  <div class="app-container">
    <div class="header">
      <div>
        <div class="header-title">加载动画</div>
        <div class="header-content">基于 SpinKit</div>
      </div>
      <div>
        <el-button icon="el-icon-link" @click="toWeb">SpinKit 官网</el-button>
      </div>
    </div>
    <div class="main">
      <el-card class="main-card">
        <el-form ref="animateForm" :model="form">
          <el-form-item label="类型">
            <el-select v-model="form.name">
              <el-option v-for="(item,inx) in loadOptions" :key="inx" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="尺寸">
            <el-input-number v-model="form.size" controls-position="right" :min="40" :max="200" :step="10" />
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="form.color" />
          </el-form-item>
          <el-form-item>
            <el-button @click="showLoading">加载Loading（演示控制在2秒关闭）</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <sk-loading v-if="isShow" :name="form.name" :size="form.size" :color="form.color" />
  </div>
</template>

<script>
import SpinkitLoading from '@/components/SpinkitLoading/index'

export default {
  components: {
    skLoading: SpinkitLoading
  },
  data() {
    return {
      form: {
        name: 'plane',
        size: 40,
        color: '#333'
      },
      loadOptions: [
        {
          label: 'Plane',
          value: 'plane'
        },
        {
          label: 'Chase',
          value: 'chase'
        },
        {
          label: 'Wave',
          value: 'wave'
        },
        {
          label: 'Pulse',
          value: 'pulse'
        },
        {
          label: 'Flow',
          value: 'flow'
        },
        {
          label: 'Swing',
          value: 'swing'
        },
        {
          label: 'Circle',
          value: 'circle'
        },
        {
          label: 'Circle Fade',
          value: 'circle-fade'
        },
        {
          label: 'Grid',
          value: 'grid'
        },
        {
          label: 'Fold',
          value: 'fold'
        },
        {
          label: 'Wander',
          value: 'wander'
        }
      ],
      isShow: false
    }
  },
  methods: {
    showLoading() {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    },
    toWeb() {
      window.open('https://tobiasahlin.com/spinkit', '_blank')
    },
    colorChange(val) {
      this.form.color = val
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    .header-title{
        font-size: 22px;
    }
    .header-content{
        color: #909399;
        font-size: 14px;
        margin-top: 10px;
    }
}
.main{
  margin-top: 20px;
    .main-card{
        width: 600px;
        background-color: #fff;
    }
}
.box{
    width: 100px;
    height: 100px;
    background-color: #00bfff;
}

.mobile .main .main-card{
  width: 100%;
}
</style>
