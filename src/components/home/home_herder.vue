<template>
  <div class="header_box">
    <div id="home_header" class="cl">
      <h1 @click="gotosm('/')" class="logo left"></h1>
      <div class="menu left">
        <!-- <div class="cl menu_title_div">
        <div
          v-for="(item, key, index) in title_data"
          :key="index + item.index"
          @click="gotosm(item.src)"
          class="left menu_title"
        >
          <i> 
            <img :src="item.icon" alt="" />
          </i>
          <span class="">{{ item.title }}</span>
        </div>
      </div> -->
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#ffffff"
          active-text-color="#1a90fc"
          background-color="transparent"
        >
          <el-menu-item
            v-for="(item, key, index) in title_data"
            :key="index + item.index"
            :index="item.index"
            @click="gotosm(item.src)"
          >
            <i>
              <img
                :src="item.index == activeIndex2 ? item.icon1 : item.icon"
                alt=""
              />
            </i>
            {{ item.title }}
            <i class="fenlei">|</i>
          </el-menu-item>
        </el-menu>
      </div>
      <div v-if="!token" class="login_div left cl">
        <div class="loginbtn left cu" @click="gologin">
          <img src="../../image/loginbtn.png" alt="" />
        </div>
        <div class="span_div left">
          <span class="logon_span" v-if="!token" @click="goregistered">
            <i>
              <img
                src="../../image/registeredicon.png"
                alt=""
                class="registeredicon"
              />
            </i>
            注册
          </span>
          <i class="fenlei1">|</i>
          <span class="logon_span" v-if="!token" @click="gotosm('/resetpass')"
            >忘记密码</span
          >
        </div>
      </div>
      <div v-if="token" class="left istokendiv">
        <div class="cl centerimg token_div">
          <div class="left">
            <el-dropdown @command="gotosm">
              <span class="el-dropdown-link cu">
                <el-avatar
                  class="avatar"
                  :size="25"
                  :src="upic"
                  v-if="upic"
                ></el-avatar>
                <el-avatar v-else> {{ uname }} </el-avatar>
                <span v-if="nickname"
                  >{{ nickname
                  }}<i class="el-icon-arrow-down el-icon--right"></i
                ></span>
                <span v-else
                  >{{ uname }}<i class="el-icon-arrow-down el-icon--right"></i
                ></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in menuitem"
                  :key="index"
                  :command="item.src"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="exit left cu centerimg" @click="exit()">
            <i>
              <img src="../../image/exiticon.png" alt="" />
            </i>
            退出
          </div>
        </div>
      </div>
    </div>
    <div class="footlogin">
      <login
        v-if="showLogin"
        :loginVisible="loginVisible"
        @chidVisible="getVisible"
        @childData="getChildData"
      />
    </div>
    <div class="footregistered">
      <registered
        v-if="showRegistered"
        :RegisteredVisible="RegisteredVisible"
        @chidRegisterVisible="getRegisterVisible"
      />
    </div>
  </div>
</template>

