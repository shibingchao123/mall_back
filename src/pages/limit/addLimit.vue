<template>
    <div>
        <div class="head">
            <span>
                <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>添加账号</el-breadcrumb-item>
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
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="邀请码：">
                    <el-input v-model="ruleForm.inventoryCode" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="type">
                    <el-checkbox-group v-model="ruleForm.type" style="width:250px" @change="choose">
                        <el-checkbox label="1" name="type">权限管理</el-checkbox>
                        <el-checkbox label="2" name="type">用户管理</el-checkbox>
                        <el-checkbox label="3" name="type">商品管理</el-checkbox>
                        <el-checkbox label="4" name="type">运营管理</el-checkbox>
                        <el-checkbox label="5" name="type">订单管理</el-checkbox>
                        <el-checkbox label="6" name="type">营销中心</el-checkbox>
                        <el-checkbox label="7" name="type">积分管理</el-checkbox>
                        <el-checkbox label="8" name="type">财务管理</el-checkbox>
                        <el-checkbox label="9" name="type">数据统计</el-checkbox>
                        <el-checkbox label="10" name="type">客服中心</el-checkbox>
                        <el-checkbox label="11" name="type">操作记录</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
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
        data() {
            var validatePass2 = (rule, value, callback) => {
                // let phonReg = /^[1][3,4,5,7,8][0-9]{9}$/;
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
                    admin_name:'',
                    position:'',
                    ruleForm:'',
                    account:'',
                    password:'',
                    value:[],
                    type:[],
                    inventoryCode:''
                },
                rules: {
                    admin_name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入职位', trigger: 'blur' },
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
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
                    ]
                },
            };
            },
        created(){
            // console.log(this.editTable);
        },
        methods: {
            //选中权限
            choose(value){
                console.log(value, 'val');
                this.ruleForm.value = value;
            },
            submitForm(formName) {
                let limitStr = '';
                //获取到选择的每一个权限,用逗号拼接起来
                for(var i = 0;i < this.ruleForm.value.length;i++){
                    console.log(this.ruleForm.value[i]);
                    limitStr += this.ruleForm.value[i]+",";
                    console.log(limitStr)
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this._ajax('admin/insertAdmin', {
                            adminName: this.ruleForm.admin_name,
                            position:this.ruleForm.position,
                            mobile:this.ruleForm.mobile,
                            account:this.ruleForm.account,
                            password:this.ruleForm.password,
                            jurisdictionId:limitStr,
                            inventoryCode: this.ruleForm.inventoryCode
                        },msg => {
                            console.log("添加管理员的接口");
                            this.$emit('close')
                        },{logAdmin:this.bear.adminId})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        }
    }
</script>

<style scoped>
    .head{
        margin-bottom: 20px;
    }
    /*.box-card div{*/
        /*margin-bottom: 10px;*/
    /*}*/
</style>
