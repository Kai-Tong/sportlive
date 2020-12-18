<template>
  <div class="live_video boxshadow left cl" id="live_video">
    <div class="header_div">
      <div class="header">热门直播</div>
    </div>
    <div v-if="videoData != false">
      <div
        v-for="(item, key) in videoData"
        :key="key"
        @click="gotovideo(item)"
        class="videotitle_div cu"
      >
        <div class="videotype left ov">
          {{ item.lname }}
        </div>
        <a :href="delUrl+ item.matchId + '.html'" v-on:click.prevent="gotodel" >
        <div class="videotitle left ov">
          {{ item.hname }} VS {{ item.aname }}
        </div>
        </a>
      </div>
      <!-- <div class="lookmore cu">查看更多直播</div> -->
    </div>
    <div v-if="videoData == false" class="videotitle_div1">暂无热门直播</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delUrl:"http://dev.6789zbz.com/front/livedel/",
      videoData: [],
    };
  },
  props: ["data", "type"],
  methods: {
    gotovideo(e) {
      this.$store.commit("liveList", e);
       this.$router.push({
        name: "Livedel",
        params: { matchId: `${e.matchId}` },
      });
    },
    getlivevideo() {
      this.$api.homeindex.livevideo({}).then((res) => {
        let { params } = res.data;
        this.videoData = params;
      });
    },
    gotodel(event){
      return false;
    }
  },
  watch: {
    data(newValue) {
      this.videoData = newValue;
    },
  },
  created() {
    switch (this.$route.path) {
      case "/Livedel":
        this.getlivevideo();
        break;
      case "/newdel":
        // this.get
        break;
    }
    if (this.$route.path == "/Livedel") {
      this.getlivevideo();
    }
  },
};
</script>

<style lang="less" scoped>
.live_video {
  font-size: 14px;
  width: 325px;
  margin-left: 20px;
  background-color: #fff;
  border-top: 3px solid #1a90fc;
  border-radius: 5px;
  margin-top: 57px;
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
    justify-content: center;
    height: 35px;
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
a{
  color: inherit;
}
</style>