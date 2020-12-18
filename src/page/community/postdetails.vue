<template>
  <div class="cl newsdel">
    <home_herder :headerKey="headerKey"></home_herder>
    <livemenu></livemenu>
    <div class="newsdel_content boxshadow left">
      <div class="banner">
        <img src="" alt="" />
      </div>
      <div class="communitydel_header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: fromname.path }">{{
            fromname.name
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>贴子详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="title_div cl">
        <div class="newstype1 left">
          {{ postdel.columnm }}
        </div>
        <div class="title left">
          {{ newsdel.forum_title }}
        </div>
      </div>
      <div class="newsbody">
        <div v-html="newsdel.forum_body"></div>
      </div>
      <div class="cl title_bottom">
        <div class="left">6789直播</div>
        <div class="left title_bottom_time">{{ newsList.time }}</div>
        <!-- <div class="left share_div">
          <img src="../../image/news/share.png" alt="" />
          分享到
          <img src="../../image/news/shareicon1.png" alt="" />
          <img src="../../image/news/shareicon2.png" alt="" />
          <img src="../../image/news/shareicon3.png" alt="" />
          <img src="../../image/news/shareicon4.png" alt="" />
        </div> -->
        <div class="cl right title_bottom_right">
          <!-- <div class="cl favorites_div left cu">
            <div class="favorites_img left"></div>
            <div class="left favorites">收藏</div>
          </div>
          <div class="cl comment_div left cu">
            <div class="comment_img left"></div>
            <div class="comment left">评论</div>
          </div> -->
          <div class="cl report_div left cu" @click="showreportfn()">
            <div class="report_img left"></div>
            <div class="report left">举报</div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="interaction">
        <div class="access_header">
          <img
            src="../../image/news/sicon.png"
            alt=""
            class="access_header_img"
          />
          <span class="access"> 最近访问 </span>
        </div>
        <div class="showavatar_div cl">
          <div
            v-for="(item, index) in accessList"
            :key="index"
            class="showavatar left cu"
            @click="goPerson(item.id)"
          >
            <img :src="item.user_pic" alt="" class="showavatar_img" />
            <div>
              {{ item.user_name }}
            </div>
          </div>
          <div class="showavatar" v-if="accessList == false">暂无访客</div>
        </div>
        <div class="access_header comment_content">
          <img
            src="../../image/news/sicon.png"
            alt=""
            class="access_header_img"
          />
          <span class="access"> 评论 </span>
          <span class="remind">文明上网理性发言，请遵守新闻评论服务协议</span>
        </div>
        <div class="cl">
          <div class="cl user_comment_div">
            <div class="left user_comment_img centerimg">
              <img :src="avatar" alt="" />
            </div>
            <div class="left user_comment">
              <textarea
                type="text"
                v-model="commentmsg"
                maxlength="500"
                placeholder="来说两句吧！最多500字"
              ></textarea>
            </div>
            <div class="left fabiao" @click="postcomment()">发表</div>
          </div>
          <div class="otheruser_comment_div">
            <div
              class="otheruser_comment cl"
              v-for="(item, index) in commentList"
              :key="index"
            >
              <div class="cl">
                <div class="otheruser_img left" @click="goPerson(item.c_uid)">
                  <img :src="avatar" alt="" />
                </div>
                <div class="left">
                  <div class="otheruser_name_div">
                    <span class="otheruser_name">
                      {{ item.user_name }}
                    </span>
                    <span class="otheruser_time">
                      {{ item.c_addtime | formDate }}
                    </span>
                    <div class="otheruser_msg">
                      {{ item.c_body }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="replynum cu"
                @click="lookallreply(item)"
                v-if="!showreply && item.child != false"
              >
                查看全部回复（{{ item.c_reply_count }}）
              </div>
              <div class="otherusergoodreply cl">
                <div class="otherusergood left cu" @click="star(item)">
                  <div class="otheruser_goods_img left"></div>
                  <div class="left">赞{{ item.c_good_count }}</div>
                </div>
                <div
                  class="otheruserreply left cu"
                  @click="getcommentid(item, $event)"
                >
                  <div class="otheruser_reply_img left"></div>
                  回复
                </div>
              </div>
              <div class="replay_child">
                <!-- <div v-if="!item.child">暂无回复</div> -->
                <newstree
                  :itemChild="item.child"
                  v-if="item.child"
                  :deep="deep"
                  :ref="`child${item.id}`"
                  :key="'father' + item.id"
                  @getcommentid="getcommentid"
                ></newstree>
              </div>
            </div>
            <!-- <div class="cl relpyinput_div">
              <input type="text" v-model="commentReplyMsg" />
              <div @click="commentreply()">回复</div>
            </div> -->
          </div>
        </div>
        <div class="access_header comment_content">
          <img
            src="../../image/news/sicon.png"
            alt=""
            class="access_header_img"
          />
          <span class="access"> 为你推荐 </span>
        </div>
        <div
          class="cl tuijian_div"
          v-for="(item, index) in recommend"
          :key="index"
          @click="gotonewsdel(item)"
        >
          <div class="tuijian_img left">
            <img :src="item.news_cover_url" alt="" />
          </div>
          <div class="left">
            <div class="certerimg tuijian_title_div">
              <a
                :href="delUrl + item.id + '.html'"
                v-on:click.prevent="toNewsdel"
                ><div class="tuijian_title">{{ item.news_title }}</div></a
              >
              <div class="tuijian_time">{{ item.news_addtime | formDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user_reply" v-show="showReplyinput">
      <textarea
        type="text"
        v-model="commentReplyMsg"
        placeholder="输入回复内容"
        maxlength="500"
      ></textarea>
      <div class="fabiao cu" @click="replyreply()">回复</div>
    </div>
    <div class="report_div_com" v-if="showreport">
      <report
        :report_type="2"
        :report_id="postdel.id"
        :visible="showreport"
        @chidVisible="getVisible"
      ></report>
    </div>
    <newslive v-if="newsmenuswp"></newslive>
    <div class="left footermargin">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const home_herder = () => import("../../components/home/home_herder");
const livemenu = () => import("../../components/live/livemenu");
const newslive = () => import("../../components/new/newslive");
const newstree = () => import("../../components/new/newstree");
const report = () => import("../../components/person/report");
const Footer = () => import("../../components/footer/footer1");
import host from "../../api/httpurl";
import DPlayer from "dplayer";
export default {
  metaInfo() {
    return {
      title: this.pageName,
      meta: this.metaList,
    };
  },
  data() {
    return {
      delUrl: "http://dev.6789zbz.com/front/newdel/",
      pageName: "",
      metaList: [
        //SEO优化的meta数组
        {
          name: "description",
          content: "",
        },
        {
          name: "keywords",
          content: "",
        },
        {
          property: "release_date",
          content: "",
        },
      ],
      newstitle: "",
      headerKey: "4",
      querydata: "",
      videosrc: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
      accessList: [], //用户访问列表
      commentmsg: "",
      avatar: require("../../image/team.jpg"),
      commentList: [], //评论
      recommend: [], // 推荐新闻
      newsdel: [],
      showreply: false, //显示回复
      deep: 0,
      showreport: false, //显示举报弹窗
      commentReplyMsg: "", //评论回复
      showReplyinput: false,
      showcommentid: 0, //评论回复id
      showcommentheight: "", //评论的位置
      fromname: {}, //回跳名字
    };
  },
  methods: {
    replyreply() {
      let body = this.$inHTMLData(this.commentReplyMsg);
      if (this.commentReplyMsg != "") {
        this.$api.httppost
          .comment({
            nid: this.postdel.id,
            type: 2,
            cid: this.showcommentid,
            body,
          })
          .then((res) => {
            let { code, msg, params } = res.data;
            if (code == 0) {
              this.$message({
                message: "评论成功",
                type: "success",
              });
              this.commentReplyMsg = "";
            }
          });
        this.getrouterdata();
      }

      this.showReplyinput = false;
    },
    getcommentid(item) {
      this.showReplyinput = true;
      console.log(this.showcommentid);
      this.showcommentid = item.id;
    },
    gotonewsdel(e) {
      this.$store.commit("newsList", e);
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
    },
    commentreply() {
      //评论回复
      let body = this.$inHTMLData(this.commentReplyMsg);
      this.$api.httppost
        .comment({
          nid: this.postdel.id,
          type: 2,
          cid: this.showcommentid,
          body,
        })
        .then((res) => {
          let { code, msg, params } = res.data;
          if (code == 0) {
            this.$message({
              message: "评论成功",
              type: "success",
            });
            this.commentReplyMsg = "";
          } else {
            if (msg == "token无效") {
              this.$message({
                message: "请重新登录",
                type: "warning",
              });
            } else {
              this.$message({
                message: msg,
                type: "warning",
              });
            }
          }
        });
      this.getrouterdata();
    },
    postcomment() {
      //给新闻添加评论
      let body = this.$inHTMLData(this.commentmsg);
      this.$api.httppost
        .comment({
          nid: this.postdel.id,
          type: 2,
          body,
        })
        .then((res) => {
          let { code, msg, params } = res.data;
          if (code == 0) {
            this.$message({
              message: "评论成功",
              type: "success",
            });
            this.commentmsg = "";
            this.getrouterdata();
          } else {
            if (msg == "token无效") {
              this.$message({
                message: "请重新登录",
                type: "warning",
              });
            } else {
              this.$message({
                message: msg,
                type: "warning",
              });
            }
          }
        });
    },
    getVisible(value) {
      //切换举报弹窗
      this.showreport = value;
    },
    showreportfn() {
      //举报弹窗

      console.log(this.showreport);
      this.showreport = !this.showreport;
    },
    star(item) {
      console.log(item);
      let type = 0;
      if (item.is_stared == 0) {
        type = 1;
      } else {
        type = 2;
      }
      //用户评论点赞
      let url1 = `${this.$api.httppost.star()}${item.id}/${type}`;
      this.$axios({
        method: "post",
        url: url1,
      }).then((res) => {
        let { code, params, msg } = res.data;
        if (code == 0) {
          console.log(params);
          this.$message({
            message: "成功",
            type: "success",
          });
          this.getrouterdata();
        } else {
          if (msg == "token无效") {
            this.$message({
              message: "请重新登录",
              type: "warning",
            });
          } else {
            this.$message({
              message: msg,
              type: "warning",
            });
          }
        }
      });
    },
    lookallreply(item) {
      //查看全部回复
      // this.showreply = false;
      console.log(this.showreply);
      this.$refs[`child${item.id}`][0].changeshow();
    },
    getrouterdata() {
      //获取新闻详情

      this.$axios({
        url: `${this.$api.homeindex.forumdel()}${this.$route.params.id}`,
      }).then((res) => {
        let { code, msg, params } = res.data;
        if (code == 0) {
          let { hotLive, comments, forum, promote, recent_visitor } = params;

          this.commentList = comments; //评论
          this.newsdel = forum; //贴子详情
          console.log(promote);
          this.recommend = promote; //新闻推荐
          this.accessList = recent_visitor;
          this.$store.commit("newslivedata", hotLive);

          let news_addtime = this.formDate(this.newsdel.forum_addtime);
          this.pageName = `${this.newsdel.forum_title}_【6789体育直播】`;
          this.metaList[0].content = `${this.newsdel.forum_body.replace(
            /<\/?.+?>/g,
            ""
          )}`; // description
          this.metaList[1].content = `${this.newsdel.forum_title}`; //name="keywords"
          this.metaList[2].content = `${news_addtime}`;
        }
      });
      // console.log(this.$api.homeindex.newsdel());
      // this.$axios({
      //   url: `${this.$api.homeindex.newsdel()}${this.newsList.id}`,
      // }).then((res) => {
      //   let {
      //     news,
      //     live_data,
      //     comments,
      //     promote,
      //     recentVisitor,
      //   } = res.data.params;
      //   this.newsdel = news[0];
      //   this.accessList = recentVisitor;
      //   this.recommend = promote;
      //   this.$store.commit("newslivedata", live_data);
      //   this.commentList = comments;
      //   console.log(this.commentList);
      // });
    },
    formDate(value) {
      let date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h =
        date.getHours().length <= 1
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    inithost() {
      this.host = host;
    },
    //去个人中心
    goPerson(value) {
      let uid = localStorage.getItem("user_uid");
      if (uid == value) {
        this.$router.push("/person");
      } else {
        console.log(value);
        this.$router.push({ name: "hishomeperson", params: { uname: value } });
      }
    },
    toNewsdel() {
      return false;
    },
  },
  components: {
    home_herder,
    livemenu,
    newslive,
    newstree: newstree,
    report,
    Footer,
  },
  created() {
    this.inithost();
    this.getrouterdata();
  },
  computed: {
    ...mapState(["newsList", "newsmenuswp", "postdel"]),
  },
  beforeRouteEnter(to, from, next) {
    console.log(from.path);
    next((vm) => {
      switch (from.name) {
        case "Home":
          vm.fromname.name = "首页";
          vm.fromname.path = from.path;
          break;
        case "Community":
          vm.fromname.name = "社区";
          vm.fromname.path = from.path;
          break;
        case "Communitydel":
          vm.fromname.name = "讨论区";
          vm.fromname.path = from.path;
          break;
      }
    });
  },
  mounted() {
    // console.log(this.newsList.id);
    // const dp = new DPlayer({
    //   container: document.getElementById("dplayer"),
    //   video: {
    //     url: this.videosrc,
    //   },
    // });
  },
};
</script>

<style lang="less" scoped>
.user_reply {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background-color: rgba(132, 132, 132, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  textarea {
    width: 816px;
    height: 91px;
    border: 1px solid #848484;
    padding: 10px;
    border-radius: 9px;
  }
}
.fabiao {
  background-color: #01a0fc;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 80px 0 0 5px;
}
.fabiao:hover {
  background-color: #555;
}
.report_div_com {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.newsdel {
  background: url("../../image/bj.jpg") 0 0 no-repeat,
    url("../../image/3.jpg") 800px 0 repeat;
  background-position: 0 0, 800px 0;
  background-size: 100%;
  position: relative;
}
.newsdel_content {
  font-size: 14px;
  margin-left: 29px + 279px;
  margin-top: 7px;
  width: 1090px;
  background-color: #ffffff;
  border-radius: 5px;
  .banner {
    width: 1112px;
    height: 97px;
    margin: 18px 17px;
  }
  .newsbody {
    margin: 30px 117px;
    line-height: 40px;
    .newsCoverUrl_div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .newsCoverUrl {
      width: 706px;
      height: 550px;
      margin: auto;
    }
  }
  .title_div {
    font-size: 24px;
    margin-top: 27px;
    display: flex;
    align-items: center;
    .newstype1 {
      background-image: url("../../image/liveclass.png");
      background-size: 100%;
      background-repeat: no-repeat;
      font-size: 14px;
      margin: 0 5px 0 58px;
      width: 38px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      color: #ffffff;
    }
  }
  .title_bottom {
    font-size: 16px;
    margin: 14px 0 0 107px;
    .title_bottom_time {
      color: #848484;
      margin-left: 26px;
    }
  }
  .share_div {
    display: flex;
    align-items: center;
    img {
      margin: 0 3px;
    }
  }
  .title_bottom_right {
    font-size: 14px;
    color: #848484;
    margin-right: 40px;
  }
  .favorites_div {
    .favorites_img {
      background-image: url("../../image/news/favorites.png");
      background-size: 100%;
      background-repeat: no-repeat;
      width: 18px;
      height: 17px;
    }
  }
  .favorites_div:hover .favorites_img {
    background-image: url("../../image/news/favorites1.png");
  }
  .favorites_div:hover .favorites {
    color: #1a90fc;
  }
  .comment_img {
    background-image: url("../../image/news/comment.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 18px;
    height: 17px;
  }
  .comment_div:hover .comment_img {
    background-image: url("../../image/news/comment1.png");
  }
  .comment_div:hover .comment {
    color: #1a90fc;
  }
  .report_img {
    background-image: url("../../image/news/report.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 18px;
    height: 17px;
  }
  .report_div:hover .report_img {
    background-image: url("../../image/news/report1.png");
  }
  .report_div:hover .report {
    color: #1a90fc;
  }
  .favorites_div,
  .comment_div,
  .report_div {
    margin-left: 37px;
  }
}
.interaction {
  padding-bottom: 20px;
  .access_header {
    display: flex;
    margin-left: 49px;
    align-items: center;
    border-bottom: 1px solid #ececec;
    .access_header_img {
      width: 33px;
      height: 50px;
    }
    .access {
      font-size: 22px;
      color: #848484;
    }
  }
}
.showavatar_div {
  margin-top: 5px;
  margin-left: 47px;
  padding-left: 70px;
  border-bottom: 1px solid #848484;
  text-align: center;
  color: #848484;
  font-size: 14px;
  .showavatar_img {
    width: 70px;
    height: 70px;
  }
}
.comment_content {
  margin-top: 30px;
  .remind {
    color: #848484;
    font-size: 14px;
    margin: 9px 0 0 5px;
  }
}
.user_comment_div {
  margin: 0 50px 0 50px;
  padding: 19px 0 19px 38px;
  border-bottom: 1px solid #848484;
  .user_comment_img {
    img {
      width: 50px;
      height: 50px;
    }
  }
  .user_comment {
    textarea {
      width: 816px;
      height: 91px;
      border: 1px solid #848484;
      padding: 10px;
      border-radius: 9px;
    }
  }
}
.otheruser_comment_div {
  margin: 0 92px;
  .otheruser_comment {
    border-bottom: solid 1px #848484;
    margin-top: 30px;
  }
  .otheruser_img {
    img {
      width: 50px;
      height: 50px;
    }
  }
  .otheruser_name {
    color: #1a90fc;
    margin-right: 10px;
  }
  .otheruser_msg {
    margin: 20px 0;
    width: 900px;
    word-wrap: break-word;
  }
  .otheruser_msg:hover {
    color: #1a90fc;
  }
  .otherusergoodreply {
    color: #848484;
    margin-bottom: 19px;
    .otherusergood {
      display: flex;
      align-items: center;
      .otheruser_goods_img {
        background-image: url("../../image/news/goods.png");
        background-size: 100%;
        background-repeat: no-repeat;
        width: 13px;
        height: 13px;
      }
    }
    .otherusergood:hover {
      color: #1a90fc;
    }
    .otherusergood:hover .otheruser_goods_img {
      background-image: url("../../image/news/goods1.png");
    }
    .otheruserreply {
      display: flex;
      align-items: center;
      margin-left: 20px;
      .otheruser_reply_img {
        width: 13px;
        height: 13px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url("../../image/news/reply.png");
      }
    }
    .otheruserreply:hover {
      color: #1a90fc;
    }
    .otheruserreply:hover .otheruser_reply_img {
      background-image: url("../../image/news/reply1.png");
    }
  }
  .replynum,
  .otherusergoodreply {
    // margin-left: 50px;
    color: #848484;
  }
  .replay_child {
    margin-left: 50px;
  }
  .otheruser_time {
    color: #848484;
  }
  .lookmore {
    display: inline-block;
    line-height: 28px;
    color: #1a90fc;
    border: 1px solid #1a90fc;
    text-align: center;
    padding: 0 20px;
    border-radius: 15px;
    margin: 20px auto;
  }
}
.tuijian_div {
  .tuijian_img {
    margin: 15px 28px 0 104px;
    img {
      height: 95px;
      width: 142px;
    }
  }
  .tuijian_title_div {
    .tuijian_title {
      font-size: 18px;
      margin-top: 37px;
    }
    .tuijian_time {
      margin-top: 21px;
      color: #848484;
    }
  }
}
.tuijian_div:hover {
  background-color: #f7f7f7;
}
a {
  color: inherit;
}
</style>