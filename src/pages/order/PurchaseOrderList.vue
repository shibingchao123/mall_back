<template>
    <transition name="el-fade-in">

        <div v-if="isDaying" class="big-dialog" >
            <!--startprint-->
            <section ref="print">
                <div class="da-Box">
                    <h5 style="text-align: center;" class="m-b-20">采购订单打印单</h5>
                    <el-table
                        :data="chooseList"
                        border
                        style="width: 98%">
                        <el-table-column
                            type="index"
                            width="45">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_uuid"
                            label="采购订单号"
                            align="center"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="operator"
                            label="操作人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="apply_time"
                            align="center"
                            label="申请采购时间">
                        </el-table-column>
                        <el-table-column
                            prop="commodity_name"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="commodity_num"
                            align="center"
                            label="商品数量">
                        </el-table-column>
                        <el-table-column
                            prop="functionary"
                            align="center"
                            label="采购负责人">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_status"
                            align="center"
                            label="采购状态">
                            <!-- 0删除1未采购2采购中3已采购 -->
                            <template slot-scope="scope">
                                <span>{{{'0':'删除','1':'未采购','2':'采购中','3':'已采购'}[scope.row.purchase_status]}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </section>
            <!--endprint-->
        </div>
        <div v-else>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs']"
                :selectTit="{titI:'手机号'}"
                :breadcrumb="{nameA: '订单管理', nameB: nameB}">
            </TableHeader>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>订单编号：</span>
                                <el-input v-model="pageType.purchaseUuid" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div><span>采购状态：</span>
                                <el-select v-model="pageType.purchaseStatus" placeholder="请选择" size="mini" clearable class="inputW">
                                    <el-option
                                        v-for="item in orderNumList"
                                        :key="item.val"
                                        :label="item.name"
                                        :value="item.val">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>提交时间：</span>
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
                            <div><span>商品名称：</span>
                                <el-input v-model="pageType.commodityName" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets()">重置</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="leadingOut('dayin','采购订单列表')">导出订单</el-button>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="dayinSmall">打印订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- 表格展示区 -->
            <div class="tableT clearfix">
                <div class="f-r m-r-10">
                    <el-button class="m-t-10 blue-btn" type="primary" size="mini" @click="moreBtnCaigou()">批量采购
                    </el-button>
                </div>

            </div>
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
                        prop="purchase_uuid"
                        label="采购订单号"
                        align="center"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="operator"
                        label="操作人"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="apply_time"
                        align="center"
                        label="申请采购时间">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_name"
                        align="center"
                        label="商品信息">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_num"
                        align="center"
                        label="商品数量">
                    </el-table-column>
                    <el-table-column
                        prop="functionary"
                        align="center"
                        label="采购负责人">
                    </el-table-column>
                    <el-table-column
                        prop="purchase_status"
                        align="center"
                        label="采购状态">
                        <!-- 0删除1未采购2采购中3已采购 -->
                        <template slot-scope="scope">
                            <span>{{{'0':'删除','1':'未采购','2':'采购中','3':'已采购'}[scope.row.purchase_status]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.purchase_status == 1">
                                <el-button type="primary" size="small" @click="siteViewOpen(scope.row,2)">采购中</el-button>
                            </div>
                            <div v-else-if="scope.row.purchase_status == 2">
                                <el-button type="primary" size="small" @click="upStatus(scope.row,3)">已采购</el-button>
                            </div>
                            <div>
                                <el-button type="text" size="small" @click="siteViewOpen2(scope.row)">打印</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <!-- 导出的 -->
                    <el-table
                        :data="chooseList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="purchase_uuid"
                            label="采购订单号"
                            align="center"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="operator"
                            label="操作人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="apply_time"
                            align="center"
                            label="申请采购时间">
                        </el-table-column>
                        <el-table-column
                            prop="commodity_name"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="commodity_num"
                            align="center"
                            label="商品数量">
                        </el-table-column>
                        <el-table-column
                            prop="functionary"
                            align="center"
                            label="采购负责人">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_status"
                            align="center"
                            label="采购状态">
                            <!-- 0删除1未采购2采购中3已采购 -->
                            <template slot-scope="scope">
                                <span>{{{'0':'删除','1':'未采购','2':'采购中','3':'已采购'}[scope.row.purchase_status]}}</span>
                            </template>
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
            <div class="dialog">
                <el-dialog
                    title="打印订单"
                    :visible.sync="changeSiteView"
                    width="400px"
                    :before-close="siteViewClose"  center>
                    <div v-if="changeSiteView">
                        <span>采购负责人：</span>
                        <el-input v-model="caiPeoper" placeholder="请输入内容" clearable size="small"
                                  class="inputLong"></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="changeSiteView = false">取 消</el-button>
                        <!-- <el-button class="blue-btn" type="primary" @click="dayinSmall()">打 印</el-button> -->
                        <el-button v-if="onlyInfo.isMore" class="blue-btn" type="primary" @click="buyingChangeMore()">批量采购</el-button>
                        <el-button v-else class="blue-btn" type="primary" @click="buyingChange()">确认采购</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>

    </transition>
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    export default {
        name: "list",
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '采购订单',
                // 表格数据列表
                orderNumList:[
                    {name:'未采购',val:1},
                    {name:'采购中',val:2},
                    {name:'已采购',val:3},
                ],
                tableData: [{name:1}],
                chooseList: [],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 15,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                },
                topData:{
                    page: 1,
                    pageSize: 15,
                },
                // 采购负责人
                caiPeoper:'',
                changeSiteView: false,
                isDaying: false,
                loading: false,
                onlyInfo: {},
                // isDaying: true,
            }
        },
        methods: {
            leadingOut(){
                this.loading = true;
                // exportFunc('dayin','配送订单列表')
                if (this.chooseList.length == 0) {
                    this.pageType.page = 1;
                    this.pageType.pageSize = this.tableTotal;
                    this._ajax('adminOrder/getPurchaseOrder', this.pageType, msg => {
                        console.log(msg);
                        this.chooseList = msg.pageInfo.list;
                        this.chooseList.forEach((item,index)=>{
                            item.purchase_uuid = "'"+item.purchase_uuid;
                        })
                        let _that = this;
                        setTimeout(function(){
                            _that.exportFunc('dayin','采购订单列表');
                            _that.loading = false;
                            _that.requireData(_that.pageType.page);
                            _that.chooseList = [];
                        },200)
                    })
                }else{
                    this.chooseList.forEach((item,index)=>{
                        item.purchase_uuid = "'"+item.purchase_uuid;
                    })
                    let _that = this;
                        setTimeout(function(){
                            _that.exportFunc('dayin','采购订单列表');
                            _that.loading = false;
                            _that.requireData(_that.pageType.page);
                            _that.chooseList = [];
                        },200)
                }

            },
            moreBtnCaigou(){
                console.log(this.chooseList);
                if (this.chooseList.length) {
                    this.onlyInfo.isMore = true;
                    this.changeSiteView = true;
                }else{
                    this.$message({
                        message: '选择您要采购的订单',
                        type: 'warning'
                    });
                }
            },
            // 变成已采购
            upStatus(val,i){
                this._ajax('adminOrder/updatePurchaseOrderBuy', {
                    purchaseId: val.purchaseId,
                    purchaseStatus: i,
                },msg => {
                    this.$message({
                        message: '更改成功！',
                        type: 'success'
                    });
                    this.requireData(this.pageType.page);
                },{logAdmin:this.bear.adminId,logCustomer:val.purchaseId})
            },
            // 打印和变成采购中
            dayinSmall(val){
                // if (this.caiPeoper) {
                    // 先调取打印的接口
                    // buyingChange

                    this.isDaying = true;
                    let this_ = this;
                    // console.log(this.onlyInfo,'要打印的数据');

                    window.setTimeout(function(){
                        this_.$print(this_.$refs.print);
                        this_.isDaying = false;
                        this_.chooseList = [];
                    },90)
                    
                    // window.setTimeout(function(){
                    //     this_.isDaying = false;
                    // },400)
                    // this.$print(this.$refs.print);
                    // this.isDaying = false;



                // }else{
                //     this.$message({
                //         message: '请填写采购负责人姓名',
                //         type: 'error'
                //     });
                // }
            },
            CloseAfterPrint(){
                // dialog框，不可被点击其他关闭，必须选择成功失败
                this.$confirm('请反馈是否打印成功?', '提示', {
                    confirmButtonText: '打印成功',
                    cancelButtonText: '打印失败',
                    type: 'warning'
                }).then(() => {
                    this.buyingChange();
                }).catch(() => {
         
                });
            },
            buyingChangeMore(){
                if (this.caiPeoper) {
                    this.loading = false;
                    // 第一版
                    // for(let a=0;a<this.chooseList.length;a++){
                    //     this._ajax('adminOrder/updatePurchaseOrderBuying', {
                    //         purchaseId: this.chooseList[a].purchaseId,
                    //         purchaseStatus: 2,
                    //         functionary: this.caiPeoper,
                    //         operator: this.bear.admin_name,
                    //     },msg => {
                            

                    //     },{logAdmin:this.bear.adminId,logCustomer:this.chooseList[a].purchaseId})
                    // }
                    // this.$message({
                    //     message: '批量采购成功！',
                    //     type: 'success'
                    // });
                    // this.siteViewClose();
                    // this.requireData(this.pageType.page);
                    // this.loading = false;
                    // 第二版
                    let uuidAry = [];
                    for(let i=0;i<this.chooseList.length;i++){
                        console.log(this.chooseList[i].purchaseId);
                        // 第二版拼接请求
                        if (this.chooseList[i].purchaseId) {
                            uuidAry.push(this.chooseList[i].purchaseId);
                        }
                    }
                    let uuidStr = uuidAry.join();
                    console.log(uuidStr,'第二版拼接uuid');
                    // 第二版拼接请求
                    this._ajax('adminOrder/updatePurchaseOrderBuying', {
                        purchaseId: uuidStr,
                        purchaseStatus: 2,
                        functionary: this.caiPeoper,
                        operator: this.bear.admin_name,
                    },
                    msg => {
                        this.$message({
                            type: 'success',
                            message: '批量采购成功！'
                        });
                        this.loading = false;
                        this.siteViewClose();
                        this.requireData(this.pageType.page);
                    }, {logAdmin:this.bear.adminId,logCustomer:uuidStr})
                }else{
                    this.$message({
                        message: '请填写采购负责人姓名',
                        type: 'error'
                    });
                }
            },
            buyingChange(){
                if (this.caiPeoper) {
                    this._ajax('adminOrder/updatePurchaseOrderBuying', {
                        purchaseId: this.onlyInfo.purchaseId,
                        purchaseStatus: 2,
                        functionary: this.caiPeoper,
                        operator: this.bear.admin_name,
                    },msg => {
                        this.$message({
                            message: '更改成功！',
                            type: 'success'
                        });
                        this.siteViewClose();
                        this.requireData(this.pageType.page);
                    },{logAdmin:this.bear.adminId,logCustomer:this.onlyInfo.purchaseId})
                }else{
                    this.$message({
                        message: '请填写采购负责人姓名',
                        type: 'error'
                    });
                }
            },
            siteViewOpen(val){
                this.onlyInfo = val;
                console.log(val)
                this.changeSiteView = true;
            },
            siteViewOpen2(val){
                this.chooseList = [];
                this.chooseList[0] = val;
                console.log(val);
                this.dayinSmall();
            },
            siteViewClose(){
                this.onlyInfo = {};
                this.caiPeoper = '';
                this.changeSiteView = false;
            },
            chooseData(val){
                console.log(val);
                this.chooseList = val;
            },
            watchSeach(e) {
                
            },
            // 开始时间结束时装换
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
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 15;
                this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('adminOrder/getPurchaseOrder', this.pageType, msg => {
                    console.log(msg);
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader,
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

    .da-Box{
        /*height: 500px;*/
        width: 780px;
        /*overflow: hidden;*/
        color: #000;
        font-size: 10px;
        position: absolute;
        font-weight: 100;
        padding: 20px;
        box-sizing: border-box;
    }
    .borderAll{
        border: 1px solid #000;
    }
    .borderR{
        border-right:  1px solid #000;
    }
    .borderT{
        border-top:  1px solid #000;
    }
    .borderT0{
        border-top:  0;
    }
    .disf{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }
    .box-head{
        width: 100px;
        text-align: center;
    }
    .box-content{
        width: 192px;
    }
    .big-dialog{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 999999;
    }
</style>
