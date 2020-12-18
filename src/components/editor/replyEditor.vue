<template>
  <div class="about">
    <div class="container">
    <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="content">
    </el-input>
    <button @click="showPicker">表情</button>
    <button @click="submit">提交</button>
    <div>
      <picker
      v-show="showEmi"
      class="emoji"
      :include="['people']" 
      :showSearch="false"   
      :showPreview="false" 
      :showCategories="false"
      @select="addEmoji"
    />
    </div>
  </div>
  </div>
</template>
<script>
import { Picker } from "emoji-mart-vue";
export default {
  name:"",
  data() {
    return {
      content: "",
      showEmi:false
    };
  },
  methods: {
    addEmoji(e) {
      this.content += e.native;
      
    },
    showPicker(){
      this.showEmi = !this.showEmi;
    },
    submit(){
      console.log(this.content);
      this.$emit("receiveMsg",this.content)
    }
  },
  created() {},
  mounted() {},
  components: {
    Picker
  }

}
</script>
<style lang="less" scoped>
.container{
  position: relative;
}
.emoji{
  position: absolute;
}
/deep/.emoji-mart-category-label span[data-v-376cda0e] {
  display: none;
}
</style>
