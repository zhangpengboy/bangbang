<template>
  <div class="sk-background">
    <div :class="obj[name].name" :style="{'--sk-size': size+'px' ,'--sk-color': color}">
      <div v-for="(item,inx) in arr" :key="inx" :class="obj[name].child.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 类型
    name: {
      type: String,
      default: 'plane'
    },
    // 大小
    size: {
      type: Number,
      default: 40
    },
    // 颜色
    color: {
      type: String,
      default: '#333'
    }
  },
  data() {
    return {
      obj: {
        plane: {
          name: 'sk-plane',
          child: {
            name: null,
            len: 0
          }
        },
        chase: {
          name: 'sk-plane',
          child: {
            name: 'sk-chase-dot',
            len: 6
          }
        },
        bounce: {
          name: 'sk-bounce',
          child: {
            name: 'sk-bounce-dot',
            len: 2
          }
        },
        wave: {
          name: 'sk-wave',
          child: {
            name: 'sk-wave-rect',
            len: 5
          }
        },
        pulse: {
          name: 'sk-pulse',
          child: {
            name: null,
            len: 0
          }
        },
        flow: {
          name: 'sk-flow',
          child: {
            name: 'sk-flow-dot',
            len: 3
          }
        },
        swing: {
          name: 'sk-swing',
          child: {
            name: 'sk-swing-dot',
            len: 2
          }
        },
        circle: {
          name: 'sk-circle',
          child: {
            name: 'sk-circle-dot',
            len: 12
          }
        },
        'circle-fade': {
          name: 'sk-circle-fade',
          child: {
            name: 'sk-circle-fade-dot',
            len: 12
          }
        },
        grid: {
          name: 'sk-circle',
          child: {
            name: 'sk-grid-cube',
            len: 9
          }
        },
        fold: {
          name: 'sk-fold',
          child: {
            name: 'sk-fold-cube',
            len: 4
          }
        },
        wander: {
          name: 'sk-wander',
          child: {
            name: 'sk-wander-cube',
            len: 3
          }
        }
      }

    }
  },
  computed: {
    //   根据obj里面child对应的len，生成数组对象来让v-for循环生成对应数量的div
    arr() {
      const res = []
      const num = this.obj[this.name].child.len
      for (let i = 0; i < num; i++) { res.push({}) }
      return res
    }
  },
  methods: {
    open() {},
    close() {}
  }
}
</script>

<style scoped>
@import './spinkit.css';
.sk-background{
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6666;
}
</style>
