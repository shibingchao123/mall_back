<template>
    <div class="hj-home">
        <!-- 导航页面Title -->
        <div class="hj-home-title clearfix">
            <img src="../assets/images/header.jpg" class="header_img">
            <div class="c-fff m-l-20 f-l">团购-管理系统V1.0</div>
            <el-button class="f-r hj-home-btn" size="mini" round type="danger" @click="pageBack">退出</el-button>
            <el-button class="f-r hj-home-btn" type="info" round size="mini" @click="dialogVisible=true">修改密码
            </el-button>
            <span class="c-fff f-r f-15">欢迎</span>
        </div>
        <el-container class="hj-box">
            <el-aside width="210px" height="300px">
                <!-- 导航页面导航 -->
                <el-menu
                    :collapse-transition="true"
                    :default-active='nowPath'
                    class="hj-home-nav"
                    @open="handleOpen"
                    @close="handleClose"
                    :unique-opened="true"
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1" v-if="adminShow.show1">
                        <template slot="title">
                            <i class="el-icon-eleme"></i>
                            <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item index="/home/limit/limitList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">权限管理</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" v-if="adminShow.show2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="/home/user/userList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/user/merchantList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">商户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/user/merchantAudit">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">商户审核</span>
                        </el-menu-item>
                        <el-menu-item index="/home/Printing/Printing">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">包裹记录</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" v-if="adminShow.show3">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="/home/goods/goodsList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">商品列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4" v-if="adminShow.show4">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">运营管理</span>
                        </template>
                        <el-menu-item index="/home/web/banner">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">banner管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/web/classify">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">分类管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/web/classifyG">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">分组管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/web/stationmaster">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">站长管理图</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 5-20订单管理 -->
                    <el-submenu index="5" v-if="adminShow.show5">
                        <template slot="title">
                            <i class="el-icon-warning"></i>
                            <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="/home/order/OrderList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/order/PurchaseOrderList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">采购订单</span>
                        </el-menu-item>
                        <el-menu-item index="/home/order/DeliveryOrderList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">配送订单</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="7" v-if="adminShow.show6">
                        <template slot="title">
                            <i class="el-icon-location-outline"></i>
                            <span slot="title">营销中心</span>
                        </template>
                        <el-menu-item index="/home/Marketing/MarketList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">优惠管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/Marketing/AddMarketing">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">添加活动</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="8" v-if="adminShow.show7">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">积分管理</span>
                        </template>
                        <el-menu-item index="/home/point/pointManagement">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">积分管理</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="9" v-if="adminShow.show9">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">数据统计</span>
                        </template>
                        <el-menu-item index="/home/dataStats/dealData">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">交易统计</span>
                        </el-menu-item>
                        <el-menu-item index="/home/dataStats/shopData">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">商品统计</span>
                        </el-menu-item>
                        <el-menu-item index="/home/dataStats/integralData">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">积分订单统计</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="10" v-if="adminShow.show8">
                        <template slot="title">
                            <i class="el-icon-s-grid"></i>
                            <span slot="title">财务管理</span>
                        </template>
                        <el-menu-item index="/home/finance/SalesStats">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">销售统计</span>
                        </el-menu-item>
                        <el-menu-item index="/home/finance/CashOut">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">提现申请</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="11" v-if="adminShow.show10">
                        <template slot="title">
                            <i class="el-icon-phone"></i>
                            <span slot="title">客服中心</span>
                        </template>
                        <el-menu-item index="/home/serviceCenter/recordList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">客服记录列表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/serviceCenter/addServiceList">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">新增客服记录</span>
                        </el-menu-item>
                        <!--<el-menu-item index="/home/serviceCenter/checkList">-->
                            <!--<i class="el-icon-more-outline"></i>-->
                            <!--<span slot="title">查看记录</span>-->
                        <!--</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="/home/operating/operatingRecord" v-if="adminShow.show11">
                        <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span slot="title">操作记录</span>
                        </template>
                        <el-menu-item index="/home/operating/operatingRecord">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">操作记录</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="box-sizing: border-box;padding: 10px 20px;">
                <router-view/>
            </el-main>
        </el-container>
        <!-- 修改密码弹窗 -->
        <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleCloseX">
            <div v-if="dialogVisible">
                <el-form label-width="100px" size="mini" style="width: 70%;margin: 0 auto;" ref="xgForm" :model="xgForm"
                         :rules="rules2">
                    <el-form-item label="旧密码" prop="oPass">
                        <el-input v-model="xgForm.oPass" placeholder="请输入旧密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="nPass">
                        <el-input v-model="xgForm.nPass" placeholder="请输入新密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="aPass">
                        <el-input v-model="xgForm.aPass" placeholder="请输入确认密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="changePassword('xgForm')">确定</el-button>
                        <el-button size="mini" @click="cancel('xgForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 修改密码弹窗 结束 -->
    </div>
