<template>
    <div>
        <div class="article_info">
            <el-button class="publish" type="primary" icon="el-icon-edit" @click="toPublish">发帖</el-button>
            <p class="p_title">最新发帖</p>
            <!-- <div class="article" v-for="(item,index) in articleList" :key="index" @click="gotopostdetails(item)">
                <div class="article_left">
                    <p class="article_title"><span class="title_tag">{{item.ch_name}}</span>{{item.forum_title}}</p>
                    <div class="article_content" ref="forum_body" v-html="item.forum_body"></div>
                </div>
                <p class="article_right">
                    {{item.addtime_format}}
                </p>
            </div> -->
            <div class="noarticle" v-if="articleList.length == 0">
                暂未发布帖子
            </div>
            <el-timeline :reverse="reverse" >
                <el-timeline-item
                v-for="(item, index) in articleList"
                :key="index"
                icon = "el-icon-edit"
                size = 'large'
                type = 'primary'
                :timestamp="item.addtime_format"
                placement="top"
                :class="{'odd_line':index%2 != 1}"
                >
                <div :class="[{'odd_con':index%2 != 1},'article']" @click="gotopostdetails(item)">
                    <el-card>
                        <p class="article_title"><span class="title_tag">{{item.ch_name}}</span>{{item.forum_title}}</p>
                        <hr>
                        <div class="article_content" v-html="item.forum_body"></div>
                    </el-card>
                </div>
                </el-timeline-item>
            </el-timeline>
            <div class="more" @click="toArticle">
                <el-tooltip class="item" effect="dark" content="查看更多" placement="right-start">
                    <i class="el-icon-more"></i>
                </el-tooltip>
            </div>
        </div>
        <el-backtop target="body #home"></el-backtop>
    </div>
</template>
<script>
export default {
    name:"",
    data(){
        return{
            uid:0,
            articleList: [],
            reverse:true,
        }
    },
    methods:{
        toPublish(){
             this.$router.push('/publish')
         },
        getaAticle(){
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
                    this.articleList = res.data.params.my_forum.slice(-5);
                } else if (res.data.code == -1) {
                    // this.$message({
                    //     type: 'success', // warning、success
                    //     message: res.data.msg 
                    // })
                    // this.$router.push("/") 
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        gotopostdetails(item){//跳转贴子详情页面
            // this.$router.push('/postdetails');
            this.$store.commit('postdel',item);
            this.$router.push({
                name: "Postdetails",
                params: { id: `${item.forum_id}` },
            });
        },
        toArticle(){
            this.$router.push('/person/article')
        }
    },
    mounted(){
        this.getaAticle();
    }
}
</script>
<style lang="less" scoped>
.article_info{
    .publish{
        position: fixed;
        top: 400px;
        right: 340px;
        opacity: 0.7;
        z-index: 999;
    }
    width: 100%;
    // padding: 0 10px;
    margin-top: 5px;
    padding-bottom: 50px;
    .p_title{
        border-left: 5px solid #014681;
        color: #014681;
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        padding:0 10px;
        margin-bottom: 20px;
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
    .article{
        width: 480px;
        // height: 120px;
        overflow: hidden;
        margin-left: 25px;
        margin-top: 10px;
        border-bottom: 1px solid #d2d2d2;
        .article_left{
            width: 70%;
            height: 100%;
            float: left;
            padding-left: 35px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .article_title{
                height: 20px;
                line-height: 20px;
                margin-top: 15px;
                font-size: 18px;
                color: #3c3c3c;
                .title_tag{
                    font-size: 12px;
                    background-color: #82C4FF !important;
                    color: #ffffff;
                    padding: 3px;
                    border-radius: 5px;
                    margin-right: 5px;
                }
            }
            .article_content{
                height: 15px;
                line-height: 15px;
                margin: 20px 0 0 50px;
                overflow: hidden;
                font-size: 12px;
                color: #848484;
            }
        }
        .article_right{
            width: 15%;
            height: 96px;
            line-height: 96px;
            float: right;
            font-size: 12px;
        }
    }
    .article:hover{
        background-color: aliceblue;
        cursor: pointer;
    }
    .noarticle{
        text-align: center;
        height: 200px;
        line-height: 100px;
        color: #848484;
    }
}
.more{
    width: 50px;
    margin: auto;
    cursor: pointer;
}
.more :hover{
    color: #4b4848;
}
/deep/.el-timeline-item__node--large{
    width: 20px;
    height: 20px;
}
/deep/.odd_line .el-timeline-item__timestamp.is-top {
    position: relative;
    left: -130px;
    // color: #333333;
}
/deep/.el-timeline {
    padding-left: 530px;

}
.odd_con{
    position: relative;
    left: -570px;
}
</style>
<style scoped>
.article_content >>> img{
    width: 115px;
    height: 73px;
    display: none;
}
.article_content >>> p{
    width: 100%;
    height: 15px;
    margin: 5px 0;
    line-height: 15px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.article_content >>> a{
    pointer-events:none;
}
.title_tag{
    font-size: 12px;
    background-color: #82C4FF !important;
    color: #ffffff;
    padding: 3px;
    border-radius: 5px;
    margin-right: 5px;
}
</style>
