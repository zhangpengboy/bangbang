<template>
  <div class="app-container">
    <div class="header">
      <div>
        <div class="header-title"> 过渡动画</div>
        <div class="header-content">基于 Animate.css 并结合 &lt;transition&gt; 组件使用</div>
      </div>
      <div>
        <el-button icon="el-icon-link" @click="toWeb">Animate.css 官网</el-button>
      </div>
    </div>
    <div class="main">
      <el-card class="main-card">
        <el-form ref="animateForm" :model="form">
          <el-form-item label="进入动画（显示）">
            <el-select v-model="form.show">
              <el-option-group v-for="showGroup in showOptions" :key="showGroup.label" :label="showGroup.label">
                <el-option v-for="(showItem,showInx) in showGroup.options" :key="showInx" :label="showItem.label" :value="showItem.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="离开动画（隐藏）">
            <el-select v-model="form.hide">
              <el-option-group v-for="fadeGroup in hideOptions" :key="fadeGroup.label" :label="fadeGroup.label">
                <el-option v-for="(fadeItem,fadeInx) in fadeGroup.options" :key="fadeInx" :label="fadeItem.label" :value="fadeItem.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeAnimate('show')">显示</el-button>
            <el-button @click="changeAnimate('hide')">隐藏</el-button>
          </el-form-item>
        </el-form>
        <div :class="['animate__animated',animate]" :style="{ 'width': '100px','height': '100px','background-color':theme }" />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        show: 'animate__bounce',
        hide: 'animate__flash'
      },
      animate: '',
      //   显示的选择
      showOptions: [
        {
          label: 'Attention seekers',
          options: [
            {
              value: 'animate__bounce',
              label: 'bounce'
            },
            {
              value: 'animate__flash',
              label: 'flash'
            },
            {
              value: 'animate__pulse',
              label: 'pulse'
            },
            {
              value: 'animate__rubberBand',
              label: 'rubberBand'
            },
            {
              value: 'animate__shakeX',
              label: 'shakeX'
            },
            {
              value: 'animate__shakeY',
              label: 'shakeY'
            },
            {
              value: 'animate__headShake',
              label: 'headShake'
            },
            {
              value: 'animate__swing',
              label: 'swing'
            },
            {
              value: 'animate__tada',
              label: 'tada'
            },
            {
              value: 'animate__wobble',
              label: 'wobble'
            },
            {
              value: 'animate__jello',
              label: 'jello'
            },
            {
              value: 'animate__heartBeat',
              label: 'heartBeat'
            }
          ]
        },
        {
          label: 'Back entrances',
          options: [
            {
              value: 'animate__backInDown',
              label: 'backInDown'
            },
            {
              value: 'animate__backInLeft',
              label: 'backInLeft'
            },
            {
              value: 'animate__backInRight',
              label: 'backInRight'
            },
            {
              value: 'animate__backInUp',
              label: 'backInUp'
            }
          ]
        },
        {
          label: 'Bouncing entrances',
          options: [
            {
              value: 'animate__bounceIn',
              label: 'bounceIn'
            },
            {
              value: 'animate__bounceInDown',
              label: 'bounceInDown'
            },
            {
              value: 'animate__bounceInLeft',
              label: 'bounceInLeft'
            },
            {
              value: 'animate__bounceInRight',
              label: 'bounceInRight'
            },
            {
              value: 'animate__bounceInUp',
              label: 'bounceInUp'
            }
          ]
        },
        {
          label: 'Fading entrances',
          options: [
            {
              value: 'animate__fadeIn',
              label: 'fadeIn'
            },
            {
              value: 'animate__fadeInDown',
              label: 'fadeInDown'
            },
            {
              value: 'animate__fadeInDownBig',
              label: 'fadeInDownBig'
            },
            {
              value: 'animate__fadeInDown',
              label: 'fadeInDown'
            },
            {
              value: 'animate__fadeInDownBig',
              label: 'fadeInDownBig'
            },
            {
              value: 'animate__fadeInLeft',
              label: 'fadeInLeft'
            },
            {
              value: 'animate__fadeInLeftBig',
              label: 'fadeInLeftBig'
            },
            {
              value: 'animate__fadeInRight',
              label: 'fadeInRight'
            },
            {
              value: 'animate__fadeInRightBig',
              label: 'fadeInRightBig'
            },
            {
              value: 'animate__fadeInUp',
              label: 'fadeInUp'
            },
            {
              value: 'animate__fadeInUpBig',
              label: 'fadeInUpBig'
            },
            {
              value: 'animate__fadeInTopLeft',
              label: 'fadeInTopLeft'
            },
            {
              value: 'animate__fadeInTopRight',
              label: 'fadeInTopRight'
            },
            {
              value: 'animate__fadeInBottomLeft',
              label: 'fadeInBottomLeft'
            },
            {
              value: 'animate__fadeInBottomRight',
              label: 'fadeInBottomRight'
            }
          ]
        },
        {
          label: 'Flippers',
          options: [
            {
              value: 'animate__flip',
              label: 'flip'
            },
            {
              value: 'animate__flipInX',
              label: 'flipInX'
            },
            {
              value: 'animate__flipInY',
              label: 'flipInY'
            }
          ]
        },
        {
          label: 'Lightspeed',
          options: [
            {
              value: 'animate__lightSpeedInLeft',
              label: 'lightSpeedInLeft'
            },
            {
              value: 'animate__lightSpeedInRight',
              label: 'lightSpeedInRight'
            }
          ]
        },
        {
          label: 'Rotating entrances',
          options: [
            {
              value: 'animate__rotateIn',
              label: 'rotateIn'
            },
            {
              value: 'animate__rotateInDownLeft',
              label: 'rotateInDownLeft'
            },
            {
              value: 'animate__rotateInDownRight',
              label: 'rotateInDownRight'
            },
            {
              value: 'animate__rotateInUpLeft',
              label: 'rotateInUpLeft'
            },
            {
              value: 'animate__rotateInUpRight',
              label: 'rotateInUpRight'
            }
          ]
        },
        {
          label: 'Specials',
          options: [
            {
              value: 'animate__jackInTheBox',
              label: 'jackInTheBox'
            },
            {
              value: 'animate__rollIn',
              label: 'rollIn'
            }
          ]
        },
        {
          label: 'Zooming entrances',
          options: [
            {
              value: 'animate__zoomIn',
              label: 'zoomIn'
            },
            {
              value: 'animate__zoomInDown',
              label: 'zoomInDown'
            },
            {
              value: 'animate__zoomInLeft',
              label: 'zoomInLeft'
            },
            {
              value: 'animate__zoomInRight',
              label: 'zoomInRight'
            },
            {
              value: 'animate__zoomInUp',
              label: 'zoomInUp'
            }
          ]
        },
        {
          label: 'Sliding entrances',
          options: [
            {
              value: 'animate__slideInDown',
              label: 'slideInDown'
            },
            {
              value: 'animate__slideInLeft',
              label: 'slideInLeft'
            },
            {
              value: 'animate__slideInRight',
              label: 'slideInRight'
            },
            {
              value: 'animate__slideInUp',
              label: 'slideInUp'
            }
          ]
        }
      ],
      //   隐藏的选择
      hideOptions: [
        {
          label: 'Attention seekers',
          options: [
            {
              value: 'animate__bounce',
              label: 'bounce'
            },
            {
              value: 'animate__flash',
              label: 'flash'
            },
            {
              value: 'animate__pulse',
              label: 'pulse'
            },
            {
              value: 'animate__rubberBand',
              label: 'rubberBand'
            },
            {
              value: 'animate__shakeX',
              label: 'shakeX'
            },
            {
              value: 'animate__shakeY',
              label: 'shakeY'
            },
            {
              value: 'animate__headShake',
              label: 'headShake'
            },
            {
              value: 'animate__swing',
              label: 'swing'
            },
            {
              value: 'animate__tada',
              label: 'tada'
            },
            {
              value: 'animate__wobble',
              label: 'wobble'
            },
            {
              value: 'animate__jello',
              label: 'jello'
            },
            {
              value: 'animate__heartBeat',
              label: 'heartBeat'
            }
          ]
        },
        {
          label: 'Back exits',
          options: [
            {
              value: 'animate__backOutDown',
              label: 'backOutDown'
            },
            {
              value: 'animate__backOutLeft',
              label: 'backOutLeft'
            },
            {
              value: 'animate__backOutRight',
              label: 'backOutRight'
            },
            {
              value: 'animate__backOutUp',
              label: 'backOutUp'
            }
          ]
        },
        {
          label: 'Bouncing exits',
          options: [
            {
              value: 'animate__bounceOut',
              label: 'bounceOut'
            },
            {
              value: 'animate__bounceOutDown',
              label: 'bounceOutDown'
            },
            {
              value: 'animate__bounceOutLeft',
              label: 'bounceOutLeft'
            },
            {
              value: 'animate__bounceOutRight',
              label: 'bounceOutRight'
            },
            {
              value: 'animate__bounceOutUp',
              label: 'bounceOutUp'
            }
          ]
        },
        {
          label: 'Fading exits',
          options: [
            {
              value: 'animate__fadeOut',
              label: 'fadeOut'
            },
            {
              value: 'animate__fadeOutDown',
              label: 'fadeOutDown'
            },
            {
              value: 'animate__fadeOutDownBig',
              label: 'fadeOutDownBig'
            },
            {
              value: 'animate__fadeOutDown',
              label: 'fadeOutDown'
            },
            {
              value: 'animate__fadeOutDownBig',
              label: 'fadeOutDownBig'
            },
            {
              value: 'animate__fadeOutLeft',
              label: 'fadeOutLeft'
            },
            {
              value: 'animate__fadeOutLeftBig',
              label: 'fadeOutLeftBig'
            },
            {
              value: 'animate__fadeOutRight',
              label: 'fadeOutRight'
            },
            {
              value: 'animate__fadeOutRightBig',
              label: 'fadeOutRightBig'
            },
            {
              value: 'animate__fadeOutUp',
              label: 'fadeOutUp'
            },
            {
              value: 'animate__fadeOutUpBig',
              label: 'fadeOutUpBig'
            },
            {
              value: 'animate__fadeOutTopLeft',
              label: 'fadeOutTopLeft'
            },
            {
              value: 'animate__fadeOutTopRight',
              label: 'fadeOutTopRight'
            },
            {
              value: 'animate__fadeOutBottomLeft',
              label: 'fadeOutBottomLeft'
            },
            {
              value: 'animate__fadeOutBottomRight',
              label: 'fadeOutBottomRight'
            }
          ]
        },
        {
          label: 'Flippers',
          options: [
            {
              value: 'animate__flip',
              label: 'flip'
            },
            {
              value: 'animate__flipOutX',
              label: 'flipOutX'
            },
            {
              value: 'animate__flipOutY',
              label: 'flipOutY'
            }
          ]
        },
        {
          label: 'Lightspeed',
          options: [
            {
              value: 'animate__lightSpeedOutLeft',
              label: 'lightSpeedOutLeft'
            },
            {
              value: 'animate__lightSpeedOutRight',
              label: 'lightSpeedOutRight'
            }
          ]
        },
        {
          label: 'Rotating exits',
          options: [
            {
              value: 'animate__rotateOut',
              label: 'rotateOut'
            },
            {
              value: 'animate__rotateOutDownLeft',
              label: 'rotateOutDownLeft'
            },
            {
              value: 'animate__rotateOutDownRight',
              label: 'rotateOutDownRight'
            },
            {
              value: 'animate__rotateOutUpLeft',
              label: 'rotateOutUpLeft'
            },
            {
              value: 'animate__rotateOutUpRight',
              label: 'rotateOutUpRight'
            }
          ]
        },
        {
          label: 'Specials',
          options: [
            {
              value: 'animate__hinge',
              label: 'hinge'
            },
            {
              value: 'animate__rollOut',
              label: 'rollOut'
            }
          ]
        },
        {
          label: 'Zooming exits',
          options: [
            {
              value: 'animate__zoomOut',
              label: 'zoomOut'
            },
            {
              value: 'animate__zoomOutDown',
              label: 'zoomOutDown'
            },
            {
              value: 'animate__zoomOutLeft',
              label: 'zoomOutLeft'
            },
            {
              value: 'animate__zoomOutRight',
              label: 'zoomOutRight'
            },
            {
              value: 'animate__zoomOutUp',
              label: 'zoomOutUp'
            }
          ]
        },
        {
          label: 'Sliding exits',
          options: [
            {
              value: 'animate__slideOutDown',
              label: 'slideOutDown'
            },
            {
              value: 'animate__slideOutLeft',
              label: 'slideOutLeft'
            },
            {
              value: 'animate__slideOutRight',
              label: 'slideOutRight'
            },
            {
              value: 'slideOutUp',
              label: 'slideOutUp'
            }
          ]
        }
      ]
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    changeAnimate(key) {
      this.animate = this.form[key]
    },
    toWeb() {
      window.open('https://animate.style', '_blank')
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

.fade-enter,.fade-leave{
    opacity:  0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
}
</style>
