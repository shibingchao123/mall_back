<template>
    <div>
        <div class="head">
            <span>
                <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>修改信息</el-breadcrumb-item>
            </el-breadcrumb>
            </span>
        </div>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="真实姓名：" prop="admin_name">
                    <el-input v-model="ruleForm.admin_name" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="职位：" prop="position">
                    <el-input v-model="ruleForm.position" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobile">
                    <el-input v-model="ruleForm.mobile" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="ruleForm.account" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="邀请码：" prop="inventory_code">
                    <el-input v-model="ruleForm.inventory_code" style="width:300px"></el-input>
                </el-form-item>
                <!-- inventory_code -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                    <el-button @click="$emit('close')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "addLimit",
        props:['editTable'],
        /* watch: {
             editTable: {
                 handler(newValue, oldValue) {
                    console.log(newValue)
                     this.ruleForm = newValue;
                 }
             },
         },*/
        data() {
            var validatePass2 = (rule, value, callback) => {
                var phonReg=11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
                if (value === "" || !phonReg.test(value)) {
                    return callback(new Error('手机号不正确'));
                }else{
                    return callback();
                }
            };
            return {
                bear:JSON.parse(sessionStorage.getItem('bear')),
                ruleForm: {
                },
                rules: {
                    admin_name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入活职位', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, validator: validatePass2, trigger: 'blur'},
                    ],
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
            };
        },
        created(){
            console.log(this.editTable);
            this.ruleForm = this.editTable;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('admin/updateAdmin', {
                            adminId:this.ruleForm.adminId,
                            adminName: this.ruleForm.admin_name,
                            position:this.ruleForm.position,
                            mobile:this.ruleForm.mobile,
                            account:this.ruleForm.account,
                            inventoryCode:this.ruleForm.inventory_code,
                        },msg => {
                            this.$emit('close');
                        },{logAdmin:this.bear.adminId,logCustomer:this.ruleForm.adminId})
                    } else {
                        return false;
                    }
                });
                console.log(this.ruleForm);

            },
        }
    }
</script>

<style scoped>
    .head{
        margin-bottom: 20px;
    }
</style>
