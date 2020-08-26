<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                ref="tableHeader"
                :showoption="['crumbs']"
                :breadcrumb="{nameA: '用户管理', nameB: nameB}">
            </TableHeader>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div>
                                <span>　站长ID：</span>
                                <el-input v-model="topData.userCode" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>
                            <div>
                                <span>邀请人ID：</span>
                                <el-input v-model="topData.inviterCode" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>
                            <div>
                                <span>　　姓名：</span>
                                <el-input v-model="topData.name" placeholder="请输入内容" size="mini" clearable
                                      class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <span>联系方式：</span>
                                <el-input v-model="topData.tellPhone" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>
                            <div>
                                <span>通过时间：</span>
                                <!-- <el-input v-model="topData.passTime" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input> -->
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
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">
                                    搜索
                                </el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh"
                                           @click="reSetting(1)">重置
                                </el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="leadingOut('dayin','订单列表')">导出列表</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="w10 flex-end m-b-10"></div>
            <!-- sortGenre -->
            <div class="tableT clearfix">
                <div class="f-r m-r-10">
                    <el-select @change="requireData(1)" size="mini" v-model="topData.sortGenre" clearable placeholder="排序方式">
                        <el-option
                            v-for="item in topPaixuList"
                            :key="item.val"
                            :label="item.title"
                            :value="item.val">
                        </el-option>
                    </el-select>
                </div>
                <div class="f-r m-r-10">
                    <el-button class="m-t-10 blue-btn" type="primary" size="mini" @click="setYjin">佣金设置
                    </el-button>
                </div>

            </div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 315) + 'px'}" class="table-box">
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
                        prop="user_code"
                        label="站长ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="120"
                        label="头像">
                        <template slot-scope="scope">
                            <img class="img-100" :src="aliurl +scope.row.photo" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tell_phone"
                        align="center"
                        label="联系方式">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="邀请人ID">
                        <template slot-scope="scope">
                            <span>{{scope.row.inviter_code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="佣金抽成">
                        <template slot-scope="scope">
                            <span>{{scope.row.royalty_ratio}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="总交易额">
                        <template slot-scope="scope">
                            <span>￥{{scope.row.pay_total}}</span>
                            <span class="vertical">|</span>
                            <el-button type="text" size="small" @click="lookOrder(scope.row)">记录查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="商户状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.genre|filtersT}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pass_time"
                        align="center"
                        label="通过时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作"
                        min-width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="GoOff(scope.row)" v-if="scope.row.genre==2">
                                禁用
                            </el-button>
                            <el-button type="text" size="small" @click="GoOn(scope.row)" v-if="scope.row.genre==4">
                                启用
                            </el-button>
                            <!-- daiyinMsg -->
                            <el-button type="text" size="small" @click="lookMsg(scope.row)">基本信息</el-button>
                            <el-button type="text" size="small" @click="lookOrderH(scope.row)">订单记录</el-button>
                            <el-button type="text" size="small" @click="daiyinMsg(scope.row)">包裹记录打印</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="display: none;" id="dayin">
                <el-table
                    :data="chooseList"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="user_code"
                        label="站长ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="tell_phone"
                        align="center"
                        label="联系方式">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="邀请人ID">
                        <template slot-scope="scope">
                            <span>{{scope.row.inviter_code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="佣金抽成">
                        <template slot-scope="scope">
                            <span>{{scope.row.royalty_ratio}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="总交易额">
                        <template slot-scope="scope">
                            <span>￥{{scope.row.pay_total}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="商户状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.genre|filtersT}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pass_time"
                        align="center"
                        label="通过时间">
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
                @current-change="requireData"
                :current-page.sync="topData.page"
                :page-size="15"
                layout="prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination>
            <div class="dialog">
                <!-- 商户基本信息 -->
                <el-dialog
                    :visible.sync="MsgShow"
                    width="80%"
                    :before-close="MsgShowClose">
                    <div v-if="MsgShow">
                        <merchant-msg :onlyInfo="onlyInfo" @close="MsgShowClose"></merchant-msg>
                    </div>
                </el-dialog>
                <!--佣金设置-->
                <el-dialog
                    title="佣金抽成比例"
                    :visible.sync="changeYjView"
                    width="400px"
                    :before-close="yjViewClose" append-to-body center>
                    <div class="flex-center" v-if="changeYjView">
                        <el-input v-model="oldYj" size="small" class="input-70 m-r-10"></el-input>
                        <span>%</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="changeYjView = false">取 消</el-button>
                        <el-button class="blue-btn" type="primary" @click="addYjView()">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 订单记录 -->
                <el-dialog
                    :visible.sync="orderHShow"
                    width="80%"
                    :before-close="orderHShowClose">
                    <div v-if="orderHShow">
                        <order-history :onlyInfo="onlyInfo" @close="orderHShowClose"></order-history>
                    </div>
                </el-dialog>
                <!-- 订单记录 -->
                <el-dialog
                    :visible.sync="DayinsDialog"
                    width="80%">
                        <div v-if="DayinsDialog">
                            <order-history2 :onlyInfo="onlyInfo"></order-history2>
                        </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    // 商户详情
    import merchantMsg from './merchantMsg'
    // 订单记录
    import orderHistory from './orderHistory'
    // dayin
    import orderHistory2 from './orderHistory2'

    export default {
        name: "merchantList",
        data() {
            return {
                DayinsDialog: false,
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '商户管理',
                // 表格数据列表
                tableData: [],
                tableTotal: 0,
                topData: {
                    page: 1,
                    pageSize: 15,
                    name: '',
                    userCode: '',
                    tellPhone: '',
                    merchant: 2
                },
                MsgShow: false,  //商户详情
                onlyInfo: {},
                //设置佣金
                changeYjView: false,
                oldYj: '1',
                //订单记录
                orderHShow: false,
                chooseList: [],
                // 排序方式
                topPaixuList:[{title:'商户状态升序',val: 1},
                            {title:'商户状态降序',val: 2},
                            {title:'时间升序',val: 3},
                            {title:'时间降序',val: 4}],
            }
        },
        filters: {
            filtersT: function (arg) {
                if (arg == 0) {
                    return "用户"
                } else if (arg == 1) {
                    return "申请站长"
                } else if (arg == 2) {
                    return "启用"
                } else if (arg == 4) {
                    return "禁用"
                }
            },
        },
        methods: {
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
            chooseData(val){
                console.log(val);
                this.chooseList = val;
            },
            leadingOut(){
                this.loading = true;

                // exportFunc('dayin','配送订单列表')
                if (this.chooseList.length == 0) {
                    this.topData.page = 1;
                    this.topData.pageSize = this.tableTotal;
                    this._ajax('admin/getMerchantList', this.topData, msg => {
                        console.log(msg);
                        this.chooseList = msg.pageInfo.list;
                        this.chooseList.forEach((item,index)=>{
                            item.user_code = "'"+item.user_code;
                            item.phone = "'"+item.phone;
                            item.inviter_code = "'"+item.inviter_code;
                        })
                        let _that = this;
                        setTimeout(function(){
                            _that.exportFunc('dayin','商户列表');
                            _that.loading = false;
                            _that.requireData(_that.topData.page);
                        },200)
                    })
                }else{
                    this.chooseList.forEach((item,index)=>{
                        item.user_code = "'"+item.user_code;
                        item.phone = "'"+item.phone;
                        item.inviter_code = "'"+item.inviter_code;
                    })
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc('dayin','商户列表');
                        _that.loading = false;
                        _that.requireData(_that.topData.page);
                    },200)
                }


            },
            daiyinMsg(val){
                this.onlyInfo = {};
                this.DayinsDialog = true;
                this.onlyInfo = val;
            },
            //启用商户
            GoOn(val) {
                this.$confirm('是否进行启用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._ajax('admin/updateMerchantOn', {
                        userId: val.userId,
                        genre: 2
                    }, msg => {
                        this.$message({
                            type: 'success',
                            message: '禁用成功'
                        })
                        this.requireData(this.topData.page);
                    },{logAdmin:this.bear.adminId,logCustomer:val.userId})
                })
            },
            //禁用商户
            GoOff(val) {
                this.$confirm('是否进行禁用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._ajax('admin/updateMerchantOff', {
                        userId: val.userId,
                        genre: 4
                    }, msg => {
                        this.$message({
                            type: 'success',
                            message: '禁用成功'
                        })
                        this.requireData(this.topData.page);
                    })
                },{logAdmin:this.bear.adminId,logCustomer:val.userId})
            },
            // 查看商户详情
            lookMsg(data) {
                this.onlyInfo = data;
                this.MsgShow = true;
            },
            MsgShowClose() {
                this.onlyInfo = {};
                this.MsgShow = false;
                this.requireData(this.topData.page);
            },
            //设置佣金比例
            setYjin() {
                this.changeYjView = true;
            },
            yjViewClose() {
                this.changeYjView = false;
                this.requireData(this.topData.page);
            },
            addYjView() {
                if(this.oldYj==''){
                    this.$message({
                        type:'info',
                        message:'请填写信息'
                    })
                    return false;
                }
                this._ajax('admin/updateRoyalty', {
                    royaltyRatio: this.oldYj,
                }, msg => {
                    this.$message({
                        type: 'success',
                        message: '设置成功'
                    })
                    this.yjViewClose();
                },{logAdmin:this.bear.adminId})
            },
            //总交易记录查看
            lookOrder(val) {
                // userId
                this.$router.push({name:'OrderList',query:{headUid: val.userId}});
            },
            //订单记录
            lookOrderH(data) {
                this.onlyInfo = data;
                this.orderHShow = true;
            },
            orderHShowClose() {
                this.onlyInfo = {};
                this.orderHShow = false;
            },
            /*重置*/
            reSetting() {
                // this.topData.userCode = '';
                // this.topData.tellPhone = '';
                // this.topData.name = '';
                // this.topData.passTime = '';
                // this.topData.inviterCode = '';
                // this.topData.times = []];
                // this.topData.endTime = '';
                // this.topData.beginTime = '';
                this.topData = {
                    page: 1,
                    pageSize: 15,
                    name: '',
                    userCode: '',
                    tellPhone: '',
                    merchant: 2
                };

                this.requireData(1)
            },
            // 请求列表数据
            requireData(p) {
                this.topData.page = p;
                this._ajax('admin/getMerchantList', this.topData, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader, merchantMsg, orderHistory,orderHistory2
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
