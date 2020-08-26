<template>
    <div class="orderMsg">
        <el-card class="box-card">
            <div class="box1-title">当前订单状态：{{orderDataAll.status | orderStatus}}
                <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
            </div>
        </el-card>
        <div class="box1-banner2-btn">订单详情</div>
        <grey>
            <template v-slot:title>
                <div>
                    订单信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-head-1">订单编号：{{orderDataAll.order_uuid}}</div>
                    <div class="box1-table">
                        <el-table
                            :data="orderData"
                            border
                            style="width: 100%height:auto;">
                            <el-table-column
                                prop="user_code"
                                label="用户ID"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="user_tellphone"
                                label="用户手机号"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="head_name"
                                align="center"
                                label="站长姓名">
                            </el-table-column>
                            <el-table-column
                                prop="mobile"
                                align="center"
                                label="站长手机号">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="commodity_name"
                                align="center"
                                label="商品名称">
                            </el-table-column> -->
                            <el-table-column
                                prop="package_no"
                                align="center"
                                label="包裹号">
                            </el-table-column>
                            <el-table-column
                                prop="real_money"
                                align="center"
                                label="实付金额">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                align="center"
                                label="订单状态">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status | orderStatus}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                align="center"
                                label="收货地址">
                            </el-table-column>
                            <el-table-column
                                prop="create_times"
                                align="center"
                                label="下单时间">
                            </el-table-column>
                        </el-table>
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
                            :data="goodsData"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="commodity_img"
                                label="图片"
                                align="center"
                                width="180">
                                <template slot-scope="scope">
                                    <img v-if="scope.row.commodity_img" class="list-img-shop" :src="aliurl + scope.row.commodity_img">
                                    <span v-else>无图片</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="commodity_name"
                                label="商品名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_real_price"
                                align="center"
                                label="价格/元">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_num"
                                align="center"
                                label="数量">
                            </el-table-column>
                            <el-table-column
                                prop="pay_money"
                                align="center"
                                label="实际支付/元">
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
                        <div>应付金额： <span class="red">&yen;{{orderDataAll.real_money}}</span></div>
                    </div>
                </div>
            </template>
        </grey>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from './greyTable';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                orderData: [],
                goodsData: [],
                orderDataAll: {},
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
            this.getList();
        },
        watch: {
            onlyInfo (val) {
                this.getList();
            }
        },
        methods: {
            // 加载数据
            getList(){
                this._ajax('adminOrder/getOrderListDetail', {
                    orderUuid: this.onlyInfo.order_uuid,
                }, msg => {
                    console.log(msg);
                    this.orderDataAll = msg;
                    // 商品信息
                    this.goodsData = msg.orderListDetail;
                    // 订单信息
                    this.orderData.push({
                        user_code: msg.user_code,
                        user_tellphone: msg.user_tellphone,
                        head_name: msg.head_name,
                        mobile: msg.mobile,
                        package_no: msg.package_no,
                        real_money: msg.real_money,
                        status: msg.status,
                        address: msg.address,
                        create_times: msg.create_times,
                    });

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
    }
    .box1-title-btn{
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        float: right;
        cursor: pointer;
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
</style>
