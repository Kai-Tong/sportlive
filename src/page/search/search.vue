<template>
  <div id="search">
    <home_herder></home_herder>
    <div class="search_content boxshadow">
      <div class="no1searchheader">搜索结果</div>
      <div class="keywords_div cl">
        <div class="left">关键词：</div>
        <input type="text" class="keywords_input left" v-model="keywords" />
        <div class="no1searchbtn left cl" @click="changeoption()">
          <div class="left"></div>
          搜索
        </div>
      </div>
      <div class="search_type_div cl">
        <div class="left">类型：</div>
        <div
          :class="
            item.id == search_type
              ? 'left search_type search_type_click cu'
              : 'left search_type cu'
          "
          v-for="(item, index) in searchtype"
          :key="item.id"
          @click="changesearch_type(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="bankuai cl" v-show="search_type != 3">
        <div class="left">板块：</div>
        <el-select
          v-model="value"
          filterable
          placeholder="所有板块"
          @change="bankuaichange"
        >
          <el-option
            v-for="(item, index) in totalList"
            :key="item.id"
            :label="item.ch_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="Sort cl">
        <div class="left">排序：</div>
        <div class="Sort_class">
          <el-radio
            v-for="(item, index) in selectdata"
            :key="index"
            v-model="radio"
            :label="item.id"
            @change="radiochange"
            size="medium"
            >{{ item.label }}</el-radio
          >
        </div>
      </div>
      <div class="search_results">
        搜索结果：显示{{ totalArtcle }}条，用时{{ consumeTime }}秒
      </div>
      <div class="search_results_content">
        <div v-if="search_type == 2">
          <div class="cl content_title_div">
            <div class="left title">贴子标题</div>
            <div class="left plate">板块</div>
            <div class="left announcer">发布者</div>
            <div class="left release_time">发布时间</div>
            <div class="left last_time">最后回复时间</div>
            <div class="left replynum">回复数</div>
            <div class="left viewing_num">浏览数</div>
          </div>
          <div
            class="search_data cl"
            v-for="(item, index) in searchdata"
            @click="gotocommdel()"
          >
            <div class="left title ov">{{ item.forum_title }}</div>
            <div class="left plate">{{ item.forum_type }}</div>
            <div class="left announcer">{{ item.forum_owner }}</div>
            <div class="left release_time">
              {{ item.forum_addtime | formDate }}
            </div>
            <div class="left last_time">
              {{ item.forum_comments_time | formDate }}
            </div>
            <div class="left replynum">{{ item.forum_comments }}</div>
            <div class="left viewing_num">{{ item.forum_views }}</div>
          </div>
        </div>
        <div v-if="search_type == 1">
          <div class="content_title_div cl">
            <div class="left news_title">新闻标题</div>
            <div class="left news_title">新闻频道</div>
            <div class="left news_title">发布时间</div>
            <div class="left news_title">回复数</div>
            <div class="left news_title">浏览数</div>
          </div>
          <div
            class="news_data_div cl"
            v-for="(item, index) in searchdata"
            :key="item.id"
            @click="gotonewsdel(item)"
          >
            <div class="left news_title1 ov">{{ item.news_title }}</div>
            <div class="left news_title1">{{ item.ch_name }}</div>
            <div class="left news_title1">
              {{ item.news_addtime | formDate }}
            </div>
            <div class="left news_title1">{{ item.news_comments }}</div>
            <div class="left news_title1">{{ item.news_views }}</div>
          </div>
        </div>
        <div v-if="search_type == 3">
          <div class="content_title_div cl">
            <div class="user left">头像</div>
            <div class="user left">用户</div>
            <div class="user left">操作</div>
          </div>
          <div v-for="(item, index) in searchdata" :key="item.id" class="cl">
            <div class="user left userimg_div">
              <img
                :src="item.user_pic"
                alt=""
                class="userimg"
                @click="goPerson(item.id)"
              />
            </div>
            <div class="user left">{{ item.user_nickname }}</div>
            <div class="user left guanzhu cu" @click="attention(item)">
              {{ item.is_followed == 0 ? "关注" : "已关注" }}
            </div>
          </div>
        </div>
        <div class="cl">
          <div class="right pagination_div">
            <el-pagination
              :current-page.sync="page"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="page_size"
              layout="prev, pager, next, jumper"
              :total="totalArtcle"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
