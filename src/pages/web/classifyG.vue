<template>
    <div class="userMsg">
        <TableHeader
            class="m-b-20"
            ref="tableHeader"
            :showoption="['crumbs']"
            :breadcrumb="{nameA: '运营管理', nameB: '分组管理'}">
        </TableHeader>
        <grey>
            <template v-slot:title>
                <div class="box flex-between p-r-50">
                    <span>分组管理</span>
                    <el-button size="small" class="greenBtn" type="primary" @click="addClassify">新增</el-button>
                </div>
            </template>
            <template v-slot:body>
                <div :style="{'width': '100%', 'height': (screenHeight - 165) + 'px'}" class="table-box">
                    <div class="m-b-40">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                align="center"
                                label="序号">
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.sort}}</span>
                                </template> -->
                            </el-table-column>
                            <el-table-column
                                prop="group_name"
                                align="center"
                                label="分类">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="editOpen(scope.row)">编辑</el-button>
                                    <el-button type="text" size="small" @click="GoOnline(scope.row,1)">上移</el-button>
                                    <el-button type="text" size="small" @click="GoOnline(scope.row,2)">下移</el-button>
                                    <el-button type="text" size="small" @click="delData(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </template>
        </grey>
        <!--新增分类-->
        <div>
            <el-dialog
                title="分组管理"
                :visible.sync="classifyShow"
                width="430px"
                :before-close="classifyClose" center>
                <div v-if="classifyShow">
                    <div class="m-b-20">
                        <label>分组名称：</label>
                        <el-input v-model="selectedV.groupName" placeholder="请输入内容" clearable size="small"
                                  class="inputW"></el-input>
                    </div>
                    <!-- <div>
                        <label>　　排序：</label>
                        <el-input v-model="selectedV.sort" placeholder="请输入内容" clearable size="small"
                                  class="inputW"></el-input>
                    </div> -->
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="classifyShow = false">取 消</el-button>
                    <el-button v-if="!isEdit" class="blue-btn" type="primary" @click="submitAdd(selectedV)">新 增</el-button>
                    <el-button v-if="isEdit" class="blue-btn" type="primary" @click="submitEdit(selectedV)">修 改</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import TableHeader from '@/components/TableHeader'
    import grey from '@/components/order/greyTable';

    export default {
        name: 'classify',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                tableData: [{}, {}, {}],
                classifyShow: false,
                selected:'',
                selectedV:{
                    classificationName:'',
                    sort:'',
                },
                topSelect: [
                    {value: '选项1', label: '111'},
                    {value: '选项2', label: '222'},
                ],
                isEdit: false,
            }
        },
        methods: {
            delData(data){
                this.$confirm('确定要删除该分组吗?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateCommodityGroup', 
                    {
                        groupId: data.groupId,
                        groupName: data.group_name,
                        status: 0,
                    }, msg => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.requireData();
                    },{logAdmin:this.bear.adminId,logCustomer:data.groupId})
                }).catch(() => {
                    //          
                });
                
            },
            editOpen(data){
                this.selectedV = {
                    groupId: data.groupId,
                    groupName: data.group_name,
                };
                this.classifyShow = true;
                this.isEdit = true;
            },
            submitEdit(data){
                if (data.groupName) {
                    this._ajax('admin/updateCommodityGroup', 
                        data, 
                        msg => {
                        this.$message({
                            message: '修改分组成功',
                            type: 'success'
                        },{logAdmin:this.bear.adminId,logCustomer:data.groupId});
                        this.classifyClose();
                        this.requireData();
                    })
                }else{
                    this.$message({
                        message: '请填写分组名称',
                        type: 'error'
                    });
                }
            },
            submitAdd(data){
                if (data.groupName) {
                    this._ajax('admin/insertCommodityGroup', 
                        data
                        , msg => {
                        this.$message({
                            message: '添加分类成功',
                            type: 'success'
                        });
                        this.classifyClose();
                        this.requireData();
                    },{logAdmin:this.bear.adminId})
                }else{
                    this.$message({
                        message: '请填写分组名称',
                        type: 'error'
                    });
                }
            },
            /* 获取列表*/
            requireData() {
                // this.topData.page = p;
                this._ajax('admin/getCommodityGroup', {}, msg => {
                    console.log(msg);
                    this.tableData = msg;
                })
            },
            GoOnline(val,num) {
                let url = '';
                if (num == 1) {
                    url = 'admin/updateGroupMoveUp';
                }else if (num == 2) {
                    url = 'admin/updateGroupMoveDown';
                }
                this._ajax(url, 
                    {
                        groups: 2,
                        move: num,
                        groupId: val.groupId,
                    }
                    , msg => {
                    this.$message({
                        message: {'1':'上移','2':'下移'}[num]+'成功',
                        type: 'success'
                    });
                    this.requireData();
                },{logAdmin:this.bear.adminId,logCustomer:val.groupId})

            },
            addClassify() {
                this.classifyShow = true;
            },
            classifyClose() {
                this.classifyShow = false;
                this.selectedV = {
                    classificationName:'',
                    sort:'',
                };
                this.isEdit = false;
            },

        },
        created() {
            this.requireData();
        },
        components: {
            TableHeader, grey,
        },
        mixins: [mixin],
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
