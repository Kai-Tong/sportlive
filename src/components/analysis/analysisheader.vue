<template>
  <div>
    <div class="analysteaminfo">
      <div class="cl header_menu">
        <div
          v-for="(item, index) in dataList"
          :key="index"
          :class="
            index == checktype
              ? 'left header_title clickdiv cu'
              : 'left header_title cu'
          "
          @click="gotowhere(item.src)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="analysisgametype1_div">
        {{ liveList.lname }}
        {{ liveList.gameTimeFormat }}
      </div>
      <div class="against">
        <div class="against_aname ov">{{ liveList.hname }}</div>
        <div class="against_type">{{ liveList.gameStage }}</div>
        <div class="against_bname ov">{{ liveList.aname }}</div>
      </div>
      <div class="cl team_score">
        <img :src="liveList.hicon" alt="" class="left analysteaminfo_aicon" />
        <div class="left analysteaminfo_ascore">
          {{ liveList.hTotalScore }}
        </div>
        <img src="../../image/news/vs.png" alt="" class="left vs" />
        <div class="left analysteaminfo_bscore">
          {{ liveList.aTotalScore }}
        </div>
        <img :src="liveList.aicon" alt="" class="left analysteaminfo_aicon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dataList: [
        {
          id: "1",
          title: "直播间",
          src: "/livedel",
        },
        {
          id: "2",
          title: "数据分析",
          src: "/analysis",
        },
        {
          id: "3",
          title: "指数",
          src: "/exponent",
        },
      ],
      checktype: 1,
    };
  },
  props: ["checkmenutype"],
  methods: {
    gotowhere(e) {
      if (e == "/livedel") {
        this.$router.push({
          name: "Livedel",
          params: { matchId: `${this.liveList.matchId}` },
        });
      } else {
        this.$router.push(e);
      }
    },
  },
  watch: {},
  created() {
    this.checktype = this.checkmenutype;
  },
  computed: {
    ...mapState(["liveList"]),
  },
};
</script>

<style lang="less" scoped>
.analysteaminfo {
  background-color: #f9fcff;
}
.header_menu {
  display: flex;
  justify-content: center;
  font-family: "黑体";
  font-size: 24px;
  color: #014681;
  .header_title {
    width: 226px;
    height: 48px;
    text-align: center;
    line-height: 48px;
  }
  .clickdiv {
    color: #01a0fc;
    border-bottom: 1px solid #01a0fc;
  }
}

.analysisgametype1_div {
  font-size: 18px;
  padding: 22px 0;
  text-align: center;
}
.against {
  line-height: 31px;
  height: 31px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  text-align: center;

  .against_aname {
    width: 159px;
    background-color: #51247f;
    color: #fff;
    border-radius: 15px 0 0 15px;
  }
  .against_type {
    width: 579px;
    background-color: #f6f6f6;
    color: #fd5503;
  }
  .against_bname {
    border-radius: 0 15px 15px 0;
    width: 159px;
    background-color: #700202;
    color: #fff;
  }
}
.analysteaminfo_aicon {
  width: 58px;
  height: 58px;
}
.analysteaminfo_ascore {
  font-family: "黑体";
  color: #014681;
  font-size: 28px;
  font-weight: 600;
  margin-left: 35px;
}
.vs {
  width: 44px;
  height: 23px;
  margin: 0 268px;
}
.team_score {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0;
}
.analysteaminfo_bscore {
  font-family: "黑体";
  color: #014681;
  font-size: 28px;
  font-weight: 600;
  margin-right: 35px;
}
</style>