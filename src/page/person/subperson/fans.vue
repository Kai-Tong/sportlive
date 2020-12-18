<template>
    <div class="attention">
        <p class="p_title">我的粉丝</p>
        <div class="attention_list">
            <div :class="['subatten',{'subatten2':(index+1) % 4 !== 0}]" v-for="(item,index) in attentionData" :key="index" @click="goPerson(item.id)">
            <!-- <p class="guanzhu" :style="{ width: newWidth < 100 ? 100 : newWidth + 'px' }">2222</p> -->
                <div class="attenhead">
                    <img :src="item.user_pic" alt="">
                </div>
                <div class="attenmid">
                    <div class="sign">{{item.user_name}}</div>
                    <div class="desc">
                        <p>个性签名{{item.user_desc}}</p>
                    </div>
                    <div class="mid_con">
                        <p>帖子:{{item.forum_count}}</p>
                        <p>粉丝:{{item.user_fans_num}}</p>
                        <p>关注:{{item.user_follow_num}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="noarticle" v-if="attentionData.length == 0">
            暂无粉丝
        </div>
    </div>
</template>
<script>
export default {
    name:"",
    data(){
        return{
            imgurl:this.JuheHOST,
            colorStyle: 'red',
            background: 'blue',
            newWidth:10,
            uid:localStorage.getItem("user_uid"),
            attentionData:[]
        }
    },
    methods:{
        getFans(){
            this.$axios({
                url:`${this.$api.followfans}/${this.uid}/2`,
                method: "get",
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
                    this.attentionData = res.data.params.follow_fans;
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
        },
        //查看粉丝个人中心
        goPerson(value) {
            console.log(value);
            this.$router.push({ name: "hishomeperson", params: { uname: value } });
        },
    },
    mounted(){
        this.getFans()
    }

}
</script>
<style lang="less" scoped>
.attention{
    width: 100%;
    margin-top: 5px;
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
    .attention_list{
        margin-top: 20px;
        .subatten{
            width: 470px;
            height: 130px;
            float: left;
            position: relative;
            margin: 0 0 30px 43px;
            padding: 5px;
            background-color: #F4F9FF;
            box-shadow: 0px 1px 1px 1px #e7e2e2;
            transition: all .2s linear;
            border-radius: 1px;
            border-radius: 5px;
            cursor: pointer;
            .attenhead{
                height: 120px;
                width: 80px;
                float: left;
                position: relative;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
            .attenmid{
                height: 120px;
                width: 300px;
                float: left;   
                p{
                    display: inline-block;
                }
                .sign{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #1a90fc;
                }
                .desc{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    color: #aeaeae;
                }
                .mid_con{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    color: #aeaeae;
                    p{
                        margin-right: 10px;
                    }
                }
            }
            .attenfoot{
                width: 80px;
                float: left;
                .attenbtn{
                    border-radius: 20px;
                    font-size: 12px;
                    background-color: #d2d2d2;
                    color: #3c3c3c;
                }
            }
        }
    }
    
}
.noarticle{
    text-align: center;
    height: 200px;
    line-height: 100px;
    color: #848484;
}
.subatten:hover{
    transform: translateY(-3px);
    box-shadow: 0 5px 10px #CACACA;
}
.subatten2{
    // margin-right:0;
    margin-right: 6.5%;
}
</style>