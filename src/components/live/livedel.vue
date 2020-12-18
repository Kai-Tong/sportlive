<template>
  <div class="livedel cl">
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <livemenu @changetype="pve" />
    <div class="livedel_content left">
      <liveheader></liveheader>
      <div class="livedel_div boxshadow">
        <div class="hometitle">首页</div>
        <div class="content_box">
          <div class="live_title centerimg">
            <div class="livecontent cl">
              <div class="aname ov left">
                {{ pipiload.hfullname }}
              </div>
              <div class="left aicon">
                <img :src="pipiload.hicon" alt="" class="aiconimg" />
              </div>
              <div class="ascore left">
                {{ pipiload.hTotalScore }}
              </div>
              <div class="time_type left">
                <div>{{ pipiload.gameTimeFormat }}</div>
                <div>{{ pipiload.gameStage }}</div>
              </div>
              <div class="ascore left">
                {{ pipiload.aTotalScore }}
              </div>
              <div class="left aicon">
                <img :src="pipiload.aicon" alt="" class="aiconimg" />
              </div>
              <div class="bname ov left">
                {{ pipiload.afullname }}
              </div>
            </div>
          </div>
          <div class="live_div" v-show="videosrc != ''">
            <div id="dplayer" ref="dplayer"></div>
          </div>
          <div v-show="videosrc == ''" class="overlive">
            {{ overlive }}
          </div>
          <div class="cl liveroom_div">
            <div
              v-for="(item, index) in signals"
              :key="index"
              class="liveroom left"
              @click="cutoverurl(item)"
              v-show="item.status"
            >
              {{ item.title }}
            </div>
          </div>
          <div v-html="modify_content"></div>
          <div class="livebottom cl">
            <div class="looktoday left" @click="gotolive()">
              【点击观看今日直播】
            </div>
            <!-- <div class="share_div left">
              <img src="../../image/news/share.png" alt="" />
              分享
              <img src="../../image/news/shareicon1.png" alt="" class="cu" />
              <img src="../../image/news/shareicon2.png" alt="" class="cu" />
              <img src="../../image/news/shareicon3.png" alt="" class="cu" />
              <img src="../../image/news/shareicon4.png" alt="" class="cu" />
            </div> -->
            <div class="right ana_div">
              <div class="cl left anadiv cu" @click="gotoanalysis(pipiload)">
                <div class="anaimg left"></div>
                <div class="ana left">数据分析</div>
              </div>
              <div class="indnxdiv left cu cl" @click="gotoexponent(pipiload)">
                <div class="left indeximg"></div>
                <div>指数</div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="news_div">
          <div class="cu">上一篇：{{ pre }}</div>
          <div class="cu">下一篇：{{ nex }}</div>
        </div> -->
      </div>
    </div>
    <liveVideo :data="livemenudata" />
    <div class="left footermargin">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DPlayer from "dplayer";
