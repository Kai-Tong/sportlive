<template>
  <div class="communitydel cl">
    <home_herder :headerKey="headerKey"></home_herder>
    <livemenu ref="livemenu" @delsort="getdeldata"></livemenu>
    <div class="communitydel_content boxshadow left">
      <div class="communitydel_header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/community' }"
            >社区</el-breadcrumb-item
          >
          <el-breadcrumb-item>讨论区</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="banner">
        <img src="../../image/bj.jpg" alt="" />
      </div>
      <div class="serach cl">
        <div class="cl right serach_div cu">
          <input
            type="text"
            class="serachinput right"
            placeholder="搜索热门话题"
            @click="gotosearch()"
          />
          <div class="sousuodiv"></div>
        </div>
      </div>
      <div class="communitydel_main">
        <div class="main_header cl">
          <div class="left">
            <img :src="communitydel.ch_logo" alt="" />
          </div>
          <div class="main_header_right left">
            <div class="cl">
              <div class="comm_header_type left">
                {{ communitydel.ch_name }}
              </div>
              <div class="left joincom cu" @click="joincommunity()">
                {{ actionmsg }}
              </div>
            </div>
            <div class="comm_num">
              今日发帖：{{ statistc.today_count }} / 昨日发帖：
              {{ statistc.total }} / 总共累计发帖：{{
                statistc.yesterday_count
              }}
            </div>
            <div class="introduction">社区介绍：{{ communitydel.ch_desc }}</div>
          </div>
        </div>
        <div class="cl release_div">
          <div class="left release cu" @click="gotopublish()"></div>
          <div class="right pageination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagination.page_size"
              layout="prev, pager, next, jumper"
              :total="pagination.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="main_data">
          <div class="main_title cl">
            <div class="left main_title_left cl">
              <div
                :class="
                  item.id == newsclick ? 'left news cu click' : 'left news cu'
                "
                v-for="(item, index) in sortList"
                :key="item.id"
                @click="delsort(item)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="right main_title_right cl">
              <div class="author left">作者</div>
              <div class="replybrowse left">回复 / 浏览</div>
              <div class="left lastreply">最后回复</div>
            </div>
          </div>
          <div class="cl">
            <div
              v-for="(item, index) in commdata"
              :key="index"
              class="cl main_content"
              @click="gotopostdetails(item)"
            >
              <div class="main_content_left left cl">
                <div class="cl left">
                  <div class="centerimg">
                    <div class="comm_type left"></div>
                    <div class="main_content_title left">
                      {{ item.forum_title }}
                    </div>
                    <!-- <img src="../../image/cmm/imgs.png" alt="" /> -->
                  </div>
                </div>
              </div>
              <div class="main_content_right right cl">
                <div class="left main_content_right_author_div">
                  <div>{{ item.forum_owner }}</div>
                  <div class="c555">{{ item.forum_addtime | formDate }}</div>
                </div>
                <div class="left main_content_right_reply_div">
                  <div>
                    {{ item.forum_comments }}
                  </div>
                  <div class="c555">
                    {{ item.forum_views }}
                  </div>
                </div>
                <div class="left main_content_right_last_div">
                  <div>
                    {{ item.forum_comments_ower }}
                  </div>
                  <div class="c555">
                    {{ item.forum_comments_time | formDate }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="community_menu boxshadow left cl">
      <div class="community_menu_header">今日热门推荐</div>
      <div class="cl">
        <div class="community_menu_header_bot_left left"></div>
        <div class="community_menu_header_bot_right left"></div>
      </div>
      <div class="community_menu_main">
        <div
          class="cl com_menu_for"
          v-for="(item, index) in menudata"
          :key="index"
          @click="gotopostdetails(item)"
        >
          <div class="left menu_type_div">
            <span class="menu_type ov">{{ communitydel.ch_columnm_name }}</span>
            <span>
              {{ item.forum_title }}
            </span>
          </div>
          <div class="lookdel centerimg">
            查看
            <span></span>
          </div>
        </div>
        <!-- <div class="lookmorr">查看更多</div> -->
      </div>
    </div>
    <div class="left footermargin">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import host from "../../api/httpurl";
const home_herder = () => import("../../components/home/home_herder");
const livemenu = () => import("../../components/live/livemenu");
const Footer = () => import("../../components/footer/footer1");
export default {
  metaInfo: {
    title: `6789直播讨论区_【6789体育直播】`,
    meta: [
      {
        // set meta
        name: "description",
        content:
          "6789体育直播为您比赛直播,6789体育直播是国内最好的体育直播网站之一,主要提供足球直播,NBA直播,等国内外体育赛事直播,我们一直最用心。",
      },
      {
        name: "keywords",
        content: "足球直播,6789直播,体育直播,NBA直播",
      },
      {
        property: "release_date",
        content: "release_date",
      },
    ],
  },
  data() {
    return {
      headerKey: "4",
      commdata: [], //讨论区贴子数据
      currentPage3: 5,
      menudata: [], //热门帖子推荐
      statistc: [], //帖子数量
      pagination: [], //分页数据
      action: 0, //是否已经加入社区
      likemenu: [], //已经关注的社区列表
      actionmsg: "+加入社区", //动态显示是否加入社区
      sortList: [
        //排序方式
        {
          id: 1,
          name: "最新",
        },
        {
          id: 2,
          name: "热门",
        },
        {
          id: 3,
          name: "精华",
        },
        {
          id: 4,
          name: "发帖时间",
        },
        {
          id: 5,
          name: "回复时间",
        },
      ],
      newsclick: 1,
      p: 1, //翻页
    };
  },
  methods: {
    gotopublish() {
      this.$router.push("/publish");
    },
    gotopostdetails(item) {
      //跳转贴子详情页面
      this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });
      this.$store.commit("postdel", item);
    },
    delsort(item) {
      this.newsclick = item.id;
      let cid = this.communitydel.id;
      this.$api.homeindex
        .fourm({
          cid,
          order: item.id,
        })
        .then((res) => {
          let { code, params, msg } = res.data;
          if (code == 0) {
            let { statistc, forum, pagination, promote_forum } = params;
            this.statistc = statistc; //发帖数量
            this.pagination = pagination; //分页数据
            this.menudata = promote_forum; //热门贴子推荐
            this.commdata = forum; //贴子列表
          } else {
            this.$message({
              message: msg,
              type: "warning",
            });
          }
        });
    },
    trigger() {
      this.$refs.livemenu.getlivemenu();
      this.judgment();
    },
    async joincommunity() {
      let url = `${this.$api.httppost.follow1()}`;
      this.$refs.livemenu.getlivemenu();
      this.$axios({
        method: "post",
        url,
        data: {
          type: 1,
          action: this.action,
          channel: this.communitydel.id,
        },
      }).then((res) => {
        let { code, msg, params } = res.data;
        let pipi = "";
        if (code == 0) {
          switch (this.action) {
            case 0:
              pipi = "加入社区成功";
              this.likemenu.push(this.communitydel);
              break;
            default:
              pipi = "退出社区成功";
              this.likemenu = this.likemenu.filter(
                (item) => item.id !== this.communitydel.id
              );
              break;
          }
          this.trigger();
          this.$message({
            message: pipi,
            type: "success",
            duration: 500,
          });
        }
      });
    },
    handleLikeID() {
      const likeId = this.likemenu.map((item) => {
        return item.id;
      });
      return likeId;
    },
    judgment() {
      //判断是否存在关注列表

      if (this.likemenu.length == 0) {
        this.action = 0;
        this.actionmsg = "+加入社区";
      } else {
        const likeId = this.handleLikeID() || [];
        if (likeId.includes(this.communitydel.id)) {
          this.action = 1;
          this.actionmsg = "-退出社区";
        } else {
          this.action = 0;
          this.actionmsg = "+加入社区";
        }
      }
    },
    gotopostdel() {
      this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //分页请求
      this.p = val;
      this.getdeldata();
    },
    getdeldata() {
      //获取社区讨论区
      let cid = this.communitydel.id;
      this.$api.homeindex
        .fourm({
          cid,
          p: this.p,
        })
        .then((res) => {
          let { code, params, msg } = res.data;
          if (code == 0) {
            let { statistc, forum, pagination, promote_forum } = params;
            this.statistc = statistc; //发帖数量
            this.pagination = pagination; //分页数据
            this.menudata = promote_forum; //热门贴子推荐
            this.commdata = forum; //贴子列表
          } else {
            this.$message({
              message: msg,
              type: "warning",
            });
          }
        });
      // this.$api.homeindex.livevideo({}).then(res=>{
      //   let {code,params,msg} = res.data

      //   console.log(params)
      // })
    },
    gotosearch() {
      //跳转搜索页面
      this.$router.push("/search");
    },
    inithost() {
      //重置图片
      this.host = host;
    },
  },
  components: {
    home_herder,
    livemenu,
    Footer,
  },
  computed: {
    ...mapState(["communitydel", "menulike"]),
    menulikefn() {
      return this.$store.state.menulike;
    },
  },
  watch: {
    // menulikefn(newValue) {
    //   this.likemenu = newValue;
    // },
    action(newValue) {
      this.action = newValue;
    },
  },
  created() {
    this.likemenu = this.menulike;
    this.judgment();
    this.inithost();
    this.getdeldata();
  },
};
</script>

