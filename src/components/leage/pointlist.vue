<template>
    <div class="point_con">
        <div class="point_top">
            <img src="" alt=""><span class="point_title">中国超级联赛</span>
        </div>
        <div class="point_tab">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane 
                v-for="(item,index) in categoryData" 
                :key="index" 
                :label="item.text" 
                :name="item.name"
                >
                {{item.text}}</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name:"pointlist",
    data(){
        return{
            activeName:'first',
            categoryData:[
                {
                    text:"积分榜",
                    name:"first"
                },
                {
                    text:"赛果赛程",
                    name:"second"
                },
                {
                    text:"盘路统计",
                    name:"third"
                },
            ]
        }
    },methods:{
        handleClick(tab, event) {
        console.log(tab);
      }
    }
}
</script>

<style lang="less" scoped>
    .point_con{
        width: 80%;
        float: left;
        height: 1000px;
        // margin-left: 5px;
    }
    .point_top{
        width: 100%;
        position: relative;
        
        height: 200px;
        background-color: #7fb6ff;
        .point_title{
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            color: #FFFFFF;
            position: relative;
            top: 70px;
        }
    }
    .point_tab{
        width: 100%;
        float: left;
    }
</style>