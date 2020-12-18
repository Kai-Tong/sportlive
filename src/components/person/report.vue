<template>
  <div class="report">
      <div>
            <el-dialog
                title="举报"
                :visible="oneVisible"
                :close-on-click-modal = "onmodalclick"
                width="30%"
                :modal-append-to-body="false"
                :before-close="handleOneClose">
                    <el-form :model="reportType" :rules="rules" ref="reportType" label-width="110px">
                        <el-form-item label="选择举报类型" prop="type">
                            <el-radio-group v-model="reportType.type">
                            <el-radio label="诈骗举报"></el-radio><br>
                            <el-radio label="营销广告"></el-radio><br>
                            <el-radio label="谩骂攻击"></el-radio><br>
                            <el-radio label="色情/政治/违法内容"></el-radio><br>
                            <el-radio label="其他"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="" prop="desc">
                            <el-input v-model="reportType.desc" placeholder="请填写举报类型"></el-input>
                        </el-form-item>
                    </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancleOne('reportType')">取 消</el-button>
                    <el-button type="primary" @click="nextHandler('reportType')">下一步</el-button>
                </span>
            </el-dialog>
      </div>
      <div>
            <el-dialog
                class="dialogbox"
                title="举报"
                :visible.sync="twoVisible"
                :close-on-click-modal = "onmodalclick"
                width="30%"
                :before-close="handleTwoClose"
                :modal-append-to-body="false"
                append-to-body>
                <el-input type="textarea" placeholder="请详细描述被举报人的行为" v-model="textdetail"></el-input>
                <el-upload
                    class="imgup"
                    ref="upload"
                    :headers = "Myheaders"
                    :action="uploadreport"
                    :data="uploadData"
                    list-type="picture-card"
                    :auto-upload="false"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :limit="1"
                    :on-change="handleimgChange"
                    :on-success="handleSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>                   
                </el-upload>
                <!-- <div class="imgbox">
                    <img width="100%" :src="avator" alt="">
                </div> -->
                <el-dialog
                    :visible.sync="imgVisible"
                    :before-upload="handleimgClose"
                    :append-to-body="appendbody">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <p>举报图片限上传一张</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancleTwo()">取 消</el-button>
                    <el-button type="primary" @click="submitHandler()">提交</el-button>
                </span>
            </el-dialog>
      </div>
      <div>
            <el-dialog
                title="举报"
                :visible.sync="threeVisible"
                :close-on-click-modal = "onmodalclick"
                width="30%"
                :modal-append-to-body="false"
                :before-close="handleThreeClose">
                <span>完成：感谢您的支持，我们已收到您的举报信息，将会尽快处理。</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="threeComplete()">完成</el-button>
                </span>
            </el-dialog>
      </div>
  </div>
</template>

<script>
export default {
    name:"report",
     data() {
      return {
        imgurl:this.JuheHOST,
        uploadreport:`${this.$api.report.uploadreport}/${this.report_type}`,
        Myheaders:{token : localStorage.getItem("token")},
        uploadData:{
            type:'',
            id:'',
            report_type:'',
            body:''
        },
        avator:require("@/image/news.jpeg"),
        reportType: {
          type: '',
          desc:''
        },
        textdetail:'',
        rules: {
          type: [
            { required: true, message: '请选择一个类型', trigger: 'change' }
          ]
        },
        oneVisible: this.visible,
        //举报实体 1：新闻2：帖子3：用户4:评论
        type:this.report_type,
        //举报新闻id、帖子id、用户id、评论id
        id:this.report_id,       
        twoVisible: false,
        threeVisible: false,
        onmodalclick:false,
        appendbody:true,
        //图
        fileList:[],
        dialogImageUrl: '',
        imgVisible: false
      };
    },
    props:["visible","report_id","report_type"],
    methods: {
        //第一个下一步存储信息，打开第二个
        nextHandler(reportType){
            this.$refs['reportType'].validate((valid) => {
                if (valid) {
                    // console.log(this.reportType.type);
                    this.oneVisible = false;
                    this.twoVisible = true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //第一个关闭
        handleOneClose(done) {
            this.oneVisible=false
            this.$emit("chidVisible",this.onmodalclick)
        },
        //第一个取消
        cancleOne(){
            this.oneVisible=false
            this.$emit("chidVisible",this.onmodalclick)
            this.$refs['reportType'].resetFields();
        },
        //图片改变时
        handleimgChange(filelist){
            console.log(filelist);
            this.fileList = filelist;
        },
        //第二个提交
        submitHandler(){
            this.uploadData.type = this.type;
            this.uploadData.id = this.id;
            if(this.reportType.type == '其他'){
                this.uploadData.report_type = this.reportType.desc;
            }else{
                this.uploadData.report_type = this.reportType.type;
            }
            this.uploadData.body = this.textdetail;
            // console.log(this.fileList.length);
            if(this.fileList.length != 0){
                this.$refs.upload.submit();
            }else{
                this.$message({
                    type: 'error', // warning、success
                    message: "请上传举报图片"
                })
            }
        },
        //第二个关闭
        handleTwoClose(done) {
            this.twoVisible=false
            this.$emit("chidVisible",this.onmodalclick)
        },
        //第二个取消
        cancleTwo(){
            this.twoVisible=false
            this.$emit("chidVisible",this.onmodalclick)
        },
        //第三个关闭
        handleThreeClose(done) {
            this.threeVisible=false
            this.$emit("chidVisible",this.onmodalclick)
        },
        //第三个完成
        threeComplete(){
            this.threeVisible=false
            this.$emit("chidVisible",this.onmodalclick)
        },
        //图片上传
        handleSuccess(res, file){
            // console.log(res,file);
            if(res.code == 0){
                this.twoVisible = false;
                this.threeVisible = true;
                this.fileList = [];
                // this.$message({
                //     type: 'success', // warning、success
                //     message: res.msg 
                // })
            }else{
                this.$message({
                    type: 'error', // warning、success
                    message: res.msg 
                })
            }
        },
        handleRemove(file, filelist) {
            // console.log(file, filelist);
            this.fileList = filelist;
            this.imgVisible = false;
            this.twoVisible = true;
        },
        handleimgClose(){
            console.log('关闭图片');
            this.imgVisible = false;
        },
        handlePictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.imgVisible = true;
            this.twoVisible = true;
        },
    },
    mounted(){
        console.log(this.visible);      
    }
}
</script>

<style lang="less" scoped>
.imgup{
    display: inline;
}
.imgbox{
    display: inline-block;
    width: 148px;
    height: 148px;
    background-color: red;
    img{
        width: 100%;
        height: 100%;
    }
}
.el-radio {
    margin-bottom: 0.3rem;
}
.el-radio:last-child{
    margin-bottom: 0;
}
/deep/.el-form-item__label {
    position: relative;
    top: -15px;
    left: -20px;
}
</style>