<template>
    <transition name="el-fade-in">
        <div>
            <div class="head">
                    <span style="flex-basis:83%">
                        <el-breadcrumb separator-class="el-icon-arrow-right" >
                        <el-breadcrumb-item>操作记录</el-breadcrumb-item>
                        <el-breadcrumb-item>操作记录</el-breadcrumb-item>
                    </el-breadcrumb>
                    </span>
            </div>
            <div class="banner2">
                <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div>
                                <span>工号：</span>
                                <el-input  placeholder="请输入工号" size="mini" clearable class="inputW" style="width:150px" v-model="pageType.adminNo" ></el-input>
                            </div>
                            <div class="phonel">
                                <span>手机号：</span>
                                <el-input placeholder="请输入手机号" size="mini" clearable class="inputW" style="width:160px" v-model="pageType.mobile"></el-input>
                            </div>
                        </div>
                        <div >
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="requireData(1)">搜索</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resets()">重置</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--表格展示区-->
            <div :style="{'width': '100%', 'height': (screenHeight -280) + 'px'}" class="table-box">
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
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="account"
                        label="账号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="position"
                        label="职位"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="操作时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="info"
                        label="操作"
                        align="center">
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div style="height:20px"></div>
            <el-pagination
                @current-change="requireData"
                :current-page.sync="pageType.page"
                :page-size="pageType.pageSize"
                layout="prev, pager, next, jumper"
                :total="tableTotal">
            </el-pagination>
        </div>
    </transition>
</template>
<script>
    import mixin from '@/mixins/mixins'
    export default {
        data(){
            return{
                tableData:[],
                pageType:{
                    page:1,
                    pageSize:10,
                },
                table:[],
                tableTotal:0,
            }
        },
        methods:{
            requireData(p) {
                this.pageType.page = p;
                this._ajax('adminOrder/getOperationRecord', this.pageType, msg => {
                    console.log(msg),
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
            chooseData(val){
                console.log(val);
                this.chooseList = val;
            },
            handleClick(row) {
                console.log(row);
            },
            resets(){
                this.pageType = {};
                this.pageType.pageSize = 10;
                this.requireData(1);
            },
        },
        mixins:[mixin],
        created() {
            this.requireData(1)
        },

    }
</script>
<style>
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
