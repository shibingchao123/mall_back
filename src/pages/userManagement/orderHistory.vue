<template>
    <div class="userMsg">
        <el-card class="box-card flex-start">
            <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    站长信息
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-10">
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
                        <el-table-column
                            align="center"
                            label="地址">
                            <template slot-scope="scope">
                                {{scope.row.region}}{{scope.row.address}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </grey>
        <el-card class="box-card">
            <div class="pageHead">
                <div class="pageBox">
                    <div>
                        <span>申请状态：</span>
                        <el-select size="mini" v-model="topData.status" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in topSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="pageBox">
                    <div>
                        <span>日期选择：</span>
                        <el-date-picker
                            size="mini"
                            v-model="dataTime"
                            @change='changeData'
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="pageBox">
                    <div>
                        <el-button size="small" type="primary" icon="el-icon-search" @click="selec()">
                            搜索
                        </el-button>
                        <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh"
                                   @click="reSetting(1)">重置
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    商品信息
                    <el-button class="m-t-10 f-r m-r-20" type="primary" size="mini" plain @click="leadingOut1('dayin','订单列表')">导出本列表</el-button>
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-10" id="shang1">
                    <el-table
                        :data="shopInfo"
                        border
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            label="商品名称">
                            <template slot-scope="scope">
                                <span>{{scope.row.commodity_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="commodity_num"
                            align="center"
                            label="数量">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <el-pagination
                    @current-change="getShop"
                    :current-page.sync="topData.page"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="shopTotal">
                </el-pagination>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    订单信息
                    <el-button class="m-t-10 f-r m-r-20" type="primary" size="mini" plain @click="leadingOut2('dayin','订单列表')">导出本列表</el-button>
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-20" id="ding2">
                    <el-table
                        :data="orderInfo"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="order_uuid"
                            align="center"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="head_name"
                            align="center"
                            label="用户昵称">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="联系方式">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="订单状态">
                            <template slot-scope="scope">
                                {{scope.row.status|Sfilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="real_money"
                            align="center"
                            label="金额">
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            align="center"
                            label="下单时间">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="订单内容">
                            <template slot-scope="scope">
                                <span>{{scope.row.content}}</span>
                                <!--<el-button type="text" size="small" @click="changeSite(scope.row)">修改</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <el-pagination
                    @current-change="getOrderDetail"
                    :current-page.sync="topData.page"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="ooderTotal">
                </el-pagination>
            </template>
        </grey>
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
                    pageSize: 15,
                    status: '',
                    headStatus:'1'
                },
                topSelect: [
                    // {value: '2', label: '待发货'},
                    // {value: '1', label: '待付款'},
                    // {value: '5', label: '已完成'},
                    // {value: '7', label: '已退款'},
                    // {value: '1', label: '未支付'},
                    {value: '2', label: '已支付'},
                    {value: '3', label: '配送中'},
                    {value: '4', label: '待取货'},
                    {value: '5', label: '已完成'},
                    {value: '6', label: '申请退款'},
                    {value: '7', label: '退款成功'},
                    // {value: '8', label: '取消支付'},
                    {value: '9', label: '拒绝退款'},
                ],
                dataTime: [],
                shopTotal: 10,
                orderTotal: 10,
                ooderTotal:10
            }
        },
        filters: {
            Sfilter: function (arg) {
                switch (arg) {
                    case 0:
                        return
                        '删除';
                    // case 1:
                    //     return '未支付';
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
                    // case 8:
                    //     return '取消支付';
                    case 9:
                        return '拒绝退款'
                }
            }
        },
        methods: {
            leadingOut1(){
                let data = {
                    page:1,
                    pageSize: this.shopTotal,
                    headId: this.onlyInfo.userId,
                };
                this._ajax('admin/getMerchantOrderList', data, msg => {
                    this.shopInfo = msg.pageInfo.list;
                    this.shopTotal = msg.pageInfo.total;
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc2('shang1','商户：'+_that.onlyInfo.name+'的商品列表');
                        _that.getShop();
                    },200)
                });
            },
            leadingOut2(){
                let data = {
                    page:1,
                    pageSize: this.ooderTotal,
                    headId: this.onlyInfo.userId,
                };
                this._ajax('admin/getMerchantOrderListDetail', data , msg => {
                    this.orderInfo = msg.pageInfo.list;
                    this.ooderTotal = msg.pageInfo.total;
                    this.orderInfo.forEach((item,index)=>{
                        item.order_uuid = "'"+item.order_uuid;
                        item.mobile = "'"+item.mobile;
                    })
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc2('ding2','商户：'+_that.tableIfno[0].name+'的订单列表');
                        _that.getOrderDetail();
                    },200)
                });
                this.orderInfo.forEach((item,index)=>{
                    item.user_code = "'"+item.user_code;
                    item.phone = "'"+item.phone;
                    item.inviter_code = "'"+item.inviter_code;
                })
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
                this._ajax('admin/getMerchantOrderListDetail', this.topData, msg => {
                    this.orderInfo = msg.pageInfo.list;
                    this.ooderTotal = msg.pageInfo.total;
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
                this.topData.status = '';
                this.topData.beginTime = '';
                this.topData.endTime = ''
                this.dataTime = [];
                this.topData.page = 1;
                this.getShop();
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
            console.log(this.onlyInfo);
            this.tableIfno.push(this.onlyInfo)
            this.topData.headId = this.onlyInfo.userId;
            this.getShop();
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
</style>
