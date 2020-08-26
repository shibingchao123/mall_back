<template>
    <div class="orderMsg">
        <div class="boxOne">
            <grey>
                <template v-slot:title>
                    <div>
                        <div class="clearfix">
                            <div class="f-l">交易数据</div>
                            <div class="f-r m-r-20">
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
                            <div class="f-r m-r-20">
                                <el-radio-group v-model="pageType.occTime" size="mini" @change="changeOccTime(pageType.occTime)">
                                    <el-radio-button label="1">昨天</el-radio-button>
                                    <el-radio-button label="2">最近7天</el-radio-button>
                                    <el-radio-button label="3">最近30天</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="f-r m-r-20">
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFunc('dayin','交易数据')">导出数据</el-button>
                            </div>

                        </div>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="main clearfix">
                        <div class="f-l main-l">
                            <div class="box">
                                <div class="title">订单数</div>
                                <div class="content">{{tableData.orderNum}}</div>
                            </div>
                            <div class="box">
                                <div class="title">有效订单数</div>
                                <div class="content">{{tableData.effectiveOrder}}</div>
                            </div>
                            <div class="box">
                                <div class="title">总订单金额</div>
                                <div class="content" v-if="tableData.orderMoney">{{tableData.orderMoney}}元</div>
                                <div class="content" v-else>0元</div>
                            </div>
                            <div class="box">
                                <div class="title">退款金额</div>
                                <div class="content">{{tableData.orderReturnMoney}}元</div>
                            </div>
                        </div>
                        <div class="f-l main-r">
                            <div>付款转化率</div>
                            <div class="red-font" v-if="tableData.conversion">{{numFilter(tableData.conversion)}}%</div>
                            <div class="red-font" v-else>0%</div>
                        </div>
                    </div>
                </template>
            </grey>
        </div>
        <div style="display: none;" id="dayin">
            <!-- 表格最后写 -->
            <el-table
                :data="chooseList"
                height="100%"
                border
                style="width: 100%">
                <el-table-column
                    prop="orderNum"
                    label="订单数"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="effectiveOrder"
                    align="center"
                    label="有效订单数">
                </el-table-column>
                <el-table-column
                    prop="orderMoney"
                    align="center"
                    label="总订单金额">
                </el-table-column>
                <el-table-column
                    prop="orderReturnMoney"
                    align="center"
                    label="退款金额">
                </el-table-column>
                <el-table-column
                    prop="conversion"
                    align="center"
                    label="付款转化率">
                </el-table-column>
            </el-table>
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
                pageType:{
                    occTime: '1',
                },
                tableData:{},
                chooseList:[],
            }
        },
        created () {
            this.requireData(1);
        },
        methods: {
            // 保留两位小数
            numFilter (value) {
                // 截取当前数据到小数点后两位
                let realVal = Number(value).toFixed(2)
                // num.toFixed(2)获取的是字符串
                return Number(realVal)
            },
            changeOccTime(val){
                this.pageType = {
                    occTime: val,
                };
                this.requireData(1);
            },
            // 开始时间结束时装换
            timeChange(val){
                // console.log(this.pageType.times);
                if (this.pageType.times == null || this.pageType.times == ''|| this.pageType.times == undefined) {
                    this.pageType.beginTime = '';
                    this.pageType.endTime = '';

                    this.pageType.occTime = 1;
                }else{
                    this.pageType.endTime = this.pageType.times[1];
                    this.pageType.beginTime = this.pageType.times[0];

                    this.pageType.occTime = 4;
                }
                this.requireData(1);
            },

            requireData(p) {
                this.pageType.page = p;
                this._ajax('merchant/transactionData', this.pageType, msg => {
                    this.tableData = msg;
                    let a = this.numFilter(msg.conversion)
                    this.chooseList.push({
                        effectiveOrder: msg.effectiveOrder,
                        orderMoney: msg.orderMoney,
                        orderReturnMoney: msg.orderReturnMoney,
                        orderNum: msg.orderNum,
                        conversion: a,
                    })
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
    .main-r{
        font-weight: 700;
        text-align: center;
        margin-left: 80px;
    }
    .main-r .red-font{
        font-size: 50px;
        color: #f44;
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
        padding: 10px 40px;
        border-bottom: 1px solid #aaa;
    }
    .main-l .box .content{
        padding: 10px 40px;
    }
</style>
