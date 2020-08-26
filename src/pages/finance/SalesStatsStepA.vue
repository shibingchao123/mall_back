<template>
    <transition name="el-fade-in">
        <div>
            <div>
                <grey>
                    <template v-slot:title>
                        <div>
                            <div class="clearfix">
                                <div class="f-l" v-if="pageStep == 1">平台总营业额查询</div>
                                <div class="f-l" v-if="pageStep == 2">平台月营业额查询</div>
                                <div class="f-l" v-if="pageStep == 3">平台日营业额查询</div>
                                <!-- ？ -->
                                <div class="f-r m-r-20" v-if="pageStep == 1&&timeDay == 3">
                                    <el-date-picker
                                        v-model="pageType.createTime"
                                        type="year"
                                        size="mini"
                                        value-format="yyyy"
                                        @change="requireData(1)"
                                        placeholder="选择年">
                                    </el-date-picker>
                                </div>
                                <div class="f-r m-r-20" v-if="pageStep == 2">
                                    <el-date-picker
                                        v-model="pageType.createTime"
                                        type="month"
                                        size="mini"
                                        value-format="yyyy-MM"
                                        @change="requireData(1)"
                                        placeholder="选择月">
                                    </el-date-picker>
                                </div>
                                <div class="f-r m-r-20" v-if="pageStep == 3">
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
                                <div class="f-r m-r-20" v-if="pageStep == 1">
                                    <!-- fill="#009999" -->
                                    <el-radio-group v-model="timeDay" @change="changeTimeDay" size="mini">
                                        <el-radio-button label="1">全部</el-radio-button>
                                        <!-- <el-radio-button label="2">按月统计</el-radio-button> -->
                                        <el-radio-button label="3">按年统计</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="f-r m-r-20" v-if="pageStep == 2">
                                    <el-radio-group v-model="timeDay" @change="changeTimeDay2" size="mini">
                                        <el-radio-button label="0">全部</el-radio-button>

                                        <el-radio-button label="1">过去12个月</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="f-r m-r-20" v-if="pageStep == 3">
                                    <el-radio-group v-model="timeDay" @change="changeTimeDay3" size="mini">
                                        <el-radio-button label="1">过去7天</el-radio-button>
                                        <el-radio-button label="2">过去30天</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="f-r m-r-20">
                                    <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFunc('dayin','统计列表')">导出统计</el-button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:body>
                        <div class="main">
                            <div :style="{'width': '100%', 'height': (screenHeight - 240) + 'px'}" class="table-box">
                                <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        v-if="pageStep == 1&&timeDay == 3"
                                        prop="create_time1"
                                        label="年份"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        v-if="pageStep == 2"
                                        prop="create_time1"
                                        label="月份"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        v-if="pageStep == 3"
                                        prop="create_time1"
                                        label="日期"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="allNum"
                                        align="center"
                                        label="总订单数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="orderValidNum"
                                        align="center"
                                        label="有效订单数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="orderInvalidNum"
                                        align="center"
                                        label="无效订单数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="orderTurnover"
                                        align="center"
                                        label="总营业额">
                                    </el-table-column>
                                    <el-table-column
                                        prop="orderRefund"
                                        align="center"
                                        label="已退款金额">
                                    </el-table-column>
                                    <el-table-column
                                        prop="profit"
                                        align="center"
                                        label="平台利润">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <el-pagination
                                @current-change="requireData"
                                :current-page.sync="pageType.page"
                                :page-size="15"
                                layout="prev, pager, next, jumper"
                                :total="tableTotal">
                            </el-pagination>
                        </div>
                        <div style="display: none;" id="dayin">
                            <el-table
                                :data="chooseList"
                                border
                                style="width: 100%">
                                <el-table-column
                                    v-if="pageStep == 1&&timeDay == 3"
                                    prop="create_time1"
                                    label="年份"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    v-if="pageStep == 2"
                                    prop="create_time1"
                                    label="月份"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    v-if="pageStep == 3"
                                    prop="create_time1"
                                    label="日期"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="allNum"
                                    align="center"
                                    label="总订单数">
                                </el-table-column>
                                <el-table-column
                                    prop="orderValidNum"
                                    align="center"
                                    label="有效订单数">
                                </el-table-column>
                                <el-table-column
                                    prop="orderInvalidNum"
                                    align="center"
                                    label="无效订单数">
                                </el-table-column>
                                <el-table-column
                                    prop="orderTurnover"
                                    align="center"
                                    label="总营业额">
                                </el-table-column>
                                <el-table-column
                                    prop="orderRefund"
                                    align="center"
                                    label="已退款金额">
                                </el-table-column>
                                <el-table-column
                                    prop="profit"
                                    align="center"
                                    label="平台利润">
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </grey>
            </div>
        </div>
    </transition> 
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    // 
    import grey from '@/components/order/greyTable';

    export default {
        name: "list",
        data() {
            return {
                //面包xue
                nameB: '订单管理',
                // 表格数据列表
                tableData: [{name:1,age:2}],
                chooseList: [],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 7,
                    createTime: '',
                },
                timeDay: 0,
            }
        },
        methods: {
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
                this.pageType.twelveMonth = '';
                this.requireData(1);
            },
            changeTimeDay(){
                this.pageType.createTime = '';
                console.log(this.timeDay);
                if (this.timeDay == 2) {
                    this.$emit('changePageStep',2);
                }else if (this.timeDay == 3) {
                    this.pageType.year = 1;
                    this.requireData(1);
                }else{
                    this.pageType.year = '';
                    this.requireData(1);
                }
            },
            changeTimeDay2(){
                this.pageType.createTime = '';
                console.log(this.timeDay);
                if (this.timeDay == 0) {
                    // this.$emit('changePageStep',1);
                    this.pageType.twelveMonth = '';
                    this.requireData(1);
                }else{
                    this.pageType.twelveMonth = 1;
                    this.requireData(1);
                }
            },
            // 过去几天
            changeTimeDay3(){
                this.pageType.createTime = '';
                console.log(this.timeDay);
                if (this.timeDay == 1) {
                    this.pageType.pageSize = 7;
                }else if (this.timeDay == 2) {
                    this.pageType.pageSize = 30;
                }
                this.requireData(1);
            },
            chooseData(val){
                console.log(val);
                this.chooseList = val;
            },
            watchSeach(e) {
                this.pageType.mobile = e.seachValue;
                // this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('adminOrder/getSalesStatistics', this.pageType, msg => {
                    console.log(msg.pageInfo.list);
                    this.tableData = msg.pageInfo.list;
                    this.chooseList = this.tableData;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader,grey
        },
        mixins: [mixin],
        created() {
            console.log( this.pageStep,'开始的地方');
            if (this.pageStep == 1) {

            }else if (this.pageStep == 2){
                this.pageType.month = 1;
                this.pageType.pageSize = 12;
            }else if (this.pageStep == 3){
                this.pageType.day = 1;
                this.pageType.pageSize = 7;
            }
            this.requireData(1);
        },
        props:['pageStep'],
        watch:{
            pageStep(newval,oldval){
                this.pageStep = newval;
                this.timeDay = 1;

                this.pageType = {};
                this.pageType.pageSize = 7;
                this.pageType.createTime = '';
                console.log(this.pageType.createTime)
                if (this.pageStep == 1) {

                }else if (this.pageStep == 2){
                    this.pageType.month = 1;
                    this.pageType.pageSize = 12;
                }else if (this.pageStep == 3){
                    this.pageType.day = 1;
                    this.pageType.pageSize = 7;
                }
                this.requireData(1);
            },
        }
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
