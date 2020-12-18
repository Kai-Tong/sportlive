import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const state = {
  liveList: '',
  newsList: '',
  token: '',
  uname:'',
  nickname:'',
  upic:'',
  replyInfo: {},
  liveheader: 0
};
const mutations = {
  /**
   * 跳转直播页面data
   * @param {obj} state 
   * @return {obj} data 
   */
  liveList(state, data) {
    state.liveList = data;
  },
  /**
   * 登录获取的token
   * @param {str} state 
   * @param {str} data 
   * @return {str} data
   */
  token(state, data) {
    state.token = data;
  },
  uname(state,data){
    state.uname = data;
  },
  nickname(state,data){
    state.nickname = data;
  },
  upic(state,data){
    state.upic = data;
  },
  communitydel(state, data) { //社区讨论区
    state.communitydel = data;
  },
  liveheader(state, data) {
    state.liveheader = data;
  },
  postdel(state,data){//贴子详情
    state.postdel = data;
  },
  menufootData(state, data) { //左边栏目足球
    state.menufootData = data;
  },
  menubacketballdata(state, data) { //左边栏目篮球
    state.menubacketballdata = data;
  },
  menucomplexdata(state, data) { //左边栏目综合
    state.menucomplexdata = data;
  },
  menulike(state, data) {//我关注的栏目
    state.menulike = data;
  },
  newsNenu(state, data) {//我关注的栏目
    state.newsNenu = data;
  },
  /**
   * 跳转新闻详情页面
   * @param {obj} state 
   * @param {obj} data 
   */
  newsList(state, data) {
    state.newsList = data
  },
  /**
   * 新闻右边直播数据
   * @param {*} state 
   * @param {*} data 
   */
  newslivedata(state, data) {
    state.newslivedata = data
  },
  /**
   * 新闻右边swp数据
   * @param {*} state 
   * @param {*} data 
   */
  newsmenuswp(state, data) {
    state.newsmenuswp = data
  },
  /**
   * 获取回复信息
   * @param {obj} state 
   * @param {obj} reply 
   */
  setReplyInfo(state, reply) {
    state.replyInfo = reply
  },
  clid(state,data){
    state.clid = data
  },
  channel(state,data){
    state.channel = data
  },
  livedelId(state,data){
    state.livedelId = data
  }
};
const actions = {
  setReplyInfoActions({
    commit
  }, reply) {
    commit("setReplyInfo", reply)
  }
};
const getters = {
  getReplyInfo(state) {
    return state.replyInfo
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()],
});
