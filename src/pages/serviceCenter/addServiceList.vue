<template>
    <div>
        <el-card class="box-card">
            <div>新增客服记录</div>
            <div style="margin: 20px;"></div>
            <!--表单-->
            <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign"  status-icon :rules="rules" ref="formLabelAlign">
                <el-form-item label="工号：">
                    <span>{{bear.admin_no}}</span>
                </el-form-item>
                <el-form-item label="用户昵称：">
                    <el-input v-model="formLabelAlign.nick_name" class="inptsize" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" prop="mobile">
                    <el-input v-model="formLabelAlign.mobile" class="inptsize"></el-input>
                </el-form-item>
                <el-form-item label="客服内容：">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 30}"
                        placeholder="请输入内容"
                        v-model="formLabelAlign.comment" class="inptsize" clearable>
                    </el-input>
                </el-form-item>
            </el-form>
            <!--底部返回和确定按钮-->
            <div style="margin:50px;"></div>
            <div class="inptsize bottombox">
                <!--<el-button size="small" class="back">返回</el-button>-->
                <el-button type="primary" @click="goback">返回</el-button>
                <el-button type="primary" class="ensure" @click="addsure">确定</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins'
    var storage = {
            fetch: function () {
                return JSON.parse(sessionStorage.getItem(storeKey) || "[]")
            },
    }
    export default {
        data() {
            var validateMobilePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('负责人手机号不可为空'));
                } else {
                    if (value !== '') {
                        var reg=/^1[3456789]\d{9}$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的手机号码'));
                        }
                    }
                    callback();
                }
            };
            return {
                user: {
                    name: '',
                    pas: ''
                },
                labelPosition: 'right',
                formLabelAlign: {},
                rules: {
                    mobile: [
                        { validator: validateMobilePhone, trigger: 'blur' }
                    ]
                },
                bear: JSON.parse(sessionStorage.getItem("bear"))
            };
        },
        methods:{
            addsure(val){
                this.$refs.formLabelAlign.validate((valid) => {
                    if (valid) {
                        if(this.formLabelAlign.nick_name&&this.formLabelAlign.mobile&&this.formLabelAlign.comment){
                            this._ajax('merchant/insertServiceRecord',{
                                admin_no:this. bear.admin_no,
                                nick_name:this.formLabelAlign.nick_name,
                                mobile:this.formLabelAlign.mobile,
                                comment:this.formLabelAlign.comment
                            },msg =>{
                                this.$message({
                                    message: '客服信息添加成功',
                                    type: 'success',
                                });
                                this.$router.push({path:'/home/serviceCenter/recordList'})
                            })
                        }else{
                            this.$message.error('请完善信息');
                        }
                    } else {
                        console.log('error submit!!');
                        this.$message.error('请输入正确的手机号');
                        return false;
                    }
                });

            },
            goback(){
                this.$router.push({path:'/home/serviceCenter/recordList'})
            },
        },
        created(){
            console.log(this.bear.admin_no)
        },
        mixins: [mixin],
    }
</script>

<style scoped>
    .inptsize{
        width:30%;
        margin:10px 0 10px 0;
    }

    .bottombox{
        margin-left:80px;
    }
    .ensure{
        float:right;
    }
</style>
