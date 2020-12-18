import Vue from 'vue'
import Router from 'vue-router'

// const Login = import('../page/login/login.vue');
// const Registered = import('../page/registered/registered.vue');
const Resetpass = import('../page/resetpass/resetpass.vue');
const Home = import('../page/home/home.vue');
// const Leagepoints = import('../page/leagepoints/leagepoints.vue');
const Live = import('../components/live/live');
const Livedel = import('../components/live/livedel.vue');
const New = import('../page/news/news.vue');
const Newdel = import('../page/news/newsdel.vue');
const Person = import('../page/person/person.vue');
const Homeperson = import('../page/person/subperson/homeperson.vue');
const Article = import('../page/person/subperson/article.vue');
const Attention = import('../page/person/subperson/attention.vue');
const Fans = import('../page/person/subperson/fans.vue');
const Hispage = import('../page/hispage/hispage.vue');
const Hishomeperson = import('../page/hispage/subperson/hishomeperson.vue');
const Hisarticle = import("../page/hispage/subperson/hisarticle.vue");
const Hisattention = import('../page/hispage/subperson/hisattention.vue');
const Hisfans = import('../page/hispage/subperson/hisfans.vue');
const Settings = import('../page/Settings/Setting.vue');
const Setinfo = import('../page/Settings/subsetinfo/setinfo.vue');
const Community = import('../page/community/community.vue');
const Communitydel = import('../page/community/communitydel.vue');
const Postdetails = import('../page/community/postdetails.vue');
const Analysis = import('../page/analysis/analysis.vue');
const Exponent = import('../page/exponent/exponent.vue');
const Helps = import('../page/helps/helps.vue');
const Suggest = import('../page/suggest/suggest.vue');
const Suggestdetail = import('../page/suggest/suggestdetail.vue');
const Nonetwork = import('../page/nonetwork/nonetwork.vue');
const Search = import('../page/search/search.vue')
const Publish = import('../page/publish/publish.vue')
const Rule = import('../page/rule/rule.vue')
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/front/',
  routes: [{
      path: '/',
      name: 'Home',
      component: () => Home
    },
    {
      path: '/live',
      name: 'Live',
      component: () => Live
    },
    {
      path: '/new',
      name: 'New',
      component: () => New
    },
    {
      path: '/community',
      name: 'Community',
      component: () => Community
    },
    {
      path: '/search',
      name: 'Search',
      meta: {
        requireAuth: true
      },
      component: () => Search
    },
    {
      path: '/communitydel',
      name: 'Communitydel',
      component: () => Communitydel
    },
    {
      path: '/postdetails/:id.html',
      name: 'Postdetails',
      component: () => Postdetails
    },
    {
      path: '/newdel/:id.html',
      name: 'Newdel',
      component: () => Newdel
    },
    {
      path: `/livedel/:matchId.html`,
      name: 'Livedel',
      component: () => Livedel
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => Analysis
    },
    {
      path: '/exponent',
      name: 'Exponent',
      component: () => Exponent
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => Login
    // },
    // {
    //   path: '/registered',
    //   name: 'Registered',
    //   component: () => Registered
    // },
    {
      path: '/resetpass',
      name: 'resetpass',
      component: () => Resetpass
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        requireAuth: true
      },
      component: () => Settings
    },
    {
      path: '/setinfo',
      name: 'setinfo',
      component: () => Setinfo
    },
    {
      path: '/person',
      name: 'person',
      meta: {
        requireAuth: true
      },
      redirect:"/person/homeperson",
      component: () => Person,
      children:[
        {
          path:"homeperson",
          name:"homeperson",
          component: () => Homeperson,
        },
        {
          path:"article",
          name:"article",
          component: () => Article,
        },
        {
          path:"attention",
          name:"attention",
          component: () => Attention,
        },
        {
          path:"fans",
          name:"fans",
          component: () => Fans,
        },
      ]
    },
    {
      path: '/hispage',
      name: 'hispage',
      meta: {
        requireAuth: true
      },
      redirect:"/hispage/hishomeperson",
      component: () => Hispage,
      children:[
        {
          path:"hishomeperson",
          name:'hishomeperson',
          component: () => Hishomeperson,
        },
        {
          path:"hisarticle",
          component: () => Hisarticle,
        },
        {
          path:"hisattention",
          component: () => Hisattention,
        },
        {
          path:"hisfans",
          component: () => Hisfans,
        },
      ]
    },
    {
      path: '/helps',
      name: 'helps',
      component: () => Helps
    },
    {
      path: '/suggest',
      name: 'suggest',
      meta: {
        requireAuth: true
      },
      component: () => Suggest,
    },
    {
      path: '/suggestdetail',
      name: 'suggestdetail',
      meta: {
        requireAuth: true
      },
      component: () => Suggestdetail,
    },
    {
      path: '/nonetwork',
      name: 'nonetwork',
      component: () => Nonetwork,
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requireAuth: true
      },
      component: () => Publish,
    },
    {
      path: '/rule',
      name: 'rule',
      component: () => Rule,
    },

    //联赛数据废弃
    // {
    //   path: '/leagepoints',
    //   name: 'leagepoints',
    //   component: () => Leagepoints
    // },

  ]
})
