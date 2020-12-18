<template>
  <div class="attset">
        <el-row class="setlist">
            <el-button v-for="item in wpList" size="mini" :key="item.name" 
            :class="[{active : active == item.id},'changebtn']" 
            @click="selected(item.id)">{{item.name}}</el-button>
        </el-row>
       <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="" prop="footradio" v-for="(data,key,index) in checkboxList" :key="index">
                    <div class="column"><div v-if="data[0].ch_columnm_name">{{data[0].ch_columnm_name}}</div></div>
                    <el-checkbox-group v-model="ruleForm.footradio" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.id" name="footradio" :checked="item.is_followed == '1' ? checker : nochecker" v-for="(item,index) in data" :key="index">
                        <img class="team" :src="item.ch_logo" alt="">
                        {{item.ch_name}}
                    </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>    -->
                    <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>                                    
                </el-form-item>
            </el-form>
            <!-- <el-checkbox-group v-for="(data,index) in checkboxList" :key="index" v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox :label="item.id"  v-for="item in data" :key="item.id">{{item.ch_name}}</el-checkbox>
            </el-checkbox-group>
            <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
            <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')">提交</el-button>   -->
        </div>
  </div>
</template>

<script>
export default {
    name:"attentionset",
    data(){
        return{
            wpList: [
                {
                    id:1,
                    name: '直播'
                },
                {
                    id:2,
                    name: '新闻'
                },
                {
                    id:3,
                    name: '社区'
                }
            ],
            active:'1',
            ruleForm:{
                footradio: [],
                basradio:[],
                otherradio:[]
            },
            rules:{

            },
            avator:require("@/image/news.jpeg"),
            checkboxList:{},
            imgurl:this.JuheHOST,
            checkedbox:[],
            checker:true,
            nochecker:false,
            //测试
            checkedCities:[]
        }
    },
    methods: {
        handleCheckedCitiesChange(value){
            // this.checkedCities = value;
            this.checkedbox = String(value);
            console.log(value);
        },
        selected(name){
            this.active = name;
            console.log(this.active);
            //清空其他页面已选项
            this.checkedbox = [];
            // console.log(this.checkedbox);
            //根据name获取其他类别
            this.getChanelList()
        },
        submitForm(ruleForm) {
            this.$api.editchanel.editerchanel({
                type:this.active,
                channel:this.checkedbox
            }).then(res => {
                // console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    this.$message({
                        type: 'success', // warning、success
                        message: '关注成功' 
                    })                            
                } else if (res.data.code == -1) {

                }
            })
            .catch(error => {
                this.$message("请检查关注项")
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 获取频道列表
        getChanelList(){
            let params = { type : this.active};
            this.$api.attchanelist.attchanel(
                params
            ).then(res => {
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
                    this.ruleForm.footradio = res.data.params.user_followed_id;
                    this.checkboxList = res.data.params.channel;               
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'success', // warning、success
                        message: res.data.msg 
                    })
                    this.$router.push('/');
                }
            })
            .catch(error => {
                this.$message("获取失败");
            })
        }
    },
    mounted(){
        
        
    }
}
</script>

<style lang="less" scoped>
.attset{
    width: 1131px;
    // height: 700px;
    position: relative;
    left: -200px;
    z-index: 999;
    .setlist{
        margin-bottom: 5px;
    }
    .changebtn{
        width: 100px;
        border-radius: 20px;
    }
    .team{
        width: 35px;
        height: 35px;
        position: relative;
        border-radius: 50%;
    }
}
.column{
    width: 100%;
    height: 28px;
    background:linear-gradient(to right,#F0F0EF,#F8F9FB);
    margin-bottom:10px;
    div{
        width: 100px;
        text-align: center;
        background-color: #014681;
        height: 28px;
        line-height: 28px;
        color: #FFF;
    }
}
.active {
   background: #014681 !important;
   border: 1px solid #014681 !important;
   color: #FFF !important;
 }
.active:focus {
   background: #014681 !important;
   border: 1px solid #014681 !important;
   color: #FFF !important;
 }

 .canclebtn{
    width: 120px;
    margin-left: 250px;
}
.submitbtn{
    width: 120px;
    margin-left: 10px;
}
 /deep/.el-checkbox__label{
    line-height: 35px !important;
}
/deep/.el-tabs__content{
    overflow: visible !important;
}
/deep/.el-form-item{
    margin-bottom: 10px;
}
</style>
<style>
.el-tabs__content{
    overflow: visible !important;
}
</style>