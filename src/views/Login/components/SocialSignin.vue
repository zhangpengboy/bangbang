<template>
  <div class="social-signup-container">
     <h3>
      最新版源码地址：<a style="color:#409EFF;" target="_blank" href="https://gitee.com/yeyoudubai/vue-admin">码云项目仓库地址</a>
      <br/><br/>
      1.VUE技术交流组，所有项目全部免费;
      <br/><br/>
      2.让我们一起成长吧！;
      <br/><br/>
      3.我们不生成代码，我们只是代码的搬运工！
      <br/><br/>
      4.感谢花裤衩的开源项目：vue-element-admin！
    </h3>
    <div class="sign-btn" @click="tencentHandleClick('https://jq.qq.com/?_wv=1027&k=MfdeOae1')">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon" /></span>
      加入QQ群
    </div>
  </div>
</template>

<script>
// import openWindow from '@/utils/open-window'

export default {
  name: "SocialSignin",
  methods: {
    tencentHandleClick(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .wx-svg-container {
    background-color: #24da70;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
  }
}
</style>
