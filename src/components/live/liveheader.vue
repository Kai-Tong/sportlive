<template>
  <div>
    <div class="header cl">
      <div class="left">
        <div class="header_column cl">
          <img src="../../image/news/sicon.png" alt="" class="sicon left" />
          <div
            class="left"
            v-for="(item, index) in channel"
            :key="index"
            :class="
              liveListflag == index
                ? 'cu siconimg1 siconimg cl'
                : ' cu siconimg cl'
            "
            @click="changetype(index)"
          >
            <div
              :class="
                liveListflag == index
                  ? 'channel channel1 left'
                  : '  channel left'
              "
            >
              {{ item[0].ch_columnm_name }}
            </div>
            <!-- <img
              :src="item.clicktype ? item.imgsrc1 : item.imgsrc"
              v-for="(item, key) in liveList"
              :key="item.id"
              @click="changetype(key)"
              alt=""
              class="cu siconimg"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      liveList: [
        {
          id: 1,
          playdata: "足球",
          imgsrc: require("../../image/news/ftb.png"),
          imgsrc1: require("../../image/news/ftb1.png"),
          clicktype: true,
        },
        // {
        //   id: 2,
        //   playdata: "篮球",
        //   imgsrc: require("../../image/news/bbk.png"),
        //   imgsrc1: require("../../image/news/bbk1.png"),
        //   clicktype: false,
        // },
      ],
      liveListflag: 0,
    };
  },
  methods: {
    //中间切换足球、篮球种类的
    changetype(index) {
      this.$store.commit("liveheader", index);
      this.liveListflag = index;
      switch (this.$route.name) {
        case "Live":
          this.$emit("getdata");
          break;
      }
      if (this.$route.name == "Livedel") {
        this.$router.push("/live");
      }
    },
    createdchangetype(index) {
      this.$store.commit("liveheader", index);
      this.liveListflag = index;
    },
  },
  computed: {
    ...mapState(["liveheader", "channel"]),
    liveheaderfn() {
      return this.$store.state.liveheader;
    },
  },
  watch: {
    liveheaderfn(newValue) {
      this.createdchangetype(newValue);
    },
  },
  created() {
    this.createdchangetype(this.liveheader);
  },
};
</script>

<style lang="less" scoped>
.header {
  .header_column {
    .sicon {
      margin-top: 7px;
    }
    .siconimg {
      margin-top: 23px;
      margin-right: 35px;
      background-image: url("../../image/news/ftb.png");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 112px;
      height: 32px;
    }
    .siconimg1 {
      background-image: url("../../image/news/ftb1.png");
    }
    .siconimg:hover {
      background-image: url("../../image/news/ftb1.png");
    }
  }
}
.channel {
  font-family: "HiraginoSansGB-W3";
  font-size: 14px;
  color: #b8cada;
  width: 112px - 50px;
  text-align: center;
  padding-bottom: 7px;
  margin-left: 50px;
  margin-top: 5px;
}
.channel1 {
  color: #014681;
}
.siconimg:hover .channel{
  color: #014681;
}
</style>