<template>
  <div id="home">
    <div class="head">
      <home_herder
        @changetype="parentEvent"
        :headerKey="headerKey"
      ></home_herder>
    </div>
    <div class="info_set">
      <div class="line"></div>
      <el-button
        type="primary"
        class="editorjump"
        icon="el-icon-edit"
        @click="editorJump"
        >回复</el-button
      >
      <p class="p_title">意见详情</p>
      <div class="detal">
        <div class="list_con">
          <div class="title">
            <p>
              {{ detail_list.feedback_title }}
              <span class="title_time">{{ detail_list.addtime_format }}</span>
            </p>
          </div>
          <div class="content_con">
            <p class="content" v-html="detail_list.feedback_body"></p>
            <el-image
              v-for="(images, index) in detail_list.feedback_pic"
              :key="index"
              class="detail_img"
              :src="images"
              :preview-src-list="detail_list.feedback_pic"
            >
            </el-image>
          </div>
        </div>
        <div class="reply_con" v-for="(item, index) in reply_list" :key="index">
          <p class="reply_title">
            <i class="el-icon-medal-1"></i><span>{{ item.user_name }}</span
            ><span>{{ item.addtime_format }}</span>
          </p>
          <div class="content_con">
            <div class="content" v-html="item.f_r_body"></div>
            <el-image
              v-for="(images, index) in item.f_r_pic"
              :key="index"
              class="detail_img"
              :src="images"
              v-if="item.f_r_pic[0] != imgurl + 'null'"
              :preview-src-list="item.f_r_pic"
            >
            </el-image>
          </div>
        </div>
        <!-- <div>
                    <replyeditor @receiveMsg="handlerMsg"/>
                </div> -->
      </div>
      <div class="editor_con">
        <div id="editor" class="text"></div>
        <div id="toolbar" class="toolbar"></div>
        <div class="btn_con">
          <el-button class="cancler" type="info" plain @click="cancleHandler"
            >取消</el-button
          >
          <el-button
            class="submitbtn"
            type="primary"
            @click="getEditorData"
            v-preventReClick
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <el-backtop target="body #home"></el-backtop>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
const Footer = () => import("../../components/footer/footer");
const replyeditor = () => import("../../components/editor/replyEditor");
import wangEditor from "wangeditor";
export default {
  name: "suggestdetail",
  components: {
    home_herder,
    replyeditor,
    Footer
  },
  data() {
    return {
      menu_num: "1",
      headerKey: "",
      imgurl: this.JuheHOST,
      replyUpImgUrl: this.$api.upimg,
      replyUrlImgList: [],
      detail_list: {},
      reply_list: {},
      uid: "",
    };
  },
  methods: {
    //锚点
    editorJump() {
      document.querySelector("#editor").scrollIntoView(true);
    },
    parentEvent(data) {
      this.menu_num = data;
    },
    //接收回复内容
    handlerMsg(data) {
      console.log(data);
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      if (localStorage.getItem("relpyImgList")) {
        this.replyUrlImgList = JSON.parse(localStorage.getItem("relpyImgList"));
      }
      let data = this.editor.txt.html();
      // console.log(String(this.replyUrlImgList));
      //回复提交
      this.$axios({
        url: `${this.$api.suggestreply}/${this.uid}`,
        method: "post",
        data: {
          fid: this.uid,
          body: data,
          pic: String(this.replyUrlImgList),
        },
        timeout: 3000,
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
              message: "提交成功",
            });
            //成功清除保存的imglist
            localStorage.setItem("relpyImgList", [""]);
            //刷新反馈列表
            this.getRplayList();
          } else if (res.data.code == -1) {
            this.$message({
              type: "success", // warning、success
              message: "身份认证过期，请重新登录",
            });
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //清空编辑器
      this.editor.txt.clear();
    },
    //获取反馈详情
    getRplayList() {
      //获取反馈详情
      this.$axios({
        url: `${this.$api.suggestdetail}/${this.uid}`,
        method: "get",
        timeout: 3000,
      })
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "error", // warning、success
              message: res.data.msg,
            });
          } else if (res.data.code == 0) {
            // let feedback_pic = res.data.params.feedback_pic;
            // for(let index in feedback_pic){
            //     feedback_pic[index] = this.imgurl + feedback_pic[index];
            //     // console.log(res.data.params.feedback_pic[index]);
            // }
            // let feedback_reply = res.data.params.feedback_reply;
            // for(let index in feedback_reply){
            //     for(let i in feedback_reply[index].f_r_pic){
            //         feedback_reply[index].f_r_pic[i] = this.imgurl + feedback_reply[index].f_r_pic[i];
            //         // console.log(res.data.params.feedback_reply[index].f_r_pic[i]);
            //     }
            // }
            this.detail_list = res.data.params;
            this.reply_list = res.data.params.feedback_reply;
          } else if (res.data.code == -1) {
            this.$message({
              type: "success", // warning、success
              message: res.data.msg,
            });
            this.$router.push("/");
          }
          // console.log(this.detail_list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancleHandler() {},
  },
  mounted() {
    console.log(this.$route.params.name);
    if (this.$route.params.name) {
      localStorage.setItem("suggestId", this.$route.params.name);
    }
    this.uid = localStorage.getItem("suggestId");
    const editor = new wangEditor("#toolbar", "#editor");
    // const editor = new wangEditor(`#editor`,'#toolbar');
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
      console.log(this.editorData);
    };
    //配置编辑器高度
    // editor.config.height = this.editorParams.height;
    //默认提示语
    editor.config.placeholder = "多张图片请同时上传,最多上传3张";

    //配置菜单
    editor.config.menus = [
      "emoticon",
      "image",
      "undo", //后退
      "redo", //前进
    ];
    //评论框过滤粘贴的图片
    editor.config.pasteIgnoreImg = true;
    // 配置行高
    // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']
    editor.config.emotions = [
      {
        title: "emoji", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐 😍 🥰 🤩 😘 😚 🤑 🤪 🤭 🤔 🤗 😡 😤 🤬 💀 👽 💩 😵 🤢 🤕 🤧 😭".split(
          /\s/
        ),
      },
      {
        title: "gesture", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "👋 🤚 🖐️ ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤜 🤛 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 👁️ 👅 👀".split(
          /\s/
        ),
      },
      {
        title: "Symbols", // tab 的标题
        type: "emoji", // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: "🏧 🚮 ♿ 🚰 🚹 🚺 🚻 🛅 🛄 🛂 ⚠️ 🚸 ⛔ 🚫 🚳 🚭 🚯 🚱 🚷 📵 🔞 ☢️ ☣️ ♀️ ♂️ 🆚 ✔️ ❌ ➕ ➖ ✖️ ➗ 〽️ ✳️ ✴️ ‼️ ⁉️ ❓ ❗".split(
          /\s/
        ),
      },
    ];
    //配置字体
    editor.config.fontNames = [
      "黑体",
      "仿宋",
      "楷体",
      "标楷体",
      "华文仿宋",
      "华文楷体",
      "宋体",
      "微软雅黑",
    ];
    // 配置全屏功能按钮是否展示
    editor.config.showFullScreen = false;
    // 配置粘贴文本的内容处理
    editor.config.pasteTextHandle = function (pasteStr) {
      // 对粘贴的文本进行处理，然后返回处理后的结果
      return pasteStr + "-6789直播";
    };
    //上传限制3张
    editor.config.uploadImgMaxLength = 3;
    // 配置上传图片 server 接口地址
    editor.config.uploadImgServer = this.replyUpImgUrl;
    //header携带token
    editor.config.uploadImgHeaders = {
      token: localStorage.getItem("token"),
    };
    editor.config.uploadFileName = "file[]";
    //取消网络图片上传
    editor.config.showLinkImg = false;
    //图片上传操作钩子函数
    let that = this;
    editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        console.log(xhr);

        // 可阻止图片上传
        // return {
        //     prevent: true,
        //     msg: '需要提示给用户的错误信息'
        // }
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log("fail", resData);
        // console.log(resData);
        this.replyUrlImgList = resData.data;
        // console.log(this.replyUrlImgList);
        that.$message({
          type: "success", // warning、success
          message: "上传成功",
        });
        //存入本地
        localStorage.setItem(
          "relpyImgList",
          JSON.stringify(this.replyUrlImgList)
        );
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      // customInsert: function(insertImgFn, result) {
      //     // result 即服务端返回的接口
      //     console.log('customInsert', result)

      //     // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
      //     insertImgFn(result.data[0])
      // }
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
    this.getRplayList();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style lang="less" scoped>
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
.info_set {
  width: 1273px;
  margin: auto;
  margin-top: 90px;
  // height: 800px;
  background-color: #fff;
  // padding: 13px 13px 0;
  padding-top: 13px;
  box-shadow: 0 3px 3px 3px #dbdbdb;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-sizing: border-box;
  .editorjump {
    position: fixed;
    top: 250px;
    right: 340px;
    opacity: 0.7;
    z-index: 999;
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
  .detal {
    width: 1147px;
    padding-bottom: 20px;
    margin: auto;
    .list_con {
      width: 1147px;
      // height: 200px;
      margin-top: 13px;
      border-bottom: 1px solid #d2d2d2;
      position: relative;
      margin-bottom: 10px;
      .title {
        width: 900px;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        font-weight: 600;
        margin: 23px 0 18px 10px;
        color: #777777;
        .title_time {
          float: right;
          font-size: 12px;
        }
      }
      .content_con {
        width: 900px;
        margin-left: 20px;
        line-height: 20px;
        font-size: 14px;
        .content {
          width: 800px;
          word-break: break-all;
          color: #aaaaaa;
          margin-bottom: 10px;
        }
        span {
          float: right;
          font-size: 12px;
          color: #3c9efc;
          cursor: pointer;
        }
        .detail_img {
          width: 115px;
          height: 73px;
          margin-right: 1%;
        }
      }
      .message {
        position: absolute;
        top: 0;
        right: 10px;
        color: #fc6d6f;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    }
    .reply_con {
      width: 1147px;
      border-bottom: 1px dashed #cacaca;
      .reply_title {
        color: #1a94fc;
        font-size: 16px;
        font-weight: 600;
        margin: 10px 0;
        i {
          font-size: 18px;
        }
        span {
          margin-right: 20px;
        }
        span:nth-child(3) {
          color: #777777;
        }
      }
      .content_con {
        margin-left: 20px;
        .content {
          font-size: 16px;
          width: 800px;
          word-break: break-all;
          margin-bottom: 10px;
        }
        .detail_img {
          width: 115px;
          height: 73px;
          margin-right: 1%;
        }
      }
    }
  }
  .editor_con {
    width: 1147px;
    margin: auto;
    padding-bottom: 160px;
    position: relative;
    z-index: 10;
    #editor {
      width: 1147px;
      resize: vertical;
      font-size: 14px;
      border: 1px solid #ccc;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    .toolbar {
      width: 1147px;
      font-size: 14px;
    }
    .btn_con {
      position: absolute;
      right: 0;
      .cancler,
      .submitbtn {
        width: 100px;
        border-radius: 10px;
        color: #fff;
        margin-top: 10px;
      }
      .submitbtn {
        background-color: #1a90fc;
      }
      .cancler {
        background-color: #c5c5c5;
      }
      .submitbtn:hover {
        background-color: #58a5ec;
      }
    }
  }
}
/deep/.w-e-menu .w-e-panel-container {
  width: 600px !important;
  margin-left: 0 !important;
}
/deep/.w-e-menu .w-e-panel-container .w-e-panel-tab-content {
  width: 600px !important;
  height: 200px !important;
}
</style>