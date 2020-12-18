<template>
    <div class="public cl">
        <el-button class="publish" type="primary" icon="el-icon-edit" @click="toPublish">发帖</el-button>
        <!-- <hishomeperson /> -->
        <div>
        <div class="article_info">
            <p class="p_title">他的发帖</p>
            <div class="article" v-for="(item,index) in articleList" :key="index" @click="gotopostdetails(item)">
                <div class="article_left">
                    <p class="article_title"><span class="title_tag">{{item.ch_name}}</span>{{item.forum_title}}</p>
                    <div class="article_content" ref="forum_body" v-html="item.forum_body"></div>
                </div>
                <p class="article_right">
                    {{item.addtime_format}}
                </p>
            </div>
            <div class="noarticle" v-if="articleList.length == 0 && authority == '暂未发布帖子'">
                {{authority}}
            </div>
            <div class="showmore" v-if="articleList.length > 0" @click="showMore"><i class="el-icon-d-arrow-right more"></i></div>
            <div class="noarticle" v-if="articleList.length == 0 && authority == '用户隐私不可见'">
                {{authority}}
            </div>
        </div>
        <el-backtop target="body #home"></el-backtop>
    </div>
    </div>
</template>
<script>
import wangEditor from 'wangeditor'
const hishomeperson = () => import("./hishomeperson");
export default {
    name:"",
    components:{
        hishomeperson
    },
    data(){
        return{
            uid:'',
            articleList: [],
            authority:'',
            p:1,
            total:'',
            pageSize:'',
        }
    },
    mounted(){
        
    },
    methods:{
         toPublish(){
             this.$router.push('/publish')
         },
         getaAticle(){
            if(this.$route.params.uname){
                this.uid = this.$route.params.uname;
            }else{
                this.uid = localStorage.getItem('otherId')
            }
            let params = {
                p:this.p,
             }
            this.$axios({
                url:`${this.$api.myprofile}/${this.uid}`,
                method: "get",
                params:params,
                timeout: 3000
            })
            .then(res => {
                // console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    })
                    this.authority = '用户隐私不可见' 
                } else if (res.data.code == 0) {
                    this.total = res.data.params.pagination.total;
                    this.pageSize = res.data.params.pagination.page_size;
                    let receiveList = res.data.params.my_forum;
                    if (this.p == 1) {
                        this.articleList = receiveList;
                    } else {
                        let datalist = this.articleList;
                        let list = datalist.concat(receiveList);
                        this.articleList = list;
                    }
                    this.authority = '暂未发布帖子'
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
        showMore(){
            this.p ++;
            if(this.p <= Math.ceil(this.total/this.pageSize)){
                this.getaAticle();
            }else{
                this.$message({
                    type: 'warning', // warning、success
                    message: '没有更多了！' 
                })
            }
        },
        gotopostdetails(item){//跳转贴子详情页面
            this.$store.commit('postdel',item);
            this.$router.push({
                name: "Postdetails",
                params: { id: `${item.forum_id}` },
            });
        },
    },
    mounted() {
       this.getaAticle();
    },
    created(){
        if(this.$route.params.uname){
            localStorage.setItem('otherId',this.$route.params.uname)
        }       
    }
}
</script>
<style lang="less" scoped>
.public{
    width: 100%;
    position: relative;
    margin-bottom:40px;
    .publish{
        position: fixed;
        top: 400px;
        right: 340px;
        opacity: 0.7;
        z-index: 999;
    }
}
.article_info{
    width: 100%;
    margin-top: 5px;
    padding-bottom: 50px;
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
    .article{
        width: 1000px;
        height: 96px;
        margin-left: 45px;
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
                    background-color: #82C4FF;
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
    .noarticle{
        text-align: center;
        height: 200px;
        line-height: 100px;
        color: #848484;
    }
    .article:hover{
        background-color: aliceblue;
        cursor: pointer;
    }
    .showmore{
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        .more{
            font-weight: 600;
            transform: rotate(90deg);
        }
    }
    .more:hover{       
        color: #177BDB;
        cursor: pointer;
    }
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
    line-height: 15px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.article_content >>> a{
    pointer-events:none;
}

</style>