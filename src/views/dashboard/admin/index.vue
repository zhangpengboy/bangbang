<template>
  <div class="body">
    <el-row class="ehart-head" :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <h3>访问量</h3>
          <PieChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <h3>销售情况</h3>
          <BarChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <h3>数据</h3>
          <raddar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row class="ehart-head" :gutter="20">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <div class="grid-content bg-purple">
          <h3>人口增长情况</h3>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <h3>擅长技能</h3>
          <ul class="get-list">
            <li>
              <h4>Javascript</h4>
              <h4>熟练程度：20%</h4>
            </li>
            <li>
              <h4>ES6</h4>
              <h4>熟练程度：10%</h4>
            </li>
            <li>
              <h4>VUE</h4>
              <h4>熟练程度：20%</h4>
            </li>
            <li>
              <h4>ES6</h4>
              <h4>熟练程度：10%</h4>
            </li>
            <li>
              <h4>ElementUI</h4>
              <h4>熟练程度：5%</h4>
            </li>
          </ul>
          <div class="btns">
            <el-button
              @click="go('https://jq.qq.com/?_wv=1027&k=MfdeOae1')"
              type="danger"
              >加入VUE交流组</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
    <el-alert
      style="margin: 20px 0"
      type="info"
      :closable="false"
      description="欢迎加入VUE技术交流组:1143964758"
    >
    </el-alert>
    <el-row class="menu-list" :gutter="20">
      <el-col
        :xs="6"
        :sm="4"
        :md="4"
        :lg="3"
        :xl="3"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <div class="menu-item">
          <i
            :class="item.icon"
            :style="{ color: item.color, fontSize: '50px' }"
          ></i>
          <p>{{ item.name }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="ehart-head">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div style="margin-top: 0" class="grid-content bg-purple">
          <h3>更新日志</h3>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div style="margin-top: 0" class="grid-content bg-purple">
          <h3>其他内容</h3>
          <div class="block">
            <el-alert
              title="我们不生产代码,我们只是代码的搬运--VUE技术交流组"
              type="success"
              :closable="false"
              description="欢迎刚接触VUE，或经验丰富的大佬，加入我们。"
            >
            </el-alert>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      activities: [
        {
          content:
            "新增v-dialog指令，使对话框能够拖拽",
          timestamp: "2020-10-17",
          size: "large",
          type: "primary",
        },
        {
          content:
            "全局按钮级权限指令v-permission",
          timestamp: "2020-07-17",
          size: "large",
        },
        {
          content: "增加tagView左右滑动，快捷关闭操作",
          timestamp: "2020-06-14",
          size: "large",
        },
        {
          content:
            '将前端权限管理，通过官方默认的方式进行权限验证，修改mock用户信息返回参数,路由文件中在路由元meta中通过roles:["admin","editor"]进行权限控制',
          timestamp: "2020-06-10",
          size: "large",
        },
        {
          content:
            "更新配置@/settings.js文件中的routesRole来切换前端或者后端控制路由    （已改为默认前端控制）",
          timestamp: "2020-06-08",
          size: "large",
        },
        {
          content: "更新控制面板布局内容",
          timestamp: "2020-06-06",
          size: "large",
        },
      ],
      menuList: [
        {
          icon: "el-icon-video-camera-solid",
          name: "视频",
          color: "rgb(255, 192, 105)",
        },
        {
          icon: "el-icon-s-order",
          name: "工作日程",
          color: "rgb(92, 219, 211)",
        },
        {
          icon: "el-icon-s-marketing",
          name: "数据报表",
          color: "rgb(179, 127, 235)",
        },
        {
          icon: "el-icon-view",
          name: "异常监控",
          color: "rgb(105, 192, 255)",
        },
        {
          icon: "el-icon-present",
          name: "最好的礼物",
          color: "rgb(255, 133, 192)",
        },
        {
          icon: "el-icon-location",
          name: "定位系统",
          color: "rgb(255, 214, 102)",
        },
        {
          icon: "el-icon-basketball",
          name: "轻松时刻",
          color: "rgb(255, 156, 110)",
        },
        {
          icon: "el-icon-moon-night",
          name: "锁屏处理",
          color: "rgb(149, 222, 100)",
        },
      ],
    };
  },
  mounted() {},
  components: {
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  methods: {
    go(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-timeline-item__content {
  line-height: 26px;
}
.grid-content:hover,
.menu-list .menu-item:hover {
  box-shadow: 1px 1px 10px 1px #eee;
  transition: 0.5s;
  cursor: pointer;
}
.grid-content:not(:hover),
.menu-list .menu-item:not(:hover) {
  transition: 0.5s;
}
.body {
  background: #fff;
  padding: 20px;
  .ehart-head {
    margin-bottom: 20px;
    .grid-content {
      border: 1px solid #eee;

      &:nth-last-of-type(1) {
        margin-top: 20px;
      }

      h3 {
        font-size: 14px;
        border-bottom: 1px solid #eee;
        padding: 10px;
      }

      .get-list {
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;

        li {
          width: 100%;

          display: flex;
          justify-content: space-around;
          border: 1px solid #eee;
          padding: 0px 0;
          border-bottom: none;

          &:nth-last-of-type(1) {
            border-bottom: 1px solid #eee;
          }

          h4 {
            width: 50%;
            height: 100%;
            padding-right: 10px;
            text-align: right;
            border-right: 1px solid #eee;
            font-size: 16px;
            font-weight: 100;
            margin: 17px 0;
            &:nth-last-of-type(1) {
              border: none;
              text-align: left;
              padding-left: 10px;
            }
          }
        }
      }

      .btns {
        width: 90%;
        margin: 0 auto;
        padding-top: 8px;
        padding-bottom: 20px;
      }
    }
    .block {
      padding: 20px;
    }
  }

  .menu-item {
    border: 1px solid #eee;
    text-align: center;
    padding-top: 10px;
    margin-bottom: 20px;

    p {
      margin: 10px 0;
      font-size: 16px;
    }
  }
}
</style>
