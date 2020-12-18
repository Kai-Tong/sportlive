<template>
  <div class="article_list">
        <div class="list_con" v-for="(item,index) in article_list" :key="item.id">
            <div class="title">
                <p>
                    {{item.title}}
                    <span class="title_time">{{item.timer}}</span>
                </p>
            </div>
            <hr>
            <div class="content_con">
                <div class="content">
                    {{item.content}}
                </div>
                <a href="#">详情</a>
                <img v-for="(images,index) in item.imgList" :key="index" :src="images" alt="">
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:"personarticlelist",
    data(){
        return{
            article_list:[
                {
                    id:1,
                    title:"我是帖子标题",
                    timer:"2020-20-20",
                    content:"dolor sit amet lacus m socis mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.",
                    imgList:[
                        require("@/image/news.jpeg"),
                        require("@/image/news.jpeg"),
                        require("@/image/news.jpeg")
                    ],
                },
                {
                    id:2,
                    title:"我是帖子标题2",
                    timer:"2020-20-20",
                    content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.",
                    imgList:[
                        require("@/image/news.jpeg"),
                        require("@/image/news.jpeg"),
                        require("@/image/news.jpeg")
                    ],
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.article_list{
    padding: 20px;
    .list_con{
        margin: 20px 0;
        .title{
            font-size: 16px;
            font-weight: 600;
            .title_time{
                float: right;
                font-size: 12px;
            }
        }
        .content_con{
            font-size: 14px;
            .content{
                height: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            a{
                float: right;
                font-size: 12px;
            }
            img{
                width: 20%;
                margin-right: 1%;
            }
        }
    }
    
}
</style>>
