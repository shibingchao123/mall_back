<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限" prop="type">
            <el-checkbox-group v-model="type" style="width:250px" @change="choose">
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
            <el-button type="primary" @click="submitForm()">立即修改</el-button>
            <el-button @click="$emit('close')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "editLimit",
        props:['editTable'],
        data() {
            return {
                bear:JSON.parse(sessionStorage.getItem('bear')),
                ruleForm:{
                },
                type:[],
                rules:{
                    type: [{ type: 'array',  trigger: 'change' }]
                },
                chooseDate:[],
                chooseStr:''
            }
        },
        created(){
            this.ruleForm = this.editTable;
            // console.log(this.ruleForm,"quanxian");
            // console.log(this.ruleForm.jurisdiction_id);
            let quanxian = this.ruleForm.jurisdiction_id;
            if (typeof quanxian === 'string') {
                this.type = quanxian.split(',');
                // console.log(this.type);
                this.type.pop();
                // console.log(this.type)
            }
        },
        methods:{
            //选中权限
            choose(value){
                this.chooseDate = value;
            },
            submitForm(){
                for(var i=0;i<this.chooseDate.length;i++){
                    // console.log(this.chooseDate[i]);
                    this.chooseStr += this.chooseDate[i] + ',';
                    // console.log(this.chooseStr);
                    // console.log(this.ruleForm.jurisdiction_id)
                }
                this._ajax('admin/updateAdminjurisdiction', {
                    adminId:this.ruleForm.adminId,
                    jurisdictionId:this.chooseStr,
                }, msg => {
                },{logAdmin:this.bear.adminId,logCustomer:this.ruleForm.adminId});
                this.$emit('close');
                this.$router.push('/home/limit/limitList')
            }
        }
    }
</script>

<style scoped>

</style>
