<template>
  <div class="newslive_div left" id="newslive_div">
    <div class="block">
      <el-carousel height="238px">
        <el-carousel-item v-for="(item, index) in swpList" :key="index">
          <div class="swp">
            <img :src="item.news_cover_url" alt="" @click="gotonewsdel(item)" />
            <div class="newstitle">{{ item.news_title }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="live_video boxshadow left cl" id="live_video">
      <div class="header_div">
        <div class="header">
          {{ title }}
        </div>
      </div>
      <div v-if="videoData != false">
        <div
          v-for="(item, key) in videoData"
          :key="key"
          @click="gotovideo(item)"
          class="videotitle_div cu"
        >
          <div class="videotype left">
            {{ item.gameStage == null? '进行中': item.gameStage}}
          </div>
          <a
            :href="delUrl + item.matchId + '.html'"
            v-on:click.prevent="gotodel"
          >
            <div class="videotitle left ov">
              {{ item.aname }} VS {{ item.hname }}
            </div>
          </a>
        </div>
        <!-- <div class="lookmore cu">查看更多直播</div> -->
      </div>
      <div v-if="videoData == false" class="videotitle_div1">暂无直播</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import host from "../../api/httpurl";
export default {
  data() {
    return {
      delUrl: "http://dev.6789zbz.com/front/livedel/",
      title: "热门直播",
      videoData: [],
      swpList: [],
      host: "",
    };
  },
  methods: {
    gotovideo(e) {
      this.$store.commit("liveList", e);
      this.$router.push({
        name: "Livedel",
        params: { matchId: `${e.matchId}` },
      });
    },
    inithost() {
      this.host = host;
    },
    gotodel(event) {
      return false;
    },
    gotonewsdel(e) {
      this.$store.commit("newsList", e);
      this.$router.push({
        name: "Newdel",
        params: { id: `${e.id}` },
      });
    },
  },
  computed: {
    ...mapState(["newslivedata", "newsmenuswp"]),
  },

  watch: {},
  created() {
    this.videoData = this.newslivedata;
    this.swpList = this.newsmenuswp.slice(0, 4);
    this.inithost();
  },
};
</script>

<style lang="less" scoped>
.live_video {
  font-size: 14px;
  width: 350px;
  background-color: #fff;
  border-top: 3px solid #1a90fc;
  border-radius: 5px;
  margin-top: 20px;
  .header_div {
    padding-bottom: 10px;
    border-bottom: 1px solid #848484;
    margin: 0 10px;
  }
  .header {
    font-size: 16px;
    color: #1a90fc;
    margin-left: 10px;
    margin-top: 8px;
    padding-left: 10px;

    border-left: 5px solid #014681;
  }
  .videotype {
    width: 62px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin: 6px 7px 6px 19px;
    border: 1px solid #848484;
  }
  .videotitle {
    width: 224px;
  }
  .videotitle:hover {
    cursor: pointer;
  }
  .videotitle_div {
    color: #848484;
    display: flex;
    align-items: center;
    height: 35px;
  }
  .videotitle_div1 {
    color: #848484;
    display: flex;
    align-items: center;
    height: 35px;
    justify-content: center;
  }
  .videotitle_div:hover {
    color: #1a90fc;
  }
  .videotitle_div:hover .videotype {
    border: 1px solid #1a90fc;
  }
  .lookmore {
    color: #1a90fc;
    border: 1px solid #1a90fc;
    width: 128px;
    height: 30px;
    margin: 19px auto;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
  }
}
#newslive_div {
  .block {
    .el-carousel__button {
      width: 15px;
    }
  }
}
.newslive_div {
  width: 350px;
  margin-left: 18px;
  margin-top: 23px;
  border-radius: 5px;
}
.swp {
  width: 356px;
  position: relative;

  img {
    width: 356px;
    height: 236px;
  }
  .newstitle {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 18px;
    color: #ffffff;
    padding: 0 10px;
  }
}
a {
  color: inherit;
}
</style>