const Footer = () => import("../../components/footer/footer");
import host from "../../api/httpurl";
export default {
  data() {
    return {
      host: "",
      searchtype: [
        {
          id: 1,
          name: "新闻",
        },
        {
          id: 2,
          name: "话题",
        },
        {
          id: 3,
          name: "用户",
        },
      ],
      keywords: "", //输入框
      value: "",
      page: 1, //第几页
      search_type: 1, //类型
      radio: "1", //单选排序id
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      selectdata: [
        {
          id: "1",
          label: "综合排序",
        },
        {
          id: "2",
          label: "按发布时间排序",
        },
        {
          id: "3",
          label: "按回复时间排序",
        },
        {
          id: "4",
          label: "按回复数排序",
        },
        {
          id: "5",
          label: "按浏览数排序",
        },
      ],
      searchdata: [], //搜素结果的数据
      totalList: [], //板块的所有种类
      plate: "", //板块ID
      totalArtcle: 0, //查询总条数
      consumeTime: "", //查询所消耗时间
      currentPage3: "1",
      page_size: 1, //一页多少数据
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(val);
      this.getsearchdata();
    },
    inst() {
      this.host = host;
    },
    onSubmit() {
      console.log("submit!");
    },
    radiochange(val) {
      console.log(this.radio);
      this.page = 1;
      this.getsearchdata();
    },
    attention(item) {
      //关注用户
      let type = 1;
      if (item.is_followed == 0) {
        type = 1;
      } else {
        type = 2;
      }
      let url1 = `${this.$api.httppost.follow()}/${type}/${item.id}`;
      console.log(url1);
      this.$axios({
        method: "post",
        url: url1,
      }).then((res) => {
        let { code } = res.data;
        if (code == 0) {
          this.getsearchdata();
        }
      });
    },
    changesearch_type(id) {
      // 切换新闻话题 用户
      this.page = 1;
      this.search_type = id;
      this.value = "";
      this.radio = "1";
      this.plate = "";
      this.$api.attchanelist
        .attchanel({
          type: id + 1,
        })
        .then((res) => {
          let { code, msg } = res.data;
          if (code == -1 && msg == "token过期") {
            console.log(code);
            this.$message({
              message: "想要查看完整功能请登录",
              type: "warning",
            });
          } else if (code == 0) {
            let { channel, user_followed_id } = res.data.params;
            let List1 = [];
            let List2 = [];
            let List3 = [];
            if (channel[1]) {
              List1 = channel[1];
            }
            if (channel[2]) {
              List2 = channel[2];
            }
            if (channel[3]) {
              List3 = channel[3];
            }
            let totalList = List1.concat(List2, List3);
            this.totalList = totalList;
            this.getsearchdata();
          }
        });
    },
    gotonewsdel(e) {
      this.$store.commit("newsList", e);
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
    },
    gotocommdel() {
      this.$router.push("/communitydel");
    },
    bankuaichange(val) {
      //板块选择器
      this.page = 1;
      this.plate = val;
      this.getsearchdata();
    },
    changeoption() {
      this.page = 1;
      this.getsearchdata();
      console.log(this.keywords);
    },
    getsearchdata() {
      let dateStart = new Date().getTime();
      this.$api.homeindex
        .search({
          search_type: this.search_type,
          keywords: this.keywords,
          channel: this.plate,
          order: this.radio,
          p: this.page,
        })
        .then((res) => {
          let { code, params } = res.data;
          let { data, pagination } = params;
          this.searchdata = data;
          let { page_size, total } = pagination;
          this.page_size = page_size;
          this.totalArtcle = total;
          let dateEnd = new Date().getTime();
          this.consumeTime = (dateEnd - dateStart) / 1000;
        });
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
  },
  components: {
    home_herder,
    Footer
  },
  created() {
    this.inst();
    this.changesearch_type(1);
  },
};
</script>

<style lang="less" scoped>
#search {
  background-image: url("../../image/bj.jpg");
  background-size: 100%;
  font-size: 14px;
}
.search_content {
  width: 1294px;
  margin: 5px auto;
  padding-top: 52px;
  background-color: #fff;
  .no1searchheader {
    font-size: 22px;
    color: #014681;
    padding-left: 15px;
    border-left: 3px solid #014681;
    margin-left: 40px;
  }
  .keywords_div {
    line-height: 50px;
    margin: 24px 0 0 82px;
    font-size: 20px;
    display: flex;
    align-items: center;
    .keywords_input {
      width: 390px;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      border-radius: 5px;
      border: 1px solid #555;
      margin: 0 20px;
    }
    .no1searchbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #01a0fc;
      color: #fff;
      width: 87px;
      text-align: center;
      border-radius: 5px;
      div {
        width: 32px;
        height: 32px;
        background-image: url("../../image/sousuo.png");
        background-size: 100%;
      }
    }
  }
  .search_type_div {
    font-size: 20px;
    text-align: center;
    margin: 11px 0 11px 104px;
    line-height: 48px;
    .search_type {
      padding: 0 40px;
      margin: 0 10px;
      border-radius: 5px;
      background-color: #dedede;
      color: #555;
    }
    .search_type_click {
      background-color: #1090fc;
      color: #fff;
    }
  }
  .bankuai {
    font-size: 20px;
    margin: 11px 0 11px 104px;
  }
  .Sort {
    font-size: 20px;
    margin: 11px 0 11px 104px;
    .Sort_class {
      font-size: 22px;
    }
  }
  .search_results {
    font-size: 22px;
    color: #014681;
    padding-left: 15px;
    margin: 40px 0 30px 40px;
    border-left: 3px solid #014581;
  }
  .search_results_content {
    .pagination_div {
      margin: 20px 40px;
    }
    .content_title_div {
      line-height: 60px;
      color: #333;
      text-align: center;
      background-color: #e1f1fe;
      width: 1212px;
      margin: 0 auto;
      border-bottom: 1px solid #555;
      div {
        color: #555;
      }
      .title {
        width: 300px;
      }
      .plate {
        width: 135px;
      }
      .announcer {
        width: 135px;
      }
      .release_time {
        width: 179px;
      }
      .last_time {
        width: 179px;
      }
      .replynum {
        width: 135px;
      }
      .viewing_num {
        width: 135px;
      }
    }
    .search_data {
      color: #333;
      text-align: center;
      background-color: #fff;
      width: 1212px;
      margin: 0 auto;
      border-bottom: 1px solid #555;
      div {
        color: #555;
        height: 60px;
        line-height: 60px;
      }
      .title {
        width: 300px;
      }
      .plate {
        width: 135px;
      }
      .announcer {
        width: 135px;
      }
      .release_time {
        width: 179px;
      }
      .last_time {
        width: 179px;
      }
      .replynum {
        width: 135px;
      }
      .viewing_num {
        width: 135px;
      }
    }
  }
}
.userimg_div {
  display: flex;

  justify-content: center;
  align-items: center;
}
.userimg {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.news_title {
  width: 20%;
}
.news_title1 {
  width: 20%;
  height: 60px;
  box-shadow: 0 0 0 1px #555;
}
.user {
  width: 100% / 3;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.news_data_div {
  line-height: 60px;
  color: #333;
  text-align: center;
  background-color: #fff;
  width: 1212px;
  margin: 0 auto;
}
.guanzhu {
  color: #01a0fc;
}
</style>