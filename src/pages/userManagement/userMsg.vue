<template>
    <div class="userMsg">
        <el-card class="box-card flex-start">
            <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>用户信息</div>
            </template>
            <template v-slot:body>
                <div class="w10 box padding-20 flex-start">
                    <div class="w25">用户ID：{{onlyInfo.user_code}}</div>
                    <div class="w25">联系方式：{{onlyInfo.phone}}</div>
                    <div class="w25">昵称：{{onlyInfo.nick_name}}</div>
                    <div class="w25">我的邀请码：{{onlyInfo.share_code}}</div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    统计信息
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-20">
                    <el-table
                        :data="table"
                        border
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            label="消费总额">
                            <template slot-scope="scope">
                                <span>￥{{scope.row.pay_total}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="order_num"
                            align="center"
                            label="订单总数">
                        </el-table-column>
                        <el-table-column
                            prop="integral_surplus"
                            align="center"
                            label="可用积分">
                        </el-table-column>
                        <el-table-column
                            prop="return_order"
                            align="center"
                            label="退货次数">
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </grey>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';

    export default {
        name: 'userMsg',
        data() {
            return {
                tableData: this.onlyInfo,
                table:[],
            }
        },
        created() {
            this.table.push(this.tableData)
        },
        methods: {
        },
        components: {
            grey
        },
        mixins: [mixin],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {
                    }
                }
            }
        },
    }
</script>

<style scoped>
    .userMsg {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .box1-title-btn {
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        float: right;
        cursor: pointer;
    }
</style>
