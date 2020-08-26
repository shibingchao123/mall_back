<template>
    <div class="orderMsg">
        <div  v-cloak class="boxOne" v-if="ShowStep == 1">
            <grey>
                <template v-slot:title>
                    <div>
                        活动设置
                    </div>
                </template>
                <template v-slot:body>
                    <div class="box1">
                        <el-form size="mini" :model="addData" ref="ruleForm" label-width="150px" class="demo-ruleForm" :inline-message="true">
                            <el-form-item label="活动名称" prop="activityName"

                            :rules="[{required: true, message: '活动名称不能为空', trigger: 'blur'},
                                    { min: 1, max: 8, message: '最多输入8个字', trigger: 'blur' }]"
                            >
                                <el-input v-model="addData.activityName" class="inputW"></el-input>
                            </el-form-item>
                            <el-form-item label="选择使用形式" prop="status"

                            :rules="{required: true, message: '请选择使用形式', trigger: 'change'}"
                            >
                                <el-select v-model="addData.status" placeholder="请选择使用形式" class="inputW">
                                    <el-option
                                        v-for="item in addStu"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择优惠时间" prop="endTime"

                            :rules="{required: true, message: '请选择优惠时间', trigger: 'change'}"
                            >
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
                            <!-- <el-form-item label="开始时间" prop="name"

                            :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                            >
                                <el-input v-model="addData.name" class="inputW"></el-input>
                            </el-form-item>
                            <el-form-item label="结束时间" prop="name"

                            :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                            >
                                <el-input v-model="addData.name" class="inputW"></el-input>
                            </el-form-item> -->
                            <el-form-item label="活动描述" prop="activityDescription"

                            :rules="{required: true, message: '活动描述不能为空', trigger: 'blur'}"
                            >
                                <p class="tip">互动描述仅用于商家自己管理活动，不会显示给消费者</p>
                                <el-input type="textarea" v-model="addData.activityDescription" class="inputText"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </grey>
            <div class="box1-btns">
                <el-button type="primary" @click="goNextPage()">下一步</el-button>
                <!-- <el-button>取消</el-button> -->
            </div>
        </div>
        <div v-cloak class="boxTwo" v-if="ShowStep == 2">
            <!-- 第一框 -->
            <grey>
                <template v-slot:title>
                    <div>
                        选择优惠券活动商品
                    </div>
                </template>
                <template v-slot:body>
                    <div class="box2">
                        <div class="box1-head">
                            <div class="pageBox">
                                <div>活动名称：{{addData.activityName}}</div>
                            </div>
                            <div class="pageBox">
                                <div>活动时间：{{addData.startTime}}　至　{{addData.endTime}}</div>
                            </div>
                        </div>
                        <div>活动描述：{{addData.activityDescription}}</div>
                    </div>
                </template>
            </grey>
            <!-- 第二框 -->
            <grey>
                <template v-slot:title>
                    <div>
                        优惠设置
                    </div>
                </template>
                <template v-slot:body>
                    <div class="box2">
                        <div class="box2-choose">
                            <span class="red">*</span>优惠方式： 优惠券
                            <el-button type="danger" plain size="mini" class="box2-btn" @click="chooseYouOpen">设置优惠券</el-button>
                        </div>
                    </div>
                </template>
            </grey>
            <!-- 第三框 -->
            <div class="goodPaper" >
                <div class="YouOne" v-for="item in chooseYList">
                    <img class="bg" src="../../assets/images/header.jpg">
                    <div class="content">
                        <div class="ban1"><span>&yen;</span>{{item.discount}}</div>
                        <div class="ban2">满{{item.min_limit}}使用</div>
                        <div class="ban3">使用时间：{{item.begin_time}}</div>
                        <div class="ban3">　　　　　{{item.end_time}}</div>
                        <div class="ban3">发行数量：{{item.num}}</div>
                        <div class="ban3">优惠券类型：{{{'1':'普通优惠券','2':'新人优惠券','3':'全平台优惠券'}[item.coupon_type]}}</div>
                    </div>
                </div>
                <div class="notitle" v-if="chooseYList.length == 0" v-cloak>暂无选择</div>
            </div>
            <!-- 第四框-抖抖 -->
            <grey v-if="hiddenshop">
                <template v-slot:title>
                    <div>
                        选择活动商品
                    </div>
                </template>
                <template v-slot:body>
                    <div class="box1">
                        <div class="box1-banner3">
                            <div><span>商品分组:</span>
                                <el-select class="inputW" size="mini" v-model="pageType.groupId" placeholder="请选择" clearable>
                                    <el-option
                                        v-for="item in topSelect2"
                                        :key="item.groupId"
                                        :label="item.group_name"
                                        :value="item.groupId">
                                    </el-option>
                                </el-select>
                            </div>
                            <!-- <div><span>商品状态:</span>
                                <el-select class="inputW" size="mini" v-model="pageType.status" placeholder="请选择" clearable>
                                    <el-option
                                        v-for="item in topSelect"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div> -->
                            <div><span>商品名称:</span>
                                <el-input v-model="pageType.commodityName" placeholder="请输入内容" size="mini" clearable
                                  class="inputW"></el-input>
                            </div>
                            <div><span>商品ID:</span>
                                <el-input v-model="pageType.commodityCode" placeholder="请输入内容" size="mini" clearable
                                  class="inputW"></el-input>
                            </div>
                            <div>
                                <el-button type="primary" plain size="mini" class="box2-btn" @click="getGoods(1)">搜索</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="box2">
                        <div :style="{'width': '100%', 'height': (screenHeight - 242) + 'px'}" class="table-box">
                            <el-table
                                ref="multipleTable"
                                :data="shopList"
                                border
                                @selection-change="chooseData">
                                <el-table-column
                                    type="selection"
                                    width="38">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    label="宝贝描述"
                                    min-width="110">
                                    <template slot-scope="scope">
                                        <div class="clearfix table-img">
                                            <img class="list-img-small" :src="aliurl + scope.row.commodity_img">
                                            <div>{{scope.row.commodity_name}}</div>
                                            <div>{{scope.row.commodity_code}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="original_price"
                                    align="center"
                                    label="价格">
                                </el-table-column>
                                <el-table-column
                                    prop="surplus"
                                    align="center"
                                    label="库存">
                                </el-table-column>
                                <el-table-column
                                    prop="status"
                                    align="center"
                                    label="状态">
                                    <template slot-scope="scope">
                                        <span>{{{'1':'已上架','2':'已下架','3':'待上架'}[scope.row.status]}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="group_name"
                                    align="center"
                                    label="商品分类">
                                </el-table-column>
                            </el-table>
                        </div>
                       <!--  <el-pagination
                            @current-change="getGoods"
                            :current-page.sync="pageType.page"
                            :page-size="4"
                            layout="prev, pager, next, jumper"
                            :total="tableTotal">
                        </el-pagination> -->
                    </div>
                </template>
            </grey>
            <div class="box1-btns">
                <el-button @click="ShowStep = 1">上一步</el-button>

                <!--<el-button type="primary"  @click="submitAdd1()">保存3</el-button>-->
                <el-button type="primary" v-if="chooseYList[0].coupon_type == 3" @click="submitAdd1(addData)">保存</el-button>
                <el-button type="primary" v-if="chooseYList[0].coupon_type == 1||chooseYList[0].coupon_type == 2" @click="submitAdd(addData)">保存</el-button>
            </div>
            <!-- 增高垫 -->
            <div style="width: 1px;height: 80px;"></div>
        </div>
        <div class="dialog">
            <el-dialog
                :visible.sync="chooseYou"
                width="80%"
                :before-close="chooseYouClose">
                    <div v-if="chooseYou" v-cloak>
                        <chooseYou :onlyInfo="onlyInfo" @close="chooseYouClose" @getYdata="getYdata($event)"></chooseYou>
                    </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';

    import chooseYou from './chooseYou';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                ShowStep: 1,
                addData:{
                    endTime:'',
                },
                addStu:[{name:'优惠券'}],
                tableTotal: 0,
                // 获取轮播图参数
                pageType: {
                    page: 1,
                    pageSize: 99999,
                    status: 1,     //状态:1未通过2通过3驳回4拉黑
                },

                // 优惠券
                chooseYou: false,

                chooseYList:[
                    {coupon_type:'',}
                ],
                onlyInfo:{},
                shopList: [],
                shopChoose:[],
                topSelect: [
                    {value: 1, label: '已上架'},
                    {value: 2, label: '已下架'},
                    {value: 3, label: '待上架'},
                ],
                topSelect2: [
                    {value: '选项1', label: '111'},
                    {value: '选项2', label: '222'},
                ],
                //隐藏选择活动商品
                hiddenshop:true,
            }
        },
        created () {
            this.getGoods(1);
            this.getFenLei();
        },
        methods: {
            getFenLei(){
                this._ajax('admin/getCommodityGroup', this.topData, msg => {
                    this.topSelect2 = msg;
                })
            },
            submitAdd(val){
                if (val.couponId) {
                    if (this.shopChoose.length == 0) {
                        this.$message({
                            message: '请选择商品',
                            type: 'error'
                        });
                    }else{
                        let shopid = '';
                        this.shopChoose.forEach((item,index)=>{
                            if (index == this.shopChoose.length -1) {
                                shopid += item.commodityId;
                            }else{
                                shopid += item.commodityId + ',';
                            }

                        });
                        this._ajax('adminOrder/insertActivityList', {
                            activityName: val.activityName,
                            activityDescription: val.activityDescription,
                            couponId: val.couponId,
                            commodityId: shopid,
                            startTime: val.startTime,
                            endTime: val.endTime,
                        }, msg => {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.push({name:'MarketList'});
                        },{logAdmin:this.bear.adminId,logCustomer:val.couponId})
                    }
                }else{
                    this.$message({
                        message: '请选择优惠券',
                        type: 'error'
                    });
                }

            },
            submitAdd1(val){
                console.log(val);
                this._ajax('adminOrder/insertActivityList', {
                    activityName: val.activityName,
                    activityDescription: val.activityDescription,
                    couponId: val.couponId,
                    commodityId: 0,
                    startTime: val.startTime,
                    endTime: val.endTime,
                }, msg => {
                    console.log(msg);
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$router.push({name:'MarketList'});
                },{logAdmin:this.bear.adminId,logCustomer:val.couponId})
            },
            getYdata(data){
                console.log(data);
                this.chooseYList = data;
                // this.shopList = data1;
                this.addData.couponId = data[0].couponId;
                if(data[0].coupon_type== 3){
                    this.hiddenshop=false;
                    console.log(data[0].coupon_type);
                    // this.shopList[0].commodityId  =" 0";
                    // console.log(this.shopList[0].commodityId);
                }else{
                    this.hiddenshop=true;
                    console.log("啊哈哈哈哈"+data[0].coupon_type)
                }
                this.chooseYouClose();
            },
            // 商品信息
            getGoods(p){
                this.pageType.page = p;
                this._ajax('admin/getCommodity', this.pageType, msg => {
                    this.shopList = msg.pageInfo.list;
                    console.log("chen"+msg.pageInfo.list);
                    this.tableTotal = msg.pageInfo.total;
                    if (this.isEdit) {
                        this.shopList.forEach((item,index)=>{
                            if (item.commodity_code == this.onlyInfo.commodity_code) {
                                console.log(item.commodity_name);
                                this.chooseList = item;
                                this.chooseList.bannerimg = this.onlyInfo.photo;
                                let _this = this;
                                setTimeout(function(){
                                    _this.$refs.multipleTable.toggleRowSelection(item);
                                },30)
                            }
                        })
                    }
                })
            },
            chooseYouOpen(){
                this.chooseYou = true;
            },
            chooseYouClose(){
                this.chooseYou = false;
            },
            chooseData(val){
                console.log(val);
                this.shopChoose = val;
            },
            goNextPage(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.ShowStep = 2;
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
                    this.addData.startTime = this.addData.times[0];
                    this.addData.endTime = this.addData.times[1];
                }
            },
            getTime(e) {
                if (e === null) {
                    this.headerMin.dateValue = "";
                }
                this.$emit('watchSeach', this.headerMin)
            },
            requireData(p) {
                this.pageType.page = p;
                this._ajax('user/getUser', this.pageType, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                })
            },
        },
        components: {
            grey,chooseYou,
        },
        mixins: [ mixin ],
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderMsg{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .box1-head-1{
        padding: 20px;
    }
    .box1-head{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .box1-title{
        font-size: 20px;
        font-weight: 700;
        padding: 0 20px;
    }
    .box1-title-btn{
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        float: right;
        cursor: pointer;
    }
    .box1-banner2-btn{
        font-size: 14px;
        padding: 3px 20px;
        background: #6699CC;
        display: inline-block;
        color: #fff;
        margin-top: 10px;
        border: 1px solid #ddd;
    }
    .red{
        color: #f44;
    }
    .box2{
        padding: 20px;
    }
    .pageBox{
        line-height: 25px;
    }
    .box2-btn{
        margin-left: 10px;
    }
    .goodPaper{
        width: 240px;

        height: 160px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    .goodPaper .notitle{
        line-height: 140px;
        text-align: center;
        border: 1px solid #000;
    }

    .box1-banner3{
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
    }
    .inputText{
        width: 350px;
    }

    .YouOne{
        width: 275px;
        /*height: 127px;*/
;
        height: 160px;
        position: relative;
        border: 1px solid #ddd;
        overflow: hidden;
        background: #faa666;
        margin-bottom: 20px;
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
