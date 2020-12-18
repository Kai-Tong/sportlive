<template>
  <div id="home">
    <div class="head">
      <home_herder
        @changetype="parentEvent"
        :headerKey="headerKey"
      ></home_herder>
    </div>
    <div class="person_wrap cl">
      <div class="person_left">
        <div class="person_board">
          <ul>
            <router-link
              tag="li"
              active-class="active"
              v-for="(item, index) in personNav"
              :to="'/person/' + item.id"
              :key="index"
            >
              <i :class="['iconfont', item.icon]"></i
              >{{ item.title }}&nbsp;&nbsp;
              <div class="line"></div>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="person_right">
        <personhead />
        <router-view></router-view>
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
const personhead = () => import("../../components/person/personhead");
const Footer = () => import("../../components/footer/footer");
export default {
  name: "Person",
  components: {
    home_herder,
    personhead,
    Footer,
  },
  data() {
    return {
      menu_num: "1",
      headerKey: "",
      personNav: [
        {
          title: "个人主页",
          id: "homeperson",
          icon: "icon-caiyouduo_wode-gerenzhuye",
        },
        {
          title: "我的帖子",
          id: "article",
          icon: "icon-fatie",
        },
        {
          title: "我的关注",
          id: "attention",
          icon: "icon-guanzhu",
        },
        {
          title: "我的粉丝",
          id: "fans",
          icon: "icon-wodeguanzhu",
        },
      ],
      editorDataPub: {
        bold: "bold",
        fontName: "fontName",
        underline: "underline",
        strikeThrough: "strikeThrough",
        indent: "indent",
        foreColor: "foreColor",
        emoticon: "emoticon",
        image: "image",
        splitLine: "splitLine",
        undo: "undo",
        redo: "redo",
        //是否可以粘贴图片
        isNoPaste: true,
      },
    };
  },
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
  },
};
</script>
<style lang="less" scoped>
html #app {
  height: 100% !important;
}
#home {
  width: 100%;
  height: 100%;
  background-image: url("../../image/bj.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  .head {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
}
.person_wrap {
  width: 1273px;
  // height: 100%;
  margin: auto;
  margin-top: 90px;
  background-color: #fff;
  padding: 13px 13px 0;
  box-shadow: 0 3px 3px 3px #dbdbdb;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.person_left {
  width: 157px;
  float: left;
  text-align: center;
}
.person_right {
  width: 1096px;
  float: left;
  border: 1px solid #ececec;
  margin-left: 13px;
}
.person_board {
  padding: 5px 0 200px;
  border: 1px solid #ececec;
  margin-top: 10px;
  li {
    width: 75%;
    margin: auto;
    margin-top: 30px;
    padding: 10px 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    color: #054982;
    i {
      font-size: 20px !important;
    }
  }
  .line {
    width: 100%;
    margin: auto;
    position: relative;
    top: 25px;
    height: 1px;
    background-color: #d2d2d2;
  }
}
.person_board li.active,
.person_board li:hover {
  border-radius: 30px;
  background: linear-gradient(#51acff, #0671fe);
  color: #fff;
}
</style>