<template>
  <div class="community cl">
    <home_herder :headerKey="headerKey"></home_herder>
    <livemenu></livemenu>
    <div class="community_content boxshadow left">
      <div class="menu_header">
        <div class="cl">
          <div class="left menu_header_foot"></div>
          <div class="menu_header_foot_class left">
            <div
              class="left menu_header_foot_class_title cu ov"
              v-for="(item, index) in footer_menu"
              :key="item.ch_columnm + index"
              @click="gotocommunitydel(item)"
            >
              {{ item.ch_name }}
            </div>
            <div
              class="left moremenu cu ov"
              v-if="footerMore != false"
              @click="showMoreMenu(0)"
            >
              更多>
              <div class="footerMoreMenu" v-show="footerflag">
                <div
                  v-for="(item, index) in footerMore"
                  :key="item.ch_desc + index"
                  class="footerMoreMenudel"
                  @click="gotocommunitydel(item)"
                >
                  {{ item.ch_name }}
                </div>
              </div>
            </div>
          </div>
          <!-- 篮球栏目 -->
          <div class="left menu_header_bsb"></div>
          <div class="menu_header_foot_class left">
            <div
              class="left menu_header_foot_class_title cu ov"
              v-for="(item, index) in basket_menu"
              :key="item.ch_reply_num + index"
              @click="gotocommunitydel(item)"
            >
              {{ item.ch_name }}
            </div>
            <div
              class="left moremenu cu ov"
              v-if="basketMore != false"
              @click="showMoreMenu(1)"
            >
              更多>
              <div class="footerMoreMenu" v-show="basketflag">
                <div
                  v-for="(item, index) in basketMore"
                  :key="item.ch_desc + index"
                  class="footerMoreMenudel"
                  @click="gotocommunitydel(item)"
                >
                  {{ item.ch_name }}
                </div>
              </div>
            </div>
          </div>
          <!-- 综合栏目 -->
          <div class="left menu_header_translation"></div>
          <div class="menu_header_foot_class left">
            <div
              class="left menu_header_foot_class_title cu ov"
              v-for="(item, index) in complex_menu"
              :key="index"
              @click="gotocommunitydel(item)"
            >
              {{ item.ch_name }}
            </div>
            <div
              class="left moremenu cu ov"
              v-if="complexMore != false"
              @click="showMoreMenu(2)"
            >
              更多>
              <div class="footerMoreMenu" v-show="complexflag">
                <div
                  v-for="(item, index) in complexMore"
                  :key="item.ch_desc + index"
                  class="footerMoreMenudel"
                  @click="gotocommunitydel(item)"
                >
                  {{ item.ch_name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search_div cl">
        <div class="left search_div_left" @click="serach(searchmsg)">
          <input
            type="text"
            class="serarch_input"
            placeholder="请输入搜索内容"
            v-model="searchmsg"
          />
          <img
            src="../../image/news/sousuo.png"
            alt=""
            class="cu search_div_left_img"
          />
        </div>
        <div class="right search_div_right cl">
          <div class="todaypost left">今日发帖：{{ todaypost }}</div>
          <i class="left">|</i>
          <div class="yesterdaypost left">昨日发帖：{{ yesterdaypost }}</div>
          <i class="left">|</i>
          <div class="totalpost left">总共累计发帖：{{ totalpost }}</div>
        </div>
      </div>
      <!-- 足球社区 -->
      <div class="footertitle" v-show="listfooterdata != false"></div>
      <div class="footer_content_div">
        <div
          class="cl footer_content"
          v-for="(item, index) in listfooterdata"
          :key="item.id + index"
          @click="gotopostdetails(item)"
        >
          <div class="footer_content_left left">
            <div class="cl footer_content_left_titleheader">
              <div class="footer_type left">{{ item.columnm }}</div>
              <a
                :href="postdelUrl + item.id + '.html'"
                v-on:click.prevent="toPostdel"
              >
                <div class="footer_title left">
                  {{ item.forum_title }}
                </div>
              </a>
            </div>

            <div class="cl footer_content_belong">
              <div class="left cl">
                <div class="left footer_name">
                  {{ item.ch_owner }}
                </div>
                <div class="left footer_time">
                  {{ item.forum_owner }}
                  {{ item.forum_addtime | formDate }}
                </div>
              </div>
              <div class="right cl">
                <div class="left centerimg">
                  <div class="footer_commnum_img"></div>
                  <div>评论：</div>
                  <div>
                    {{ item.forum_comments }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer_content_right left cl">
            <div class="footer_content_right_div right">
              <div>
                {{ item.ch_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="centerimg more_div">
        <div class="more cu"></div>
      </div> -->
      <!-- 篮球社区 -->
      <div class="bsktitle" v-show="listbasketdata != false"></div>
      <div class="footer_content_div">
        <div
          class="cl footer_content"
          v-for="(item, index) in listbasketdata"
          :key="item.ch_views_num + index"
          @click="gotopostdetails(item)"
        >
          <div class="footer_content_left left">
            <div class="cl footer_content_left_titleheader">
              <div class="footer_type left">{{ item.columnm }}</div>
              <a
                :href="postdelUrl + item.id + '.html'"
                v-on:click.prevent="toPostdel"
              >
                <div class="footer_title left">
                  {{ item.forum_title }}
                </div>
              </a>
            </div>

            <div class="cl footer_content_belong">
              <div class="left cl">
                <div class="left footer_name">
                  {{ item.ch_owner }}
                </div>
                <div class="left footer_time">
                  {{ item.forum_addtime | formDate }}
                </div>
              </div>
              <div class="right cl">
                <div class="left centerimg">
                  <div class="footer_commnum_img"></div>
                  <div>评论：</div>
                  <div>
                    {{ item.ch_reply_num }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer_content_right left cl">
            <div class="footer_content_right_div right">
              <div>
                {{ item.ch_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="centerimg more_div">
        <div class="more cu"></div>
      </div> -->
      <!-- 综合社区 -->
      <div
        class="translationtitle"
        v-show="listcomplexdata != false && listcomplexdata != undefined"
      ></div>
      <div class="footer_content_div">
        <div
          class="cl footer_content"
          v-for="(item, index) in listcomplexdata"
          :key="item.ch_name + index"
          @click="gotopostdetails(item)"
        >
          <div class="footer_content_left left">
            <div class="cl footer_content_left_titleheader">
              <div class="footer_type left">{{ item.columnm }}</div>
              <a
                :href="postdelUrl + item.id + '.html'"
                v-on:click.prevent="toPostdel"
              >
                <div class="footer_title left">
                  {{ item.forum_title }}
                </div>
              </a>
            </div>
            <div class="cl footer_content_belong">
              <div class="left cl">
                <div class="left footer_name">
                  {{ item.ch_owner }}
                </div>
                <div class="left footer_time">
                  {{ item.forum_addtime | formDate }}
                </div>
              </div>
              <div class="right cl">
                <div class="left centerimg">
                  <div class="footer_commnum_img"></div>
                  <div>评论：</div>
                  <div>
                    {{ item.ch_reply_num }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer_content_right left cl">
            <div class="footer_content_right_div right">
              <div>
                {{ item.ch_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <!-- <div class="centerimg more_div">
        <div class="more cu"></div>
      </div> -->
    </div>
    <div class="left footermargin">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const home_herder = () => import("../../components/home/home_herder");
const livemenu = () => import("../../components/live/livemenu");
const Footer = () => import("../../components/footer/footer1");
export default {
  metaInfo: {
    title: `社区_6789直播_6789体育直播足球直播NBA直播体育直播_【高清】`,
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
      postdelUrl: "http://dev.6789zbz.com/front/postdetails/",
      headerKey: "4",
      footer_menu: [], //足球社区
      footerMore: [], //足球社区更多
      footerflag: false, //足球社区显示
      basket_menu: [], //篮球社区
      basketMore: [], //篮球社区更多
      basketflag: false, //篮球社区显示
      complex_menu: [], //综合社区
      complexMore: [], //综合社区更多
      complexflag: false, //综合社区显示
      serachMsg: "",
      todaypost: 0,
      yesterdaypost: 0,
      listfooterdata: [], //足球评论区
      listbasketdata: [], //篮球评论区
      listcomplexdata: [], //综合评论区
      totalpost: 0,
      hotmenu: [],
      searchmsg: "",
    };
  },
  methods: {
    gotopostdetails(item) {
      this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });
      this.$store.commit("postdel", item);
    },
    gotocommunitydel(item) {
      //跳转话题社区
      this.$router.push("/communitydel");
      this.$store.commit("communitydel", item);
    },
    getdata() {
      this.$api.homeindex.fourm({}).then((res) => {
        let { forum, statistc } = res.data.params;
        let { today_count, total, yesterday_count } = statistc;
        this.todaypost = today_count;
        this.yesterdaypost = yesterday_count;
        this.totalpost = total;
        this.listfooterdata = forum[1];
        this.listbasketdata = forum[2];
        this.listcomplexdata = forum[3];
        // console.log(this.listcomplexdata == undefined);
      });
    },
    serach(msg) {
      this.$router.push("/search");
    },
    gotocommdel(item) {
      this.$store.commit("postdel", item);
      this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });
    },
    toPostdel() {
      return false;
    },
    showMoreMenu(e) {
      //查看更多栏目
      switch (e) {
        case 0:
          this.footerflag = !this.footerflag;
          break;
        case 1:
          this.basketflag = !this.basketflag;
          break;
        case 2:
          this.complexflag = !this.complexflag;
          break;
      }

      console.log(this.footerflag);
    },
    judgeMenu() {
      let channelList = this.channel;
      let data = [];
      for (let i = 0; i < channelList.length; i++) {
        if (i == 0) {
          if (channelList[i].length > 6) {
            this.footer_menu = channelList[i].slice(0, 5);
            this.footerMore = channelList[i].slice(5);
          } else {
            this.footer_menu = channelList[i];
          }
        } else if (i == 1) {
          if (channelList[i].length > 6) {
            this.basket_menu = channelList[i].slice(0, 5);
            this.basketMore = channelList[i].slice(5);
          } else {
            this.basket_menu = channelList[i];
          }
        } else if (i > 1) {
          let xixi = channelList[i]
          for(let t =0;t<xixi.length;t++){
            data.push(xixi[t])
          }
          if (data.length > 6) {
            this.complex_menu = data.slice(0, 5);
            this.complexMore = data.slice(5);
          } else {
            this.complex_menu = data;
          }
        }
      }
    },
  },
  computed: {
    ...mapState([
      "channel",
    ]),
    channelfn() {
      return this.$store.state.channel;
    },
  },
  watch: {
    channelfn(newValue) {
      this.judgeMenu();
    },
  },
  components: {
    home_herder,
    livemenu,
    Footer
  },
  created() {
    this.getdata(this.footer_menu);
  },
};
</script>

<style lang="less" scoped>
.moremenu {
  width: 33%;
  line-height: 34px;
  text-align: center;
  color: #555;
}

.footerMoreMenu {
  width: 90px;
  position: absolute;
  z-index: 999;
  border-radius: 5px;
  .footerMoreMenudel {
    text-align: center;
    background-color: #fff;
    border: 1px solid rgb(167, 160, 160);
    border-radius: 5px;
  }
  .footerMoreMenudel:hover {
    background-color: #f7f7f7;
    color: #01a0fc;
  }
}
.community {
  background: url("../../image/bj.jpg") 0 0 no-repeat,
    url("../../image/3.jpg") 800px 0 repeat;
  background-position: 0 0, 800px 0;
  background-size: 100%;
  font-size: 14px;
}
.community_content {
  width: 1165px;
  margin: 20px 0 20px 327px;
  border-radius: 5px;
  background: #fff;
  .menu_header {
    background-color: #fff;
    border-bottom: 1px solid #e2f1fe;
    .menu_header_foot {
      background-image: url("../../image/cmm/foot.png");
      background-size: 100%;
      width: 116px;
      height: 68px;
      background-color: #e2f1fe;
    }
    .menu_header_bsb {
      background-image: url("../../image/cmm/bsb.png");
      background-size: 100%;
      width: 116px;
      height: 68px;
      background-color: #e2f1fe;
    }
    .menu_header_translation {
      background-image: url("../../image/cmm/translation.png");
      background-size: 100%;
      width: 116px;
      height: 68px;
      background-color: #e2f1fe;
    }
    .menu_header_foot_class {
      width: 270px;
      height: 68px;
      overflow: hidden;
      .menu_header_foot_class_title {
        width: 33%;
        line-height: 34px;
        text-align: center;
        color: #555;
      }
      .menu_header_foot_class_title:hover {
        color: #01a0fc;
      }
    }
  }
  .search_div {
    margin: 13px 46px;
    .search_div_left {
      position: relative;
      .serarch_input {
        width: 468px;
        height: 35px;
        line-height: 35px;
        border-radius: 17px;
        background-color: #e1e2e4;
        border: 1px solid #dedede;
        padding-left: 20px;
      }
      .search_div_left_img {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 15px;
        margin: auto;
      }
    }
    .search_div_right {
      color: #555;
      line-height: 35px;
      .todaypost {
        margin-right: 5px;
      }
      .yesterdaypost {
        margin: 0 5px;
      }
      .totalpost {
        margin-left: 5px;
      }
    }
  }
  .footertitle {
    background-image: url("../../image/cmm/foottitle.png");
    background-size: 100%;
    width: 1094px;
    height: 50px;
    margin-left: 34px;
  }
  .footer_content {
    border-bottom: 1px solid #dedede;
    margin: 0 58px;
    text-align: center;
    padding: 18px 0;
    .footer_content_left_titleheader {
      .footer_type {
        background-image: url("../../image/liveclass.png");
        background-size: 100%;
        color: #fff;
        width: 38px;
        height: 22px;
        line-height: 22px;
      }
      .footer_title {
        font-size: 18px;
        margin-left: 18px;
      }
    }
    .footer_content_del {
      margin: 14px 0 0 55px;
      text-align: left;
      color: #555;
      width: 608px;
    }
    .footer_content_belong {
      width: 705px;
      margin: 18px 0 0 55px;
      .footer_goods_div {
        margin-left: 20px;
        .footer_goods_img {
          background-image: url("../../image/cmm/goods.png");
          background-size: 100%;
          width: 16px;
          height: 16px;
        }
      }
      .footer_time {
        color: #555;
        margin-left: 23px;
      }

      .footer_commnum_img {
        background-image: url("../../image/cmm/comment.png");
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
    }
    .footer_content_right {
      width: 277px;
      .footer_content_right_div {
        margin-right: 20px;
        .footer_content_right_avatar {
          width: 54px;
          height: 54px;
          border: 1px solid #dedede;
          border-radius: 50%;
        }
      }
    }
  }
  .footer_content:hover {
    background-color: #f6f6f6;
  }
  .bsktitle {
    background-image: url("../../image/cmm/bsbtitle.png");
    background-size: 100%;
    width: 1094px;
    height: 50px;
    margin-left: 34px;
    margin-top: 10px;
  }
  .translationtitle {
    background-image: url("../../image/cmm/translationtitle.png");
    background-size: 100%;
    width: 1094px;
    height: 50px;
    margin-left: 34px;
    margin-top: 10px;
  }
  .more_div {
    margin: 16px 0 10px 0;
    .more {
      background-image: url("../../image/cmm/unfoldicon.png");
      width: 17px;
      height: 14px;
      background-size: 100%;
    }
    .more:hover {
      background-image: url("../../image/cmm/unfoldicon1.png");
    }
  }
}
.footer_content_div {
  margin-bottom: 30px;
}
a {
  color: inherit;
}
</style>