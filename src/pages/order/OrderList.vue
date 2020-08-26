<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs']"
                :breadcrumb="{nameA: '订单管理', nameB: nameB}">
            </TableHeader>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>订单状态：</span>
                                <el-select v-model="pageType.status" placeholder="请选择" size="mini" clearable class="inputW">
                                    <el-option
                                        v-for="item in orderNumList"
                                        :key="item.val"
                                        :label="item.name"
                                        :value="item.val">
                                    </el-option>
                                </el-select>
                            </div>
                            <div><span>订单编号：</span>
                                <el-input v-model="pageType.orderUuid" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div><span>用户手机号：</span>
                                <el-input v-model="pageType.userTellphone" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div><span>商品名称：</span>
                                <el-input v-model="pageType.goodsName" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>日期选择：</span>
                                <el-date-picker
                                    v-model="pageType.times"
                                    size="mini"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="timeChange()"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <div><span>站长姓名：</span>
                                <!-- <el-input v-model="pageType.headId" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input> -->
                                <el-select v-model="pageType.headId" filterable  placeholder="请选择" size="mini" clearable class="inputW">
                                    <el-option
                                        v-for="item in headNameList"
                                        :key="item.userId"
                                        :label="item.name"
                                        :value="item.userId">
                                    </el-option>
                                </el-select>
                            </div>

                            <div><span>站长手机号：</span>
                                <el-input v-model="pageType.mobile" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                            </div>
                            <div>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets()">重置</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="leadingOut('dayin','订单列表')">导出订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="w10 flex-end m-b-10"></div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 300) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%"
                    @selection-change="chooseData">
                    <el-table-column
                        type="selection"
                        width="38">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="order_uuid"
                        label="订单编号"
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
                    <el-table-column
                        prop="user_tellphone"
                        align="center"
                        label="用户手机号">
                    </el-table-column>
                    <el-table-column
                        prop="package_no"
                        align="center"
                        label="包裹号">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="提交时间">
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
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="lookMsg(scope.row)">查看订单</el-button>
                            <el-button v-if="scope.row.status == 2" type="text" size="small" @click="GoodsGo(scope.row)">订单发货</el-button>
                            <el-button v-if="scope.row.status == 2||scope.row.status == 3||scope.row.status == 4||scope.row.status == 5||scope.row.status == 6" type="text" size="small" @click="RefundMsg(scope.row)">订单退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <!-- 表格最后写 -->
                    <el-table
                        :data="chooseList"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="order_uuid"
                            label="订单编号"
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
                        <el-table-column
                            prop="user_tellphone"
                            align="center"
                            label="用户手机号">
                        </el-table-column>
                        <el-table-column
                            prop="package_no"
                            align="center"
                            label="包裹号">
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            align="center"
                            label="提交时间">
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
                            label="取货地址">
                        </el-table-column>
                        <el-table-column
                            prop="inviter_code"
                            align="center"
                            label="站长邀请码">
                        </el-table-column>
                        <el-table-column
                            prop="commoditys"
                            align="center"
                            label="商品">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 分页 -->
            <el-pagination
                @current-change="requireData"
                :current-page.sync="pageType.page"
                :page-size="15"
                layout="prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination>
            <!-- dialog -->
            <div class="dialog">
                <!-- title="订单详情" -->
                <el-dialog
                    :visible.sync="MsgShow"
                    width="80%"
                    :before-close="MsgShowClose">
                        <div v-if="MsgShow">
                            <ordermsg :onlyInfo="onlyInfo" @close="MsgShowClose"></ordermsg>
                        </div>
                </el-dialog>
                <!-- 发货详情操作 -->
                <el-dialog
                    :visible.sync="DgoodsShow"
                    width="500px"
                    :before-close="DgoodsClose">
                    <!-- DgoodsClose -->
                        <div v-if="DgoodsShow">
                            <ordergoods :onlyInfo="onlyInfo" @close="DgoodsClose"></ordergoods>
                        </div>
                </el-dialog>
                <!-- 订单退款 -->
                <el-dialog
                    :visible.sync="RefundShow"
                    width="80%"
                    :before-close="RefundShowClose">
                    <!-- DgoodsClose -->
                        <div v-if="RefundShow">
                            <orderrefund :onlyInfo="onlyInfo" @close="RefundShowClose"></orderrefund>
                        </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    // 订单详情
    import ordermsg from '@/components/order/OrderMsg'
    // 发货弹窗
    import ordergoods from '@/components/order/OrderDeliverGoods'
    // 订单退款
    import orderrefund from '@/components/order/OrderRefund'

    export default {
        name: "list",
        data() {
            return {
                //面包xue
                nameB: '订单管理',
                // 表格数据列表
                tableData: [],
                chooseList: [],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 15,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                    headStatus:'1',
                    headId:''

                },
                // 订单详情
                MsgShow: false,
                // 发货详情
                DgoodsShow: false,
                // 退款订单
                RefundShow: false,
                // 多个打印
                DayinsDialog: false,
                onlyInfo: {},
                topData:{
                    page:1,
                    pageSize:20,
                },
                orderNumList:[
                    // {name:'未支付',val:1},
                    {name:'已支付',val:2},
                    {name:'配送中',val:3},
                    {name:'待取货',val:4},
                    {name:'已完成',val:5},
                    {name:'申请退款',val:6},
                    {name:'退款成功',val:7},
                    // {name:'取消支付（支付失败）',val:8},
                    {name:'拒绝退款',val:9},
                ],
                headNameList: [],
                loading: false,
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
        methods: {
            daiyinMsg(val){
                this.onlyInfo = {};
                this.DayinsDialog = true;
                this.onlyInfo = val;
            },
            leadingOut(){
                this.loading = true;

                // exportFunc('dayin','配送订单列表')
                if (this.chooseList.length == 0) {
                    this.pageType.page = 1;
                    this.pageType.pageSize = this.tableTotal;
                    this._ajax('adminOrder/getOrderList', this.pageType, msg => {
                        console.log(msg);
                        this.chooseList = msg.pageInfo.list;
                        this.chooseList.forEach((item,index)=>{
                            item.order_uuid = "'"+item.order_uuid;
                            item.mobile = "'"+item.mobile+"'";
                            item.user_tellphone = "'"+item.user_tellphone;
                            item.package_no = "'"+item.package_no;
                            item.create_times = "'"+item.create_times;
                        })
                        let _that = this;
                        setTimeout(function(){
                            _that.exportFunc('dayin','订单列表');
                            _that.loading = false;
                            _that.requireData(_that.pageType.page);
                        },200)
                    })
                }else{
                    this.chooseList.forEach((item,index)=>{
                        item.order_uuid = "'"+item.order_uuid;
                        item.mobile = "'"+item.mobile+"'";
                        item.user_tellphone = "'"+item.user_tellphone;
                        item.package_no = "'"+item.package_no;
                        item.create_times = "'"+item.create_times;
                    })
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc('dayin','订单列表');
                        _that.loading = false;
                        _that.requireData(_that.pageType.page);
                    },200)
                }


            },
            // 查询条件-开始时间结束时装换
            timeChange(val){
                console.log(this.pageType.times);
                if (this.pageType.times == null || this.pageType.times == ''|| this.pageType.times == undefined) {
                    this.pageType.beginTime = '';
                    this.pageType.endTime = '';
                }else{
                    // this.pageType.beginTime = this.pageType.times[0] + ' 00:00:00';
                    // this.pageType.endTime = this.pageType.times[1] + ' 23:59:59';
                    this.pageType.beginTime = this.pageType.times[0];
                    this.pageType.endTime = this.pageType.times[1];
                }
            },
            // 查看订单详情
            RefundMsg(data){
                this.onlyInfo = data;
                this.RefundShow = true;
            },
            RefundShowClose(){
                this.onlyInfo = {};
                this.RefundShow = false;
                this.requireData(this.pageType.page);
            },
            // 发货详情
            GoodsGo(data){
                this.onlyInfo = data;
                this.DgoodsShow = true;
            },
            DgoodsClose(){
                this.onlyInfo = {};
                this.DgoodsShow = false;
                this.requireData(this.pageType.page);
            },
            // 查看订单详情
            lookMsg(data){
                this.onlyInfo = data;
                this.MsgShow = true;
            },
            MsgShowClose(){
                this.onlyInfo = {};
                this.MsgShow = false;
            },
            chooseData(val){
                console.log(val);
                this.chooseList = val;
            },
            watchSeach(e) {
                this.pageType.mobile = e.seachValue;
                // this.requireData(1);
            },
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 15;
                this.pageType.headStatus = 1;
                if (this.$route.query.userUid) {
                console.log(this.$route.query.userUid,'我是用户跳过来的');
                    this.pageType.userId = this.$route.query.userUid;
                }
                if (this.$route.query.headUid) {
                    console.log(this.$route.query.userUid,'我是站长跳过来的');
                    this.pageType.headId = this.$route.query.headUid;
                }
                this.requireData(1);
            },
            getPeoper(){
                this._ajax('admin/getMerchantListName', {
                }, msg => {
                    this.headNameList = msg
                })
            },
            // 请求列表数据
            requireData(p) {
                this.loading = true;
                this.pageType.page = p;
                this._ajax('adminOrder/getOrderList', this.pageType, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    this.loading = false;

                })
            },
        },
        components: {
            TableHeader,ordermsg,ordergoods,orderrefund
        },
        mixins: [mixin],
        created() {
            if (this.$route.query.userUid) {
                console.log(this.$route.query.userUid,'我是用户跳过来的');
                this.pageType.userId = this.$route.query.userUid;
            }
            if (this.$route.query.headUid) {
                console.log(this.$route.query.userUid,'我是站长跳过来的');
                this.pageType.headId = this.$route.query.headUid;
            }
            this.requireData(1);
            this.getPeoper();
        },
    }
</script>

<style scoped>
    .c-g {
        color: green;
    }

    .c-r {
        color: red;
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
    .print-main{
        width: 210mm;
        min-height: 297mm;
        margin: 10px auto;
    }
    .dayinBtn{
        width: 60px;
        height: 30px;
        background: #409EFF;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        line-height: 30px;
    }
</style>
