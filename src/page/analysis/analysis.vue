<template>
  <div class="dataanalysis">
      <analyheader></analyheader>
  </div>
</template>

<script>
const analyheader = ()=>import('../../components/analysis/analysis.vue')
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  components: {
      analyheader,
  },
};
</script>

<style lang="less" scoped>
</style>