<template>
    <transition name="el-fade-in">
        <div>
            <div class="divrouter">
                <!--<el-button size="mini" class="addrecord" type="primary" :default-active="onRoutes" >新增记录</el-button>-->
                <router-link to="/home/serviceCenter/addServiceList" exact class="routerlook">新增记录</router-link>
            </div>
            <!--联系方式等-->
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>联系方式：</span>
                                <el-input v-model="pageType.mobile" placeholder="请输入内容" size="mini" clearable class="inputW"></el-input>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>修改时间：</span>
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
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets">重置</el-button>
                            </div>
                            <div>
                                <el-button class="m-t-10" type="primary" size="mini" plain @click="exportFuncNew('dayin','客服记录列表')">导出订单</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--表格展示区-->
            <div :style="{'width': '100%', 'height': (screenHeight - 270) + 'px'}" class="table-box">
                <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%"
                    @selection-change="chooseData">
                    <!--<el-table-column-->
                        <!--label="选项"-->
                        <!--width="68"-->
                        <!--align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-checkbox v-model="scope.row.checked"></el-checkbox>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        type="selection"
                        width="38">
                    </el-table-column>
                    <el-table-column
                        prop="admin_no"
                        label="工号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用户昵称"
                        align="center">
                        <template slot-scope="scope">
                        {{scope.row.nick_name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="联系方式"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="客服内容"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="update_time"
                        label="修改时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="doing"
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="GoOnline(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="display: none;" id="dayin">
                <el-table
                    :data="chooseList"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="admin_no"
                        label="工号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用户昵称"
                        align="center">
                        <template slot-scope="scope">
                        {{scope.row.nick_name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="联系方式"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="comment"
                        label="客服内容"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="update_time"
                        label="修改时间"
                        align="center">
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <el-pagination
                @current-change="requireData"
                :current-page.sync="pageType.page"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination>
            <!--查看弹窗-->
            <el-dialog
                :visible.sync="lookDialogVisible"
                width="70%"
                center>
                <look-record :table="table" @close="lookDialogclose"></look-record>
                <!--<span slot="footer" class="dialog-footer">-->
                        <!--<el-button @click="lookDialogVisible = false">取 消</el-button>-->
                        <!--<el-button type="primary" @click="lookDialogVisible = false">确 定</el-button>-->
                <!--</span>-->
            </el-dialog>
            <!--编辑弹窗-->
            <el-dialog
            title="修改客服信息"
            :visible.sync="updataVisible"
            width="70%"
            center>
            <updataService :table="table" @close="updataclose"></updataService>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
    import mixin from '@/mixins/mixins'
    //客服记录详情
    import lookRecord from '@/pages/serviceCenter/lookRecord'
    import updataService from '@/pages/serviceCenter/updataService'
    export default {
        data() {
            return {
                input: '',
                pageType:{
                    page:1,
                    pageSize:10,
                    sortOrder: 1,
                },
                tableData:[],
                checked: true,
                lookDialogVisible: false,
                updataVisible:false,
                table:[],
                topData: {
                    page: 1,
                    pageSize: 15,
                    sortOrder: 1,
                },
                tableTotal:0,
                chooseList: [],            
            }
        },
        methods: {
            // 客服记录列表
            exportFuncNew(){
                this.chooseList.forEach((item,index)=>{
                    item.mobile = "'"+item.mobile;
                })
                let _that = this;
                setTimeout(function(){
                    _that.exportFunc('dayin','客服记录列表');
                    _that.loading = false;
                    _that.requireData(_that.pageType.page);
                },200)
            },
            look(val){
                this.lookDialogVisible = true;
                this.table = val;
                console.log(this.table)
            },
            GoOnline(val){
                this.updataVisible=true;
                this.table = val;
                this.requireData(this.pageType.page);
                console.log()
            },
            // 请求列表数据
            requireData(p) {
                this.pageType.page = p;
                this._ajax('merchant/selectServiceRecord', this.pageType, msg => {
                    console.log(msg),
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
            updataclose(){
                this.updataVisible = false;
                this.requireData(this.pageType.page);
            },
            lookDialogclose(){
                this.lookDialogVisible = false;
                this.requireData(this.pageType.page);
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
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 10;
                this.requireData(1);
            },
            chooseData(val){ 
                console.log(val);
                this.chooseList = val;
            },
        },
        mixins:[mixin],
        components: {
            lookRecord,updataService
        },
        created() {
            this.curr
            this.requireData(1);
        },
        computed: {
            onRoutes() {
                this.$route.path.replace('/home/serviceCenter/addServiceList')
                }
            }
    }
</script>

<style>
    .routerlook{
        padding: 8px;
        background:dodgerblue;
        color:#fff;
        text-decoration: none;
        border-radius: 4px;
    }
</style>
