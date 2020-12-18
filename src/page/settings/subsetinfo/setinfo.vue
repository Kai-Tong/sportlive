<template>
  <div>
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <div class="info_set">
      <div class="inset">
        <div class="line"></div>
        <div class="info_head">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="set_head" :to="{ path: '/settings' }"
              >设置</el-breadcrumb-item
            >
            <el-breadcrumb-item>账号信息</el-breadcrumb-item>
            <el-breadcrumb-item>{{ routeAddress }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="backset">
            <el-button
              type="primary"
              class="back"
              size="small"
              plain
              @click="backSet('second')"
              >返回</el-button
            >
          </div>
          <hr style="margin-top: 10px" />
        </div>
        <div class="info_con">
          <component :is="iscomponent" :infoParams="infoList"></component>
        </div>
      </div>
    </div>

    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const home_herder = () => import("@/components/home/home_herder");
const Footer = () => import("@/components/footer/footer");
const changename = () => import("./changename");
const changephone = () => import("./changephone");
const changemail = () => import("./changemail");
const changepass = () => import("./changepass");
const authentication = () => import("./authentication");
export default {
  components: {
    home_herder,
    changename,
    changephone,
    changemail,
    changepass,
    authentication,
    Footer
  },
  data() {
    return {
      // iscomponent:"",
      routeAddress: "",
      component_name: "home_content",
      menu_num: "1",
      headerKey: "1",
      changename: changename,
      changephone: changephone,
      changemail: changemail,
      changepass: changepass,
      authentication: authentication,
      infoList: {
        id: "",
        name: localStorage.getItem("user_name"),
        password: "xxxx",
        email: "",
        phone: "",
      },
    };
  },
  computed: {
    iscomponent() {
      switch (this.$route.params.compontentName) {
        case "changename":
          this.routeAddress = "修改昵称";
          return this.changename;

          break;
        case "changephone":
          this.routeAddress = "修改绑定手机号";
          return this.changephone;
          break;
        case "changemail":
          this.routeAddress = "修改邮箱地址";
          return this.changemail;
          break;
        case "changepass":
          this.routeAddress = "修改密码";
          return this.changepass;
          break;
        case "authentication":
          this.routeAddress = "身份认证";
          return this.authentication;
          break;
        default:
          this.routeAddress = "修改密码";
          return this.changepass;
          break;
      }
    },
  },
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
    backSet(value) {
      this.$router.push({ name: "settings", params: { name: value } });
    },
  },
  mounted() {},
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
  .inset {
    width: 1235px;
    margin: auto;
    // height: 700px;
    background-color: #f8fcff;
    border: 1px solid #d2d2d2;
    padding-bottom: 50px;
    .line {
      width: 200px;
      height: 2px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 10px;
      background-color: #309cfb;
      box-sizing: border-box;
    }
    .info_head {
      width: 90%;
      margin: auto;
      margin-top: 20px;
      position: relative;
      hr {
        width: 100%;
        height: 1px;
        border: none;
        border-bottom: 1px solid #d2d2d2;
      }
      .set_head {
        border-left: 5px solid #084a84;
        padding-left: 20px;
        color: #084a84;
      }
    }
  }
}
.backset {
  position: absolute;
  right: 0;
  top: -10px;
  .back {
    border-radius: 20px;
  }
}
.info_con {
  width: 60%;
  margin: auto;
  margin-top: 20px;
  position: relative;
}
</style>
