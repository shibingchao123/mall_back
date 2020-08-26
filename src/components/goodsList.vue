<template>
    <transition name="el-fade-in">
            <div>
                <div class="banner2">
                    <el-card class="box-card">
                      <div class="pageHead">
                        <div class="pageBox">
                            <div>
                                <span>编号：</span>
                                <el-input  placeholder="请输入编号" size="mini" clearable class="inputW" style="width:150px" v-model="pageType.commodityCode"></el-input>
                            </div>
                            <div>
                                <span>名称：</span>
                                <el-input placeholder="请输入名称" size="mini" clearable class="inputW" style="width:150px" v-model="pageType.commodityName"></el-input>
                            </div>
                            <div v-if="isTiaozhuan">
                                <span>商品状态：</span>
                                <el-select clearable v-model="pageType.commodityStatus" placeholder="请选择" size="mini" style="width:110px" >
                                    <el-option
                                        v-for="item in goodsStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <span>商品状态：</span>
                                <el-select clearable v-model="pageType.status" placeholder="请选择" size="mini" style="width:110px" >
                                    <el-option
                                        v-for="item in goodsStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>商品分组：</span>
                                <el-select clearable v-model="pageType.groupId" placeholder="请选择" size="mini" style="width:120px" >
                                    <el-option
                                        v-for="item in goodsGroup"
                                        :key="item.groupId"
                                        :label="item.group_name"
                                        :value="item.groupId">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="pageBox1">
                            <div v-if="isTiaozhuan">
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireDataWai(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="reset()">重置</el-button>
                            </div>
                            <div v-else>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="reset()">重置</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="tableT clearfix">
                
            </div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 280) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_code"
                        label="商品编号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="commodity_img"
                        label="商品图片"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <img class="list-img-shop" :src="aliurl+scope.row.commodity_img"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="commodity_name"
                        label="商品名称"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="real_price"
                        align="center"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="group_name"
                        align="center"
                        label="商品分组">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="上架状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 1">
                                <span>已上架</span>
                            </div>
                            <div v-if="scope.row.status == 2">
                                <span>已下架</span>
                            </div>
                            <div v-if="scope.row.status == 3">
                                <span>待上架</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="isTiaozhuan == false"
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button @click="outline(scope.row.commodityId,)" type="text" size="small" v-if="scope.row.status == 1">下架</el-button>
                                <el-button @click="inline(scope.row.commodityId)" type="text" size="small" v-if="scope.row.status == 2 || scope.row.status == 3">上架</el-button>
                                <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="del(scope.row.commodityId)" type="text" size="small" >删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--查看弹窗-->
                <el-dialog
                    title="商品信息"
                    :visible.sync="lookDialogVisible"
                    width="70%"
                    center>
                    <goodsD :table="table"></goodsD>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="lookDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="lookDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <!--编辑弹窗-->
                <el-dialog
                    title="编辑"
                    :visible.sync="editDialogVisible"
                    width="70%"
                    center>
                    <div v-if="editDialogVisible">
                        <reGoods :editTable="editTable" @close="closeEdit"></reGoods>
                    </div>

                    <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>-->
                  </span>
                </el-dialog>
                <!-- 分页 -->
                <div v-if="isTiaozhuan">
                    <!-- 外来的 -->
                    <el-pagination
                        @current-change="requireDataWai"
                        :current-page.sync="pageType.page"
                        :page-size="15"
                        layout="total ,prev, pager, next, jumper"
                        :total="tableTotal">
                    </el-pagination>
                </div>
                <div v-else>
                    <el-pagination
                        @current-change="requireData"
                        :current-page.sync="pageType.page"
                        :page-size="15"
                        layout="total ,prev, pager, next, jumper"
                        :total="tableTotal">
                    </el-pagination>
                </div>
                
        </div>
    </transition>
</template>

