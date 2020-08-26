<template>
    <div>
        <div style="margin: 20px;"></div>
        <table border="1px" width="100%">
            <tr>
                <th>客服</th>
                <th class="weight">
                    <input type="text" placeholder="请输入内容" v-model="table.admin_no" class="inline-input" autofocus="autofocus">
                </th>
            </tr>
            <tr>
                <th>用户昵称</th>
                <th class="weight">
                    <input type="text" placeholder="请输入内容" v-model="table.nick_name" class="inline-input" autofocus="autofocus">
                </th>
            </tr>
            <tr>
                <th>联系方式</th>
                <th class="weight ">
                    <input type="text" placeholder="请输入内容" v-model="table.mobile" class="inline-input" autofocus="autofocus">
                </th>
            </tr>
            <tr>
                <th>内容</th>
                <th class="weight">
                    <input type="text" placeholder="请输入内容" v-model="table.comment" class="inline-input" autofocus="autofocus">
                </th>
            </tr>
        </table>
        <div slot="footer" class="w10 flex-center bottom-btn m-t-20">
            <el-button class="m-r-20" @click=" $emit('close')">取 消</el-button>
            <div style="margin-left:100px"></div>
            <el-button class="m-l-20" type="primary" @click="updatasure">确 定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageType:{
                    page:1,
                },
                //存储到本地
                bear: JSON.parse(sessionStorage.getItem("bear")),
            }
        },
        methods: {
            updatasure(val){
                console.log(this.table);
                if(this.table.admin_no&&this.table.nick_name&&this.table.mobile&&this.table.comment){
                    this._ajax('merchant/updateServiceRecord',{
                        id:this.table.id,
                        admin_no: this.table.admin_no,
                        nick_name:this.table.nick_name,
                        mobile:this.table.mobile,
                        comment:this.table.comment
                    },msg =>{
                        console.log(msg);
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$emit('close')
                    },
                        {logAdmin:this.bear.adminId,logCustomer:this.table.id}
                    )
                }else{
                    this.$message.error('请完善相关信息');
                }
            },
        },
        props:['table'],
        created() {
            console.log(this.table);
            this.updatasure(val);

        }
    }
</script>


<style scoped>
    .servicerecord{
        float:right;
    }
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    tr,th{
        text-align:center;
    }
    input{
        width:100%;
        text-align: center;
        border:none;
    }
    table,tr,th{
        border-collapse:collapse;
        border:1px solid #DCDFE6;
        text-align:center;
        height:70px;
        font-size:20px
    }/* 边框会合并为一个单一的边框 */
    .weight{
        font-weight:400;
        font-size:20px
    }
    .inline-input{
        outline:none;
    }


</style>

