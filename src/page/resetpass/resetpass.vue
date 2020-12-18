<template>
  <div class="login" clearfix>
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <div class="set">
      <div class="inset">
        <div class="line"></div>
        <div class="step">
          <div :class="oneflag ? 'step0ne_img' : 'step0ne_imgbg'"></div>
          <div :class="twoflag ? 'stepTwo_img' : 'stepTwo_imgbg'"></div>
          <div :class="threeflag ? 'stepThree_img' : 'stepThree_imgbg'"></div>
        </div>
        <div class="login-wrap first_wrap" v-if="active == 0">
          <el-form
            ref="confirmUser"
            :model="confirmUser"
            :rules="confirmRules"
            status-icon
            class="second_con"
          >
            <el-form-item class="filed" prop="username" label="">
              <el-input
                v-model="confirmUser.username"
                @blur="checkBlur($event)"
                placeholder="请填写用户账号，手机号或邮箱"
                prefix-icon
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="first_btn"
                type="primary"
                icon="el-icon-upload"
                @click="doConfirm('confirmUser')"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-wrap sencond_wrap" v-if="active == 1">
          <el-form
            ref="register"
            :model="register"
            :rules="registerRules"
            status-icon
            class="second_con"
          >
            <div class="region_con">
              <el-form-item class="filed" prop="phoneNum" label="">
                <el-input type="" v-model="register.phoneNum" autocomplete="off"
                  ><template slot="prepend">+86</template></el-input
                >
              </el-form-item>
            </div>
            <!-- 获取验证码 -->
            <div class="code_con">
              <el-form-item class="code" prop="code" label="">
                <el-input
                  v-model="register.code"
                  show-password
                  placeholder="请输入验证码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-button
                class="code_btn"
                type="primary"
                @click="getVerify"
                :disabled="(disabled = !show)"
              >
                <span v-show="show" v-preventReClick>获取验证码</span>
                <span v-show="!show" class="count">{{ count }} s</span>
              </el-button>
            </div>
            <el-form-item>
              <el-button
                class="sencond_btn2"
                type="primary"
                icon="el-icon-upload"
                @click="forward()"
                >上一步</el-button
              >
              <el-button
                class="sencond_btn"
                type="primary"
                icon="el-icon-upload"
                @click="doRegiste('register')"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-wrap third_wrap" v-if="active == 2">
          <el-form
            ref="resetpass"
            :model="resetpass"
            :rules="resetpassRules"
            status-icon
            class="second_con"
          >
            <el-form-item class="filed" prop="password" label="">
              <el-input
                v-model="resetpass.password"
                show-password
                placeholder="密码：6-16位密码，区分大小写"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item class="filed" label="" prop="checkPass">
              <el-input
                type="password"
                show-password
                v-model="resetpass.checkPass"
                placeholder="确认密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                class="third_btn"
                type="primary"
                icon="el-icon-upload"
                @click="resetPass('resetpass')"
                v-preventReClick
                >提 交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const home_herder = () => import("../../components/home/home_herder");
