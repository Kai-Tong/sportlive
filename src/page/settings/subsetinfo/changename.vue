<template>
  <div class="changename">
    <div class="name_con">
        <p class="name_box">当前昵称：<span class="name">{{name}}</span></p>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item class="set_name" label="设置昵称" prop="name">
              <el-input placeholder="请输入2-14个字;只支持数字、字母、汉字" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <p class="nicheng">* 昵称仅可设置一次，提交后不能再修改，请慎重考虑</p>                 
            <el-form-item>
              <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
              <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"changename",
    data(){
      return{
        name:"",
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入2-14个字;只支持数字、字母、汉字', trigger: 'blur' }
          ]
        }
      }
    },
    props:{
      infoParams:{
        type:Object,
        default:function(){

        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.nickname.changeNickname({
                nickname:this.$inHTMLData(this.ruleForm.name)
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
                        message: res.data.msg 
                    })
                    this.$store.commit("nickname", this.ruleForm.name);
                    this.name = this.ruleForm.name;
                    localStorage.setItem('nick_name',this.name)
                    this.$refs[formName].resetFields();                            
                } else if (res.data.code == -1) {
                    this.$message({
                        type: 'warning', // warning、success
                        message: res.data.msg 
                    })
                    this.$router.push("/")
                }
            })
            .catch(error => {
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
      }
    },
    mounted(){
      this.name = this.infoParams.name
    }
}
</script>

<style lang="less" scoped>
.changename{
  // width: 100%;
  .name_con{
    width: 400px;
    margin: auto;
    font-size: 14px;
    .name_box{
      margin-bottom: 34px;
      .name{
        font-size: 20px;
        color: #1a90fc;
      }
    }
    .nicheng{
        color: #d2d2d2 !important;
        margin-bottom: 150px;
      }
    .set_name{
      position: relative;
      left: -50px;
    }
  }
}
.canclebtn{
    width: 120px;
    margin-left: -50px;
}
.submitbtn{
    width: 120px;
    margin-left: 20px;
}
</style>>