<script>
    import goodsD from '@/pages/goods/goodsD'
    import reGoods from '@/pages/goods/reGoods'
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    export default {
        name: "list",
        data() {
            return {
                //商品状态
                goodsStatus: [{
                    value: '1',
                    label: '已上架'
                }, {
                    value: '2',
                    label: '已下架'
                }, {
                    value: '3',
                    label: '待上架'
                }],
                value: '1',
                //商品分组
                goodsGroup: [],
                groupId:'请选择',
                value1: '选项1',
                //选择框
                multipleSelection: [],
                //商品id
                goodsId:'',
                table:[],
                // 表格数据列表
                tableData: [],
                //查看详情弹窗
                lookDialogVisible: false,
                //编辑弹窗
                editDialogVisible:false,
                tableTotal: 0,
                pageType: {
                    page: 1,
                    pageSize: 15,
                    commodityCode:'',
                    commodityName:'',
                    groupId:'',
                    status:''
                },
                //编辑传值
                editTable:{},

                pageSizeList:[{title:'15条/页',val: 15},
                            {title:'30条/页',val: 30},
                            {title:'50条/页',val: 50},
                            {title:'100条/页',val: 100}],
                isTiaozhuan: false,
                activityCode: '',
            }
        },
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {
                        nameA: '首页',
                        nameB: '销售平台'
                    }
                }
            }
        },
        created() {

            console.log(this.onlyInfo);

            this.isTiaozhuan = true;
            this.tableData = [];

            this.activityCode = this.onlyInfo.activity_code;
            this.requireDataWai(1);
            this.getGroup();

        },
        methods: {
            watchSeach(e) {
                this.pageType.mobile = e.seachValue;
                this.requireData(1);
            },
            //获取商品分组
            getGroup(){
                this._ajax('admin/getCommodityGroup', {
                }, msg => {
                    console.log(msg,"获取分组成功");
                    this.goodsGroup =msg;
                });
            },
            requireDataWai(p){
                this.pageType.activityCode = this.activityCode;
                this.pageType.page = p;
                this._ajax('adminOrder/getActivityCommodityList', this.pageType, msg => {
                    console.log(msg,'这是优惠券商品列表');
                    if (msg) {
                        this.tableData = msg.list;
                        this.tableTotal = msg.total;
                    }else{
                        this.tableData = [];
                        this.tableTotal = 0;
                    }
                })
            },
            // 请求列表数据
            requireData(p) {
                console.log(p,'当前页');
                this.pageType.page = p;
                this._ajax('admin/getCommodity', this.pageType, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    console.log(msg,'这是商品列表')
                })
            },
            //重置
            reset(){
                this.pageType.commodityCode = '';
                this.pageType.commodityName = '';
                this.pageType.groupId = '';
                this.pageType.status = '';
                this.requireDataWai(1)
            },
            //批量删除
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
                let hhh = '';
                for(let i = 0;i<val.length;i++){
                    console.log(val[i].commodityId);
                    hhh += val[i].commodityId + ','
                }
                this.goodsId = hhh;
                console.log(this.goodsId);
            },
            delAll(){
                this._ajax('admin/updateCommodityDel', {
                    commodityId:this.goodsId,
                    status:0,
                }, msg => {
                    console.log('删除成功');
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.requireData(1);
                });
            },
            //下架弹窗
            outline(row) {
                console.log(row);
                this.$confirm('确定下架?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateCommodityOff', {
                        commodityId:row,
                        status:2,
                    }, msg => {
                        console.log('下架成功');
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        this.requireData(1);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });
            },
            //上架弹窗
            inline(row) {
                console.log(row);
                this.$confirm('确定上架?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateCommodityOn', {
                        commodityId:row,
                        status:1,
                    }, msg => {
                        console.log('上架成功')
                        this.$message({
                            type: 'success',
                            message: '上架成功!'
                        });
                        this.requireData(1);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消上架'
                    });
                });
            },
            //查看弹窗
            look(val){
                this.lookDialogVisible = true;
                this.table = val;
                console.log(this.table)
            },
            //删除弹窗
            del(i){
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateCommodityDel', {
                        commodityId:i,
                        status:0,
                    }, msg => {
                        console.log('删除成功');
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.requireData(1);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //编辑弹窗
            edit(val){
                this.editDialogVisible = true;
                this.editTable = val;
                console.log(this.editTable)
            },
            //添加商品
            addGoods(){
                this.$router.push('/home/goods/addGoods')
            },
            //关闭编辑弹窗
            closeEdit(){
                this.editDialogVisible = false;
                this.requireData(this.pageType.page);
            }
        },
        components: {
            TableHeader,
            goodsD,
            reGoods
        },
        mixins: [mixin],

    }
</script>

<style scoped>
    .head{
        display: flex;
    }
    .head span{
        line-height: 32px;
    }
    .pageBox{
        overflow: hidden;
    }
    .pageBox div{
        float: left;
        margin-left:10px;
    }
   .pageBox div span{
       float: left;
   }
</style>