const Footer = () => import("../../components/footer/footer");
export default {
  name: "login",
  components: {
    home_herder,
    Footer
  },
  data() {
    let regphone = /^1[3456789]\d{9}$/;
    let regmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    let regname = /^(?!\d+$)[\da-zA-Z-_]{4,20}$/;
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    var validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (
          !regname.test(value) &&
          !regphone.test(value) &&
          !regmail.test(value)
        ) {
          callback(new Error("用户名格式错误"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("密码应是6-20位数字、字母或字符！"));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetpass.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //手机号登录
    var phoneNumber = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("手机号不能为空"));
      } else {
        if (!regphone.test(value)) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      menu_num: "1",
      headerKey: "",
      //第一步
      confirmUser: {
        username: "",
      },
      //第二步
      register: {
        phoneNum: "",
        code: "",
      },
      //第三步
      resetpass: {
        password: "",
        checkPass: "",
      },
      // 第一步规则
      confirmRules: {
        username: [{ validator: validateName, trigger: "blur" }],
      },
      //第二步规则
      registerRules: {
        phoneNum: [{ validator: phoneNumber, trigger: "blur" }],
      },
      //第三步规则
      resetpassRules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      checked: true,
      count: "",
      show: true,
      //步骤条状态
      active: 0,
      oneflag: true,
      twoflag: false,
      threeflag: false,
    };
  },
  created() {},
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
    //blur事件
    checkBlur(e) {
      console.log(e.target.value);
    },
    //选择手机区号
    changeRegion(value) {
      console.log(value);
    },
    //第一步提交
    doConfirm(confirmUser) {
      this.$refs["confirmUser"].validate((valid) => {
        if (valid) {
          let params = { name: this.$inHTMLData(this.confirmUser.username) };
          this.$api.checkname
            .checkUser(params)
            .then((res) => {
              // console.log(res);
              if (res.data.code == 1) {
                this.$message({
                  type: "error", // warning、success
                  message: res.data.msg,
                });
              } else if (res.data.code == 0) {
                this.$message({
                  type: "success", // warning、success
                  message: "校验成功",
                });
                this.oneflag = false;
                this.twoflag = true;
                this.active = this.active + 1;
              } else if (res.data.code == -1) {
                this.$message({
                  type: "success", // warning、success
                  message: res.data.msg,
                });
              }
            })
            .catch((error) => {
              this.$message("账号或密码错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取验证码倒计时
    getVerify() {
      let regphone = /^1[3456789]\d{9}$/;
      if (
        this.register.phoneNum != "" &&
        regphone.test(this.register.phoneNum)
      ) {
        this.$axios({
          url: `${this.$api.getCode}/${this.register.phoneNum}/2`,
          method: "post",
          timeout: 3000,
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "error", // warning、success
                message: "请一分钟后再试",
              });
            } else if (res.data.code == 0) {
              this.$message({
                type: "success", // warning、success
                message: "验证码已发送",
              });
              const TIME_COUNT = 60; //更改倒计时时间
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer); // 清除定时器
                    this.timer = null;
                  }
                }, 1000);
              }
            } else if (res.data.code == -1) {
              this.$message({
                type: "success", // warning、success
                message: res.data.msg,
              });
            }
          })
          .catch((error) => {
            // console.log(error);
            this.$message({
              type: "warning", // warning、success
              message: "请求频繁，请稍后再试",
            });
          });
      } else {
        this.$message({
          type: "warning", // warning、success
          message: "请注意手机号格式和不能为空",
        });
      }
    },
    //上一步
    forward() {
      this.oneflag = true;
      this.twoflag = false;
      this.active = this.active - 1;
    },
    //第二步提交
    doRegiste(register) {
      this.twoflag = false;
      this.threeflag = true;
      this.active = this.active + 1;
    },
    //base64转码
    encode(str) {
      return str == null ? null : btoa(encodeURIComponent(str));
    },
    //第三步提交
    resetPass(resetpass) {
      this.$refs["resetpass"].validate((valid) => {
        if (valid) {
          this.$api.fogetpwd
            .changePwd({
              mobile: this.$inHTMLData(this.register.phoneNum),
              vcode: this.$inHTMLData(this.register.code),
              pwd: this.$inHTMLData(this.encode(this.resetpass.password)),
            })
            .then((res) => {
              // console.log(res);
              if (res.data.code == 1) {
                this.$message({
                  type: "error", // warning、success
                  message: res.data.msg,
                });
              } else if (res.data.code == 0) {
                this.$message({
                  type: "success", // warning、success
                  message: "重置成功！",
                });
                this.$router.push("/");
                // this.active = this.active+1;
                this.$refs[formName].resetFields();
              } else if (res.data.code == -1) {
                this.$message({
                  type: "warning", // warning、success
                  message: res.data.msg,
                });
                this.$router.push("/");
              }
            })
            .catch((error) => {
              // console.log(error);
              //   this.$message("设置失败")
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //移除表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // computed: {
  //   ...mapState(["activityDetail"]),
  // },
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  .set {
    width: 1273px;
    margin: auto;
    margin-top: 10px;
    height: 800px;
    background-color: #fff;
    padding-top: 13px;
    box-shadow: 0 3px 3px 3px #dbdbdb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-sizing: border-box;
    .inset {
      width: 1235px;
      margin: auto;
      height: 450px;
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
      .step {
        width: 1020px;
        height: 50px;
        margin: auto;
        margin-top: 20px;
        div {
          width: 340px;
          height: 50px;
          float: left;
        }
        .step0ne_img {
          background-image: url("../../image/imgs/confirmuser.png");
          background-size: 100%;
        }
        .step0ne_imgbg {
          background-image: url("../../image/imgs/confirmuserbg.png");
          background-size: 100%;
        }
        .stepTwo_img {
          background-image: url("../../image/imgs/safecheck.png");
          background-size: 100%;
        }
        .stepTwo_imgbg {
          background-image: url("../../image/imgs/safecheckbg.png");
          background-size: 100%;
        }
        .stepThree_img {
          background-image: url("../../image/imgs/resetpass.png");
          background-size: 100%;
        }
        .stepThree_imgbg {
          background-image: url("../../image/imgs/resetpassbg.png");
          background-size: 100%;
        }
      }
      .login-wrap {
        width: 340px;
        background-size: cover;
        margin: auto;
        // overflow: hidden;
        margin-top: 20px;
        padding-bottom: 50px;
        line-height: 40px;
        z-index: 999;
        .first_btn {
          width: 340px;
        }
      }
    }
  }
}
.code_con {
  width: 100%;
  height: 40px;
  .code {
    width: 60%;
    float: left;
  }
  .code_btn {
    width: 40%;
    float: right;
    border-radius: 20px;
    color: #079def;
    background-color: #fff;
    border: 1px solid #079def;
  }
}
.sencond_btn {
  width: 160px;
  position: relative;
  top: 40px;
}
.sencond_btn2 {
  width: 160px;
  position: relative;
  top: 40px;
}
.third_btn {
  width: 340px;
}
</style>