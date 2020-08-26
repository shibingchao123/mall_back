<template>
    <div class="userMsg">
        <el-card class="box-card flex-start">
            <div class="pageHead">
                <div class="pageBox">
                    <div><span>日期选择：</span>
                        <el-date-picker
                            v-model="topData.times"
                            size="mini"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            @change="timeChange()"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="pageBox">
                    <div>
                        <div style="width: 10px;height: 1px;"></div>
                        <el-button size="small" type="primary" icon="el-icon-search" @click="getOrderDetail(1)">搜索</el-button>
                        <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="reSetting()">重置</el-button>
                    </div>
                </div>
                <div class="pageBox">
                    <div style="padding: 0 20px;">
                        <div class="box1-title-btn" @click="getTime()">打印</div>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="dayins">
            <section ref="print">
                <div id="alertData" class="print-main">
                    <div  style="border: 2px solid transparent;width: 202mm;margin: 0 auto;">
                        <div style="margin-top: 30px;">
                            <div style="font-size: 18px;font-weight: 800;">
                                站长信息
                            </div>
                            <div >
                                <el-table
                                    :data="tableIfno"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        align="center"
                                        label="团长">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="tell_phone"
                                        align="center"
                                        label="联系方式">
                                    </el-table-column>
                                    <!-- timeNow -->
                                    <el-table-column
                                        align="center"
                                        label="地址">
                                        <template slot-scope="scope">
                                            {{scope.row.region}}{{scope.row.address}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="timeNow"
                                        align="center"
                                        label="打印时间">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                            
                        <div style="margin-top: 20px;box-sizing: border-box;border: 1px solid #ddd;padding: 15px 10px;border-radius: 10px" v-for="item in orderInfo" :key="item.order_uuid">
                            <div style="margin-bottom: 10px;overflow: hidden;">
                                <div style="width: 50%;float: left;font-size: 18px;font-weight: 800;">
                                    包裹号：{{item.package_no}}
                                </div>
                                <div style="width: 50%;float: right;">
                                    下单时间：{{item.create_time}}
                                </div>
                                <div style="width: 50%;float: left;">
                                    用户昵称：{{item.nick_name}}
                                </div>
                                <div style="width: 50%;float: right;">
                                    用户手机号：{{item.user_tellphone}}
                                </div>
                                <!-- 包裹号：{{item.package_no}}<br/>
                                用户昵称：{{item.nick_name}}<br/>
                                用户手机号：{{item.user_tellphone}}<br/>
                                下单时间：{{item.create_time}}<br/> -->
                            </div>
                            <div>
                                <el-table
                                    :data="item.orderListDetail"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        prop="commodity_name"
                                        align="center"
                                        label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="commodity_num"
                                        align="center"
                                        label="商品数量">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';

    export default {
        name: 'orderHistory',
        data() {
            return {
                tableIfno: [],
                shopInfo: [],
                orderInfo: [],
                //搜索框
                topData: {
                    headId: '',
                    page: 1,
                    pageSize: 4,
                    status: '',
                    headStatus:'1'
                },
                topSelect: [
                    {value: '2', label: '待发货'},
                    {value: '1', label: '待付款'},
                    {value: '5', label: '已完成'},
                    {value: '7', label: '已退款'},
                ],
                dataTime: [],
                shopTotal: 10,
                orderTotal: 10
            }
        },
        filters: {
            Sfilter: function (arg) {
                switch (arg) {
                    case 0:
                        return
                        '删除';
                    case 1:
                        return '未支付';
                    case 2:
                        return '已支付';
                    case 3:
                        return '配送中';
                    case 4:
                        return '待取货';
                    case 5:
                        return '已完成';
                    case 6:
                        return '申请退款';
                    case 7:
                        return '退款成功';
                    case 8:
                        return '取消支付';
                }
            }
        },
        methods: {
            getTime(){
                let a = new Date();
                let b = this.formatDateTime(a);
                this.tableIfno[0].timeNow = b;
                // this.$set(this.tableIfno,b);
                // this.doPrint('alertData');
                this.$print(this.$refs.print)
            },
            // 查询条件-开始时间结束时装换
            timeChange(val){
                console.log(this.topData.times);
                if (this.topData.times == null || this.topData.times == ''|| this.topData.times == undefined) {
                    this.topData.beginTime = '';
                    this.topData.endTime = '';
                }else{
                    this.topData.beginTime = this.topData.times[0] + ' 00:00:00';
                    this.topData.endTime = this.topData.times[1] + ' 23:59:59';
                }
            },
            //顶部查询时间
            changeData(val) {
                if (val == "" || val == null) {
                    this.topData.beginTime = "";
                    this.topData.endTime = "";
                } else {
                    this.topData.beginTime = val[0] + ' 00:00:00';
                    this.topData.endTime = val[1] + ' 23:59:60';
                }
            },
            selec() {
                this.topData.page = 1;
                this.getShop();
                this.getOrderDetail();
            },
            //商户交易详情查看
            lookOrder() {
                console.log('跳转订单管理')
            },
            getOrderDetail() {
                /*订单信息*/
                this._ajax('adminOrder/getMerchantOrderPrint', this.topData, msg => {
                    console.log(msg)
                    this.orderInfo = msg;
                    // this.ooderTotal = msg.pageInfo.total;
                });
            },
            getShop() {
                /*商品信息*/
                this._ajax('admin/getMerchantOrderList', this.topData, msg => {
                    this.shopInfo = msg.pageInfo.list;
                    this.shopTotal = msg.pageInfo.total;
                });
            },
            reSetting() {
                this.topData.beginTime = '';
                this.topData.endTime = '';
                this.topData.times = [];
                // this.getShop();
                this.getOrderDetail();
            },
        },
        components: {
            grey
        },
        mixins: [mixin],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            let a = new Date();
            let b = this.formatDateTime(a);
            this.onlyInfo.timeNow = b;

            this.tableIfno.push(this.onlyInfo)
            this.topData.headId = this.onlyInfo.userId;

            // this.getShop();
            this.getOrderDetail();
        }
    }
</script>

<style scoped>
    .userMsg {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .box1-title-btn {
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        float: right;
        cursor: pointer;
    }
    .dingTitle{
        font-size: 20px;
        font-weight: 800;
        text-align: center;
    }
    .dingPeopleMsg{
        width: 95%;
        margin: 10px auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .dayins{
        /*height: 297mm;*/
        /*overflow-y: scroll;*/
    }
    .print-main{
        width: 208mm;
        /*height: 290mm;*/
        margin: 0 auto;
        /*overflow-y: scroll;*/
        /*background: transparent;*/
    }
</style>
