<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs']"
                :breadcrumb="{nameA: '财务管理', nameB: '提现申请'}">
            </TableHeader>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>用户　ID：</span>
                                <el-input v-model="pageType.userCode" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div><span>申请时间：</span>
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
                            
                        </div>
                        <div class="pageBox">
                            <div><span>用户手机号：</span>
                                <el-input v-model="pageType.tellPhone" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                            <div style="height: 30px;"></div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets">重置</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFuncNew('dayin','提现申请列表')">导出订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="w10 flex-end m-b-10"></div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 280) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    @selection-change="chooseData">
                    <el-table-column
                        type="selection"
                        width="38">
                    </el-table-column>
                    <el-table-column
                        prop="user_code"
                        label="用户ID"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="tell_phone"
                        label="手机号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="bank_username"
                        align="center"
                        label="开户人姓名">
                    </el-table-column>
                    <el-table-column
                        prop="bank_number"
                        align="center"
                        label="银行卡号">
                    </el-table-column>
                    <el-table-column
                        prop="bank_name"
                        align="center"
                        label="所属银行">
                    </el-table-column>
                    <el-table-column
                        prop="bank_name_branch"
                        align="center"
                        label="支行名称">
                    </el-table-column>
                    <el-table-column
                        prop="bank_idnumber"
                        align="center"
                        label="开户人身份证号">
                    </el-table-column>
                    <el-table-column
                        prop="bank_balance"
                        align="center"
                        label="账户余额">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        align="center"
                        label="申请提现金额">
                    </el-table-column>
                    <el-table-column
                        prop="cash_status"
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{{'1':'未审核','2':'通过','3':'驳回','4':'已打款'}[scope.row.cash_status]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.cash_status == 1">
                                <el-button type="text" size="small" @click="getCaozuo(scope.row,'2','通过')">通过</el-button>
                                <el-button type="text" size="small" @click="getCaozuo(scope.row,'3','驳回')">驳回</el-button>
                            </div>
                            <div v-if="scope.row.cash_status == 2">
                                <el-button type="text" size="small" @click="getCaozuo(scope.row,'4','打款')">确认打款</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <!-- 表格最后写 -->
                    <el-table
                        :data="chooseList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="user_code"
                            label="用户ID"
                            align="center"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="tell_phone"
                            label="手机号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="bank_username"
                            align="center"
                            label="开户人姓名">
                        </el-table-column>
                        <el-table-column
                            prop="bank_number"
                            align="center"
                            label="银行卡号">
                        </el-table-column>
                        <el-table-column
                            prop="bank_name"
                            align="center"
                            label="所属银行">
                        </el-table-column>
                        <el-table-column
                            prop="bank_name_branch"
                            align="center"
                            label="支行名称">
                        </el-table-column>
                        <el-table-column
                            prop="bank_idnumber"
                            align="center"
                            label="开户人身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="bank_balance"
                            align="center"
                            label="账户余额">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            align="center"
                            label="申请提现金额">
                        </el-table-column>
                        <el-table-column
                            prop="cash_status"
                            align="center"
                            label="状态">
                            <template slot-scope="scope">
                                <span>{{{'1':'未审核','2':'通过','3':'驳回','4':'已打款'}[scope.row.cash_status]}}</span>
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
                nameB: '订单管理',
                // 表格数据列表
                tableData: [{name:1,age:2}],
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
                // 订单详情
                MsgShow: false,
                // 发货详情
                DgoodsShow: false,
                // 退款订单
                RefundShow: false,
                onlyInfo: {},
                topData:{
                    page:1,
                    pageSize:20,
                },
            }
        },
        methods: {
            // 提现申请列表
            exportFuncNew(){

                if (this.chooseList.length == 0) {
                    this.pageType.page = 1;
                    this.pageType.pageSize = this.tableTotal;
                    this._ajax('adminOrder/getWithDraw', this.pageType, msg => {
                        console.log(msg);
                        this.chooseList = msg.pageInfo.list;
                        this.chooseList.forEach((item,index)=>{
                            item.user_code = "'"+item.user_code;
                            item.tell_phone = "'"+item.tell_phone;
                            item.bank_idnumber = "'"+item.bank_idnumber;
                            item.bank_number = "'"+item.bank_number;
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
                        item.user_code = "'"+item.user_code;
                        item.tell_phone = "'"+item.tell_phone;
                        item.bank_idnumber = "'"+item.bank_idnumber;
                        item.bank_number = "'"+item.bank_number;
                    })
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc('dayin','订单列表');
                        _that.loading = false;
                        _that.requireData(_that.pageType.page);
                    },200)
                }
            },
            getCaozuo(val,num,name){
                let data = {};
                // 通过2驳回3打款4
                let url = {'2':'adminOrder/updateWithDrawPass','3':'adminOrder/updateWithDrawRefuse','4':'adminOrder/updateWithDrawPay'}[num];
                data.cashStatus = num;
                data.withDrawId = val.withDrawId;
                this.$confirm('您确认进行'+name+'操作吗?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax(url, data, msg => {
                        this.$message({
                            type: 'success',
                            message: name +'成功!'
                        });
                        this.requireData(this.pageType.page);
                    },{logAdmin:this.bear.adminId,logCustomer:val.withDrawId})
                }).catch(() => {
                    //          
                });
            },
            chooseData(val){
                this.chooseList = val;
            },
            watchSeach(e) {
                
            },
            // 查询条件-开始时间结束时装换
            timeChange(val){
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
                this._ajax('adminOrder/getWithDraw', this.pageType, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader
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
