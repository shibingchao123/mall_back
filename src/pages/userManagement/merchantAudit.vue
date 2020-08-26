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
                                <span>邀请人ID：</span>
                                <el-input v-model="topData.inviterCode" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>

                        </div>
                        <div class="pageBox">
                            <div>
                                <span>联系方式：</span>
                                <el-input v-model="topData.tellPhone" placeholder="请输入内容" size="mini" clearable
                                          class="inputW"></el-input>
                            </div>

                        </div>
                        <div class="pageBox">
                            <div>
                                <span>申请状态：</span>
                                <el-select size="mini" v-model="topData.genre" placeholder="请选择" clearable>
                                    <el-option
                                        v-for="item in topSelect"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
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
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="w10 flex-end m-b-10"></div>
            <div class="tableT clearfix">
                <div class="f-r m-r-10">
                    <el-button class="blue-btn" size="small" type="primary" @click="allGoon()">全部通过
                    </el-button>
                    <el-button class="red-btn" size="small" type="primary" @click="allGooff()">全部拒绝
                    </el-button>
                </div>
            </div>
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
                    <el-table-column
                        prop="tell_phone"
                        label="联系方式"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="真实姓名">
                    </el-table-column>
                    <el-table-column
                        prop="inviter_code"
                        align="center"
                        label="邀请人ID">
                    </el-table-column>
                    <el-table-column
                        prop="region"
                        align="center"
                        label="地区">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="详细地址">
                        <template slot-scope="scope">
                            <!-- {{scope.row.region}} -->
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address_detail"
                        align="center"
                        label="小区名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.genre|filtersSt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作"
                        min-width="120">
                        <template slot-scope="scope">
                            <div v-if="scope.row.genre==0||scope.row.genre==1">
                                <el-button class="blue-btn" size="small" type="primary" @click="GoOn(scope.row)">通过
                                </el-button>
                                <el-button class="red-btn" size="small" type="primary" @click="GoOff(scope.row)">拒绝
                                </el-button>
                            </div>
                            <div v-if="scope.row.genre==3 ||scope.row.genre== 2||scope.row.genre==4">
                                <el-button type="text" size="small" @click="GoOnline(scope.row)">重新审核</el-button>
                            </div>
                        </template>
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
        </div>
    </transition>
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'

    export default {
        name: "merchantAudit",
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                //面包xue
                nameB: '商户审核',
                // 表格数据列表
                tableData: [],
                tableTotal: 0,
                topSelect: [
                    {value: '1', label: '待审核'},
                    {value: '2', label: '已通过'},
                    {value: '3', label: '已拒绝'},
                    {value: '4', label: '审核通过但禁用'},
                ],
                topData: {
                    merchant: 1,
                    page: 1,
                    pageSize: 15,
                },
                //选择数据
                selectId: ''
            }
        },
        filters: {
            filtersSt: function (arg) {
                if (arg == 0) {
                    return "用户"
                } else if (arg == 1) {
                    return "申请站长"
                } else if (arg == 2) {
                    return "通过"
                } else if (arg == 3) {
                    return "拒绝"
                } else if (arg == 4) {
                    return "通过"
                }
            },
        },
        methods: {
            //通过操作
            GoOn(val) {
                this.$confirm('是否进行通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let datas = {
                        userId: val.userId,
                        genre: 2
                    }
                    this.goOnfun(datas)
                })
            },
            allGoon() {
                if (this.selectId == '') {
                    this.$message({
                        type: 'info',
                        message: '请先选择数据'
                    })
                    return false;
                }
                this.$confirm('是否全部通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let datas = {
                        userId: this.selectId,
                        genre: 2
                    }
                    this.goOnfun(datas)
                })
            },
            goOnfun(datas) {
                this._ajax('admin/updateMerchantPass', datas, msg => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.selectId = '';
                    this.requireData(this.topData.page);
                },{logAdmin:this.bear.adminId,logCustomer:datas.userId})
            },
            //拒绝商户
            GoOff(val) {
                this.$confirm('是否进行拒绝', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let datas = {
                        userId: val.userId,
                        genre: 3
                    }
                    this.goOfffun(datas);
                })
            },
            allGooff() {
                if (this.selectId == '') {
                    this.$message({
                        type: 'info',
                        message: '请先选择数据'
                    })
                    return false;
                }
                this.$confirm('是否全部拒绝', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    let datas = {
                        userId: this.selectId,
                        genre: 3
                    }
                    this.goOfffun(datas)
                })
            },
            goOfffun(datas) {
                this._ajax('admin/updateMerchantRefuse', datas, msg => {
                    this.$message({
                        type: 'success',
                        message: '拒绝成功'
                    })
                    this.requireData(this.topData.page);
                    this.selectId = '';
                },{logAdmin:this.bear.adminId,logCustomer:datas.userId})
            },
            //重新审核
            GoOnline(val) {
                this.$confirm('是否重新进行审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._ajax('admin/updateMerchantReset', {
                        userId: val.userId,
                        genre: 1
                    }, msg => {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                        this.requireData(this.topData.page);
                    },{logAdmin:this.bear.adminId,logCustomer:val.userId})
                })
            },
            /*表格选中*/
            chooseData(val) {
                console.log(val);
                this.selectId = '';
                for (let i = 0; i < val.length; i++) {
                    this.selectId += val[i].userId + ',';
                }
                console.log(this.selectId);
            },
            /*重置*/
            reSetting() {
                // this.topData.inviterCode = '';
                // this.topData.tellPhone = '';
                // this.topData.genre = '';
                this.topData = {
                    merchant: 1,
                    page: 1,
                    pageSize: 15,
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
            TableHeader,
        },
        mixins: [mixin],
        created() {
            this.requireData(1);
        },
    }
</script>

<style scoped>


</style>
