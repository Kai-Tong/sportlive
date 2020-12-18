<template>
  <div class="home_content cl">
    <!-- 直播信息左半部分 -->
    <div class="cl homecontentleft left">
      <div class="newsheader">
        <div class="newstitle">新闻热点</div>
        <div class="newstitle_en">NEWS HOTSPOT</div>
      </div>
      <div class="swp left">
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="(item, index) in swiperdata" :key="item.id">
            <a
              :href="newdelUrl + item.id + '.html'"
              v-on:click.prevent="toNewsdel"
            >
              <img
                :src="item.news_cover_url"
                alt=""
                class="swiper_img"
                @click="gotonewsdel(item)"
              />
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 足球部分 -->
      <div class="foot_div left cl">
        <div>
          <div class="foot_divsort cl">
            <span class="foot_divsort_div">足球</span>
            <span class="foot_divsort_div1">FOOTBALL</span>
          </div>

          <div class="cl footer_content boxshadow">
            <div class="cl footerheader">
              <div class="football_class left">
                <div class="centerimg left img_div">
                  <img
                    src="../../image/titleicon.png"
                    class="titleicon"
                    alt=""
                  />
                </div>
                <div
                  v-for="(item, index) in footerball"
                  :key="index"
                  class="foot_span"
                >
                  <span
                    @click="changtype(index, item)"
                    :class="index == footballflag ? 'footerclick lili' : 'lili'"
                    >{{ item }}</span
                  >
                  <i>|</i>
                </div>
              </div>
              <span class="cu right morespan" @click="gotonew()">更多》</span>
            </div>
            <div class="livemsg cl">
              <div
                v-for="(item, key, index) in footerballdata"
                :key="item.id"
                class="live_div left cu"
                @click="gotonewsdel(item)"
              >
                <div class="live_img_div">
                  <img :src="item.news_cover_url" alt="" class="live_img" />
                </div>
                <span class="live_title ov">{{ item.news_title }}</span>
              </div>
            </div>
            <div class="communitymsg_header cl">
              <div class="left centerimg">
                <div class="centerimg left img_div">
                  <img
                    src="../../image/titleicon.png"
                    class="titleicon"
                    alt=""
                  />
                </div>
                <div class="left footercomm">足球社区</div>
              </div>
              <div class="right cu morespan" @click="gotocommunity()">
                更多》
              </div>
            </div>
            <div class="communitymsg">
              <div
                v-for="(item, key, index) in forum_foottball"
                :key="item.id"
                class="communitymsg_div cl cu"
                @click="gotopostdetails(item)"
              >
                <div class="communitymsg_class left">{{ item.ch_name }}</div>
                <div class="communitymsg_title left">
                  标题 ： {{ item.forum_title }}
                </div>
                <div class="communitymsg_time right">
                  {{ item.forum_addtime | formDate }}
                </div>
              </div>
            </div>
            <div v-if="forum_foottball == false">暂无内容</div>
          </div>
        </div>
      </div>
      <!-- 篮球 -->
      <div class="foot_div left">
        <div class="bbk_divsort cl">
          <div class="bbk_divsort_div">篮球</div>
          <div class="bbk_divsort_div1">BASKETBALL</div>
        </div>

        <div class="cl footer_content boxshadow">
          <div class="cl footerheader">
            <div class="football_class left">
              <div class="centerimg left img_div">
                <img src="../../image/titleicon.png" class="titleicon" alt="" />
              </div>
              <div
                v-for="(item, key, index) in baskeball"
                :key="key"
                class="foot_span"
              >
                <span
                  @click="changtype1(key, item)"
                  :class="key == baskeballflag ? 'footerclick lili' : 'lili'"
                  >{{ item }}</span
                >
                <i>|</i>
              </div>
            </div>
            <span class="cu right morespan" @click="gotonew()">更多》</span>
          </div>
          <div class="livemsg cl">
            <div
              v-for="(item, key, index) in basketballdata"
              :key="item.id"
              class="live_div left cu"
              @click="gotonewsdel(item)"
            >
              <div class="live_img_div">
                <img :src="item.news_cover_url" alt="" class="live_img" />
              </div>
              <span class="live_title ov">{{ item.news_title }}</span>
            </div>
          </div>
          <div class="communitymsg_header cl">
            <div class="left centerimg">
              <div class="centerimg left img_div">
                <img src="../../image/titleicon.png" class="titleicon" alt="" />
              </div>
              <div class="left footercomm">篮球社区</div>
            </div>
            <div class="right cu morespan" @click="gotocommunity()">更多》</div>
          </div>
          <div class="communitymsg">
            <div
              v-for="(item, key, index) in forum_basketball"
              :key="item.id"
              class="communitymsg_div cl cu"
              @click="gotopostdetails(item)"
            >
              <div class="communitymsg_class left">{{ item.ch_name }}</div>
              <div class="communitymsg_title left">
                标题 ： {{ item.forum_title }}
              </div>
              <div class="communitymsg_time right">
                {{ item.forum_addtime | formDate }}
              </div>
            </div>
          </div>
          <div v-if="forum_basketball == false">暂无内容</div>
        </div>
      </div>
    </div>
    <!-- 直播信息右半部分 -->
    <div class="homecontentright left">
      <div class="homecontentright_menu_div cl">
        <div class="livestatus cl">
          <div
            v-for="(item, key, index) in todaymenu"
            :key="item.id"
            :class="item.clicktype ? 'todaymenu clicktype' : 'todaymenu '"
            @click="changetodaymenu(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="livecotentleft boxshadow">
        <div
          v-for="(item, key, index) in livecontentdata"
          :key="item.id"
          class="cl livecontent_div"
          @click="gotolive(item)"
        >
          <div class="left livegametype_div">
            <div class="livegametype">{{ gametype }}</div>
            <div class="ov">{{ item.lname }}</div>
          </div>
          <div class="cl leftcontent left">
            <div class="left aname ov">
              {{ item.hname }}
            </div>
            <div class="aicon left">
              <img :src="item.hicon" alt="" />
            </div>
            <div class="ascore left">
              {{ item.hTotalScore }}
            </div>
          </div>
          <div class="left time_div">
            <div class="time">{{ item.gameTimeFormat }}</div>
            <div class="ov">{{ item.gameStage }}</div>
          </div>

          <div class="rightcontent left cl">
            <div class="right ascore">
              {{ item.aTotalScore }}
            </div>
            <div class="aicon right">
              <img :src="item.aicon" alt="" />
            </div>
            <div class="right aname ov">
              <a
                :href="delUrl + item.matchId + '.html'"
                v-on:click.prevent="gotodel"
                >{{ item.aname }}</a
              >
            </div>
          </div>
        </div>
        <!-- <div class="lookmore_div centerimg">
          <div class="lookmore cu">查看更多赛事</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import host from "../../api/httpurl";