const livemenu = () => import("../live/livemenu");
const liveVideo = () => import("../live/live_video");
const home_herder = () => import("../home/home_herder");
const liveheader = () => import("./liveheader");
const Footer = () => import("../footer/footer1");
export default {
  metaInfo() {
    return {
      title: this.pageName,
      meta: this.metaList,
    };
  },
  data() {
    return {
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
      pageName: "", //SEO优化的动态title
      descriptionDate: "",
      release_date: "",
      menu_num: "2",
      headerKey: "2",
      shareList: [
        {
          id: 1,
          name: "QQ空间",
        },
        {
          id: 2,
          name: "新浪微博",
        },
        {
          id: 3,
          name: "开心网",
        },
        {
          id: 4,
          name: "人人网",
        },
      ],
      videosrc: "",
      overlive: "暂无直播",
      signals: [],
      pre: "asdasdasdasdadasd",
      nex: "asdasdasdasdasdasdsad",
      pipiload: "",
      livemenudata: [], //热门直播
      modify_content: "", //直播描述
    };
  },
  methods: {
    cutoverurl(item) {
      //切换直播信号
      this.videosrc = item.url;
      if (item.status == true) {
        this.newddplayer();
      }
    },
    gotoexponent(e) {
      this.$store.commit("liveList", e);
      this.$router.push("/exponent");
    },
    gotoanalysis(e) {
      this.$store.commit("liveList", e);
      this.$router.push("/analysis");
    },
    getlivedata() {
      //直播详情页面请求数据
      console.log(this.$route.params.matchId);
      this.$axios({
        url: `${this.$api.homeindex.getlivedel()}${this.$route.params.matchId}`,
      }).then((res) => {
        let {
          murl,
          signals,
          afullname,
          hfullname,
          lfullname,
        } = res.data.params.data;
        let { hot_live, modify_content } = res.data.params;
        this.modify_content = modify_content;
        this.livemenudata = hot_live;
        this.videosrc = murl;
        this.signals = signals;
        this.newddplayer();
        let liveList = { ...res.data.params.data };
        liveList.aname = afullname;
        liveList.hname = hfullname;
        liveList.lname = lfullname;
        liveList.matchId = this.$route.params.matchId;
        this.pipiload = liveList;
        console.log(this.pipiload);
      });
    },
    newddplayer() {
      //初始化dplayer
      if (this.videosrc != "") {
        const dp = new DPlayer({
          container: document.getElementById("dplayer"),
          live: true,
          autoplay: true,
          apiBackend: {
            read: function (endpoint, callback) {
              console.log("Pretend to connect WebSocket");
              // callback();
            },
            send: function (endpoint, danmakuData, callback) {
              console.log("Pretend to send danmaku via WebSocket", danmakuData);
              // callback();
            },
          },
          video: {
            url: this.videosrc,
            type: "hls",
          },
        });
      } else {
      }
    },
    sharegoto(idx) {
      let title = "111";
      let url = "111";
      let picurl = "111";
      let content = "111";

      switch (idx) {
        case idx == 1:
          // https://api.weibo.com/2/statuses/share.json
          break;
        case idx == 2:
          break;
        case idx == 3:
          break;
      }
    },
    gotolive() {
      this.$router.push("/live");
    },
    parentEvent(data) {
      this.menu_num = data;
    },
    // 左边直播分类传过来的值
    pve(clid, id) {
      this.$store.commit("clid", clid);
      this.$store.commit("livedelId", id);
    },
    dateFormat(fmt, date) {
      //时间格式
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
  },
  components: {
    livemenu,
    liveVideo,
    home_herder,
    liveheader,
    Footer,
  },
  computed: {
    ...mapState(["liveList"]),
    liveListfn() {
      return this.$store.state.liveList;
    },
  },
  watch: {
    liveListfn(newValue) {
      // this.liveList = newValue
      this.getlivedata();
    },
  },
  created() {},
  mounted() {
    this.getlivedata();

    setTimeout(() => {
      let date = this.pipiload.gameTime;
      console.log(this.pipiload);
      this.descriptionDate = this.dateFormat("YYYY年mm月dd日", date);
      this.release_date = this.dateFormat("YYYY-mm-dd HH:MM:SS", date);
      this.pageName = `${this.pipiload.hname}VS${this.pipiload.aname}_【6789体育直播】`;
      this.metaList[0].content = `6789体育直播为您提供${this.descriptionDate} ${this.pipiload.hname}VS${this.pipiload.aname}比赛直播,6789体育直播是国内最好的体育直播网站之一,主要提供足球直播,NBA直播,等国内外体育赛事直播,我们一直最用心。`; // description
      this.metaList[1].content = `${this.pipiload.hname}VS${this.pipiload.aname},足球直播,6789直播,体育直播,NBA直播`; //name="keywords"
      this.metaList[2].content = `${this.release_date}`;
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
.overlive {
  text-align: center;
}
.livedel_div {
  background-color: #ffffff;
  border-radius: 10px;
  padding-top: 22px;
  width: 1188px;
  .hometitle {
    color: #2a88f3;
    border-left: 5px solid #014681;
    padding-left: 10px;
    margin: 0 0 18px 24px;
  }
  .content_box {
    border: 1px solid #f2f3f5;
    margin: 0 83px;
    padding: 0 31px;
  }
}
.livedel {
  background-image: url("../../image/bj.jpg");
  background-size: 100%;
}
.livedel_content {
  margin-left: 29px + 279px;
  .live_div {
    width: 968px;
    height: 540px;
  }
  .live_title {
    font-size: 20px;
    text-align: center;
  }
  .looktoday {
    color: #2a88f3;
    font-size: 18px;
    line-height: 43px;
  }
  .share_div {
    height: 46px;
    font-size: 16px;
  }
  .share_class {
    color: #2a88f3;
    margin: 10px;
  }
  .analysis_div {
    font-size: 20px;
    color: #2a88f3;
    .analysis {
      margin: 5px 10px;
    }
    .iconfont {
      font-size: 20px;
    }
    .exponent {
      margin: 5px 10px;
    }
  }
}
.share_div {
  display: flex;
  align-items: center;
}
.livebottom {
  font-size: 14px;
}
.anadiv {
  font-size: 16px;
  color: #848484;
  display: flex;
  align-items: center;
}
.ana_div {
  display: flex;
  align-items: center;
  height: 46px;
}
.anaimg {
  background-image: url("../../image/news/ana.png");
  background-size: 100%;
  width: 20px;
  height: 20px;
}
.anadiv:hover {
  color: #01c029;
  .anaimg {
    background-image: url("../../image/news/ana1.png");
  }
}
.news_div {
  font-size: 14px;
  color: #2a88f3;
  margin-left: 115px;
  div {
    padding: 11px 0;
  }
}
.indnxdiv {
  font-size: 16px;
  color: #848484;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.indeximg {
  background-image: url("../../image/news/index.png");
  background-size: 100%;
  width: 20px;
  height: 20px;
}
.indnxdiv:hover {
  color: #fe6102;
  .indeximg {
    background-image: url("../../image/news/index1.png");
  }
}
.livecontent {
  margin: 0 25px;
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  .aname {
    font-size: 14px;
    width: 125px;
    text-align: right;
  }
  .aicon {
    .aiconimg {
      width: 48px;
      height: 48px;
    }
  }
  .ascore {
    font-size: 26px;
    width: 56px;
    line-height: 80px;
  }
  .bname {
    font-size: 14px;
    width: 125px;
    text-align: left;
  }

  .type_div {
    width: 100px;
    text-align: right;
    color: #014681;
  }
  .liveicon {
    width: 104px;
    height: 30px;
    background-image: url("../../image/news/liveicon.png");
    background-size: 100%;
    margin: 0 10px;
  }
  .liveicon:hover {
    background-image: url("../../image/news/liveicon1.png");
  }
  .hqlive {
    font-size: 14px;
    width: 76px;
    text-align: center;
    color: #014681;
  }
}

.liveroom_div {
  display: flex;
  justify-content: center;
  margin: 7px 0;
  .liveroom {
    font-size: 14px;
    width: 73px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #2a88f3;
    border: 1px solid #2a88f3;
    margin-right: 22px;
  }
}
</style>