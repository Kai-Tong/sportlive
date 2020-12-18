<template>
  <div>
      <home_herder @changetype="parentEvent" :headerKey='headerKey'></home_herder>
      <div class="set">
            <div class="inset">
                <div class="line"></div>
                <div class="network">
                    <img :src="nonetwork" alt="">
                    <p class="p1">网络链接异常!</p>
                    <p class="p2">请检查你的网络</p>
                    <p><el-button class="btn" type="primary">返回</el-button></p>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
export default {
    name:"nonetwork",
    components:{
        home_herder,
    },
    data(){
        return{
            menu_num: "1",
            headerKey:'',
            nonetwork:require("@/image/imgs/nonetwork.png")
        }
    },
    methods:{
        parentEvent(data) {
            this.menu_num = data;
        },
    }
}
</script>

<style lang="less" scoped>
.set{
    width: 1273px;
    margin: auto;
    margin-top: 10px;
    height: 850px;
    background-color: #FFF;
    // padding: 13px 13px 0;
    padding-top: 13px;
    box-shadow: 0 3px 3px 3px #DBDBDB; 
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-sizing: border-box;
    .inset{
        width: 1235px;
        margin: auto;
        height: 750px;
        background-color: #F8FCFF;
        border: 1px solid #d2d2d2;
        padding-bottom: 50px;
        .line{
            width: 200px;
            height: 2px;
            margin: auto;
            margin-top: 20px;
            margin-bottom: 10px;
            background-color: #309CFB;
            box-sizing: border-box;
        }
        .network{
            width: 279px;
            margin: auto;
            margin-top: 150px;
            p{
                text-align: center;
                margin-bottom: 5px;
            }
            .p1{
                font-size: 18px;
                color: #1a94fc;
            }
            .p2{
                font-size: 12px;
                color: #d2d2d2;
            }
            .btn{
                width: 110px;
                border-radius: 20px;
            }
        }
    }
}
</style>