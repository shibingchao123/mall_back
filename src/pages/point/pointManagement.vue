<template>
    <transition name="el-fade-in">
        <div>
            <el-container>
                <el-header v-if="settt">
                    <span class="f-l">订单抵现规则设置</span>
                    <div class="f-r">
                        <el-button size="small" class="greenBtn" type="primary" @click="resets()">编辑</el-button>
                    </div>
                </el-header>
                <el-header v-else>
                    <span class="f-l ">订单抵现规则设置</span>
                    <div class="f-r">
                        <el-button size="small" class="" type="primary" @click="ensure(formLabelAlign)">确定</el-button>
                        <el-button size="small" class="greenBtn" type="primary" @click="goback()">返回</el-button>
                    </div>
                </el-header>
                <el-main>
                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="240px" :model="formLabelAlign"
                             ref="formLabelAlign"
                    >
                        <el-form-item label="积分抵现比例：" style="">
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.exchange}}</div>
                            <el-input v-else v-model="formLabelAligna.exchange" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                            <!--<el-input-numbe  v-else v-model="formLabelAligna.exchange" class="inputC10 f-l"  @change="handleChange" clearable></el-input-numbe>-->
                            <span class="f-l m-l-10">&nbsp;&nbsp;积分&nbsp;=&nbsp;</span>
                            <span class="f-l m-l-10">1元</span>
                        </el-form-item>
                        <el-form-item label="商品订单抵扣范围：">
                            <span class=" f-l m-r-10"><=订单总价格</span>
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.collateral_scope}}</div>
                            <el-input v-else v-model="formLabelAligna.collateralScope" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                            <span class=" f-l m-l-10">%</span>
                        </el-form-item>
                        <el-form-item label="积分兑换门槛：">
                            <span class="f-l m-r-10">>= </span>
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.min_exchange}}</div>
                            <el-input v-else v-model="formLabelAligna.minExchange" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                            <span class="f-l m-l-10 m-r-10">积分，抵扣比例不能超过总积分的</span>
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.exchange_range}}</div>
                            <el-input v-else v-model="formLabelAligna.exchangeRange" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                            <span class="f-l m-l-10">%</span>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
            <el-container>
                <el-header>
                    <div class="f-l">积分获得设置</div>
                </el-header>
                <el-main>
                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="240px">
                        <el-form-item label="积分获得门槛：">
                            <span class="f-l m-r-10">满</span>
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.min_price}}</div>
                            <el-input v-else v-model="formLabelAligna.minPrice" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                            <span class="f-l m-l-10 m-r-10">可获得积分，获得实付款的</span>
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.obtain_integral}}</div>
                            <el-input v-else v-model="formLabelAligna.obtainIntegral" @change="handleChange"
                                      class="inputC10 f-l" clearable></el-input>
                            <span class="f-l m-l-10">%</span>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
            <el-container>
                <el-header>
                    <div class="f-l">签到送积分设置</div>
                </el-header>
                <el-main>
                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="240px">
                        <el-form-item label="新用户注册赠送积分：">
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.register_integral}}</div>
                            <el-input v-else v-model="formLabelAligna.registerIntegral" class="inputC10 f-l" :step="1.0"
                                      @change="handleChange" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="每日签到赠送积分：">
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.sign_integral}}</div>
                            <el-input v-else v-model="formLabelAligna.signIntegral" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="连续一周签到赠送积分：">
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.week_sign_integral}}</div>
                            <el-input v-else v-model="formLabelAligna.weekSignIntegral" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邀请每个好友可获得积分：">
                            <div v-if="divvv" class="inputC10 f-l divbor">{{formLabelAlign.invite_integral}}</div>
                            <el-input v-else v-model="formLabelAligna.inviteIntegral" class="inputC10 f-l"
                                      @change="handleChange" clearable></el-input>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {},
                formLabelAligna: {
                    exchange: '',
                    exchangeRange: '',
                    minExchange: '',
                    obtainIntegral: '',
                    minPrice: '',
                    collateralScope: '',
                    registerIntegral: '',
                    signIntegral: '',
                    weekSignIntegral: '',
                    inviteIntegral: '',
                },
                divvv: true,
                settt: true,

            };
        },
        methods: {
            requireData(p) {
                this.formLabelAlign.page = p;
                this._ajax('merchant/getIntegralRule', this.formLabelAlign, msg => {
                    console.log(msg),
                        this.formLabelAlign = msg[0];
                    this.tableTotal = msg.total;
                })
            },
            resets() {
                this.divvv = false;
                this.settt = false;
                this.formLabelAligna.exchange = this.formLabelAlign.exchange;
                this.formLabelAligna.exchangeRange = this.formLabelAlign.exchange_range;
                this.formLabelAligna.minExchange = this.formLabelAlign.min_exchange;
                this.formLabelAligna.obtainIntegral = this.formLabelAlign.obtain_integral;
                this.formLabelAligna.minPrice = this.formLabelAlign.min_price;
                this.formLabelAligna.collateralScope = this.formLabelAlign.collateral_scope;
                this.formLabelAligna.registerIntegral = this.formLabelAlign.register_integral;
                this.formLabelAligna.signIntegral = this.formLabelAlign.sign_integral;
                this.formLabelAligna.weekSignIntegral = this.formLabelAlign.week_sign_integral;
                this.formLabelAligna.inviteIntegral = this.formLabelAlign.invite_integral;
            },
            ensure(formName) {
                if (this.formLabelAligna.exchange && this.formLabelAligna.exchangeRange && this.formLabelAligna.minExchange
                    && this.formLabelAligna.obtainIntegral && this.formLabelAligna.minPrice && this.formLabelAligna.collateralScope && this.formLabelAligna.registerIntegral
                    && this.formLabelAligna.signIntegral && this.formLabelAligna.weekSignIntegral && this.formLabelAligna.inviteIntegral) {
                    var reg = /^(0|[1-9]\d*)$/;
                    console.log(reg.test(this.formLabelAligna.exchange))
                    if (reg.test(this.formLabelAligna.exchange)==false ||  reg.test(this.formLabelAligna.minExchange)==false
                        || reg.test(this.formLabelAligna.minPrice)==false||  reg.test(this.formLabelAligna.registerIntegral)==false
                        || reg.test(this.formLabelAligna.weekSignIntegral)==false|| reg.test(this.formLabelAligna.inviteIntegral)==false
                        || reg.test(this.formLabelAligna.signIntegral)==false||reg.test(this.formLabelAligna.exchangeRange)==false ||reg.test(this.formLabelAligna.obtainIntegral)==false||reg.test(this.formLabelAligna.collateralScope)==false) {
                        console.log(2222)
                        this.$message({
                            showClose: true,
                            message: '不是正确数字',
                            type: 'error'
                        });
                        return false
                    }
                    var regb = /^100$|^(\d|[1-9]\d)(\.\d+)*$/;
                    if(regb.test(this.formLabelAligna.exchangeRange)==false ||regb.test(this.formLabelAligna.obtainIntegral)==false||regb.test(this.formLabelAligna.collateralScope)==false){
                        this.$message({
                            showClose: true,
                            message: '请检查%前的数字是否小于等于100',
                            type: 'error'
                        });
                        console.log("修改积分")
                    }else{
                        console.log(8888)
                        this._ajax('adminOrder/updateIntegralRule', {
                            exchange: this.formLabelAligna.exchange,
                            exchangeRange: this.formLabelAligna.exchangeRange,
                            minExchange: this.formLabelAligna.minExchange,
                            obtainIntegral: this.formLabelAligna.obtainIntegral,
                            minPrice: this.formLabelAligna.minPrice,
                            collateralScope: this.formLabelAligna.collateralScope,
                            registerIntegral: this.formLabelAligna.registerIntegral,
                            signIntegral: this.formLabelAligna.signIntegral,
                            weekSignIntegral: this.formLabelAligna.weekSignIntegral,
                            inviteIntegral: this.formLabelAligna.inviteIntegral,
                            ruleId: this.formLabelAligna.id,
                        }, msg => {
                            console.log(msg);
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.divvv = true;
                            this.settt = true;
                            this.requireData(1);
                        })
                    }

                } else {
                    this.$message.error('请完善相关信息');
                }
            },
            goback() {
                this.divvv = true;
                this.settt = true;
            },
            handleChange(e) {

            }
        },
        created() {
            this.requireData(1);
            console.log(this.formLabelAlign)
        },

    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .inputC10 {
        width: 10%;
    }

    .inputC5 {
        width: 5%;
    }

    .divbor {
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        float: left
    }
</style>
