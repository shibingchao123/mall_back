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
                                <span>用户　ID：</span>
                                <el-input v-model="topData.userCode" placeholder="请输入内容" size="mini" clearable
                                      class="inputW"></el-input>
                            </div>
                            <div>
                                <span>联系方式：</span>
                                <el-input v-model="topData.phone" placeholder="请输入内容" size="mini" clearable
                                      class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">

                        </div>
                        <div class="pageBox">
                            <div>
                                <span>日期选择：</span>
                                <el-date-picker
                                    size="mini"
                                    v-model="dataTime"
                                    @change='changeData'
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>　邀请码：</span>
                                <el-input v-model="topData.inventoryCode" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>
                            <!-- <div style="height: 30px;"></div> -->
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
                                <el-button class="m-t-10" type="primary" size="mini" plain
                                           @click="exportFuncNew('dayin','用户列表')">导出订单
                                </el-button>
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
                    height="100%"
                    border
                    style="width: 100%"
                    @selection-change="chooseData">
                    <el-table-column
                        type="selection"
                        width="38">
                    </el-table-column>
                    <!--<el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80">
                    </el-table-column>-->
                    <el-table-column
                        prop="user_code"
                        label="用户ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="联系方式"
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
                        prop="nick_name"
                        align="center"
                        label="昵称">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="订单数">
                        <template slot-scope="scope">
                            <span>{{scope.row.order_num}}</span>
                            <span class="vertical">|</span>
                            <el-button type="text" size="small" @click="lookOrder(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="消费总额">
                        <template slot-scope="scope">
                            <span>￥{{scope.row.pay_total}}</span>
                            <span class="vertical">|</span>
                            <el-button type="text" size="small" @click="lookOrder(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="用户积分">
                        <template slot-scope="scope">
                            <span>{{scope.row.integral_surplus}}</span>
                            <span class="vertical">|</span>
                            <el-button type="text" size="small" @click="lookIntegral(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inventory_code"
                        align="center"
                        label="邀请码">
                        <template slot-scope="scope">
                            <span>{{scope.row.inventory_code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" v-if="scope.row.status==1" @click="GoOnline(scope.row)">
                                禁用
                            </el-button>
                            <el-button type="text" size="small" v-if="scope.row.status==2" @click="GoOnline(scope.row)">
                                启用
                            </el-button>
                            <el-button type="text" size="small" @click="lookMsg(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <!-- 表格最后写 -->
                    <el-table
                    :data="chooseList"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="user_code"
                        label="用户ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="联系方式"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="120"
                        label="头像">
                        <template slot-scope="scope">
                            <div style="display:inline">
                                <img class="img-100" :src="aliurl +scope.row.photo" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="nick_name"
                        align="center"
                        label="昵称">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="订单数">
                        <template slot-scope="scope">
                            <span>{{scope.row.order_num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="消费总额">
                        <template slot-scope="scope">
                            <span>￥{{scope.row.pay_total}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="用户积分">
                        <template slot-scope="scope">
                            <span>{{scope.row.integral_surplus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inventory_code"
                        align="center"
                        label="邀请码">
                    </el-table-column>
                </el-table>
                </div>
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
                <!-- title="用户详情" -->
                <el-dialog
                    :visible.sync="MsgShow"
                    width="60%"
                    :before-close="MsgShowClose">
                    <div v-if="MsgShow">
                        <user-msg :onlyInfo="onlyInfo" @close="MsgShowClose"></user-msg>
                    </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    // 用户详情
    import userMsg from './userMsg'

    // 新的导出excel

    // import { export2Excel } from '@/assets/javascript/export2Excel'

    export default {
        name: "list",
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '用户管理',
                // 表格数据列表
                tableData: [
                    {name: 1, age: 2},
                    {name: 2, age: 3},
                ],
                chooseList: [],
                tableTotal: 0,
                //顶部搜索时间段
                dataTime: [],
                topData: {
                    page: 1,
                    pageSize: 15,
                    userCode: '',
                    phone: '',
                    beginTime: '',
                    endTime: '',
                },
                MsgShow: false,  //用户详情
                onlyInfo: {},
            }
        },
        methods: {
            exportFuncNew(){
                let data = {};
                data = this.topData;
                data.pageSize = 9999;
                this._ajax('admin/getUserList', data, msg => {
                    this.chooseList = msg.pageInfo.list;
                    this.chooseList.forEach((item,index)=>{
                        item.user_code = "'"+item.user_code;
                        item.phone = "'"+item.phone;
                    })
                    let _that = this;
                    setTimeout(function(){
                        _that.exportFunc('dayin','用户列表');
                        _that.loading = false;
                        _that.requireData(_that.topData.page);
                    },200)
                })
            },
            //获取用户信息
            getUser() {
                this.requireData(1);
            },
            GoOnline(val) {
                console.log(val)
                if (val.status == 1) {/*禁用*/
                    this.$confirm('是否进行禁用', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(()=>{
                        this._ajax('admin/updateUserStatusOff', {
                            userId: val.userId,
                            status: 2
                        }, msg => {
                            this.$message({
                                type: 'success',
                                message: '禁用成功'
                            })
                            this.requireData(this.topData.page);
                        },{logAdmin:this.bear.adminId,logCustomer:val.userId})
                    })
                } else if (val.status == 2) {/*启用*/
                    this.$confirm('是否进行启用操作','提示',{
                        confirmButtonText:'确认',
                        cancelButtonText:'取消'
                    }).then(()=>{
                        this._ajax('admin/updateUserStatusOn', {
                            userId: val.userId,
                            status: 1
                        }, msg => {
                            this.$message({
                                type: 'success',
                                message: '启用成功'
                            })
                            this.requireData(this.topData.page);
                        },{logAdmin:this.bear.adminId,logCustomer:val.userId})
                    })
                }
            },
            // 查看用户详情
            lookMsg(data) {
                this.onlyInfo = data;
                this.MsgShow = true;
            },
            MsgShowClose() {
                this.onlyInfo = {};
                this.MsgShow = false;
            },
            //用户订单查看
            lookOrder(val) {
                console.log('跳转订单管理',val);
                this.$router.push({name:'OrderList',query:{userUid: val.userId}});
            },
            //用户积分查看
            lookIntegral(val) {
                console.log('跳转积分管理',val);
                this.$router.push({name:'integralData',query:{userUid: val.userId}});
            },
            /*表格选中*/
            chooseData(val) {
                console.log(val);
                this.chooseList = val;
            },
            /*重置*/
            reSetting() {
                // this.topData.userCode = '';
                // this.topData.inventoryCode = '';
                // this.topData.phone = '';
                // this.topData.beginTime = '';
                // this.topData.endTime = '';
                this.dataTime = [];
                this.topData = {
                    page: 1,
                    pageSize: 15,
                    userCode: '',
                    phone: '',
                    beginTime: '',
                    endTime: '',
                };
                this.requireData(1)
            },
            //顶部查询时间
            changeData(val) {
                if (val == "" || val == null) {
                    this.topData.beginTime = "";
                    this.topData.endTime = "";
                } else {
                    this.topData.beginTime = val[0] + ' 00:00:00';
                    this.topData.endTime = val[1] + ' 23:59:60';
                }
            },
            // 请求列表数据
            requireData(p) {
                this.topData.page = p;
                this._ajax('admin/getUserList', this.topData, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    console.log(msg)
                })
            },
        },
        components: {
            TableHeader, userMsg,
        },
        mixins: [mixin],
        created() {
            this.getUser();
        },
    }
</script>

<style scoped>


</style>
