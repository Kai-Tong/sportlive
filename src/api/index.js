/**
 * api接口统一出口
 */
//登录接口
import getCode from "./getcode"
import login from "./login"
import loginout from "./loginout"
import checkname from "./checkname"
import fogetpwd from "./fogetpwd"
import registered from "./registered"
import basic from "./basicInfo"
import getbasicInfo from "./getbasicInfo"
import privacy from "./privacy"
import getprivacy from "./getprivacy"
import chanel from "./channelist"
import uploadActionUrl from "./uploadActionUrl"
import nickname from "./nickname"
import setpassword from "./setpassword"
import changephone from "./changephone"
import changemail from "./changemail"
import checkreal from "./checkreal"
import homeindex from "./httpget"
import httppost from "./httppost"
import attchanelist from "./attchanelist"
import editchanel from "./editchanel"
import suggestList from "./suggestList"
import sendsuggest from "./sendsuggest"
import upimg from "./upimg"
import suggestdetail from "./suggestdetail"
import suggestreply from "./suggestreply"
import myprofile from "./myprofile"
import followfans from "./followfans"
import publish from "./publish"
import getformatechanel from "./getformatechanel"
import report from "./report"

//导出接口
export default {
    //获取验证码
    getCode,
    //登录
    login,
    //退出登录
    loginout,
    //注册
    registered,
    //检查用户是否存在
    checkname,
    //忘记密码修改密码
    fogetpwd,
    //基本信息
    basic,
    //基本信息获取
    getbasicInfo,
    //隐私设置
    privacy,
    //隐私设置获取
    getprivacy,
    //设置页频道列表
    chanel,
    //头像上传地址
    uploadActionUrl,
    //设置-修改昵称
    nickname,
    //设置-修改密码
    setpassword,
    //设置-修改手机号
    changephone,
    //修改邮箱
    changemail,
    //设置-身份认证
    checkreal,
    //首页-获取数据
    homeindex,
    //post结构
    httppost,
    //获取关注，频道列表
    attchanelist,
    //用户关注频道编辑
    editchanel,
    //反馈列表获取
    suggestList,
    //反馈提交
    sendsuggest,
    //图片上传
    upimg,
    //获取反馈详情
    suggestdetail,
    //反馈回复
    suggestreply,
    //我的主页。我的帖子
    myprofile,
    //我的粉丝，我的关注
    followfans,
    //帖子发布
    publish,
    //级联选中
    getformatechanel,
    //举报
    report
}