<script>
const login = () => import("@/page/login/login");
const registered = () => import("@/page/registered/registered");
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    login,
    registered,
  },
  data() {
    return {
      circleUrl: "",
      imgUrl: this.JuheHOST,
      activeIndex2: "1",
      title_data: [
        {
          icon: require("../../image/homeicon.png"),
          icon1: require("../../image/homeicon1.png"),
          index: "1",
          title: "首页",
          src: "/",
        },
        {
          icon: require("../../image/liveicon.png"),
          icon1: require("../../image/liveicon1.png"),
          index: "2",
          title: "直播",
          src: "/live",
        },
        {
          icon: require("../../image/newicon.png"),
          icon1: require("../../image/newicon1.png"),
          index: "3",
          title: "新闻",
          src: "/new",
        },
        {
          icon: require("../../image/communityicon.png"),
          icon1: require("../../image/communityicon1.png"),
          index: "4",
          title: "社区",
          src: "/community",
        },
      ],
      namely: "",
      menuitem: [
        {
          title: "账号设置",
          src: "/settings",
        },
        {
          title: "我的主页",
          src: "/person",
        },
        {
          title: "帮助",
          src: "/helps",
        },
      ],
      //登录
      showLogin: false,
      loginVisible: false,
      //注册
      showRegistered: false,
      RegisteredVisible: false,
    };
  },
  props: ["headerKey"],
  methods: {
    exit() {
      this.$api.loginout
        .useLoginout()
        .then((res) => {
          // console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "error", // warning、success
              message: res.data.msg,
            });
          } else if (res.data.code == 0) {
            this.$message({
              showClose: true,
              type: "success", // warning、success
              message: "登出成功！",
            });
            this.$store.commit("token", "");
            localStorage.setItem("token", "");
            localStorage.setItem("user_name", "");
            localStorage.setItem("nick_name", "");
            localStorage.setItem("user_uid", "");
            localStorage.setItem("user_pic", "");
            this.$router.push("/");
          } else if (res.data.code == -1) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message("参数错误");
        });
    },
    gptoperson(e) {
      console.log(e);
    },
    gotosm(src) {
      console.log(src);
      this.$router.push(src);
      if (src == "/live") {
        this.$store.commit("liveheader", 0);
      }
    },
    //获取用户信息
    getbasic() {
      this.$api.getbasicInfo
        .getbasic()
        .then((res) => {
          // console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "error", // warning、success
              message: res.data.msg,
            });
          } else if (res.data.code == 0) {
            this.$store.commit("upic", res.data.params.user_pic);
            this.$store.commit("uname", res.data.params.user_name);
            this.$store.commit("nickname", res.data.params.user_nickname);
            localStorage.setItem("user_uid", res.data.params.user_uid);
            localStorage.setItem("user_pic", res.data.params.user_pic);
            localStorage.setItem("user_name", res.data.params.user_name);
            localStorage.setItem("nick_name", res.data.params.user_nickname);
          } else if (res.data.code == -1) {
            // this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChildData() {
      this.getbasic();
    },
    //登录
    gologin() {
      // this.$router.push(src);
      this.showLogin = !this.showLogin;
      this.loginVisible = true;
    },
    getVisible(value) {
      console.log(value);
      this.showLogin = value;
      //登录页内去注册
      if (value == "go") {
        this.showLogin = false;
        this.goregistered();
      }
    },
    //注册
    goregistered() {
      this.showRegistered = !this.showLogin;
      this.RegisteredVisible = true;
    },
    getRegisterVisible(value) {
      this.showRegistered = value;
      //注册页内去登录
      if (value == "go") {
        this.showRegistered = false;
        this.gologin();
      }
    },
    handleSelect(key, keyPath) {
      this.$emit("changetype", key);
    },
  },
  computed: {
    ...mapState(["token", "uname", "upic", "nickname"]),
  },
  watch: {},
  created() {
    this.activeIndex2 = this.headerKey;
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.getbasic();
    }
  },
};
</script>

<style lang="less" scoped>
.header_box {
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  .footlogin {
    width: 100%;
    position: absolute;
  }
  .footregistered {
    width: 100%;
    position: absolute;
    top: 10px;
  }
}
.fenlei1 {
  color: #ffffff;
  margin: 0 10px;
  .el-submenu__title:hover {
    background-color: transparent;
  }
}
.registeredicon {
  margin-top: 3px;
}
.menu_title_div {
  color: #ffffff;
  font-size: 22px;
  margin-top: 28px;
  margin-left: 138px;
  .menu_title {
  }
}
.icon1 {
  background-image: url("../../image/homeicon.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 18px;
  height: 17px;
}
#home_header {
  background-image: url("../../image/header.png");
  background-size: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.istokendiv {
  position: absolute;
  left: 1334px;
  top: 0px;
  height: 75px;
  display: flex;
  align-items: center;
}
#home_header {
  width: 100%;
  .el-dropdown {
    color: #1a90fc;
  }
  .logo {
    width: 212px;
    height: 71px;
    background: url("../../image/logo.png") no-repeat;
    background-size: 100%;
    margin-left: 349px;
    margin-top: 4px;
    cursor: pointer;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    .el-menu {
      //  background-color:rgba(255,255,255,0.6);
    }
    .el-menu.el-menu--horizontal {
      border: none;
    }
    ul {
      margin-left: 138px;
      margin-top: 9px;
      background-color: rgba(0, 0, 0, 0);
      .el-menu--horizontal {
        border: none;
      }
      .el-menu-item {
        padding: 0;
        margin: 0 10px;
      }
      .el-menu-item:hover {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
  }
  .fenlei {
    color: #ffffff;
    margin-left: 10px;
  }
  .login_div {
    position: absolute;
    left: 1234px;
    top: 26px;
    font-size: 17px;
    display: flex;
    align-items: center;
  }
  .loginbtn {
  }
  .span_div {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .logon_span {
    color: #ffffff;
  }
  .logon_span:hover {
    cursor: pointer;
    color: #1a90fc;
  }
}
.exit {
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 10px;
  i {
    margin-right: 3px;
  }
}
.avatar {
  position: relative;
  top: 5px;
}
</style>