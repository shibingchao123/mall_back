<template>
    <div class="You">
        <div class="banner1">选择优惠券</div>
        <div class="banner2">
            <el-card class="box-card">
                    <div class="pageHead">
                        <div class="pageBox">
                            <div><span>开始时间：</span>
                                <el-date-picker
                                    size="mini"
                                    v-model="topData.beginTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div><span>结束时间：</span>
                                <el-date-picker
                                    size="mini"
                                    v-model="topData.endTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                                <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh" @click="resect()">清空</el-button>
                            </div>
                        </div>
                        <div class="pageBox">
                            <div>
                                <el-button type="primary" size="small" @click="addOpen()">新建优惠券</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
        </div>
        <div class="banner3">
            <div class="banner3-dis">
                <!-- display:false -->
                <div class="YouOne" v-for="item in tableData">
                    <img class="bg" src="../../assets/images/header.jpg">
                    <div class="content">
                        <div class="ban1"><span>&yen;</span>{{item.discount}}</div>
                        <div class="ban2">满{{item.min_limit}}使用</div>
                        <div class="ban3">使用时间：{{item.begin_time}}</div>
                        <div class="ban3">　　　　　{{item.end_time}}</div>
                        <div class="ban3">发行数量：{{item.num}}</div>
                        <div class="ban3">优惠券类型：{{{'1':'普通优惠券','2':'新人优惠券','3':'全平台优惠券'}[item.coupon_type]}}</div>
                        <!-- <div class="ban3"></div> -->
                        <div class="ban4">
                            <!-- 多选框 -->
                            <el-checkbox v-model="item.MyCheck"></el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner4 clearfix">
            <div class="f-r">
                <el-button type="primary" @click="checkY(tableData)">确认</el-button>
                <el-button @click="$emit('close')">取消</el-button>
            </div>
        </div>

        <div class="dialog">
            <el-dialog
                width="520px"
                title="创建优惠券"
                :visible.sync="addYou"
                append-to-body>
                <div v-if="addYou">
                    <el-form size="mini" :model="addData" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                            <el-form-item label="名称" prop="couponName"

                            :rules="[{required: true, message: '优惠劵名称不能为空', trigger: 'blur'},
                                    { min: 1, max: 10, message: '最多输入10个字', trigger: 'blur' }]"
                            >
                                <el-input v-model="addData.couponName" class="inputW"></el-input>
                            </el-form-item>
                            <el-form-item label="使用时间" prop="endTime"

                            :rules="{required: true, message: '请选择优惠时间', trigger: 'change'}"
                            >
                                <!-- <el-date-picker
                                    v-model="addData.times"
                                    size="mini"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    @change="timeChange()"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker> -->
                                <el-date-picker
                                    v-model="addData.times"
                                    size="mini"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="timeChange()"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="优惠金额" prop="discount"

                            :rules="{required: true, message: '优惠金额不能为空', trigger: 'blur'}"
                            >
                                <el-input-number v-model="addData.discount" :controls="false" class="inputW"></el-input-number>
                                <span>　元</span>
                            </el-form-item>
                            <el-form-item label="使用门槛" prop="minLimit"

                            :rules="{required: true, message: '使用门槛不能为空', trigger: 'blur'}"
                            >
                                <el-input-number v-model="addData.minLimit" :controls="false" class="inputW"></el-input-number>
                                <span>　元</span>
                            </el-form-item>
                            <el-form-item label="发行量" prop="num"

                            :rules="{required: true, message: '发行量不能为空', trigger: 'blur'}"
                            >
                                <el-input-number v-model="addData.num" :controls="false" class="inputW"></el-input-number>
                                <span>　张</span>
                            </el-form-item>
                            <el-form-item label="每人限领" prop="limitNum"
                            :rules="{required: true, message: '每人限领不能为空', trigger: 'blur'}"
                            >
                                <el-input-number v-model="addData.limitNum" :controls="false" class="inputW" placeholder="每人限领数量"></el-input-number>
                                <span>　张</span>
                            </el-form-item>
                            <el-form-item label="优惠类型" prop="couponType"
                            :rules="{required: true, message: '请选择', trigger: 'change'}"
                            >
                                <el-select v-model="addData.couponType" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="goNextPage(addData)">确认</el-button>
                    <el-button @click="addYou = false">取消</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                topData: {},
                checked:false,
                addYou: false,
                addData: {

                },
                tableData: [],
                options: [{label:'新人优惠券',value:2},{label:'普通优惠券',value:1},{label:'全平台优惠券',value:3}]
            }
        },
        created () {
            this.getList();
        },
        watch: {
            radioValue (val) {
                this.headerMin.classValue = val;
                this.$emit('watchSeach', this.headerMin);
            }
        },
        methods: {
            checkY(data){
                let val = [];
                data.forEach((item,index)=>{
                    if (item.MyCheck) {
                        val.push(item);
                    }
                });
                if(val.length == 1){
                    this.$emit('getYdata',val);
                }else{
                    this.$message({
                        message: '请选择一张优惠券',
                        type: 'error'
                    });
                }
            },

            goNextPage(val){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        // val.couponType = 1;
                        this._ajax('adminOrder/insertCoupon', val, msg => {
                            // console.log(msg);
                            // this.tableData = msg;
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            this.addYou = false;
                            // 刷新列表
                            this.getList();
                        },{logAdmin:this.bear.adminId})

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 开始时间结束时装换
            timeChange(val){
                console.log(this.addData.times);
                if (this.addData.times == null || this.addData.times == ''|| this.addData.times == undefined) {
                    this.addData.startTime = '';
                    this.addData.endTime = '';
                }else{

                    this.addData.endTime = this.addData.times[1];
                    this.addData.startTime = this.addData.times[0];
                }
            },
            addOpen(){
                this.addYou = true;
            },
            getTime(e) {
                if (e === null) {
                    this.headerMin.dateValue = "";
                }
                this.$emit('watchSeach', this.headerMin)
            },
            resect(){
                this.topData = {};
                this.getList();
            },
            getList(){
                this._ajax('adminOrder/getCouponList', this.topData, msg => {
                    console.log(msg);
                    this.tableData = msg;
                })
            },
        },
        components: {
            grey
        },
        mixins: [ mixin ],
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .You{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .banner3-dis{
        display: flex;
        flex-flow: row wrap;
        width: 900px;
        margin: 0 auto;
    }
    .YouOne{
        width: 275px;
        height: 160px;
        position: relative;
        border: 1px solid #ddd;
        overflow: hidden;
        background: #faa666;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .YouOne img.bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
    }
    .YouOne .content{
        position: relative;
        padding: 20px;
        color: #fff;
    }
    .YouOne .content .ban1>span{
        font-size: 20px;
    }
    .YouOne .content .ban1{
        font-size: 30px;
        font-weight: 700;
    }
    .YouOne .content .ban2{
        font-size: 16px;
    }
    .YouOne .content .ban3{
        font-size: 13px;
    }
    .YouOne .content .ban4{
        position: absolute;
        top: 8px;
        right: 15px;
    }
</style>
