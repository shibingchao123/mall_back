<template>
    <transition name="el-fade-in">
        <div>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>编号：</span>
                                <el-input v-model="pageType.commodityCode" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>商品分类：</span>
                                <el-select v-model="pageType.groupId" placeholder="请选择" size="mini" clearable class="inputW">
                                    <el-option
                                        v-for="item in orderNumList"
                                        :key="item.groupId"
                                        :label="item.group_name"
                                        :value="item.groupId">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>名称：</span>
                                <el-input v-model="pageType.commodityName" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
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
            <div>
                <div class="main">
                    <div :style="{'width': '100%', 'height': (screenHeight - 270) + 'px'}" class="table-box">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="commodity_code"
                                align="center"
                                label="商品编号">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="商品图片">
                                <template slot-scope="scope">
                                    <span>
                                        <img class="list-img-shop" :src="aliurl + scope.row.commodity_img">
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="commodity_name"
                                align="center"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                prop="real_price"
                                align="center"
                                label="价格">
                            </el-table-column>
                            <el-table-column
                                prop="original_price"
                                align="center"
                                label="成品价">
                                <template slot-scope="scope">
                                    <!-- @click="GoOnline(scope.row, 4)" -->
                                    <span>价格：{{scope.row.cost_price}}元</span>
                                    <el-button type="text" size="small" @click="siteViewOpen(scope.row)">设置</el-button>
                                    <el-button type="text" size="small" @click="looksiteViewOpen(scope.row)">成本记录</el-button>
                                </template>
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
                <!-- <div style="height: 50px;width: 1px;"></div> -->
                <div class="dialog">
                    <!--设置-->
                    <div>
                        <el-dialog
                            title="设置成本价"
                            :visible.sync="changeSiteView"
                            width="400px"
                            :before-close="siteViewClose"  center>
                            <div v-if="changeSiteView">
                                <span>成本价：</span>
                                <el-input v-model="oldSite" placeholder="请输入内容" clearable size="small"
                                          class="inputLong"></el-input>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="changeSiteView = false">取 消</el-button>
                                <el-button class="blue-btn" type="primary" @click="upChengBen(oldSite)">确 定</el-button>
                            </span>
                        </el-dialog>
                        <el-dialog
                            title="成本记录列表"
                            :visible.sync="lookSiteView"
                            width="400px" center>
                            <div v-if="lookSiteView">
                                <div v-for="item in lookCoseHistory">
                                    <div class="clearfix">
                                        <div class="f-l">{{item.time}}</div>
                                        <div class="f-r">商品成本价： {{item.cost_price}}元</div>
                                    </div>
                                </div>
                                <div v-if="lookCoseHistory.length == 0" style="text-align: center;">
                                    暂无数据。
                                </div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="lookSiteView = false">关闭</el-button>
                                <!-- <el-button class="blue-btn" type="primary" @click="lookSiteView = false">确 定</el-button> -->
                            </span>
                        </el-dialog>
                    </div>
                </div>
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
                bear: JSON.parse(sessionStorage.getItem("bear")),
                pageStep: 1,
                changeSiteView: false,
                lookSiteView: false,
                oldSite: '',
                //面包xue
                nameB: '订单管理',
                // 表格数据列表
                tableData: [{name:1,age:2}],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 15,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                    timeDay: 1,
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
                lookCoseHistory: [],
                orderNumList: [],
            }
        },
        methods: {
            looksiteViewOpen(data){
                this._ajax('adminOrder/getCommodityCostPriceRecord', {
                    commodityId: data.commodityId,
                }, msg => {
                    this.lookCoseHistory = msg;
                    console.log(msg);
                    this.lookSiteView = true;
                })
            },
            upChengBen(newnum){
                console.log(newnum);
                if (newnum) {
                    this._ajax('adminOrder/updateCommodityCostPrice', {
                        commodityId: this.onlyInfo.commodityId,
                        costPrice: newnum,
                    }, msg => {
                        this.$message({
                            message: '设置成功！',
                            type: 'success'
                        });
                        this.siteViewClose();
                        this.requireData(1);
                    },{logAdmin:this.bear.adminId,logCustomer:this.onlyInfo.commodityId})
                }else{
                    this.$message({
                        message: '请设置金额',
                        type: 'error'
                    });
                }
                
            },
            siteViewOpen(val){
                this.onlyInfo = val;
                this.changeSiteView = true;
            },
            siteViewClose(){
                this.onlyInfo = {};
                this.changeSiteView = false;
            },
            chooseData(val){
                console.log(val);
            },
            watchSeach(e) {
                
            },
            getFenZu(){
                this._ajax('admin/getCommodityGroup', {}, msg => {
                    this.orderNumList = msg;
                })
            },
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 15;
                this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('admin/getCommodity', this.pageType, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            TableHeader,grey
        },
        mixins: [mixin],
        created() {
            this.requireData(1);
            this.getFenZu();
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
