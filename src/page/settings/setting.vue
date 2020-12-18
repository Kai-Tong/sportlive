<template>
  <div>
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <div class="set">
      <div class="inset">
        <div class="line"></div>
        <p class="p_title">设置</p>
        <div class="tabs_con">
          <el-tabs
            class="harftab"
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane label="基本资料" name="first"
              ><basicdata
            /></el-tab-pane>
            <el-tab-pane label="账号信息" name="second"
              ><accountinfo
            /></el-tab-pane>
            <el-tab-pane label="关注设置" name="third"
              ><attentionset ref="accountinfo"
            /></el-tab-pane>
            <el-tab-pane label="隐私设置" name="fourth"
              ><privacyset ref="privacyset"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
const Footer = () => import("../../components/footer/footer");
const basicdata = () => import("./subsetting/basicdata");
const accountinfo = () => import("./subsetting/accountinfo");
const attentionset = () => import("./subsetting/attentionset");
const privacyset = () => import("./subsetting/privacyset");
export default {
  name: "setting",
  components: {
    home_herder,
    basicdata,
    accountinfo,
    attentionset,
    privacyset,
    Footer
  },
  data() {
    return {
      menu_num: "1",
      headerKey: "",
      activeName: "first",
    };
  },
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
    handleClick(tab, event) {
      console.log(tab.name, event);
      if (tab.name == "third") {
        //加载关注设置的频道列表
        this.$refs.accountinfo.getChanelList();
      } else if (tab.name == "fourth") {
        //加载隐私设置的状态
        this.$refs.privacyset.getPristatus();
      }
    },
  },
  mounted() {
    if (this.$route.params.name) {
      this.activeName = this.$route.params.name;
    }
  },
};
</script>

<style lang="less" scoped>
.set {
  width: 1273px;
  margin: auto;
  margin-top: 10px;
  height: 800px;
  background-color: #fff;
  // padding: 13px 13px 0;
  padding-top: 13px;
  box-shadow: 0 3px 3px 3px #dbdbdb;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-sizing: border-box;
  .inset {
    width: 1235px;
    margin: auto;
    // height: 700px;
    background-color: #f8fcff;
    border: 1px solid #d2d2d2;
    padding-bottom: 50px;
    .p_title {
      margin-left: 100px;
      border-left: 5px solid #014681;
      color: #014681;
      font-size: 18px;
      height: 20px;
      line-height: 20px;
      padding: 0 10px;
      font-weight: 600;
      position: relative;
    }
    .p_title:after {
      content: "";
      position: absolute;
      top: 50%;
      height: 1px;
      width: 950px;
      background-color: #d2d2d2;
      left: 100px;
    }
    .line {
      width: 200px;
      height: 2px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: #309cfb;
      box-sizing: border-box;
    }
    .tabs_con {
      width: 727px;
      margin: auto;
      margin-top: 20px;
      .harftab {
        width: 100%;
      }
    }
  }
}
/deep/.el-tabs__nav {
  width: 25%;
}
/deep/.el-tabs__item {
  width: 100%;
  text-align: center;
  font-size: 16px;
  left: 5px;
  font-weight: 500 !important;
}
</style>>