export default {
  metaInfo: {
    title: `6789直播6789体育直播足球直播NBA直播体育直播_【高清】`,
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
      newdelUrl: "http://dev.6789zbz.com/front/newdel/",
      delUrl: "http://dev.6789zbz.com/front/livedel/",
      swiperdata: [], //轮播图
      football: [
        {
          id: 1,
          name: "最新",
        },
        {
          id: 2,
          name: "英超",
        },
        {
          id: 3,
          name: "西甲",
        },
        {
          id: 4,
          name: "意甲",
        },
        {
          id: 5,
          name: "法甲",
        },
        {
          id: 6,
          name: "欧冠",
        },
        {
          id: 7,
          name: "欧联",
        },
        {
          id: 8,
          name: "英冠",
        },
        {
          id: 9,
          name: "澳超",
        },
        {
          id: 10,
          name: "俄超",
        },
        {
          id: 11,
          name: "国足",
        },
      ],
      footballflag: 0,
      baskeballflag: 0,
      baskeball: [], //篮球新闻
      basketballdata: [], //篮球新闻数据
      footerball: [], //足球新闻
      footerballdata: [], //足球新闻数据
      host: "",
      todaymenu: [
        {
          id: 1,
          title: "足球直播",
          clicktype: true,
        },
        {
          id: 2,
          title: "篮球直播",
          clicktype: false,
        },

        {
          id: 3,
          title: "已完结",
          clicktype: false,
        },
      ],
      livecontentdata: [],
      elmenu: "",
      gametype: "篮球", //直播栏目
      live_data: [],
      forum_basketball: [],
      forum_foottball: [],
      newsindex: [], //新闻栏目
    };
  },
  methods: {
    gotonew() {
      this.$router.push("/new");
    },
    gotocommunity() {
      this.$router.push("/community");
    },
    gotopostdetails(item) {
      //跳转贴子详情页面
      this.$router.push({
        name: "Postdetails",
        params: { id: `${item.id}` },
      });
      this.$store.commit("postdel", item);
    },
    // 获取首页页面数据
    async gethomedata() {
      await this.$api.homeindex.gethomeindex({}).then((res) => {
        let {
          live_data,
          forum,
          newsindex,
          promote_news_data,
        } = res.data.params;
        this.live_data = live_data;
        this.newsindex = newsindex;
        this.changetodaymenu(1);
        //贴子
        this.forum_basketball = forum.basketball;
        this.forum_foottball = forum.foottball;

        this.getNewsbasket();
        //获取swp图片
        this.swiperdata = promote_news_data;
      });
    },
    //篮球新闻栏目
    getNewsbasket() {
      let { basketball, football } = this.newsindex;
      let bbkdata = [];
      let footdata = [];
      for (let i = 0; i < basketball.length; i++) {
        bbkdata[i] = basketball[i].name;
      }
      for (let i = 0; i < football.length; i++) {
        footdata[i] = football[i].name;
      }
      this.baskeball = bbkdata;
      this.footerball = footdata;
      this.basketballdata = basketball[0].data;
      this.footerballdata = football[0].data;
      // 'http://dev.6789zbz.com' +
    },
    gotonewsdel(e) {
      this.$store.commit("newsList", e);
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
    },
    gotolive(e) {
      console.log(e);
      this.$store.commit("liveList", e);
      this.$router.push({
        name: "Livedel",
        params: { matchId: `${e.matchId}` },
      });
    },
    handleCommand(command) {
      console.log(command);
      let data = this.livemenu;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == command) {
          this.elmenu = data[i].title;
        }
      }
    },
    async changetodaymenu(id) {
      for (let i = 0; i < this.todaymenu.length; i++) {
        if (id == this.todaymenu[i].id) {
          this.todaymenu[i].clicktype = true;
        } else {
          this.todaymenu[i].clicktype = false;
        }
      }

      switch (id) {
        case 1:
          this.gametype = "足球";
          this.livecontentdata = this.live_data.football;
          break;
        case 2:
          this.gametype = "篮球";
          this.livecontentdata = this.live_data.basketball;
          break;
        case 3:
          this.gametype = "完结";
          this.livecontentdata = this.live_data.gameover;
          break;
      }
      console.log(this.livecontentdata);
    },
    inst() {
      this.host = host;
      console.log(this.host);
    },
    initialization() {
      // let data = this.livemenu;
      // this.elmenu = data[0].title;
    },
    changtype(id, name) {
      this.footballflag = id;
      let { football } = this.newsindex;
      for (let i = 0; i < football.length; i++) {
        if (football[i].name == name) {
          this.footerballdata = football[i].data;
        }
      }
    },
    changtype1(id, name) {
      this.baskeballflag = id;
      console.log(id, name);
      let { basketball } = this.newsindex;
      for (let i = 0; i < basketball.length; i++) {
        if (basketball[i].name == name) {
          this.basketballdata = basketball[i].data;
        }
      }
    },
    gotodel(event) {
      return false;
    },
    toNewsdel() {
      return false;
    },
  },
  created() {
    this.inst();
    // console.log(this.$api.base.host)
    this.initialization();
    this.gethomedata();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.home_content {
  background-image: url("../../image/bj.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
}
.aname {
  width: 120px;
  font-size: 12px /**no */;
}
.rightcontent {
  width: 25%;
  display: flex;
  align-items: center;
}
.leftcontent {
  width: 25%;
  display: flex;
  align-items: center;
}
.aicon {
  margin: 0 4px;
  img {
    width: 35px;
    height: 35px;
  }
}
.ascore {
  font-size: 18px;
  color: #014681;
}
.newsheader {
  margin-top: 4px;
  font-size: 22px;
  position: relative;
  color: #014681;
  background-image: url("../../image/home_new.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 950px;
  height: 50px;
  .newstitle {
    position: absolute;
    left: 53px;
    top: 15px;
  }
  .newstitle_en {
    font-size: 17px;
    position: absolute;
    left: 149px;
    top: 23px;
  }
}
.communitymsg_header {
  font-size: 16px;
  color: #a9a9a9;
  margin: 10px 40px 10px 32px;
  .img_div {
    height: 40px;
  }
  .titleicon {
    width: 5px;
    height: 18px;
  }
}
.footerheader {
  margin: 10px 40px 10px 32px;
  .img_div {
    height: 40px;
  }
  .titleicon {
    width: 5px;
    height: 18px;
  }
  .football_class .foot_span:first-child {
    margin-left: 10px;
  }
}
.lili:hover {
  color: #1a90fc;
}
.footercomm {
  margin-left: 15px;
  color: #1a90fc;
}
.swp {
  width: 100%;
  height: 300px;
  img {
    width: 450px;
    height: 300px;
  }
  .is-active {
    color: #1a90fc;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
.swiper_img {
  width: 100%;
}
.homecontentleft {
  width: 920px;
  // margin-left: 307px;
  .foot_div {
    width: 100%;
    margin-top: 5px;
    .foot_divsort {
      color: #014681;
      display: flex;
      align-items: center;
      background-image: url("../../image/home_footer.png");
      background-size: 100%;
      background-repeat: no-repeat;
      width: 950px;
      height: 50px;
      .foot_divsort_div {
        font-size: 22px;
        margin: 20px 0 0 100px;
      }
      .foot_divsort_div1 {
        font-size: 17px;
        margin: 25px 0 0 5px;
      }
    }
    .bbk_divsort {
      color: #014681;
      display: flex;
      align-items: center;
      background-image: url("../../image/home_bb.png");
      background-size: 100%;
      background-repeat: no-repeat;
      width: 950px;
      height: 50px;
      .bbk_divsort_div {
        font-size: 22px;
        margin: 20px 0 0 100px;
      }
      .bbk_divsort_div1 {
        font-size: 17px;
        margin: 25px 0 0 5px;
      }
    }
    .foot_span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      border: 1px 0 1px 0 solid #2945e4;
      padding: 5px;
      color: #a9a9a9;
      cursor: pointer;
    }
    .community {
      width: 50%;
    }
    .community_title_div {
      margin-top: 10px;
      color: #666;
      font-size: 17px;
      .community_title {
      }
    }
  }
  .morespan {
    color: #a9a9a9;
    font-size: 16px;
    line-height: 30px;
  }
  .morespan:hover {
    color: #1a90fc;
  }
  .footer_content {
    padding: 16px 16px;
    background-color: #fff;
    border-radius: 15px;
  }
  .livemsg,
  .communitymsg {
    font-size: 16px;
    color: #666666;
    .communitymsg_div {
      margin-left: 45px;
      margin-top: 5px;
    }
    .communitymsg_div:hover {
      color: #1a90fc;
    }
    .communitymsg_class {
      border: 1px solid #b1b1b1;
      display: inline-block;
      padding: 5px;
    }
    .communitymsg_title {
      display: inline-block;
      padding-left: 10px;
      line-height: 33px;
    }
    .communitymsg_time {
      margin-right: 54px;
    }
  }
  .live_div {
    width: 24%;
    margin: 20px 0 0 1%;
    .live_title {
      width: 100%;
      font-size: 16px;
      color: #848484;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-family: PingFangSC-Regular;
    }
    .live_img_div {
      width: 208px;
      height: 120px;
      overflow: hidden;
      position: relative;
    }
    .live_img {
      width: 208px;
      height: 120px;
    }
    .live_img_div:hover .live_img {
      width: 248px;
      height: 160px;
      position: absolute;
      left: -20px;
      top: -20px;
      -moz-transition: all 1s;
      transition: all 1s;
    }
  }
}
.lookmore_div {
  margin: 18px 0;
}
.lookmore {
  display: inline-block;
  line-height: 28px;
  color: #1a90fc;
  border: 1px solid #1a90fc;
  text-align: center;
  padding: 0 20px;
  border-radius: 15px;
}
.homecontentright {
  font-size: 14px;
  margin-left: 20px;
  width: 500px;
  .homecontentright_menu_div {
    font-size: 20px;
    .dropdown {
      width: 40%;
    }
    .el-dropdown {
      font-size: 20px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 20px;
    }
  }
  .livecotentleft {
    background-color: #fff;
    border-radius: 0 15px 15px 15px;
    padding: 10px 5px;
  }
  .todaymenu {
    cursor: pointer;
    display: inline-block;
    width: 33%;
    text-align: center;
    font-size: 18px;
    color: #014681;
  }
  .clicktype {
    background: #fff;
    border-top: 6px solid #409eff;
    color: #409eff;
    border-radius: 10px 10px 0 0;
  }
  .livecontent_div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px #d2d2d2 solid;
    padding: 10px 0;
  }
  .livecontent_div:hover{
    background-color: #f7f7f7;
    cursor: pointer;
  }
  .ateam {
    width: 33%;
    img {
      width: 100%;
    }
    div {
      text-align: center;
    }
  }
  .livegametype_div {
    width: 15%;
    margin-left: 5px;
  }
  .livegametype {
    width: 38px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    color: #ffffff;
    background-image: url("../../image/liveclass.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .livetype {
    width: 33%;
    height: 100%;
    text-align: center;
  }
}
.time_div {
  width: 13%;
  text-align: center;
  padding: 0 18px;
}
.time {
  border-bottom: 1px solid #d2d2d2;
}
.boxshadow {
  box-shadow: 1px 4px 1px 1px #d2d2d2;
}

.footerclick {
  color: #1a90fc;
}
a {
  color: inherit;
}
</style>