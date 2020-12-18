<template>
    <div>
        <home_herder @changetype="parentEvent" :headerKey='headerKey'></home_herder>
        <div class="suggset_wrap">
            <div class="publish">
                <h1>反馈建议</h1>
                <el-button type="primary" @click="showEditor" icon="el-icon-edit" round>提交问题</el-button>
            </div>
            <el-dialog
                title="写建议"
                :visible="dialogVisible"
                width="50%"
                :before-close="handleClose"
            >
                <publishEditor/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitReply">确 定</el-button>
                </span>
            </el-dialog>
            <p>{{getReplyInfo}}</p>
            <p>{{newReplyInfo}}</p>
            <suggestlist />
            <div v-for="(item,index) in testData" :key="index">
                <p @click="remove(index)">{{item}}</p>
            </div>
            <button @click="add">++</button>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
const home_herder = () => import("../../components/home/home_herder");
import wangEditor from 'wangeditor'
const publishEditor = () => import("@/components/editor/editor");
const suggestlist = () => import("./suggestlist");
export default {
    name:"suggest",
    components:{
        home_herder,
        publishEditor,
        suggestlist
    },
    data(){
        return{
            menu_num: "1",
            headerKey:'',
            dialogVisible: false,
            newReplyInfo: {},
            testData:[
                'one',
                'two',
                'three',
                'four',
                'five'
            ]
        }
    },
    mounted(){
        console.log(this.getReplyInfo);
        console.log(this.replyInfo);
    },
    methods:{
        remove(index){
            console.log(index);
            this.$delete(this.testData,index);
            console.log(this.testData);
        },
        add(){
            this.testData.push('six')
        },
        parentEvent(data) {
            this.menu_num = data;
        },
        showEditor(){
            this.dialogVisible = true;
        },
        submitReply(){
            //打印回复的内容
            console.log(this.newReplyInfo);
        },
        //关闭编辑器
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.dialogVisible = false;
            })
            .catch(_ => {});
        } 
    },
    computed:{
        ...mapState(['replyInfo']),
        ...mapGetters(["getReplyInfo"]),
    },
    watch: {
        "getReplyInfo"() {
            this.newReplyInfo = this.getReplyInfo;
        }
    }
}
</script>
<style lang="less" scoped>
.publish{
    width: 80%;
    padding: 10px 0;
    overflow: hidden;
    margin: auto;
    .el-button{
        float: right;
    }
}
.suggset_wrap{
    width:80%;
    margin: auto;
}
</style>