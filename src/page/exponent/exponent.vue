<template>
  <div class="cl" id="exponent">
    <home_herder :headerKey="headerKey"></home_herder>
    <div class="exponent boxshadow">
      <analysisheader :checkmenutype="checkmenutype"></analysisheader>
      <div class="exponent_div">
        <div class="exponent_header cl">
          <!-- <div class="left select_div cu" @click="openValue">
            <span>{{ value }}</span>
            <img src="../../image/al/down.png" alt="" class="select_img" />
            <div class="opthings_div" v-show="show">
              <div
                v-for="(item, index) in tableData"
                :key="index + item.provider + index"
                class="opthings cu"
                @click="changeopthings(item.provider)"
              >
                {{ item.provider }}
              </div>
            </div>
          </div> -->
          <div class="left duoxuan">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.value"
                :label="item.label"
                :value="item.provider"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="left comnum"
            v-text="
              filter != false
                ? `共${filter.length}/${List.length}家公司`
                : `共${List.length}家公司`
            "
          ></div>
        </div>
        <div class="exponent_title cl">
          <div class="left w142">公司</div>
          <div class="left w187">独赢</div>
          <div class="left w184">更新时间</div>
          <div class="left w150">大小</div>
          <div class="left w169">更新时间</div>
          <div class="left w232">让球</div>
          <div class="left w195">更新时间</div>
        </div>
        <div
          v-if="filter == false"
          v-for="(item, index) in List"
          :key="index"
          class="exponentfor cl"
        >
          <div class="left w142">{{ item.provider }}</div>
          <div class="left w187 cl">
            <div
              v-for="(item, index) in item.data[3].marketOdds"
              class="left w30"
            >
              {{ item }}
            </div>
          </div>
          <div class="left w184 ov">{{ item.data[3].refreshTime }}</div>
          <div class="left w75 ov">{{ item.data[5].marketOdds }}</div>
          <div class="left w75">{{ item.data[5].marketValue }}</div>
          <div class="left w165 ov">{{ item.data[5].refreshTime }}</div>
          <div class="left w115 ov">{{ item.data[1].marketOdds }}</div>
          <div class="left w115">{{ item.data[1].marketValue }}</div>
          <div class="left w195 ov">{{ item.data[1].refreshTime }}</div>
        </div>
        <div
          v-if="filter != false"
          v-for="(item, index) in filter"
          :key="item.provider + index"
          class="exponentfor cl"
        >
          <div class="left w142">{{ item.provider }}</div>
          <div class="left w187 cl">
            <div
              v-for="(item, index) in item.data[3].marketOdds"
              class="left w30"
            >
              {{ item }}
            </div>
          </div>
          <div class="left w184 ov">{{ item.data[3].refreshTime }}</div>
          <div class="left w75">{{ item.data[3].marketValue }}</div>
          <div class="left w75">{{ item.data[1].marketValue }}</div>
          <div class="left w165 ov">{{ item.data[1].refreshTime }}</div>
          <div class="left w115 ov">{{ item.data[1].marketOdds }}</div>
          <div class="left w115">{{ item.rangqiu1 }}</div>
          <div class="left w195 ov">{{ item.data[1].refreshTime }}</div>
        </div>
      </div>
    </div>
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const home_herder = () => import("../../components/home/home_herder");
const analysisheader = () => import("../../components/analysis/analysisheader");
const Footer = () => import("../../components/footer/footer");
export default {
  data() {
    return {
      checkmenutype: 2,
      headerKey: "2",
      tableData: [], //下拉公司选项
      show: false,
      List: [], //指数数据
      filter: [],
      value1: [],
    };
  },
  methods: {
    changeopthings(e) {
      let pipi = this.List;
      this.filter = [];
      for (let i = 0; i < pipi.length; i++) {
        if (e == pipi[i].provider) {
          this.filter.push(pipi[i]);
        }
      }
    },
    openValue() {
      this.show = !this.show;
    },
    getratedata() {
      this.$axios({
        url: `${this.$api.homeindex.rate()}${this.liveList.matchId}`,
      }).then((res) => {
        let { code, params } = res.data;
        if (code == 0) {
          this.List = params;
          this.tableData = params;
          this.value = params[0].provider;
        }
      });
    },
  },
  computed: {
    ...mapState(["liveList"]),
  },
  watch: {
    value1(newValue) {
      let pipi = this.List;
      let newArr = [];
      let lili = [];
      newValue.map((item) => {
        newArr.push({ item });
      });
      pipi.filter((item) => {
        newArr.map((it) => {
          if (item.provider == it.item) {
            lili.push(item);
          }
        });
      });
      this.filter = lili;
    },
  },
  components: {
    home_herder,
    analysisheader,
    Footer
  },
  created() {
    this.getratedata();
  },
};
</script>

<style lang="less" scoped>
#exponent {
  background-image: url("../../image/bj.jpg");
  background-size: 100%;
}
.exponent {
  padding: 17px 16px;
  width: 1300px;
  margin: auto;
  background-color: #fff;
  border-radius: 15px;
  font-size: 14px;
  color: #555555;
  .exponent_div {
    border: 1px solid #dedede;
    .exponent_header {
      line-height: 54px;
      margin: 5px 0;
      .select_div {
        width: 155px;
        height: 30px;
        margin: 10px 10px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #dedede;
        position: relative;
        .select_img {
          position: absolute;
          right: 5px;
          bottom: 0;
          top: 0;
          margin: auto;
        }
        .opthings_div {
          position: absolute;
          background: #fff;
          color: #555555;
          width: 155px;
          text-align: center;
          border: 1px solid #dedede;
          .opthings {
            border-top: 1px solid #dedede;
            border-bottom: 1px solid #dedede;
            border-radius: 5px;
          }
        }
      }
    }
    .exponent_title {
      line-height: 40px;
      text-align: center;
      background-color: #e2f1fe;
      border: 1px solid #dedede;
      display: flex;
      justify-content: center;
      .w142 {
        width: 142px + 3px;
      }
      .w187 {
        width: 187px + 3px;
      }
      .w184 {
        width: 184px + 3px;
      }
      .w150 {
        width: 150px + 3px;
      }
      .w169 {
        width: 169px + 3px;
      }
      .w232 {
        width: 232px + 3px;
      }
      .w195 {
        width: 185px + 3px;
      }
    }
    .exponentfor {
      line-height: 35px;
      text-align: center;
      margin: 0 3px;
      display: flex;
      justify-content: center;
      div {
        border: 1px solid #dedede;
        height: 35px;
      }
      .w142 {
        width: 142px + 2px;
        border-left: none;
      }
      .w187 {
        width: 187px + 2px;
        .w30 {
          border: none;
          width: 33%;
        }
      }
      .w184 {
        width: 184px + 2px;
      }
      .w75 {
        width: 75px + 2px;
      }
      .w165 {
        width: 165px + 2px;
      }
      .w115 {
        width: 115px + 2px;
      }
      .w195 {
        width: 195px + 2px;
        border-right: none;
      }
    }
    .exponentfor:hover {
      background-color: #f7f7f7;
    }
  }
}
.duoxuan {
  margin-left: 20px;
}
.comnum {
  margin-left: 10px;
}
</style>