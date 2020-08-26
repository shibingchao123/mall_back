<template>
    <div class="userMsg">
        <el-card class="box-card flex-start">
            <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>商户信息</div>
            </template>
            <template v-slot:body>
                <div class="w10 box padding-20 flex-start">
                    <div class="w25">站长ID：{{onlyInfo.user_code}}</div>
                    <div class="w25">联系方式：{{onlyInfo.tell_phone}}
                        　<el-button type="text" size="small" @click="changePhone(onlyInfo)">修改</el-button>
                    </div>
                    <div class="w25">姓名：{{onlyInfo.name}}</div>
                    <div class="w25">邀请人ID：{{onlyInfo.inviter_code}}</div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    统计信息
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-20">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            label="总交易额">
                            <template slot-scope="scope">
                                <span>￥{{scope.row.pay_total}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="order_num"
                            align="center"
                            label="订单总数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="交易详情">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="lookOrder(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    收货地址
                </div>
            </template>
            <template v-slot:body>
                <div class="m-b-20">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            align="center"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="tell_phone"
                            align="center"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="详细地址">
                            <template slot-scope="scope">
                                {{scope.row.region}} {{scope.row.address}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="zip_code"
                            align="center"
                            label="邮编">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="changeSite(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </grey>
        <!--修改-->
        <div>
            <el-dialog
                title="修改地址"
                :visible.sync="changeSiteView"
                width="650px"
                :before-close="siteViewClose" append-to-body center>
                <div v-if="changeSiteView">
                    <div class="flex">
                        <div style="line-height: 40px;">请选择新地址：</div>
                        <VDistpicker @selected="onselec"></VDistpicker>
                    </div>
                    <div style="margin-top: 30px;">
                        <span>请输入新地址：</span>
                        <el-input v-model="addresList.address" placeholder="请输入内容" clearable
                                  class="inputLong"></el-input>
                    </div>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="changeSiteView = false">取 消</el-button>
                    <el-button class="blue-btn" type="primary" @click="addRess()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="修改手机号"
                :visible.sync="changePhoneNum"
                width="600px" append-to-body center>
                <div v-if="changePhoneNum">
                    <div style="margin-top: 30px;">
                        <span>请输入新手机号：</span>
                        <el-input v-model="upPhone" placeholder="请输入内容" clearable
                                  class="inputLong"></el-input>
                    </div>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="changePhoneNum = false">取 消</el-button>
                    <el-button class="blue-btn" type="primary" @click="upPhoneSubmit(upPhone)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';
    import VDistpicker from 'v-distpicker'

    export default {
        name: 'merchantMsg',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                tableData: [],
                changeSiteView: false,
                changePhoneNum: false,
                upPhone: '',
                addresList: {
                    address: '',
                    region: '',
                    userId: ''
                }
            }
        },
        methods: {
            upPhoneSubmit(val){
                let phoneNumber = /^1\d{10}$/;
                if (!(phoneNumber.test(val))) {
                    this.$message({
                        type: 'error',
                        message: '请填写手机号'
                    });
                }else{
                    let data = {
                        userId: this.onlyInfo.userId,
                        tellPhone: val
                    }
                    this._ajax('admin/updateMerchantInfo', data, msg => {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.changePhoneNum = false;
                        this.onlyInfo.tell_phone = val;
                    },{logAdmin:this.bear.adminId,logCustomer:this.onlyInfo.userId})
                }
                // if (this.addresList.region == '') {
                //     this.addresList.region = this.onlyInfo.region;
                // }
                
            },
            changePhone(dat){
                this.upPhone = this.onlyInfo.tell_phone;
                this.changePhoneNum = true;
            },
            //商户交易详情查看
            lookOrder(val) {
                console.log('跳转订单管理',val);
                this.$router.push({name:'OrderList',query:{headUid: val.userId}});
            },
            //修改收货地址
            changeSite() {
                this.changeSiteView = true;
            },
            siteViewClose() {
                this.changeSiteView = false;
            },
            onselec(a) {
                this.addresList.region = a.province.value + a.city.value + a.area.value;
            },
            addRess() {
                if (this.addresList.region == '') {
                    this.$message({
                        type: 'error',
                        message: '您没有选择省市区地址'
                    });
                    // this.addresList.region = this.onlyInfo.region;
                    return false;
                }else if (this.addresList.address == '') {
                    // this.addresList.address = this.onlyInfo.address;
                    this.$message({
                        type: 'error',
                        message: '您没有填写新地址'
                    });
                    return false;
                }else{
                    this._ajax('admin/updateMerchantInfo', this.addresList, msg => {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.changeSiteView = false;
                        this.tableData[0].address=this.addresList.address;
                        this.tableData[0].region=this.addresList.region;
                        this.addresList.address = '';
                        this.addresList.region = '';
                    },{logAdmin:this.bear.adminId,logCustomer:this.addresList.userId})
                }
                    
            }
        },
        components: {
            grey,
            VDistpicker
        },
        mixins: [mixin],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            // 修改地址
            // this.addresList.address = this.onlyInfo.address;
            // this.addresList.region = this.onlyInfo.region;
            this.addresList.userId = this.onlyInfo.userId;
            this.tableData.push(this.onlyInfo);
        }
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
