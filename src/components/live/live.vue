<template>
  <div id="live" class="cl">
    <home_herder :headerKey="headerKey"></home_herder>
    <livemenu @changetype="changetype" ref="livemenu1" />
    <div class="live_content left">
      <liveheader @getdata="directliveheader"></liveheader>
      <div class="livemain boxshadow">
        <div class="cl footerheader">
          <div class="football_class left">
            <div
              v-for="(item, key, index) in football"
              :key="item.id"
              class="foot_span"
            >
              <span
                @click="changtype(item.id, item.ch_columnm)"
                :class="item.id == HL ? 'footerclick' : ''"
                >{{ item.ch_name }}</span
              >
              <i>|</i>
            </div>
          </div>
          <!-- <span class="cu right morespan">更多》</span> -->
        </div>
        <div class="time_class">
          {{ todaydate }}
        </div>
        <div class="live_all" v-show="livedata != false">
          <div></div>
          <div
            class="livecontent cl"
            v-for="(item, index) in livedata"
            :key="index"
            @click="gotoanalysis(item)"
          >
            <div class="gametype_div left">
              <div class="gametype">{{ type }}</div>
              <div class="gametype1 ov">{{ item.lname }}</div>
            </div>

            <el-tooltip
              class="item"
              effect="dark"
              :content="item.hname"
              placement="top"
            >
              <div class="hname ov left">
                {{ item.hname }}
              </div>
            </el-tooltip>

            <div class="left aicon">
              <img :src="item.hicon" alt="" class="aiconimg" />
            </div>
            <div class="ascore left">
              {{ item.hTotalScore }}
            </div>
            <div class="time_type left">
              <div>{{ item.gameTimeFormat }}</div>
              <div>{{ item.gameStage }}</div>
            </div>
            <div class="ascore left">
              {{ item.aTotalScore }}
            </div>
            <div class="left aicon">
              <img :src="item.aicon" alt="" class="aiconimg" />
            </div>

            <el-tooltip
              class="item"
              effect="dark"
              :content="item.aname"
              placement="top"
            >
              <div class="bname ov left">
                {{ item.aname }}
              </div>
            </el-tooltip>

            <div class="cl left anadiv cu">
              <div class="anaimg left"></div>
              <div class="ana left">数据分析</div>
            </div>
            <div class="indnxdiv left cu cl" @click="gotoexponent(item)">
              <div class="left indeximg"></div>
              <div>指数</div>
            </div>
            <div class="left type_div">
              {{ item.gameStage }}
            </div>
            <div class="liveicon left cu" @click="gotolive(item)">
              <a
                :href="delUrl + item.matchId + '.html'"
                v-on:click.stop.prevent="gotodel"
              ></a>
            </div>
          </div>
        </div>
        <div v-if="livedata != false" class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="page_size"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="live_all1" v-show="livedata == false">暂无直播数据</div>
      </div>
    </div>
    <liveVideo v-if="livemenudata" :data="livemenudata" :type="type" />
    <div class="left footermargin">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// const livemenu = () => import("../live/livemenu");
