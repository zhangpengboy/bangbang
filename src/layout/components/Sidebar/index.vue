<template>
  <div>
    <div class="main-sidebar-container" v-if="sidebarClass.siderbarHl">
      <div class="sidebar-logo">
        <!-- <logo v-if="showLogo" :collapse="!isCollapse" /> -->
      </div>
      <ul class="s-navs">
        <li
          v-for="(item, index) in asyncRoutes"
          :key="index"
          class="s-navs-item"
          :class="{ active: isActive == index }"
          @click="targetMenu(index)"
        >
          <!-- <svg-icon
            class="icon"
            :icon-class="item.meta ? item.meta.icon : 'bug'"
          /> -->
          <h2>{{ item.meta ? item.meta.title : "" }}</h2>
        </li>
      </ul>
    </div>

    <el-scrollbar class="sub-sidebar-container" wrap-class="scrollbar-wrapper">
      <!-- <logo v-if="showLogo&&!sidebarClass.siderbarHl" :collapse="!isCollapse" /> -->
      <!-- <h1 class="title" v-if="sidebarClass.siderbarHl&&!isCollapse">vue-element-admin</h1> -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <transition-group name="sidebar" v-if="sidebarClass.siderbarHl">
          <sidebar-item
            v-for="route in hl_router"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </transition-group>

        <sidebar-item
          v-else
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { asyncRoutes } from "@/router";
import router from "@/router";
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { getStore, setStore } from "@/utils/auth";
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      isActive: 0,
      asyncRoutes: [],
      hl_router: [],
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    ...mapState({
      rootPath: (state) => state.app.rootPath,
      sidebarClass: (state) => state.app.sidebarClass,
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
		console.log('this.sidebar.opened',this.sidebar.opened)
      return !this.sidebar.opened;
    },
  },
  mounted() {
    if (this.sidebarClass.siderbarHl) {
      this.asyncRoutes = asyncRoutes;
      this.isActive = getStore("isActive") || 0;
      this.hl_router =
        JSON.parse(getStore("hl_router")) || asyncRoutes[0].children;
      this.$store.commit(
        "app/SET_ROOTPATH",
        getStore("rootPath") || asyncRoutes[0].path
      );
    }
  },
  methods: {
    async targetMenu(index) {
      this.isActive = index;
      this.hl_router = asyncRoutes[index].children;
      this.$store.commit("app/SET_ROOTPATH", asyncRoutes[index].path);
      setStore("isActive", index);
      setStore("rootPath", asyncRoutes[index].path);
      setStore("hl_router", JSON.stringify(asyncRoutes[index].children));
    },
  },
};
</script>
<style lang="scss" scoped>
// 侧边栏动画
.sidebar-enter-active {
  transition: all 0.3s;
}

.main-enter {
  opacity: 0;
  margin-left: -20px;
}
.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
.sidebar-enter,
.sidebar-leave-active {
  opacity: 0;
  transform: translateY(20px);
}
.sidebar-leave-active {
  position: absolute;
}
.s-navs {
  width: 100%;
  padding: 0;
  .s-navs-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: #334067;
    }
    &:hover {
      color: #fff;
      background-color: #334067;
      transition: 0.3s;
    }
    &:not(:hover) {
      transition: 0.3s;
    }
    .icon {
      width: 20px;
      height: 20px;
      margin: 0 !important;
    }
    h2 {
      font-size: 14px;
      margin: 0;
      margin-top: 4px;
      font-weight: 400;
    }
  }
}
</style>
