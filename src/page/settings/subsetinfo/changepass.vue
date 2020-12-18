<template>
  <div class="changepass">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="canclebtn" @click="resetForm('ruleForm')">取消</el-button>   
          <el-button class="submitbtn" type="primary" @click="submitForm('ruleForm')" v-preventReClick>提交</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    name:"changepass",
    data(){
      // let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      var validateoldPass = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('请输入密码'))
        }else{
          if (!reg.test(value)) {
            callback(new Error('密码应是6-20位数字、字母或字符！'))
          } else{
            callback()
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldpass:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          oldpass:[
            { validator: validateoldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //base64转码
      encode(str){
        return  str == null ? null : btoa(encodeURIComponent(str));
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.setpassword.setPwd({
                new_pwd:this.$inHTMLData(this.encode(this.ruleForm.pass)),
                old_pwd:this.$inHTMLData(this.encode(this.ruleForm.oldpass))
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
                        message: '修改成功' 
                    })
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
    }
}
</script>

<style lang="less" scoped>
.changepass{
  width: 400px;
  margin: auto;
}
.canclebtn{
    width: 120px;
    // margin-left: -50px;
}
.submitbtn{
    width: 120px;
    margin-left: 20px;
}
</style>