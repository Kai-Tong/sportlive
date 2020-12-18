<template>
  <div>
    <p class=title>实名认证资料将作为领奖的唯一凭证；请如实填写，提交后不可更改。</p>
    <div class="authen">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="checkname">
            <el-input type="text" v-model="ruleForm.checkname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="realnumber">
            <el-input type="" v-model="ruleForm.realnumber" autocomplete="off"></el-input>
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
    name:"authentication",
    data(){
      var validatePass = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
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
      var validateAuthor = (rule, value, callback) => {
        let author = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        if(value == ''){
          callback(new Error('请输入身份证号'))
        }else{
          if (!author.test(value)) {
            callback(new Error('身份证格式错误！'))
          } else{
            callback()
          }
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkname: '',
          realnumber: ''
        },
        rules: {
          pass: [
            { validator: validatePass,required:"true", trigger: 'blur' }
          ],
          checkname:[
            {required:true,message: '请输入姓名', trigger: 'blur'},
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          realnumber:[
            {required:true,validator: validateAuthor, trigger: 'blur'}
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
            this.$api.checkreal.checkrealPerson({
                pwd:this.$inHTMLData(this.encode(this.ruleForm.pass)),
                real_name:this.$inHTMLData(this.ruleForm.checkname),
                id_no:this.$inHTMLData(this.ruleForm.realnumber)
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
                        message: '身份认证成功！' 
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
.title{
  font-size: 12px;
  color: #ff5858;
  text-align: center;
  margin-bottom: 5px;
}
.authen{
  width: 400px;
  margin: auto
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