<template>
    <div class="orderMsg">
        <el-card class="box-card">
            <div class="box1-title">
                <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
            </div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    退款信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-content">
                        <div class="box1-box">
                            <div>订单编号：{{orderDataAll.order_uuid}}</div>
                            <div>订单金额：{{orderDataAll.real_money}}</div>
                            <div>退款方式：线下打款</div>
                            <div>退款原因：不想要了</div>
                        </div>
                        <div class="box1-box">
                            <div>手机号：{{orderDataAll.user_tellphone}}</div>
                            <div>确认退款金额：{{orderDataAll.real_money}}</div>
                        </div>
                        <div class="box1-box">
                            <div>申请时间：{{orderDataAll.apply_time}}</div>
                        </div>
                        <div class="box1-box">
                            <div>申请状态：{{orderDataAll.status |orderStatus}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    订单信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-content">
                        <div class="box1-box">
                            <div>订单编号：{{orderDataAll.order_uuid}}</div>
                            <div>用户账号：{{orderDataAll.user_code}}</div>
                            <div>发货状态：{{orderDataAll.status | orderStatus}}</div>
                        </div>
                        <div class="box1-box">
                            <div>创建时间：{{orderDataAll.create_times}}</div>
                            <div>订单可得积分：{{orderDataAll.real_money}}</div>
                            <div>用户备注：{{orderDataAll.remark}}</div>
                        </div>
                        <div class="box1-box">
                            <div>付款时间：{{orderDataAll.create_times}}</div>
                            <div>交易号：{{orderDataAll.order_uuid}}</div>
                        </div>
                        <div class="box1-box">
                        </div>
                    </div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    商品信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <!-- show-summary -->
                    <div class="box1-table">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="图片"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_name"
                                label="商品名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_price"
                                align="center"
                                label="价格">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_num"
                                align="center"
                                label="数量">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_real_price"
                                align="center"
                                label="实际支付">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="companyName"
                                align="center"
                                label="获得积分">
                            </el-table-column> -->
                            
                        </el-table>
                    </div>
                    <div class="box1-head">
                        <div>优惠券抵扣金额：&yen;-{{onlyInfo.coupon_price}}</div>
                        <div>积分抵扣：&yen;-{{orderDataAll.integral_price}}</div>
                        <div>运费：0</div>
                        <!-- <div>运费险：&yen;20</div> -->
                        <div>应付金额： <span class="red">&yen;{{orderDataAll.real_money}}</span></div>
                    </div>
                </div>
            </template>
        </grey>
        <div class="readMsg">
            <div class="head">
                处理备注:
            </div>
            <textarea class="text" v-model="refundRemark"></textarea>
        </div>
        <div class="box1-btns">
            <el-button type="primary" @click="submit(1)">确认退款</el-button>
            <el-button type="danger" @click="submit(0)">拒绝退款</el-button>
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
                tableData: [],
                refundRemark:'',
            }
        },
        filters: {
            // 订单状态 0删除1未支付2已支付3配送中4待取货5已完成6申请退款7退款成功8取消支付（支付失败）
            orderStatus: function (arg) {
                if (arg == 0) {
                    return "删除"
                } else if (arg == 1) {
                    return "未支付"
                } else if (arg == 2) {
                    return "已支付"
                } else if (arg == 3) {
                    return "配送中"
                } else if (arg == 4) {
                    return "待取货"
                } else if (arg == 5) {
                    return "已完成"
                } else if (arg == 6) {
                    return "申请退款"
                } else if (arg == 7) {
                    return "退款成功"
                } else if (arg == 8) {
                    return "取消支付（支付失败）"
                } else if (arg == 9) {
                    return "拒绝退款"
                }
            },
        },
        created () {
            console.log(this.onlyInfo);
            console.log(this.bear);
            this.getList();
        },
        watch: {
            radioValue (val) {
                this.headerMin.classValue = val;
                this.$emit('watchSeach', this.headerMin);
            }
        },
        methods: {
            submit(num){
                let data = {};
                let url = '';
                if (num) {
                    // 确认退款
                    url = 'adminOrder/updateOrderStatusReturn';
                    data.orderUuid = this.onlyInfo.order_uuid;
                    data.status = 7;
                    data.returnMoney = this.orderDataAll.real_money;
                }else{
                    // 拒绝退款
                    url = 'adminOrder/updateOrderStatusRefuse';
                    data.orderUuid = this.onlyInfo.order_uuid;
                    data.status = 9;
                    // if (this.onlyInfo.status == 6) {
                    //     data.status = this.onlyInfo.status - 1;
                    // }else{
                    //     data.status = this.onlyInfo.status;
                    // }
                }
                data.refundRemark = this.refundRemark;
                this._ajax(url, data,msg => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.$emit('close');
                },{
                    logAdmin:this.bear.adminId,
                    logCustomer:this.onlyInfo.order_uuid,
                })
            },
            // 加载数据
            getList(){
                this._ajax('adminOrder/getOrderListDetail', {
                    orderUuid: this.onlyInfo.order_uuid,
                }, msg => {
                    console.log(msg);
                    this.orderDataAll = msg;
                    this.tableData = msg.orderListDetail;
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
    .orderMsg{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .box1-head-1{
        padding: 20px;
    }
    .box1-head{
        padding: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }

    .box1-title{
        font-size: 20px;
        font-weight: 700;
        padding: 0 20px;
        overflow: hidden;
    }
    .box1-title-btn{
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        cursor: pointer;
        float: right;
    }
    .box1-banner2-btn{
        font-size: 14px;
        padding: 3px 20px;
        background: #6699CC;
        display: inline-block;
        color: #fff;
        margin-top: 10px;
        border: 1px solid #ddd;
    }
    .red{
        color: #f44;
    }
    .box1-content{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 0 60px;
    }
    .box1-box>div{
        line-height: 25px;
    }
    .readMsg{
        /*margin: 0 20px;*/
        /*border: 1px solid #ddd;*/
        padding: 15px 30px;
    }
    .readMsg .head{
        float: left;
        line-height: 30px;
        margin-right: 20px;
    }
    .readMsg .text{
        width: 80%;
    }
    .box1-btns{
        display: flex;
        justify-content: center;
    }
</style>
