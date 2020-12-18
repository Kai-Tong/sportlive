<template>
<div>
    <div class="head_bg">
        <div>
            <report v-if="showReport" :visible = "visible" :report_id = "uid" :report_type = "type" @chidVisible="getVisible"/>
        </div>
        <div>
            <div class="avator_con">
                <img :src="profile.user_pic" alt="" v-if="profile.user_pic">
            </div>
            <div class="des_con">
                <div>
                    <p class="p1">用户名：{{profile.user_name}}</p>
                    <div class="p2">个性签名：{{profile.user_desc}}</div>
                    <div class="info">
                        <p>关注：{{profile.user_follow_num}}</p>
                        <p>粉丝：{{profile.user_fans_num}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="uid !=0">
            <el-button class="reportbtn" size="mini" type="info" plain @click="reportHandler('id')">举报</el-button>
            <el-button v-if="flag == 1" class="attentionbtn" size="mini" type="primary" @click="follow">+ 加关注</el-button>
            <el-button v-if="flag == 2" class="attentionbtn" size="mini" type="primary" @click="follow">取消关注</el-button>
        </div>
        <div class="timer">
            <div class="date">
                {{date}}
            </div>
            <div class="weekend">
                {{nowWeekend}}
            </div>
        </div>
    </div>
    <div class="person_info">
        <p class="p_title">个人信息</p>
        <div class="info_detail">
            <p>生日:{{profile.user_birthday}}</p>
            <p>性别:{{profile.user_sex ==1 ? '男' : '女'}}</p>
            <p>星座:{{constellation}}</p>
            <p>地区:{{profile.user_location}}</p>
            <p>爱好:{{profile.user_hobby}}</p>
        </div>        
    </div>
</div>
    
</template>
<script>
import report from "./report"
export default {
    name:"personhead",
    components:{
        report
    },
    data(){
        return {
            imgurl:this.JuheHOST,
            avator:require("@/image/news.jpeg"),
            nowWeekend:"",
            date:"",
            visible:false,
            showReport:false,
            profile:{},
            //举报实体 1：新闻2：帖子3：用户4:评论
            type:3,
            uid:0,
            //关注
            flag:1,//关注1,取消关注2
        }
    },
    props:["nameId"],
    methods:{
        reportHandler(){
            this.showReport = !this.showReport;
            this.visible = true;
        },
        getVisible(value){
            this.showReport = value;
        },
        //时间转换
        dateFormat(dateData) {
            var date = new Date(dateData)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            const time = y + '-' + m + '-' + d
            return time
        },
        //星座函数
        getAstro(strBirthday){
            let birthYear,birthMonth,birthDay; 
            let strBirthdayArr=strBirthday.split("-");
            // console.log(strBirthdayArr);
            if (strBirthdayArr.length>0 && this.profile.user_birthday) {
                birthYear = strBirthdayArr[0];  
                birthMonth = strBirthdayArr[1];  
                birthDay = strBirthdayArr[2];  
            }else{
                return;
            }
            let s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
            let arr=[20,19,21,21,21,22,23,23,23,23,22,22];
            return s.substr(birthMonth*2-(birthDay< arr[birthMonth-1]?2:0),2);//12  21
        },
        //获取个人信息
        getInfo(){
            this.$axios({
                url:`${this.$api.myprofile}/${this.uid}`,
                method: "get",
                timeout: 3000
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    this.profile = res.data.params.profile;
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: '身份验证过期，请重新登录' 
                    })
                    this.$router.push("/") 
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //点击关注
        follow(){
            this.$axios({
                url:`${this.$api.httppost.follow()}/${this.flag}/${this.uid}`,
                method: "post",
                data: {
                    uid: this.uid,
                    type: this.flag,
                },
                timeout: 3000
            })
            .then(res => {
                // console.log(res);
                    if (res.data.code == 1) {
                        this.$message({
                            type: 'error', // warning、success
                            message: res.data.msg 
                        }) 
                    } else if (res.data.code == 0) {
                        // this.$message({
                        //     type: 'success', // warning、success
                        //     message: res.data.msg 
                        // })
                        if(this.flag == 1){
                            this.flag = 2
                        }else if(this.flag == 2){
                            this.flag = 1
                        }
                        console.log(this.flag);                
                    } else if (res.data.code == -1) {
                        this.$message({
                            type: 'success', // warning、success
                            message: res.data.msg 
                        })
                        this.$router.push("/") 
                    }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    computed:{
        constellation(){
            return this.getAstro(this.dateFormat(this.profile.user_birthday));
        }
    },
    mounted(){
        let weekend ="周" + "日一二三四五六".charAt(new Date().getDay());
        this.nowWeekend = weekend;
        let todayDate = new Date();
        this.date = todayDate.getDate();
        this.getInfo()
    }
}
</script>
<style lang="less" scoped>
.person_head{
    overflow: hidden;
}
.head_bg{
    width: 100%;
    height: 178px;
    background-color: #F8FCFF;
    position: relative;
    .avator_con{
        width: 108px;
        height: 108px;
        border-radius: 50%;
        position: absolute;
        top: 35px;
        left: 30px;
        overflow: hidden;
        z-index: 99;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .des_con{
        width: 500px;
        height: 70px;
        position: absolute;
        left: 168px;
        top: 42px;
        font-weight: 500;
        div{
            height: 70px;
            float: left;
            p{
                height: 30px;
                line-height: 30px;
                margin-left: 50px;
            }
            .p1{
                font-size: 20px;
                color: #1a90fc;
            }
            .p2{
                margin-left: 50px;
                width: 600px;
                height: auto;
                font-size: 14px;
                color: #848484;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
            }
            .info{
                p{
                    float: left;
                    font-size: 14px;
                    color: #848484;
                }
            }
        }
    }
    .timer{
        width: 70px;
        height: 100px;
        position: absolute;
        right: 40px;
        top: 30px;
        text-align: center;
        border-radius: 5px;
        .date{
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            font-weight: 700;
            background-color: #eee9dc;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        .weekend{
            height: 40px;
            line-height: 40px;
            background-color: #c4971d;
            border-radius: 5px;
        }
    }
}
.reportbtn,.attentionbtn{
    width: 84px;
    border-radius: 20px;
    color: #FD8C5E;
    position: absolute;
    top: 42px;
}
.attentionbtn{
    color: #FD8C5E;
    border-color: #FCBF31;
    background-color: #FFF;
    right: 148px;
}
.reportbtn{
    color:#3c3c3c;
    border-color: #d2d2d2;
    background-color: #d2d2d2;
    right: 48px;
}
.person_info{
    width: 100%;
    height: 143px;
    padding: 10px 0;
    .info_detail{
        margin-top: 20px;
        p{
            height: 30px;
            width: 40%;
            font-size: 14px;
            color: #aeaeae;
            float: left;
            line-height: 30px;
            padding-left: 50px;
            span{
                margin-left: 30px;
            }
        }
    }
    
    .p_title{
        border-left: 5px solid #014681;
        color: #014681;
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        padding:0 10px;
        font-weight: 600;
        position: relative;
    }
    .p_title:after{
        content: '';
        position: absolute;
        top: 50%;
        height: 1px;
        width: 950px;
        background-color: #d2d2d2;
        left: 100px;
    }
}
</style>