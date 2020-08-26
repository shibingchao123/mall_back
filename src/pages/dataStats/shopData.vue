<template>
    <div class="orderMsg">
        <div class="boxOne">
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
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
                        </div>
                        <div class="pageBox">
                            <div><span>商品名称：</span>
                                <el-input @input="blurInput($event)" v-model="pageType.commodityName" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets">重置</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <grey>
                <template v-slot:title>
                    <div>
                        <div class="clearfix">
                            <div class="f-l">商品统计</div>
                            <div class="f-r m-r-20">
                                <!-- fill="#009999" -->
                                <el-radio-group v-model="pageType.occTime" size="mini" @change="changeOccTime(pageType.occTime,pageType.commodityName)">
                                    <el-radio-button label="1">昨天</el-radio-button>
                                    <el-radio-button label="2">最近7天</el-radio-button>
                                    <el-radio-button label="3">最近30天</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="f-r m-r-20">
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFunc('dayin','商品统计')">导出订单</el-button>
                            </div>
                            
                        </div>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="main">
                        <div :style="{'width': '100%', 'height': (screenHeight - 275) + 'px'}" class="table-box">
                            <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                    type="index"
                                    label="销售排名"
                                    align="center"
                                    width="80">
                                </el-table-column>
                                <el-table-column
                                    prop="commodityName"
                                    label="商品名称"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="saleNum"
                                    align="center"
                                    label="销售数量">
                                </el-table-column>
                                <el-table-column
                                    prop="numProportion"
                                    align="center"
                                    label="数量比例">
                                </el-table-column>
                                <el-table-column
                                    prop="saleMoney"
                                    align="center"
                                    label="销售金额">
                                </el-table-column>
                                <el-table-column
                                    prop="moneyProportion"
                                    align="center"
                                    label="金额比例">
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
                    <div class="main" style="display: none;" id="dayin">
                        <el-table
                            :data="chooseList"
                            height="100%"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="销售排名"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="commodityName"
                                label="商品名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="saleNum"
                                align="center"
                                label="销售数量">
                            </el-table-column>
                            <el-table-column
                                prop="numProportion"
                                align="center"
                                label="数量比例">
                            </el-table-column>
                            <el-table-column
                                prop="saleMoney"
                                align="center"
                                label="销售金额">
                            </el-table-column>
                            <el-table-column
                                prop="moneyProportion"
                                align="center"
                                label="金额比例">
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </grey>
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
                    pageSize: 15,
                    occTime: '1',
                    commodityName: '',
                },
                tableData: [],
                chooseList: [],
            }
        },
        created () {
            this.requireData(1);
        },
        methods: {
            blurInput(val){
                this.$forceUpdate();
                // this.pageType.commodityName = val;
            },
            // 查询条件-开始时间结束时装换
            timeChange(val){
                console.log(this.pageType.times);
                // this.$set(this.pageType.times);
                if (this.pageType.times == null || this.pageType.times == ''|| this.pageType.times == undefined) {
                    this.pageType.beginTime = '';
                    this.pageType.endTime = '';
                    this.pageType.occTime = '1';
                }else{
                    this.pageType.beginTime = this.pageType.times[0];
                    this.pageType.endTime = this.pageType.times[1];
                    this.pageType.occTime = '';
                }
            },
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 15;
                this.pageType.occTime = 1;
                this.requireData(1);
            },
            requireData(p) {
                this.pageType.page = p;
                this._ajax('merchant/commodityTotal', this.pageType, msg => {
                    this.tableData = msg;
                    this.chooseList = msg;
                    // this.tableTotal = msg.pageInfo.total;
                })
            },
            changeOccTime(val,val2){
                // this.pageType.beginTime = '';
                // this.pageType.endTime = '';
                // this.pageType.times = [];
                // 方法二
                this.pageType = {};
                this.pageType.pageSize = 15;
                this.pageType.commodityName = '';
                if (val) {
                    this.pageType.occTime = val;
                }
                // commodityName
                if (val2) {
                    // this.pageType.commodityName = val2;
                    this.$set(this.pageType,'commodityName',val2)
                }
                console.log(this.pageType)
                this.requireData(1)
            }
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
</style>
