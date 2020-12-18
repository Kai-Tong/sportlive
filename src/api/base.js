/**
 * 接口地址的管理
 */
import host from './httpurl'
const base = {
  //发送验证码
  getCode: `${host}/apiv2/user_sent_mms`,
  //登录
  getToken: `${host}/apiv2/user_login`,
  //退出登录
  loginout:`${host}/apiv2/user/logout`,
  // getToken: "​/joke/content/list.php",
  //注册
  registered: `${host}/apiv2/user_reg`,
  //检查用户是否存在
  checkname: `${host}/apiv2/user_name_visible`,
  //忘记密码修改密码
  fogetpwd: `${host}/apiv2/user_change_pwd`,
  //基本资料设置
  basicInfo: `${host}/apiv2/user/base`,
  //基本资料获取
  getbasicInfo: `${host}/apiv2/user/base`,
  //隐私设置
  privacy: `${host}/apiv2/user/account/personal`,
  //隐私设置获取
  getprivacy: `${host}/apiv2/user/account/personal`,
  //用户设置-频道列表
  channelist: `${host}/apiv2/channel`,
  //用户设置-头像上传
  uploadActionUrl: `${host}/apiv2/user/account/pic`,
  //用户设置-昵称修改
  nickname: `${host}/apiv2/user/account/nickname`,
  //用户设置-密码修改
  setpassword: `${host}/apiv2/user/account/pwd`,
  //用户设置-绑定手机修改
  changephone: `${host}/apiv2/user/account/mobile`,
  //修改邮箱
  changemail:`${host}/apiv2/user/account/email`,
  //用户设置-身份认证
  checkReal: `${host}/apiv2/user/account/real`,
  //用户关注设置获取，频道列表获取
  attchanelist: `${host}/apiv2/user/account/follow`,
  //用户关注频道设置编辑
  editchanel: `${host}/apiv2/user/account/follow`,
  //反馈列表
  suggestList: `${host}/apiv2/feedback`,
  //反馈提交
  sendsuggest: `${host}/apiv2/feedback`,
  //图片上传
  upImg: `${host}/apiv2/pic`,
  //反馈详情
  suggestdetail: `${host}/apiv2/feedback`,
  //反馈回复提交
  suggestreply: `${host}/apiv2/feedback/reply`,
  //帖子发布
  publish: `${host}/apiv2/forum`,
  //级联选项
  getformatechanel: `${host}/apiv2/get_format_channel`,
  //我的主页,我的帖子
  myprofile: `${host}/apiv2/user/profile`,
  //我的粉丝，关注
  followfans: `${host}/apiv2/user/follow_fans`,
  //举报
  report: `${host}/apiv2/report`,
  //获取首页信息
  homeindex: `${host}/apiv2/index`,
  //获取直播首页信息
  liveindex: `${host}/apiv2/live/index/`,
  //获取新闻首页信息
  newsindex: `${host}/apiv2/news`,
  //获取直播信息
  livedel: `${host}/apiv2/live/player/`,
  //获取直播推荐数据
  livevideo: `${host}/apiv2/live/promote`,
  //获取新闻详情信息
  newsdel: `${host}/apiv2/news/`,
  //获取社区首页数据
  fourm: `${host}/apiv2/fourm`,
  //搜索新闻话题用户
  search: `${host}/apiv2/search`,
  //直播指数
  rate: `${host}/apiv2/live/rate/`,
  //添加、取消关注接口
  follow: `${host}/apiv2/user/follow`,
  //评论点赞
  star:`${host}/apiv2/comment/star/`,
  //用户关注讨论区频道
  follow1:`${host}/apiv2/user/account/follow`,
  //用户评论添加
  comment:`${host}/apiv2/comment`,
  //贴子详情
  forumdel:`${host}/apiv2/forum/`,
  //数据分析
  sta:`${host}/apiv2/live/sta/`
}


export default base;
