<template>
    <transition name="el-fade-in">
        
        <!-- <div v-else> -->
        <div>
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
                                <el-input v-model="pageType.orderUuid" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div><span>配货状态：</span>
                                <!-- <el-input v-model="pageType.status" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input> -->
                                <el-select v-model="pageType.status" placeholder="请选择" size="mini" clearable class="inputW">
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
                            <div><span>站长电话：</span>
                                <el-input v-model="pageType.mobile" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets()">重置</el-button>
                            </div>
                            <div>
                                <!-- <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFunc('dayin','配送订单列表')">导出订单</el-button> -->
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="leadingOut('dayin','配送订单列表')">导出订单</el-button>
                                <el-button class="m-t-10" type="primary" size="mini" @click="Allsead()">批量配送</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 250) + 'px'}" class="table-box">
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
                        prop="order_uuid"
                        label="订单号"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="package_no"
                        label="包裹号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="create_times"
                        align="center"
                        label="订单提交时间">
                    </el-table-column>
                    <el-table-column
                        prop="commoditys"
                        align="center"
                        label="商品信息">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="收货地址">
                    </el-table-column>
                    <el-table-column
                        prop="head_name"
                        align="center"
                        label="站长姓名">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="站长电话">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="配货状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status | orderStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status == 2" type="text" size="small" @click="getPeiSongBtn(scope.row)">发起配送</el-button>
                            <el-button type="text" size="small" @click="getPeiSong(scope.row)">打印配送单</el-button>
                            <el-button type="text" size="small" @click="lookMsg(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 触底加载 -->
                <!-- <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
                    <span slot="no-more">
                        全部订单都在这啦
                    </span>
                    <span slot="no-results">
                        全部订单都在这啦
                    </span>
                </infinite-loading> -->
                <!-- 触底加载 -->
                <div style="display: none;" id="dayin">
                    <!-- 导出的 -->
                    <el-table
                        :data="chooseList"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="order_uuid"
                            label="订单号"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="package_no"
                            label="包裹号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="create_times"
                            align="center"
                            label="订单提交时间">
                        </el-table-column>
                        <el-table-column
                            prop="commoditys"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            label="收货地址">
                        </el-table-column>
                        <el-table-column
                            prop="head_name"
                            align="center"
                            label="站长姓名">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="站长电话">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            label="配货状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.status | orderStatus}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 分页 -->
            <!-- <el-pagination
                @current-change="requireData"
                :current-page.sync="pageType.page"
                :page-size="15"
                layout="total, prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination> -->

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
            </div>
            <div class="dialog">
                <!-- 打印反馈关闭，只能点击按钮关闭 -->
                <el-dialog
                    :visible.sync="closeDialog"
                    width="450px"
                    :before-close="closeDialogClose">
                        <div v-if="closeDialog">
                            <div style="text-align: center;">
                                请反馈是否打印成功？
                            </div>
                            <div class="box1-btns">
                                <el-button type="text" size="small" @click="closeDialog = false,window.location.reload();">打印失败</el-button>
                                <el-button type="text" size="small" @click="closeDialog = false">打印成功</el-button>
                                
                            </div>
                        </div>
                </el-dialog>
                <!-- dialogDaYu -->
                <el-dialog
                    :visible.sync="dialogDaYu"
                    width="450px">
                        <div v-if="dialogDaYu" class="dialogDaYu">
                            <div class="big-dialog">
                                <!-- startprint -->
                                <section ref="print">
                                    <div class="da-Box" id="DeliDayin">
                                        <div style="color:#000;font-size: 16px;text-align: center;font-weight: 600;">团购配送</div>
                                        <div style="color:#000;font-size: 0.2rem;text-align: center;">订单号： {{onlyInfo.order_uuid}}</div>
                                        <div style="color:#000;font-size: 8px;text-align: center;">下单时间： {{onlyInfo.create_times}}</div>
                                        <!-- 商品 -->
                                        <div style="color:#000;margin: 5px 15px;" class="borderT"></div>
                                        <div style="color:#000;font-size: 13px;" class="m-l-20">
                                            <div>积分抵扣：{{onlyInfo.integral_price}}元</div>
                                            <div>实际应付：{{onlyInfo.real_money}}元</div>
                                        </div>
                                        <div style="margin: 5px 15px;" class="borderT"></div>
                                        <!-- 站长信息 -->
                                        <div>
                                            <div style="color:#000;font-size: 14px;text-align: center;">站长信息</div>
                                            <div style="color:#000;margin: 5px 15px;">
                                            <div>{{onlyInfo.head_name}}</div>
                                            <div>{{onlyInfo.mobile}}</div>
                                        </div>
                                        </div>
                                        <div style="margin: 5px 15px;" class="borderT"></div>
                                        <div style="color:#000;margin: 5px 15px;">
                                            <div style="color:#000;font-size: 14px;text-align: center;">用户信息</div>
                                            <div>{{onlyInfo.user_code}}</div>
                                            <div>{{onlyInfo.user_tellphone}}</div>
                                            <div>{{onlyInfo.address}}</div>
                                        </div>
                                    </div>
                                </section>
                                <!-- endprint -->
                            </div>
                            <div class="box1-btns">
                                <el-button type="text" size="small" @click="dialogDaYu = false">取消</el-button>
                                <el-button type="text" size="small" @click="dayinSmall(onlyInfo)">打印</el-button>
                                
                            </div>
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

     // import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: "list",
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '配送订单',
                // 表格数据列表
                tableData: [{name:1}],
                chooseList: [],
                loading: false,
                tableTotal: 0,
                pages: 1,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 99999,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                },
                onlyInfo: {},
                MsgShow: false,
                topData: {},
                // 表格数据列表
                orderNumList:[
                    {name:'未配送',val:2},
                    {name:'配送中',val:3},
                    {name:'已配送',val:4},
                ],
                isDaying: false,
                closeDialog: false,

                dialogDaYu: false,
            }
        },
        filters: {
            // 订单状态 0删除1未支付2已支付3配送中4待取货5已完成6申请退款7退款成功8取消支付（支付失败）
            orderStatus: function (arg) {
                if (arg == 2) {
                    return "未配送"
                } else if (arg == 3) {
                    return "配送中"
                } else if (arg == 4) {
                    return "已配送"
                }
            },
        },
        methods: {
            // onInfinite ($state) {
            //     setTimeout(() => {
            //         this.pageType.page = this.pageType.page + 1;
            //             console.log("shuju",this.pageType.page,this.pages);

            //         if (this.pageType.page > this.pages) {
            //             console.log("加载完啦",this.pageType.page,this.tableTotal);
            //             // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            //             $state.complete();
            //         } else {
            //             console.log("勤奋加载");
            //             this._ajax('adminOrder/getDistributionOrderList', this.pageType, msg => {
            //                 console.log(msg);
            //                 if (msg.pageInfo.list.length) {
            //                     $state.loaded();
            //                 } else {
            //                     $state.complete();
            //                 }
            //                 for (let i = 0; i < msg.pageInfo.list.length; i++) {
            //                     this.tableData.push(msg.pageInfo.list[i])
            //                 }
            //                 this.pages = msg.pageInfo.pages;


            //                 // this.tableData = msg.pageInfo.list;
            //                 // this.tableTotal = msg.pageInfo.total;
            //             })
            //         }
            //     }, 2000);
            // },
            leadingOut(){
                this.loading = true;
                // exportFunc('dayin','配送订单列表')
                if (this.chooseList.length == 0) {
                    this.pageType.page = 1;
                    this.pageType.pageSize = this.tableTotal;
                    this._ajax('adminOrder/getDistributionOrderList', this.pageType, msg => {
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
                            _that.exportFunc('dayin','配送订单列表');
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
                        _that.exportFunc('dayin','配送订单列表');
                        _that.loading = false;
                        _that.requireData(_that.pageType.page);
                    },200)
                }

            },
            closeDialogClose(){
                this.closeDialog = false;
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
            Allsead(){
                console.log(this.chooseList);
                // alert('123')
                if (this.chooseList.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '请选择数据!'
                    });
                }else{
                    this.loading = true;
                    let isSuccess = true;
                    let uuidAry = [];
                    for(let i=0;i<this.chooseList.length;i++){
                        // 第一版分开循环
                        // _ajaxAll
                        // this._ajaxAll('adminOrder/updateOrderStatusDeliver', {
                        //     orderUuid: this.chooseList[i].order_uuid,
                        //     status: 3,
                        // }, msg => {
                        //     console.log(msg);
                        //     if (msg.state == 1) {
                        //     } else {
                        //         this.$message({
                        //             type: 'warning',
                        //             message: msg.message,
                        //         });
                        //         isSuccess = false;
                        //         i = 999;
                        //     }
                        // },{logAdmin:this.bear.adminId,logCustomer:this.chooseList[i].order_uuid})
                        console.log(this.chooseList[i].order_uuid);
                        // 第二版拼接请求
                        if (this.chooseList[i].order_uuid) {
                            uuidAry.push(this.chooseList[i].order_uuid);
                        }
                    }
                    let uuidStr = uuidAry.join();
                    console.log(uuidStr,'第二版拼接uuid');
                    // 第二版拼接请求
                    this._ajax('adminOrder/updateOrderStatusDeliver', {
                        orderUuid: uuidStr,
                        status: 3,
                    },
                    msg => {
                        this.$message({
                            type: 'success',
                            message: '全部发起成功!'
                        });
                        this.loading = false;
                        this.requireData(this.pageType.page);
                    }, {logAdmin:this.bear.adminId,logCustomer:uuidStr})

                    // if (isSuccess) {
                    //     this.$message({
                    //         type: 'success',
                    //         message: '全部发起成功!'
                    //     });
                    // }
                    // this.loading = false;
                    // this.requireData(this.pageType.page);
                }
            },
            dayinSmall(val){
                // this.isDaying = true;
                // let this_ = this;
                // console.log(this.onlyInfo,'要打印的数据');

                // window.setTimeout(function(){
                //     let newstr = document.getElementById('DeliDayin').innerHTML;
                //     let oldstr = document.body.innerHTML;
                //     this_.dialogDaYu = false;
                //     document.body.innerHTML = newstr;
                //     window.print();
                //     document.body.innerHTML = oldstr;
                //     window.location.reload();
                //     // this_.CloseAfterPrint(val);
                // },90)
                this.$print(this.$refs.print)
            },
            CloseAfterPrint(val){
                // dialog框，不可被点击其他关闭，必须选择成功失败
                this.$confirm('请反馈是否打印成功?', '提示', {
                    confirmButtonText: '打印成功',
                    cancelButtonText: '打印失败',
                    type: 'warning'
                }).then(() => {
                    this.buyingChange(val);
                }).catch(() => {
                    window.location.reload();
                });
            },
            buyingChange(val){
                this._ajax('adminOrder/updateOrderStatusDeliver', {
                    orderUuid: val.order_uuid,
                    status: 3,
                },
                msg => {
                    this.$message({
                        type: 'success',
                        message: '发起成功!'
                    });
                    this.requireData(this.pageType.page);
                }, {logAdmin:this.bear.adminId,logCustomer:val.order_uuid})
            },
            getPeiSongBtn(val){
                this.$confirm('是否发起配送?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.buyingChange(val);
                }).catch(() => {
                    //取消
                });
            },
            getPeiSong(val){
                this._ajax('adminOrder/getOrderListDetail', {
                    orderUuid: val.order_uuid,
                }, 
                msg => {
                    this.onlyInfo = msg;
                    // this.dayinSmall(val);
                    // dialog打开
                    this.dialogDaYu = true;
                })
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
                this. pageType = {
                    page: 1,
                    pageSize: 99999,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                };
                this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.loading = true;
                this.pageType.page = p;
                this._ajax('adminOrder/getDistributionOrderList', this.pageType, msg => {
                    console.log(msg);
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    this.pages = msg.pageInfo.pages;
                    this.loading = false;
                })
            },
        },
        components: {
            TableHeader,ordermsg
            // InfiniteLoading
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
        /*width: 294px;*/
        height: 294px;
        width: 203px;
        overflow: hidden;
        /*display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;*/
        color: #000;
        font-size: 10px;
        /*transform: rotate(90deg);*/
        /*position: absolute;*/
        /*top: -46px;*/
        /*left: 46px;*/
        font-weight: 100;
        /*border: 1px solid pink;*/
        margin: 0 auto;
        color: #000;
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
/*        position: absolute;
        top: 0;
        left: 0;*/

        overflow: hidden;
        background: #fff;
        z-index: 999999;
        width: 100%;
        /*height: 203px;*/
        border-bottom: 1px dashed #ddd;

    }
    .dialogDaYu{
        padding: 20px;
        padding-bottom: 0;
    }
</style>
