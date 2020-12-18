<template>
  <div class="comment-wrap">
    <div
      v-for="(item, index) in child"
      :key="index"
      :style="{
        'margin-left': deep >= 74 ? '0px' : '0.1rem',
        'word-wrap': 'break-word',
      }"
      class="replay"
      v-if="flag || showreply"
    >
      <!--    @click="changeshow" -->
      <div
        :style="{
          width: 9 - deep * 0.1 + 'rem',
          'word-wrap': 'break-word',
        }"
      >
        {{ item.user_name }} : {{ item.c_body }}
        <span @click="reply(item)" class="reply_span cu">回复</span>
      </div>

      <comment-tree
        v-if="itemChild"
        :itemChild="item.child"
        :deep="deep + 1"
        :key="'son' + item.id"
        @getcommentid="reply"
        :showreply="flag"
      >
        <!-- :deep="deep>=62?'62':`${deep + 1}`" -->
        <!-- :showreply="flag" -->
      </comment-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      child: "",
      flag: false,
    };
  },
  name: "comment-tree",
  props: ["itemChild", "deep", "showreply"],
  methods: {
    reply(item) {
      this.$emit("getcommentid", item);
    },
    reply1(item) {
      this.$emit("getcommentid", item);
    },
    changeshow() {
      this.flag = !this.flag;
    },
  },
  computed: {
    itemChildfn() {
      if (this.itemChild != false) {
        // console.log(this.itemChild);
        return this.itemChild;
      }
    },
  },
  watch: {
    itemChildfn(newValue) {
      // console.log(newValue);
      this.child = newValue;
    },
  },
  created() {
    this.child = this.itemChild;
    this.flag = this.showreply;
  },
};
</script>

<style lang="less" scoped>
.reply_span {
  display: inline-block;
  padding: 2px 8px;
  background-color: #01a0fc;
  color: #fff;
  border-radius: 5px;
  line-height: normal;
}
.comment-wrap {
  width: 500px;
  line-height: 30px;
  font-size: 14px;
}
.replay {
  margin: 10px 0;
}
</style>
