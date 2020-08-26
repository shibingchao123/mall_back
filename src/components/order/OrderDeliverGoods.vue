<template>
    <div class="orderDelive">
        <div class="box1-head">
            发货操作
        </div>
        <div class="box1-cont">
            <div class="msg">
                收货详情：{{onlyInfo.head_name}}，{{orderDataAll.user_tellphone}}，{{orderDataAll.address}}，邮编：{{orderDataAll.zip_code}}
            </div>
            <div class="goods">
                <div v-for="item in orderDataAll.orderListDetail">
                    {{item.commodity_name}},{{item.commodity_num}}
                </div>
            </div>
        </div>
        <div class="box1-btns">
            <el-button type="primary" @click="submit()">发货</el-button>
            <el-button @click="$emit('close')">取消</el-button>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from './greyTable';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                orderDataAll: {},
            }
        },
        created () {
            console.log(this.onlyInfo);
            this.getList();
        },
        watch: {
            radioValue (val) {
                this.headerMin.classValue = val;
                this.$emit('watchSeach', this.headerMin);
            },
        },
        methods: {
                // {
                //     logAdmin: this.bear.adminId,
                //     logCustomer: this.onlyInfo.order_uuid,
                // },
            submit(){ 
                this._ajax('adminOrder/updateOrderStatusDeliver', {
                    orderUuid: this.onlyInfo.order_uuid,
                    status: 3,
                },msg => {
                    this.$message({
                        message: '发货成功！',
                        type: 'success'
                    });
                    this.$emit('close');
                },{logAdmin:this.bear.adminId,logCustomer:this.onlyInfo.order_uuid})
            },
            // 加载数据
            getList(){
                this._ajax('adminOrder/getOrderListDetail', {
                    orderUuid: this.onlyInfo.order_uuid,
                }, msg => {
                    console.log(msg);
                    this.orderDataAll = msg;
                })
            },
        },
        components: {
            grey
        },
        mixins: [ mixin ],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {
                        nameA: '首页',
                        nameB: '销售平台'
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderDelive{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .box1-head{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #fff;
        background: #6699CC;
        text-align: center;
    }
    .box1-cont{
        padding: 20px;
    }
    .box1-cont .msg{
        line-height: 1.5;
        margin-bottom: 20px;
    }
    .box1-cont .goods{
        padding-left: 30px;
        line-height: 1.5;
    }
    .box1-btns{
        display: flex;
        justify-content: center;
    }
</style>
