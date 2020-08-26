<template>
    <transition name="el-fade-in">
        <div>
            <div class="head">
                    <span style="flex-basis:83%">
                        <el-breadcrumb separator-class="el-icon-arrow-right" >
                        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    </el-breadcrumb>
                    </span>
            </div>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><el-button size="small" type="primary" @click="addDialogVisible=true">添加账号</el-button></div>
                            <div>
                                <span>工号：</span>
                                <el-input  placeholder="请输入工号" size="mini" clearable class="inputW" style="width:150px" v-model="pageType.adminNo"></el-input>
                            </div>
                            <div>
                                <span>手机号：</span>
                                <el-input placeholder="请输入手机号" size="mini" clearable class="inputW" style="width:150px" v-model="pageType.mobile"></el-input>
                            </div>
                        </div>
                        <div class="pageBox1">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData()">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resetSelect()">重置</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- 表格展示区 -->
            <div :style="{'width': '100%', 'height': (screenHeight - 230) + 'px'}" class="table-box">
                <!-- 表格 -->
                <el-table
                    :data="tableData"
                    height="100%"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="admin_no"
                        label="工号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="admin_name"
                        label="真实姓名"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="account"
                        label="账号"
                        align="center">
                    </el-table-column>
                    <!--<el-table-column
                        prop="password"
                        align="center"
                        label="密码">
                    </el-table-column>-->
                    <el-table-column
                        prop="position"
                        align="center"
                        label="职位">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="jurisdictionName"
                        align="center"
                        label="权限"
                        width="90">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.jurisdictionName">{{item.jurisdiction_name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inventory_code"
                        align="center"
                        label="邀请码">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        align="center"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="dealerTerm"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button @click="reset(scope.row.adminId)" type="text" size="small">重置</el-button>
                                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="editLimit(scope.row)" type="text" size="small">权限</el-button>
                                <el-button @click="disable(scope.row.adminId,scope.row.admin_no,2)" type="text" size="small" v-if="scope.row.status === 1">禁用</el-button>
                                <el-button @click="online(scope.row.adminId,1)" type="text" size="small" v-if="scope.row.status === 2">启用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--添加账号-->
            <el-dialog
                title="添加账号"
                :visible.sync="addDialogVisible"
                width="550px"
                center>
                <div v-if="addDialogVisible">
                    <addLimit @close="closeAdd"></addLimit>
                </div>
            </el-dialog>
            <!--编辑弹窗-->
            <el-dialog
                title="权限管理"
                :visible.sync="reDialogVisible"
                width="550px"
                center>
                <div v-if="reDialogVisible">
                    <edit :editTable="editTable" @close="closeEdit" @close2="closeRequest"></edit>
                </div>
            </el-dialog>
            <!--权限弹窗-->
            <el-dialog
                title="权限管理"
                :visible.sync="limitDialogVisible"
                width="450px"
                center>
                <div v-if="limitDialogVisible">
                    <editLimit :editTable="editTable" @close="closeEditLimit"></editLimit>
                </div>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
    import goodsD from '@/pages/goods/goodsD'
    import addLimit from '@/pages/limit/addLimit'
    import edit from '@/pages/limit/edit'
    import editLimit from '@/pages/limit/editLimit'
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    export default {
        name: "limitList",
        data() {
            return {
                // 表格数据列表
                tableData: [],
                jurisdiction_name:'',
                str:'',
                //添加账号
                addDialogVisible:false,
                //修改弹窗
                reDialogVisible: false,
                limitDialogVisible:false,
                tableTotal: 0,
                pageType: {
                    adminNo:'',
                    mobile:'',
                },
                //每一行的数据
                editTable:[],
                bear: JSON.parse(sessionStorage.getItem("bear"))
            }
        },
        created() {
            this.requireData();
            console.log(this.bear.admin_no)
        },
        methods: {
            // 请求列表数据
            requireData() {
                this._ajax('admin/getAdminList', this.pageType, msg => {
                    console.log(msg,"管理员权限列表");
                    this.tableData = msg;
                })
            },
            //重置
            resetSelect(){
                this.pageType.adminNo = '';
                this.pageType.mobile = '';
                this.requireData()
                },
            //编辑弹窗
            edit(val){
                this.reDialogVisible = true;
                this.editTable = val;
                console.log(this.editTable)
            },
            //权限弹窗
            editLimit(val){
                this.limitDialogVisible = true;
                this.editTable = val;
                console.log(this.editTable)
            },
            //启用管理员
            online(val,status){
                this.$confirm('确定启用该管理员？', '启用权限', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateAdminStatusOn', {
                        adminId:val,
                        status:status,
                    }, msg => {
                        console.log("启用成功");
                        this.$message({
                            type: 'success',
                            message: '启用成功!'
                        });
                        this.requireData();
                    },{logAdmin:this.bear.adminId,logCustomer:val});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            //禁用管理员
            disable(val,vall,status){
                if(vall === this.bear.admin_no){
                    alert('管理员不能禁用自己')
                }else{
                    this.$confirm('确定禁用该管理员？', '禁用权限', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this._ajax('admin/updateAdminStatusOff', {
                            adminId:val,
                            status:status,
                        }, msg => {
                            console.log("禁用成功");
                            this.$message({
                                type: 'success',
                                message: '禁用成功!'
                            });
                            this.requireData();
                        },{logAdmin:this.bear.adminId,logCustomer:val});
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }

            },
            //重置密码
            reset(val){
                this.$confirm('确定重置密码为123456？', '重置密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/resetPassword', {
                        adminId:val
                    }, msg => {
                        console.log("重置成功");
                        this.$message({
                            type: 'success',
                            message: '重置成功!'
                        });
                        this.requireData();
                    },{logAdmin:this.bear.adminId,logCustomer:val});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            closeAdd(){
                this.addDialogVisible = false;
                this.requireData();
            },
            closeEdit(){
                this.reDialogVisible = false;
                this.requireData();
            },
            closeRequest(){
                this.requireData();
            },
            closeEditLimit(){
                this.limitDialogVisible = false;
                this.requireData();
            }
        },
        components: {
            TableHeader,
            goodsD,
            addLimit,
            edit,
            editLimit
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
