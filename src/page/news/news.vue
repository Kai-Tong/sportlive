<template>
  <div class="new cl">
    <home_herder :headerKey="headerKey"></home_herder>
    <livemenu @changenewstype="changenewstype" ref="livemenuNews"></livemenu>
    <div class="new_content boxshadow left">
      <div>
        <div class="newsclass_div cl">
          <div
            v-for="(item, index) in newsClass"
            :key="index"
            :class="
              changemenuflag == item.id
                ? 'newsclass1 left cu'
                : 'newsclass left cu'
            "
            @click="changemenu(index, item)"
          >
            {{ item.ch_name || "" }}
            <div
              :class="
                changemenuflag == item.id
                  ? 'newsclass_click1'
                  : 'newsclass_click'
              "
            ></div>
          </div>
        </div>
        <div class="search" @click="serach()">
          <input type="text" placeholder="请输入搜索内容" v-model="searchmsg" />
          <div class="sousuo"></div>
        </div>
        <div
          class="news_content cl"
          v-for="(item, index) in newsdata"
          :key="index"
          @click="gotonewsdel(item)"
        >
          <div class="left img_div">
            <img :src="item.news_cover_url" alt="" class="news_img" />
          </div>
          <div class="left news_content_right">
            <div class="news_title cl">
              <div class="newstype1 left ov">
                {{ item.ch_name }}
              </div>
              <div class="left ov">
                <a
                  :href="delUrl + item.id + '.html'"
                  v-on:click.prevent="toNewsdel"
                  >{{ item.news_title }}</a
                >
              </div>
            </div>
            <div class="details ov cl">
              <span class="left">详情：</span
              ><span class="left" v-html="item.news_body"></span>
            </div>
            <div class="label_div cl">
              <div
                class="label left cu"
                @click="changenewstype(item.news_channel_id)"
              >
                {{ item.ch_name }}
              </div>
            </div>
            <div class="newstime">
              {{ item.news_addtime | formDate }}
            </div>
            <!-- <div class="cl share_div">
              <div class="centerimg left cu">
                <img src="../../image/news/share.png" alt="" />
                分享
              </div>
              <div class="centerimg left cu">
                <img src="../../image/news/share.png" alt="" />
                更多
              </div>
            </div> -->
          </div>
        </div>
        <div v-if="newsdata != false" class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="page_size"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <div v-if="newsdata == false">暂无新闻</div>
      </div>
    </div>
    <newslive v-if="live_data || promote_news_data"></newslive>
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
const newslive = () => import("../../components/new/newslive");
const Footer = () => import("../../components/footer/footer1");
export default {
  metaInfo: {
    title: `新闻_6789直播_6789体育直播足球直播NBA直播体育直播_【高清】`,
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
      delUrl: "http://dev.6789zbz.com/front/newdel/",
      headerKey: "3",
      searchmsg: "",
      host: "",
      newsClass: [], //新闻的栏目menu
      newsdata: [], ///新闻列表
      changemenuflag: "-1",
      live_data: [], //右边直播数据
      promote_news_data: [], //右边轮播数据
      total: "", //分页总数
      page_size: 1, //一页数量
      p: 1, //分页第几页
    };
  },
  methods: {
    handleCurrentChange(val) {
      //跳转页面
      this.p = val;
      this.getdata();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    inst() {
      this.host = host;
    },
    changemenu(idx, item) {
      if (item.id == -1) {
        this.changemenuflag = "-1";
        this.p = 1;
        this.getdata();
        this.$refs.livemenuNews.allchange();
      } else {
        this.changemenuflag = item.id;
        this.menuDataFilter(item.id);
      }
    },
    menuDataFilter(id) {
      //数据筛选
      this.p = 1;
      this.$api.homeindex
        .getnewsindex({
          cid: id,
          p: this.p,
        })
        .then((res) => {
          let { code, params } = res.data;
          let { news_data, pagination } = params;
          let { page_size, total } = pagination;
          if (code == 0) {
            this.newsdata = news_data;
            this.page_size = page_size;
            this.total = total;
          }
        });
    },
    changenewstype(id) {
      event.stopPropagation();
      this.menuDataFilter(id);
      let duoduo = [];
      for (let i = 0; i < this.channel.length; i++) {
        this.channel[i].map((item) => {
          duoduo.push(item);
        });
      }
      let all = {
        ch_columnm: 1,
        ch_columnm_name: "足球",
        ch_desc: "新闻-西甲",
        ch_logo:
          "/static/image/20201029/5f6506183c1043ebec5f20ea2e5e31cee877ebff.png",
        ch_name: "全部",
        ch_order: 1,
        ch_owner: "",
        ch_reply_num: 0,
        ch_status: 0,
        ch_type: 2,
        ch_views_num: 0,
        id: -1,
      };
      duoduo.unshift(all);
      this.newsClass = duoduo;
      for (let i = 0; i < this.newsClass.length; i++) {
        if (this.newsClass[i].id == id) {
          this.changemenuflag = id;
        }
      }
    },
    gotonewsdel(e) {
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
      this.$store.commit("newsList", e);
    },
    serach(msg) {
      this.$router.push("/search");
    },
    getdata() {
      //获取新闻首页数据
      this.$api.homeindex
        .getnewsindex({
          p: this.p,
        })
        .then((res) => {
          let {
            live_data,
            news_data,
            promote_news_data,
            pagination,
          } = res.data.params;
          this.newsdata = news_data;
          this.live_data = live_data;
          let { page_size, total } = pagination;
          this.page_size = page_size;
          this.total = total;
          this.promote_news_data = promote_news_data;
          this.$store.commit("newslivedata", this.live_data);
          this.$store.commit("newsmenuswp", this.promote_news_data);
        });

      let duoduo = [];
      for (let i = 0; i < this.channel.length; i++) {
        this.channel[i].map((item) => {
          duoduo.push(item);
        });
      }
      let all = {
        ch_columnm: 1,
        ch_columnm_name: "足球",
        ch_desc: "新闻-西甲",
        ch_logo:
          "/static/image/20201029/5f6506183c1043ebec5f20ea2e5e31cee877ebff.png",
        ch_name: "全部",
        ch_order: 1,
        ch_owner: "",
        ch_reply_num: 0,
        ch_status: 0,
        ch_type: 2,
        ch_views_num: 0,
        id: -1,
      };
      duoduo.unshift(all);
      this.newsClass = duoduo;
    },
    toNewsdel() {
      return false;
    },
  },
  computed: {
    ...mapState([
      "menubacketballdata",
      "menucomplexdata",
      "menufootData",
      "newsNenu",
      "channel",
    ]),
    menufootDatafn() {
      return this.$store.state.channel;
    },
    name() {
      return this.data;
    },
  },
  watch: {
    menufootDatafn(newValue) {
      let duoduo = [];
      for (let i = 0; i < this.channel.length; i++) {
        this.channel[i].map((item) => {
          duoduo.push(item);
        });
      }
      let all = {
        ch_columnm: 1,
        ch_columnm_name: "足球",
        ch_desc: "新闻-西甲",
        ch_logo:
          "/static/image/20201029/5f6506183c1043ebec5f20ea2e5e31cee877ebff.png",
        ch_name: "全部",
        ch_order: 1,
        ch_owner: "",
        ch_reply_num: 0,
        ch_status: 0,
        ch_type: 2,
        ch_views_num: 0,
        id: -1,
      };
      duoduo.unshift(all);
      this.newsClass = duoduo;
    },
  },
  components: {
    livemenu,
    home_herder,
    newslive,
    Footer,
  },
  created() {
    this.inst();
  },
  mounted() {
    if (this.newsNenu != "") {
      this.changenewstype(this.newsNenu);
      this.$store.commit("newsNenu", "");
    } else {
      this.getdata();
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.newsclass_div {
  overflow: hidden;
}
.new {
  background: url("../../image/bj.jpg") 0 0 no-repeat,
    url("../../image/3.jpg") 800px 0 repeat;
  background-position: 0 0, 800px 0;
  background-size: 100%;
}
.newstype1 {
  background-image: url("../../image/liveclass.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 38px;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  height: 22px;

  margin-right: 5px;
}
.newsclass {
  width: 88px;
  height: 24px;
  color: #848484;
  border-left: 4px solid #848484;
  font-size: 18px;
  text-align: center;
  position: relative;
  margin: 10px 0;
}
.newsclass:last-child {
  border-right: 4px solid #848484;
}
.newsclass:hover {
  color: #1a90fc;
}
.newsclass1 {
  width: 88px;
  height: 24px;
  border-left: 4px solid #848484;
  font-size: 18px;
  text-align: center;
  position: relative;
  color: #1a90fc;
  margin: 10px 0;
}
.newsclass_click1 {
  height: 4px;
  border-radius: 2px;
  width: 15px;
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #1a90fc;
}
.newsclass:hover .newsclass_click {
  background-color: #1a90fc;
}
.newsclass_click {
  height: 4px;
  border-radius: 2px;
  background-color: #ffffff;
  width: 15px;
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin: auto;
}
.new_content {
  width: 1031px;
  margin-top: 7px;
  margin-left: 48px + 279px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 48px 76px 42px;
  .search {
    display: inline-block;
    position: relative;
    margin: 20px 0;
    input {
      width: 970px;
      height: 35px;
      border-radius: 20px;
      padding-left: 10px;
      border: none;
      background-color: #e1e2e4;
    }
    .sousuo {
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
}

.news_content {
  padding: 20px 0;
  border-top: 1px solid #999999;
  position: relative;
  .img_div {
    width: 200px;
    height: 135px;
    margin-left: 80px;
    .news_img {
      width: 200px;
      height: 135px;
    }
  }
  .news_content_right {
    height: 135px;
    margin-left: 32px;
  }
  .news_title {
    font-size: 18px;
  }
  .share_div {
    position: absolute;
    right: 100px;
    bottom: 30px;
    font-size: 14px;
  }
  .share_div div:nth-child(2) {
    margin-left: 15px;
  }
  .newstype {
    color: #2a3783;
    border: 1px solid #2a3783;
    padding: 5px 10px;
  }
  .newstime {
    font-size: 14px;
    margin-left: 50px;
    margin-top: 7px;
  }
}
.news_content:hover {
  background-color: #f6f6f6;
}
.newslive {
  padding: 20px;
}

.details {
  margin: 7px 0 7px 43px;
  font-size: 14px;
  color: #aeaeae;
  width: 640px;
}
.sousuo {
  background-image: url("../../image/news/sousuo.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 29px;
  height: 29px;
}
.sousuo:hover {
  background-image: url("../../image/news/sousuo1.png");
}
.label_div {
  font-size: 14px;
  margin-left: 43px;
  .label {
    background-color: #aeaeae;
    color: #ffffff;
    width: 79px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
  }
  .label:hover {
    color: #ffffff;
    background-color: #1a90fc;
  }
}
a {
  color: inherit;
}
</style>