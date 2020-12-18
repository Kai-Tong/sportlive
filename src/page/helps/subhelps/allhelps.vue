<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
            <template slot="title">
                <i class="el-icon-s-help"></i>忘记密码怎么办？
            </template>
            <div class="content">首页导航栏点击忘记密码</div>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
                <i class="el-icon-s-help"></i>修改头像怎么办？
            </template>
            <div class="content">登录后->设置->账号信息->修改头像</div>
        </el-collapse-item>
        <el-collapse-item name="3">
            <template slot="title">
                <i class="el-icon-s-help"></i>修改手机怎么办？
            </template>
            <div class="content">登录后->设置->账号信息->修改手机</div>
        </el-collapse-item>
        <el-collapse-item name="4">
            <template slot="title">
                <i class="el-icon-s-help"></i>修改密码怎么办？
            </template>
            <div class="content">登录后->设置->账号信息->修改密码</div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
    name:"allhelps",
    data(){
        return{
            activeNames: ['1']
        }
    },
    methods:{
        handleChange(val) {
        console.log(val);
      }
    }
}
</script>

<style lang="less" scoped>
.content{
    margin-left: 55px;
}
</style>