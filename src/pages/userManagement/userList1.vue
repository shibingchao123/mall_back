<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs','search']"
                :selectTit="{titI:'手机号'}"
                :breadcrumb="{nameA: '用户管理', nameB: nameB}">
            </TableHeader>
            <el-button class="m-t-10" type="primary" size="mini" plain v-if="pageType.status==2" @click="exportFunc('dayin','用户列表')">导出</el-button>
            <div class="w10 flex-end m-b-10"></div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 130) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="account_number"
                        label="账号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        align="center"
                        label="地区">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="companyName"
                        align="center"
                        label="公司名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="详细信息">
                        <template slot-scope="scope">
                            <!--<el-button type="text" size="small" @click="lookDetail(scope.row)">查看</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerName"
                        align="center"
                        label="代理商"
                        v-if="pageType.status==2">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="已发布项目" v-if="pageType.status==2">
                        <template slot-scope="scope">
                            <!--<el-button type="text" size="small" @click="yifabu(scope.row,1)">查看</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="未发布项目" v-if="pageType.status==2">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="yifabu(scope.row,0)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                                <!--<el-button type="text" size="small" @click="GoOnline(scope.row, 4)">加入黑名单</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div style="display: none;" id="dayin">
                    <el-table
                        :data="tableData"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="account_number"
                            label="账号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="city"
                            align="center"
                            label="地区">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            align="center"
                            label="公司名称">
                        </el-table-column>
                        <el-table-column
                            prop="dealerName"
                            align="center"
                            label="代理商"
                            v-if="pageType.status==2">
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
                //面包xue
                nameB: '用户列表',
                // 表格数据列表
                tableData: [],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 15,
                    status: '',     //状态:1未通过2通过3驳回4拉黑
                    mobile: '',
                    userId: '',
                },
            }
        },
        methods: {
            watchSeach(e) {
                this.pageType.mobile = e.seachValue;
                this.requireData(1);
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('user/getUser', this.pageType, msg => {
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
    .c-g {
        color: green;
    }

    .c-r {
        color: red;
    }
</style>
