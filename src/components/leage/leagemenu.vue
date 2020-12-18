<template>
    <div class="menu_left">
        <div class="search_leage">
            <el-input
                placeholder="搜联赛"
                suffix-icon="el-icon-search"
                v-model="input1">
            </el-input>
        </div>
        <div class="menu_main">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu :index="gameName.pid" v-for="(gameName,index) in gameData" :key="gameName.pid">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{gameName.gametitle}}</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <template slot="title">分组一</template> -->
                        <el-menu-item 
                        :index="gameName.pid +'-' + item.id" 
                        v-for="(item,index) in gameName.race" 
                        :key="item.id"
                        @click="changetype(item.id)"
                        >
                        {{item.gamename}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    name:"leagemenu",
    data(){
        return{
            input1:"",
            gameData: [
                {   pid:'1',
                    gametitle:"足球",
                    'race':[
                        {
                            id:'1',
                            gamename:"中超"
                        },
                        {
                            id:'2',
                            gamename:"意甲"
                        },
                        {
                            id:'3',
                            gamename:"西甲"
                        }
                    ]
                },
                {
                    pid:'2',
                    gametitle:"篮球",
                    'race':[
                        {
                            id:'1',
                            gamename:"CBA"
                        },
                        {
                            id:'2',
                            gamename:"NBA"
                        }
                    ],
                }
            ]
        }
    },
    methods:{
        changetype(id) {
            console.log(id);
            this.$emit("changetype", id);
        },
         handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less" scoped>
.menu_left{
    width: 20%;
    height: 100%;
    float: left;
    background-color: aqua;
}
.menu_main{
    text-align: center;
  font-size: 20px;
  color: #fff;
}
.el-submenu .el-menu-item {
    min-width: 0;
  }
  .el-menu--collapse {
    font-size: 20px;
    width: 100%;
  }
</style>