import livemenu from "../live/livemenu";
const liveVideo = () => import("../live/live_video");
const home_herder = () => import("../home/home_herder");
const liveheader = () => import("./liveheader");
const Footer = () => import("../footer/footer1");
export default {
  metaInfo: {
    title: `直播_6789直播_6789体育直播足球直播NBA直播体育直播_【高清】`,
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
      delUrl: "http://dev.6789zbz.com/front/livedel/",
      football: [], //栏目
      buttonList: [],
      livedata: [],
      check: 0,
      headerKey: "2",
      footballflag: 0,
      todaydate: "",
      type: "",
      livemenudata: [],
      total: 100, //分页总数
      page_size: 1, //一页数量
      p: 1, //分页第几页
      HL: "", //选中高亮
    };
  },
  methods: {
    //分页
    handleCurrentChange(val) {
      //跳转页面
      this.p = val;
      this.getdata();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    gotoexponent(e) {
      event.stopPropagation();
      this.$store.commit("liveList", e);
      this.$router.push("/exponent");
    },
    gotoanalysis(e) {
      this.$store.commit("liveList", e);
      this.$router.push("/analysis");
    },
    // 切换最新栏目
    changtype(id, name) {
      this.HL = id;
      this.$refs.livemenu1.fixHL(id);
      this.footballflag = name;
      this.p = 1;
      if (id < 0) {
        this.$axios({
          url: `${this.$api.homeindex.getliveindex()}${name}`,
          params: {
            p: this.p,
          },
        }).then((res) => {
          let {
            dataFootball,
            dataBasketball,
            hot_live,
            other,
          } = res.data.params;
          let pipi = name + 1;
          this.livemenudata = hot_live;
          switch (pipi) {
            case 2:
              this.livedata = dataFootball;
              this.type = "足球";
              break;
            case 3:
              this.livedata = dataBasketball;
              this.type = "篮球";
              break;
            case 4:
              this.livedata = other;
              this.type = "其他";
              break;
          }
          console.log(pipi, this.type);
        });
      } else {
        this.$axios({
          url: `${this.$api.homeindex.getliveindex()}${name}/${id}`,
          params: {
            p: this.p,
          },
        }).then((res) => {
          let {
            dataFootball,
            dataBasketball,
            hot_live,
            other,
          } = res.data.params;
          let pipi = name + 1;
          this.livemenudata = hot_live;
          switch (pipi) {
            case 2:
              this.livedata = dataFootball;

              this.type = "足球";
              break;
            case 3:
              this.livedata = dataBasketball;
              this.type = "篮球";
              break;
            case 4:
              this.livedata = other;
              this.type = "其他";
              break;
          }
          console.log(pipi, this.type);
        });
      }
    },
    //跳转直播页面
    gotolive(e) {
      // console.log(e);
      event.stopPropagation();
      this.$store.commit("liveList", e);
      this.$router.push({
        name: "Livedel",
        params: { matchId: `${e.matchId}` },
      });
    },
    // 左边直播分类传过来的值
    changetype(clid, id) {
      this.HL = id;
      this.p = 1;
      if (id < 0) {
        this.$axios({
          url: `${this.$api.homeindex.getliveindex()}${clid}`,
          params: {
            p: this.p,
          },
        }).then((res) => {
          let {
            dataFootball,
            dataBasketball,
            hot_live,
            other,
          } = res.data.params;
          this.livemenudata = hot_live;
          console.log(clid);
          switch (clid) {
            case 1:
              this.livedata = dataFootball;
              this.type = "足球";
              break;
            case 2:
              this.livedata = dataBasketball;
              this.type = "篮球";
              break;
            case 3:
              this.livedata = other;
              this.type = "其他";
              break;
          }
        });
      } else {
        this.$axios({
          url: `${this.$api.homeindex.getliveindex()}${clid}/${id}`,
          params: {
            p: this.p,
          },
        }).then((res) => {
          let {
            dataFootball,
            dataBasketball,
            hot_live,
            other,
          } = res.data.params;
          this.livemenudata = hot_live;
          switch (clid) {
            case 1:
              this.livedata = dataFootball;
              this.type = "足球";
              break;
            case 2:
              this.livedata = dataBasketball;
              this.type = "篮球";
              break;
            case 3:
              this.livedata = other;
              this.type = "其他";
              break;
          }
        });
      }
    },
    //日期函数
    getDate1(num) {
      let myDate = new Date();
      let y = myDate.getFullYear();
      let m = myDate.getMonth() + 1;
      let r = myDate.getDate() + num;
      return `${y}-${m}-${r}`;
    },
    getDate(num) {
      let a = new Array("日", "一", "二", "三", "四", "五", "六");
      let week = new Date().getDay(num);
      return `星期${a[week]}`;
    },
    //循环出多日期
    changeButtonList() {
      this.todaydate = this.getDate1(0);
    },
    directliveheader() {
      //直接点击liveheader
      this.footballflag = this.liveheader;
      this.$refs.livemenu1.fixHL("");
      this.p = 1;
      this.getdata();
    },
    getdata() {
      this.$axios({
        url: `${this.$api.homeindex.getliveindex()}${this.footballflag + 1}`,
        params: {
          p: this.p,
        },
      }).then((res) => {
        let {
          dataFootball,
          dataBasketball,
          hot_live,
          pagination,
          other,
        } = res.data.params;

        let { page_size, total } = pagination;
        this.total = total;
        this.page_size = page_size;
        let pipi = this.footballflag + 1;
        this.livemenudata = hot_live;
        switch (pipi) {
          case 1:
            this.livedata = dataFootball;
            this.type = "足球";
            break;
          case 2:
            this.livedata = dataBasketball;
            this.type = "篮球";
            break;
          case 3:
            this.livedata = other;
            this.type = "其他";
            break;
        }
      });
    },
    gotodel(event) {
      return false;
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
    ...mapState([
      "liveheader",
      "menufootData",
      "menubacketballdata",
      "clid",
      "livedelId",
      "channel",
    ]),
    liveheaderfn() {
      return this.$store.state.liveheader;
    },
    menufootDatafn() {
      return this.channel[this.liveheader];
    },
  },
  watch: {
    liveheaderfn(newValue) {
      this.footballflag = newValue;
      this.p = 1;
    },
    menufootDatafn(newValue) {
      this.football = newValue;
    },
  },
  created() {},
  mounted() {
    if (this.livedelId != "") {
      this.changetype(this.clid, this.livedelId);
      this.$refs.livemenu1.fixHL(this.livedelId);

      console.log(this.$refs.livemenu1.fixHL(this.livedelId));
    } else {
      this.footballflag = this.liveheader;
      this.changeButtonList();
      this.football = this.menufootData;
      this.getdata();
    }
  },
  beforeDestroy() {
    this.$store.commit("livedelId", "");
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.livemain {
  background-color: #fff;
  padding: 13px 0;
  border-radius: 13px;
}
#live {
  background: url("../../image/bj.jpg") 0 0 no-repeat,
    url("../../image/3.jpg") 800px 0 repeat;
  background-position: 0 0, 800px 0;
  background-size: 100%;
}
.playname {
  display: inline-block;
  font-size: 17px;
  padding: 5px 10px;
  color: #2a88f3;
}
.live_content {
  font-size: 14px;
  width: 1195px;
  margin-left: 308px;
}

.live_all {
  .live_title {
    background-color: #2a88f3;
    color: #fff;
    font-size: 18px;
  }
  .live_title:hover {
    cursor: pointer;
  }
  .live_title_span {
    margin: 10px 15px;
  }
  .live_title_i {
    margin: 10px 15px;
  }
}
.rotate {
  transition: all 0.5s;
}
.rotate1 {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
  transition: all 1s;
}
.footer_content {
  padding: 16px 16px;
  background-color: #fff;
  border-radius: 15px;
}

.footerclick {
  color: #1a90fc;
}
.footerheader {
  margin: 10px 40px 10px 32px;
  .football_class {
    border-left: 5px solid #014681;
  }
  .football_class .foot_span:first-child {
    margin-left: 10px;
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
  span:hover {
    color: #1a90fc;
  }
}
.morespan {
  color: #a9a9a9;
  font-size: 16px;
  line-height: 30px;
}
.gametype_div {
  line-height: 22px;
  margin-left: 35px;
  .gametype {
    width: 38px;
    height: 22px;
    line-height: 22px;
    background-image: url("../../image/liveclass.png");
    background-repeat: no-repeat;
    background-size: 100%;
    text-align: center;
    color: #fff;
  }
  .gametype1 {
    width: 78px;
    height: 22px;
    line-height: 22px;
    text-align: left;
    color: #a9a9a9;
  }
}
.livecontent {
  width: 1152px;
  margin: 0 25px;
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #848484;
  .hname {
    font-size: 14px;
    width: 125px;
    text-align: center;
    margin-right: 4px;
  }
  .bname {
    font-size: 14px;
    width: 125px;
    text-align: center;
    margin-left: 4px;
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
    text-align: center;
  }
  .anadiv {
    font-size: 14px;
    color: #848484;
    display: flex;
    align-items: center;
    .anaimg {
      background-image: url("../../image/news/ana.png");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
    }
  }
  .anadiv:hover {
    color: #01c029;
    .anaimg {
      background-image: url("../../image/news/ana1.png");
      background-repeat: no-repeat;
    }
  }
  .indnxdiv {
    font-size: 14px;
    color: #848484;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .indeximg {
      background-image: url("../../image/news/index.png");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
    }
  }
  .indnxdiv:hover {
    color: #fe6102;
    .indeximg {
      background-image: url("../../image/news/index1.png");
      background-repeat: no-repeat;
    }
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
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 10px;
  }
  .liveicon:hover {
    background-image: url("../../image/news/liveicon1.png");
    background-repeat: no-repeat;
  }
}
.live_all .livecontent:nth-child(2n-1) {
  background-color: #f8f9f9;
}
.time_class {
  height: 46px;
  margin: 14px 50px;
}

::-moz-selection {
  /* Code for Firefox */

  background: #01a0fc;
}
.live_all1 {
  font-size: 18px;
  margin-left: 50px;
}
.time_class {
  position: relative;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  width: 20%;
  margin-top: 0;
  padding-left: 10px;
  font-size: 18px;
  color: #ffffff;
  background: #01a0fc;
}
.time_class:after {
  border-left: 25px solid #01a0fc;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  content: "";
  height: 0px;
  right: -25px;
  position: absolute;
  top: 0;
  width: 0;
}
</style>