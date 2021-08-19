<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面样式设置</h3>
      <div class="drawer-item">
        <span>切换布局</span>
        <el-radio-group
          v-model="siderbarLayout"
          @change="changeLayout"
          size="small"
          class="drawer-switch"
        >
          <el-radio-button label="画廊" name="ture"></el-radio-button>
          <el-radio-button label="常规" name="false"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="drawer-item">
        <span>主题颜色</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>导航栏</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏LOGO</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";

export default {
  components: { ThemePicker },
  data() {
    return {
      siderbarLayout: "画廊",
    };
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fixedHeader",
          value: val,
        });
      },
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val,
        });
      },
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "sidebarLogo",
          value: val,
        });
      },
    },
  },
  methods: {
    changeLayout(e) {
      if (e == "画廊") {
        this.$store.commit("app/SET_SIDEBARCLASS", true);
      } else {
        this.$store.commit("app/SET_SIDEBARCLASS", false);
      }
    },
    themeChange(val) {
      this.$store.dispatch("settings/changeSetting", {
        key: "theme",
        value: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