<style lang="less" scoped>
.communitydel {
  background: url("../../image/bj.jpg") 0 0 no-repeat,
    url("../../image/3.jpg") 800px 0 repeat;
  background-position: 0 0, 800px 0;
  background-size: 100%;
  font-size: 14px;
  .communitydel_content {
    background-color: #fff;
    border-radius: 5px;
    margin: 20px 0 0 307px;
    width: 1166px;
    .communitydel_header {
      margin-left: 19px;
      padding-left: 14px;
      border-left: 5px solid #014581;
      color: #555 !important;
      .el-breadcrumb {
        margin: 11px 0;
      }
      .el-breadcrumb__inner a,
      .el-breadcrumb__inner .is-link {
        color: #555 !important;
      }
    }
    .banner {
      margin: auto;
      width: 1060px;
      height: 120px;
      img {
        width: 1060px;
        height: 120px;
      }
    }
    .serach {
      height: 35px;
      margin: 7px 0;
      .serach_div {
        position: relative;
        margin-right: 81px;
      }
      .serachinput {
        width: 421px;
        height: 35px;
        background-color: #e1e2e4;
        padding-left: 10px;
        border: 1px solid #dedede;
        border-radius: 17px;
      }
      .sousuodiv {
        background-image: url("../../image/news/sousuo.png");
        background-size: 100%;
        width: 29px;
        height: 29px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10px;
        margin: auto;
      }
      .sousuodiv:hover {
        background-image: url("../../image/news/sousuo1.png");
      }
    }
    .communitydel_main {
      .main_header {
        padding-bottom: 28px;
        margin-left: 34px;
        border-bottom: 1px solid #dedede;
        img {
          width: 135px;
          height: 135px;
          border-radius: 50%;
          border: 1px solid #dedede;
          margin-left: 44px;
        }
        .main_header_right {
          .comm_header_type {
            font-size: 18px;
            color: #01a0fc;
            line-height: 30px;
          }
          .joincom {
            margin-left: 11px;
            line-height: 28px;
            font-size: 16px;
            color: #555;
            border: 1px solid #555;
            border-radius: 14px;
            width: 105px;
            text-align: center;
          }
          .joincom:hover {
            background-color: #f6f6f6;
          }
          .comm_num,
          .introduction {
            color: #555;
            margin-left: 9px;
            line-height: 50px;
          }
        }
      }
      .release_div {
        margin: 18px 0 17px 0;
        .release {
          background-image: url("../../image/cmm/release.png");
          background-size: 100%;
          width: 113px;
          height: 39px;
          margin-left: 52px;
        }
        .pageination {
          margin-right: 35px;
        }
      }
      .release:hover {
        background-image: url("../../image/cmm/release1.png");
      }
      .main_data {
        margin: 0 35px;
        .main_title {
          color: #014581;
          background-color: #e1f1fe;
          padding-left: 20px;
          height: 45px;
          .main_title_left {
            .news {
              margin-right: 20px;
              height: 44px;
              line-height: 44px;
              text-align: center;
            }
            .news:hover {
              color: #01a1fc;
              // box-shadow: 0 1px 1px -1px #01a0fc;
              border-bottom: 1px solid #01a0fc;
            }
            .click {
              color: #01a1fc;
            }
          }
          .main_title_right {
            line-height: 44px;
            text-align: center;
            .author {
              width: 152px;
            }
            .replybrowse {
              width: 133px;
            }
            .lastreply {
              width: 138px;
            }
          }
        }
        .main_content {
          padding: 28px 0 16px 18px;
          border-bottom: 1px solid #dedede;
          .main_content_left {
            width: 622px;
            .comm_type {
              width: 39px;
              height: 22px;
              background-image: url("../../image/cmm/top.png");
              background-size: 100%;
            }
            .main_content_title {
              font-size: 18px;
              line-height: 34px;
              height: 34px;
              margin: 0 10px;
            }
            .main_content_del {
              width: 552px;
              color: #555;
              padding-left: 50px;
              line-height: 25px;
            }
          }
          .main_content_right {
            .c555 {
              color: #555;
            }
            .main_content_right_author_div {
              width: 152px;
              line-height: 19px;
              text-align: center;
              .main_content_right_time {
                color: #555;
              }
            }
            .main_content_right_reply_div {
              width: 133px;
              line-height: 19px;
              text-align: center;
            }
            .main_content_right_last_div {
              width: 138px;
              line-height: 19px;
              text-align: center;
            }
          }
        }
        .main_content:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
  .community_menu {
    width: 370px;
    margin-top: 20px;
    margin-left: 9px;
    padding: 0 11px;
    border-radius: 5px;
    background-color: #fff;
    border-top: 4px solid #01a0fc;
    .community_menu_header {
      margin: 18px 0;
      color: #01a0fc;
      padding-left: 11px;
      border-left: 5px solid #014581;
    }
    .community_menu_header_bot_left {
      height: 2px;
      width: 49%;
      margin-right: 2%;
      background-color: #01a0fc;
    }
    .community_menu_header_bot_right {
      height: 2px;
      width: 49%;
      background-color: #dedede;
    }
    .community_menu_main {
      .com_menu_for {
        position: relative;
        border-bottom: 1px solid #dedede;
        background-color: #fff;
      }
      .menu_type_div {
        width: 280px;
        margin: 11px 8px;
        font-size: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; //控制行数
        overflow: hidden;
      }
      .menu_type {
        background-image: url("../../image/liveclass.png");
        background-size: 100%;
        display: inline-block;
        width: 38px;
        height: 22px;
        font-size: 14px;
        color: #fff;
        line-height: 22px;
        text-align: center;
      }
      .lookdel {
        position: absolute;
        bottom: 15px;
        right: 10px;
        color: #555;
        span {
          display: inline-block;
          background-image: url("../../image/cmm/more.png");
          background-size: 100%;
          width: 14px;
          height: 11px;
        }
      }
      .com_menu_for:hover {
        background-color: #f8f9f9;
      }
      .com_menu_for:hover .lookdel {
        color: #01a0fc;
        span {
          background-image: url("../../image/cmm/more1.png");
        }
      }
      .lookmorr {
        color: #0190fc;
        border: 1px solid #0190fc;
        width: 125px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 14px;
        margin: 24px auto;
      }
    }
  }
}
</style>