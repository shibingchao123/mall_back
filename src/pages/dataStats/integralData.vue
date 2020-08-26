<template>
    <div class="orderMsg">
        <div class="boxOne">
            <grey>
                <template v-slot:title>
                    <div>
                        <div class="clearfix">
                            <div class="f-l">积分统计</div>
                            <div class="f-r m-r-20">
                                <el-date-picker
                                    v-model="totalType.times"
                                    size="mini"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    @change="timeChangeT()"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <div class="f-r m-r-20">
                                <el-button size="small" class="greenBtn" type="primary" @click="totalType.times = [],totalType = {},getList()">全部</el-button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="main clearfix">
                        <div class="f-l main-l">
                            <div class="box">
                                <div class="title">已领取总积分</div>
                                <div class="content">{{DataTotal.receive}}</div>
                            </div>
                            <div class="box">
                                <div class="title">已抵现总积分</div>
                                <div class="content">{{DataTotal.arrive}}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </grey>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        
                        <div class="pageBox">
                            <!-- <div><span>商品名称：</span>
                                <el-input v-model="pageType.headId" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div> -->
                            <div><span>日期选择：</span>
                                <el-date-picker
                                    size="mini"
                                    v-model="pageType.times"
                                    type="daterange"
                                    @change="timeChange()"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>用户手机号：</span>
                                <el-input v-model="pageType.phone" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets">重置</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFuncNew('dayin','积分订单统计')">导出订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div :style="{'width': '100%', 'height': (screenHeight - 455) + 'px'}" class="table-box">
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
                        prop="integral_type"
                        label="行为"
                        sortable
                        align="center">
                        <template slot-scope="scope">
                            <span>{{{'1':'订单获得积分','2':'订单抵现','3':'签到','4':'邀请','5':'注册',}[scope.row.integral_type]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="order_uuid"
                        label="订单编号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="nick_name"
                        align="center"
                        sortable
                        label="用户昵称">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        align="center"
                        label="用户手机号">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        sortable
                        label="提交时间">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_nameS"
                        align="center"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="real_money"
                        align="center"
                        sortable
                        label="实付款">
                    </el-table-column>
                    <el-table-column
                        prop="integral_num"
                        align="center"
                        sortable
                        label="积分变化">
                        <template slot-scope="scope">
                            <div v-if="scope.row.integral_type == 2">- {{scope.row.integral_num}}</div>
                            <div v-else>+ {{scope.row.integral_num}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                @current-change="requireData"
                :current-page.sync="pageType.page"
                :page-size="pageType.pageSize"
                layout="prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination>
            <div style="display: none;" id="dayin">
                <!-- 表格最后写chooseList -->
                <el-table
                    :data="chooseList"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="integral_type"
                        label="行为"
                        align="center"
                        width="80">
                        <template slot-scope="scope">
                            <span>{{{'1':'订单获得积分','2':'订单抵现','3':'签到','4':'邀请','5':'注册',}[scope.row.integral_type]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="order_uuid"
                        label="订单编号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="nick_name"
                        align="center"
                        label="用户昵称">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        align="center"
                        label="用户手机号">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="提交时间">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_name"
                        align="center"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="real_money"
                        align="center"
                        label="实付款">
                    </el-table-column>
                    <el-table-column
                        prop="integral_num"
                        align="center"
                        label="积分变化">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';

    export default {
        name: 'HelloWorld',
        data() {
            return {
                tableTotal: 0,
                pageType:{
                    page: 1,
                    pageSize: 8,
                    timeDay: '1',
                },
                totalType:{

                },
                tableData: [{},{}],
                chooseList: [],
                DataTotal: {},
            }
        },
        created () {
            if (this.$route.query.userUid) {
                console.log(this.$route.query.userUid,'我是跳过来的');
                this.pageType.userId = this.$route.query.userUid;
            }
            this.getList();
            this.requireData(1);
        },
        methods: {
            // 积分订单统计
            exportFuncNew(){
                this.chooseList.forEach((item,index)=>{
                    item.phone = "'"+item.phone;
                })
                let _that = this;
                setTimeout(function(){
                    _that.exportFunc('dayin','积分订单统计');
                    _that.loading = false;
                    _that.requireData(_that.pageType.page);
                },200)
            },
            chooseData(val){
                console.log(val);
                this.chooseList = val;
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
            // 查询条件-开始时间结束时装换
            timeChangeT(val){
                console.log(this.totalType.times);
                if (this.totalType.times == null || this.totalType.times == ''|| this.totalType.times == undefined) {
                    this.totalType.beginTime = '';
                    this.totalType.endTime = '';
                }else{
                    this.totalType.beginTime = this.totalType.times[0] + ' 00:00:00';
                    this.totalType.endTime = this.totalType.times[1] + ' 23:59:59';
                }
                this.getList();
            },
            resets(){
                this.pageType = {
                    page: 1,
                    pageSize: 8,
                    timeDay: '1',
                };
                if (this.$route.query.userUid) {
                    console.log(this.$route.query.userUid,'我是跳过来的');
                    this.pageType.userId = this.$route.query.userUid;
                }
                this.requireData(1);
            },
            requireData(p) {
                this.pageType.page = p;
                this._ajax('merchant/integralRecord', this.pageType, msg => {
                    console.log(msg)
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    this.tableData.forEach((item,index)=>{
                        if (item.commodity_name.length === 0) {
                            // console.log(item.commodity_name.length)
                        }else{
                            item.commodity_nameS = item.commodity_name.join();
                        }
                    })
                })
            },
            getList(){
                this._ajax('merchant/integralTotal', this.totalType, msg => {
                    this.DataTotal = msg;
                })
            },
        },
        components: {
            grey
        },
        mixins: [ mixin ],
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderMsg{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .main{
        padding: 20px 60px;
    }
    .main-l{
        border: 1px solid #aaa;
        border-right: 0;
        display: flex;
        justify-content: center;
        text-align: center;
        color: #000;
    }
    .main-l .box{
        border-right: 1px solid #aaa;
    }
    .main-l .box .title{
        font-weight: 700;
        background: #e5e5e5;
        padding: 10px 90px;
        border-bottom: 1px solid #aaa;
    }
    .main-l .box .content{
        padding: 10px 90px;
    }
</style>