</template>

<script>
    import mixin from '../mixins/mixins'
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../assets/javascript/validate.js'

    export default {
        name: "home",
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.xgForm.nPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                nowPath: '/home/welcome',
                dialogVisible: false,
                xgForm: {
                    nPass: '',
                    aPass: ''
                },
                rules2: {   // 表单验条件
                    oPass: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    nPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    aPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                },
                adminShow:{
                    show1: false,
                    show2: false,
                    show3: false,
                    show4: false,
                    show5: false,
                    show6: false,
                    show7: false,
                    show8: false,
                    show9: false,
                    show10: false,
                    show11: false,
                },
            }
        },
        filters: {
            //后台身份
            filterT: function (arg) {
                if (arg == 1) {
                    return "管理员"
                } else if (arg == 2) {
                    return "客服"
                } else if (arg == 3) {
                    return "审核员"
                } else if (arg == 4) {
                    return "复审员"
                }
            },
        },
        watch: {
            $route(newVal,oldval){
                this.nowPath = newVal.path;
            }
        },
        created() {
            //在页面刷新时导航正确指向;
            this.nowPath = this.$route.path;
            let bear = JSON.parse(sessionStorage.getItem("bear"));
            this.getAdminShow(bear);
        },
        methods: {
            getAdminShow(bear){
                // jurisdiction_id
                if (bear.jurisdiction_id) {
                    let a = bear.jurisdiction_id.split(',');
                    a.pop();
                    console.log(a);
                    a.forEach((item,index)=>{
                        this.adminShow['show' + item] = true;
                    })
                    console.log(this.adminShow)
                }

            },
            handleCloseX() {
                this.xgForm.oPass = this.xgForm.nPass = this.xgForm.aPass = "";
                this.dialogVisible = false;
            },
            changePassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.xgForm)
                        if (this.xgForm.nPass !== this.xgForm.aPass) {
                            this._message(2, '两次输入密码不一致!')
                        }
                        this.$router.push({name: 'hrhLogin'})
                        this._ajax('admin/updateAdminPassword', {
                            adminId: this.bear.adminId,
                            oldPassword: this.xgForm.oPass,
                            password: this.xgForm.nPass,
                            passwords: this.xgForm.aPass,
                        }, {logAdmin:this.bear.adminId,logCustomer:this.bear.adminId},msg => {
                            this._message(1, '密码修改成功!')
                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                            window.sessionStorage.clear();
                            this.$router.push({name: 'hrhLogin'})
                        })
                    } else {
                        this._message(2, '请完善表单后提交!')
                        return false;
                    }
                });
            },
            cancel(formName) {
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            pageBack() {
                this.$confirm('确定要退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    window.sessionStorage.clear();
                    this.$router.push({name: 'hrhLogin'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    });
                });
            }
        },
        mixins: [mixin]
    }
</script>

<style scoped>
    .hj-home {
        width: 100%;
        height: 100%;
    }

    .hj-home-title {
        width: 100%;
        height: 60px;
        background-color: #4f4f4f;
        line-height: 60px;
    }

    .hj-home-title > img {
        display: block;
        float: left;
        margin-top: 2.5px;
        margin-left: 48px;
    }

    .hj-home-btn {
        margin-top: 16px;
        margin-right: 14px;
    }

    .hj-home-nav {
        height: 100%;
    }

    .hj-box {
        width: 100%;
        /*height: 100%;*/
        height: calc(100% - 60px);
    }

    .hj-main {
        background-color: #fafafa;
    }

    .header_img {
        width: 55px;
        height: 55px;
        border-radius: 5px;
    }

    .el-aside::-webkit-scrollbar { /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .el-aside::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .el-aside::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background: #EDEDED;
    }

    .f-15 {
        font-size: 15px;
    }
</style>
