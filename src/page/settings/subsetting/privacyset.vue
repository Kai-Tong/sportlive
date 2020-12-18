<template>
  <div class="attset">
       <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="个人基本资料" prop="basic">
                    <el-radio-group v-model="ruleForm.basic" @change="changebasic($event)">
                    <el-radio label="0">公开</el-radio>
                    <el-radio label="1">仅自己可见</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="我的关注" prop="attention" @change="changeattention($event)">
                    <el-radio-group v-model="ruleForm.attention">
                    <el-radio label="0">公开</el-radio>
                    <el-radio label="1">仅自己可见</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="我的粉丝" prop="fans" @change="changefans($event)">
                    <el-radio-group v-model="ruleForm.fans">
                    <el-radio label="0">公开</el-radio>
                    <el-radio label="1">仅自己可见</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
                    <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>

<script>
export default {
    name:"privacyset",
    data(){
        return{
            ruleForm:{
                basic: "",
                attention:"",
                fans:""
            },
            rules:{
                basic: [
                    { required: true, message: '请选择设置', trigger: 'change' }
                ],
                attention: [
                    { required: true, message: '请选择设置', trigger: 'change' }
                ],
                fans: [
                    { required: true, message: '请选择设置', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        changebasic(e){
            // this.ruleForm.basic = e
        },
        changeattention(e){
            // this.ruleForm.attention = e
        },
        changefans(e){
            // this.ruleForm.fans = e
        },
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.$api.privacy.usePrivacy({
                        account:this.ruleForm.basic,
                        fllow:this.ruleForm.attention,
                        fans:this.ruleForm.fans,
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
                                message: '设置成功'
                            })                        
                        } else if (res.data.code == -1) {

                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message("设置失败")
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //获取设置状态
        getPristatus(){
            this.$api.getprivacy.useGetprivacy(          
            ).then(res => {
                console.log(res);
                if (res.data.code == 1) {
                    this.$message({
                        type: 'error', // warning、success
                        message: res.data.msg 
                    }) 
                } else if (res.data.code == 0) {
                    // console.log(res.data.params[0].uPAccount,res.data.params[0].uPFollow,res.data.params[0].uPFans);
                    if(res.data.params.length > 0){
                        this.ruleForm.basic = String(res.data.params[0].u_p_account);                             
                        this.ruleForm.attention = String(res.data.params[0].u_p_follow);                             
                        this.ruleForm.fans = String(res.data.params[0].u_p_fans); 
                    }
                                               
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
                this.$message("参数错误");
            })
        }
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
.attset{
    width: 500px;
    margin: auto;
}
 .canclebtn{
    width: 120px;
}
.submitbtn{
    width: 120px;
    margin-left: 10px;
}
</style>