<template>
  <div>
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <div class="info_set">
      <div class="line"></div>
      <p class="p_title">帮助中心</p>
      <div class="help_left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"><allhelps /></el-tab-pane>
          <el-tab-pane label="账号" name="second">暂无</el-tab-pane>
          <el-tab-pane label="直播" name="third">暂无</el-tab-pane>
          <el-tab-pane label="社区" name="fourth">暂无</el-tab-pane>
          <el-tab-pane label="其他">其他</el-tab-pane>
        </el-tabs>
      </div>
      <div class="help_right">
        <div class="top">
          <img :src="hot" alt="" />
          <p>热门问题</p>
        </div>
        <ul class="qus_list">
          <!-- <li>
                       <i class="el-icon-s-help"></i>
                       用户名怎样修改?</li> -->
          <!-- <li><i class="el-icon-s-help"></i>用户名怎样修改2</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改3</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改4</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改5</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改6</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改7</li>
                   <li><i class="el-icon-s-help"></i>用户名怎样修改8</li> -->
        </ul>
        <div class="bottom1">
          <p @click="goSuggest()">意见反馈<span>></span></p>
        </div>
        <div class="bottom1">
          <p>人工客服<span>></span></p>
          <img :src="cus" alt="" />
        </div>
      </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
    <!-- <i class="iconfont icon-wangluo"></i> -->
  </div>
</template>
<script>
const home_herder = () => import("../../components/home/home_herder");
const Footer = () => import("../../components/footer/footer");
const allhelps = () => import("./subhelps/allhelps");
export default {
  name: "Person",
  components: {
    home_herder,
    allhelps,
    Footer
  },
  data() {
    return {
      menu_num: "1",
      headerKey: "",
      activeName: "first",
      hot: require("@/image/imgs/hot.png"),
      cus: require("@/image/imgs/cus.png"),
    };
  },
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goSuggest() {
      this.$router.push("/suggest");
    },
  },
};
</script>
<style lang="less" scoped>
.info_set {
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
  .line {
    width: 200px;
    height: 2px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
    background-color: #309cfb;
    box-sizing: border-box;
  }
  .p_title {
    margin-left: 46px;
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
    width: 1050px;
    background-color: #d2d2d2;
    left: 100px;
  }
  .help_left {
    width: 735px;
    margin: 31px 0 0 45px;
    float: left;
  }
  .help_right {
    width: 442px;
    float: right;
    margin-right: 46px;
    color: #366a98;
    .top {
      width: 100%;
      height: 45px;
      background-color: #fafafa;
      img {
        height: 27px;
        display: inline-block;
        position: relative;
        top: 9px;
        left: 27px;
      }
      p {
        width: 50%;
        display: inline-block;
        line-height: 45px;
        margin-left: 38px;
        font-size: 18px;
      }
    }
    .qus_list {
      margin: 36px 0 36px 26px;
      li {
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        position: relative;
      }
    }
    .bottom1 {
      width: 100%;
      height: 45px;
      background-color: #fafafa;
      position: relative;
      p {
        font-size: 18px;
        height: 21px;
        line-height: 21px;
        // display: inline-block;
        position: relative;
        top: 12px;
        left: 26px;
        padding-left: 10px;
        border-left: 5px solid #014681;
        cursor: pointer;
        span {
          position: absolute;
          right: 20px;
        }
      }
      img {
        height: 25px;
        display: inline-block;
        position: absolute;
        top: 9px;
        left: 120px;
        cursor: pointer;
      }
    }
  }
}
.el-tabs {
  height: auto !important;
}
/deep/.help_left .el-tabs__active-bar {
  width: 28px !important;
  margin-left: 3px !important;
  height: 6px !important;
  border-radius: 5px !important;
  bottom: 3px !important;
  z-index: 999 !important;
}
/deep/.help_left .el-tabs__item {
  font-size: 18px;
  margin-bottom: 5px;
  letter-spacing: 2px;
}
</style>