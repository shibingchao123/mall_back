<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs']"
                :breadcrumb="{nameA: '营销中心', nameB: '优惠管理'}">
            </TableHeader>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <!-- <div><span>商品编号：</span>
                                <el-input v-model="pageType.number" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div> -->
                            <div><span>活动状态：</span>
                                <el-select v-model="pageType.status" size="mini" clearable class="inputW"  placeholder="请选择">
                                    <el-option
                                        v-for="item in orderSt"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>有效期：</span>
                                <!-- beginTime endTime -->
                                <el-date-picker
                                    v-model="pageType.times"
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
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets">重置</el-button>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" @click="addData">新建活动</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFuncNew('dayin','优惠券列表')">导出订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 260) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
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
                        prop="activity_code"
                        label="活动编号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="activity_name"
                        align="center"
                        label="活动名称">

                    </el-table-column>
                    <el-table-column
                        prop="start_time"
                        align="center"
                        label="开始日期">
                    </el-table-column>
                    <el-table-column
                        prop="end_time"
                        align="center"
                        label="结束日期">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_code"
                        align="center"
                        label="可用该券的商品编号">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="lookShop(scope.row)">查看</el-button>

                            <!-- <div v-for="item in scope.row.commodityCode">
                                {{item.commodity_code}}
                            </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        align="center"
                        label="优惠设置">
                        <template slot-scope="scope">
                            <span>
                                满{{scope.row.min_limit}}减{{scope.row.discount}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        align="center"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        align="center"
                        label="活动状态">
                        <template slot-scope="scope">
                            <span>
                                {{{'1':'进行中','2':'未开始','3':'已结束'}[scope.row.status]}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <!-- @click="GoOnline(scope.row, 4)" -->
                            <el-button type="text" size="small" @click="delData(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <!-- 表格最后写chooseList -->
                    <el-table
                        :data="chooseList"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="activity_code"
                            label="活动编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="activity_name"
                            align="center"
                            label="活动名称">

                        </el-table-column>
                        <el-table-column
                            prop="start_time"
                            align="center"
                            label="开始日期">
                        </el-table-column>
                        <el-table-column
                            prop="end_time"
                            align="center"
                            label="结束日期">
                        </el-table-column>
                        <el-table-column
                            prop="commodity_code"
                            align="center"
                            label="可用该券的商品编号">
                            <template slot-scope="scope">
                                <div v-for="item in scope.row.commodityCode">
                                    {{item.commodity_code}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            align="center"
                            label="优惠设置">
                            <template slot-scope="scope">
                                <span>
                                    满{{scope.row.min_limit}}减{{scope.row.discount}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            align="center"
                            label="数量">
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
                <!-- <el-dialog
                    :visible.sync="MsgShow"
                    width="80%"
                    :before-close="MsgShowClose">
                        <div v-if="MsgShow">
                            <ordermsg :onlyInfo="onlyInfo" @close="MsgShowClose"></ordermsg>
                        </div>
                </el-dialog> -->
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
                <!-- 订单退款 -->
                <el-dialog
                    :visible.sync="goodsLookShow"
                    width="80%"
                    :before-close="goodsLookShowClose">
                    <!-- DgoodsClose -->
                        <div v-if="goodsLookShow">
                            <goodsList :onlyInfo="onlyInfo" @close="goodsLookShowClose"></goodsList>
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
    // 查看商品
    import goodsList from '@/components/goodsList'

    export default {
        name: "list",
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '订单管理',
                // 表格数据列表
                tableData: [{name:1,age:2}],
                chooseList:[],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 15,
                },
                // 订单详情
                MsgShow: false,
                // 发货详情
                DgoodsShow: false,
                // 退款订单
                RefundShow: false,
                // 查看商品
                goodsLookShow: false,
                onlyInfo: {},
                topData:{
                    page:1,
                    pageSize:20,
                },
                orderSt: [
                    {value:'1',label:'进行中'},
                    {value:'2',label:'未开始'},
                    {value:'3',label:'已结束'},
                ],
            }
        },
        methods: {
            // 优惠券列表
            exportFuncNew(){
                let tableData = [];
                this.chooseList.forEach((item,index)=>{
                    item.activity_code = "'"+item.activity_code;
                });
                let _that = this;
                setTimeout(function(){
                    _that.exportFunc('dayin','优惠券列表');
                    _that.loading = false;
                    _that.requireData(_that.pageType.page);
                },200)
            },
            goodsLookShowClose(){
                this.goodsLookShow = false;
                this.onlyInfo = {};
            },
            lookShop(val){
                console.log(val.activity_code);
                this.onlyInfo = val;
                this.goodsLookShow = true;
                // this.$router.push({name:'goodsList',query:{activity_code: val.activity_code}});
            },
            // 查询条件-开始时间结束时装换
            timeChange(val){
                console.log(this.pageType.times);
                if (this.pageType.times == null || this.pageType.times == ''|| this.pageType.times == undefined) {
                    this.pageType.beginTime = '';
                    this.pageType.endTime = '';
                }else{
                    this.pageType.beginTime = this.pageType.times[0] + ' 00:00:00';
                    this.pageType.endTime = this.pageType.times[1] + ' 23:59:59';
                }
            },
            addData(){
                this.$router.push({name:'AddMarketing'});
            },
            // 查看订单详情
            RefundMsg(data){
                this.onlyInfo = data;
                this.RefundShow = true;
            },
            RefundShowClose(){
                this.onlyInfo = {};
                this.RefundShow = false;
            },
            // 发货详情
            GoodsGo(data){
                this.onlyInfo = data;
                this.DgoodsShow = true;
            },
            DgoodsClose(){
                this.onlyInfo = {};
                this.DgoodsShow = false;
            },
            // 删除
            delData(val){
                this.$confirm('确认执行删除操作？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('adminOrder/updateActivity', {
                        activityId: val.activityId,
                    }, msg => {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.requireData(this.pageType.page);
                    },{logAdmin:this.bear.adminId,logCustomer:val.activityId})
                }).catch(() => {

                });
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
                this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('adminOrder/getActivityList', this.pageType, msg => {
                    console.log(msg);
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader,ordermsg,ordergoods,orderrefund,goodsList
        },
        mixins: [mixin],
        created() {
            this.requireData(1);
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

</style>
