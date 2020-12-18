<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" >
@import url("./style/index");
#app {
  height: 100%;
  background-image: url("./image/bj.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 81px;
}

</style>