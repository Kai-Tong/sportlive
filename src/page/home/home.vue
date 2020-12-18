<template>
  <div id="home">
    <home_herder @changetype="parentEvent" :headerKey="headerKey"></home_herder>
    <home_content />
    <div class="margin50">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
const home_content = () => import("../../components/home/home_content");
const Footer = () => import("../../components/footer/footer");
export default {
  data() {
    return {
      menu_num: "1",
      component_name: "home_content",
      headerKey: "1",
    };
  },
  methods: {
    parentEvent(data) {
      this.menu_num = data;
    },
  },
  watch: {
    // menu_num(newValue, oldValue) {
    //   switch (newValue) {
    //     case "1":
    //       return (this.component_name = "home_content");
    //       break;
    //     case "2":
    //       return (this.component_name = "live");
    //       break;
    //     case "3":
    //       //   return (this.component_name = "live");
    //       break;
    //     case "4":
    //       console.log("这个是4");
    //       break;
    //   }
    // },
  },
  components: {
    home_herder,
    home_content,
    Footer,
  },
  created() {},
};
</script>

<style lang="less" scoped>
#home {
  background-image: url("../../image/bj.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>