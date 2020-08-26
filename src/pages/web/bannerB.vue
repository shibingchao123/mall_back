<template>
    <div class="userMsg">
        <el-card class="box-card flex-start"> 
            <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    {{{'true':'修改首页banner','false':'添加首页banner'}[isEdit]}}
                </div>
            </template>
            <template v-slot:body>
                <div class="title" v-if="!isEdit">
                    选择banner活动优惠券
                </div>
                <div class="title" v-if="isEdit">
                    <div class="table">
                        <div class="tableBox borderR">
                            <div class="borderB">商品编号/优惠券编号</div>
                            <div>{{onlyInfo.commodityCode}}</div>
                        </div>
                        <div class="tableBox">
                            <div class="borderB">商品图片/优惠券图片</div>
                            <div>
                                <img class="list-img" :src="aliurl+onlyInfo.photo">
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    优惠券信息
                </div>
            </template>
            <template v-slot:body>
                <div :style="{'width': '100%', 'height': (screenHeight - 200) + 'px'}" class="table-box">
                    <div class="m-b-10">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            style="width: 100%"
                            @selection-change="chooseData">
                            <el-table-column
                                type="selection"
                                width="38">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="优惠券描述">
                                <template slot-scope="scope">
                                    <span>满{{scope.row.min_limit}}减{{scope.row.discount}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="surplus"
                                align="center"
                                label="使用时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.begin_time}} - {{scope.row.end_time}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="num"
                                align="center"
                                label="发行数量">
                            </el-table-column>
    <!--                         <el-table-column
                                prop="group_name"
                                align="center"
                                label="商品分类">
                            </el-table-column> -->
                        </el-table>
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination
                    @current-change="getGoods"
                    :current-page.sync="topData.page"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="tableTotal">
                </el-pagination>
            </template>
        </grey>
        <div class="w10 flex-center bottom-btn">
            <el-button class="blue-btn" size="small" type="primary" @click="nextTap()">下一步</el-button>
        </div>
        <div>
            <!--选择商品下一步弹窗-->
            <el-dialog
                :visible.sync="bannerNext"
                width="60%"
                :before-close="bannerNextClose" append-to-body>
                <div v-if="bannerNext">
                    <grey>
                        <template v-slot:title>
                            <div>
                                确认banner活动商品
                            </div>
                        </template>
                        <template v-slot:body>
                            <div class="m-b-10">
                                <el-table
                                    
                                    :data="chooseList"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        align="center"
                                        label="优惠券描述">
                                        <template slot-scope="scope">
                                            <span>满{{scope.row.min_limit}}减{{scope.row.discount}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        align="center"
                                        label="上传图片"
                                        width="410">
                                        <template slot-scope="scope">
                                            <ali ref="zhanImg" @getUrl="getUrl" :defaultImg="scope.row.bannerimg"></ali>
                                            <!-- <span v-if="scope.row.bannerimg"> -->
                                                <!-- <img class="chooseList-img" :src="aliurl + scope.row.bannerimg"> -->
                                            <!-- </span> -->
                                            <!-- <div v-else>请上传 -->
                                                <div class="tip">
                                                    图片比例为15:8，推荐尺寸为750：400
                                                </div>
                                            <!-- </div> -->
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column
                                        align="center"
                                        label="操作">
                                        <template slot-scope="scope">
                                            <el-button class="blue-btn m-t-10" size="small" type="primary" @click="upImg">上传图片</el-button>
                                        </template>
                                    </el-table-column> -->
                                </el-table>
                                <div class="box1-btns m-t-20">
                                    <el-button v-if="isEdit" class="blue-btn" size="small" type="primary" @click="editBanner(chooseList[0])">确认修改</el-button>
                                    <el-button v-else class="blue-btn" size="small" type="primary" @click="addBanner(chooseList[0])">确认添加</el-button>
                                    <!-- editBanner -->
                                    <el-button size="small" @click="bannerNext = false">取消</el-button>
                                </div>
                                
                                <div class="displayN">
                                    <ali ref="zhanImg" @getUrl="getUrl"></ali>
                                </div>
                            </div>
                        </template>
                    </grey>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from '@/components/order/greyTable';
    import ali from '@/components/upload-ali-banner';

    export default {
        name: 'bannerA',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                tableData: [{}, {}],
                chooseList: [],
                tableTotal: 0,
                topData: {
                    page: 1,
                    pageSize: 10,
                },
                topSelect: [
                    {value: '选项1', label: '111'},
                    {value: '选项2', label: '222'},
                ],
                dataTime: [],
                //下一步
                bannerNext:false,
            }
        },
        created() {
            console.log(this.isEdit)
            console.log(this.onlyInfo)
            this.getGoods(1);

        },
        methods: {
            addBanner(val){
                if (val.bannerimg) {
                    this._ajax('admin/insertBanner', {
                        commodityId: val.couponId,
                        bannerType: 2,
                        photo: val.bannerimg,
                    }, msg => {
                        this.$message({
                            message: '添加轮播图成功',
                            type: 'success'
                        });
                        this.$emit('close');
                    },{logAdmin:this.bear.adminId,logCustomer:val.couponId})
                }else{
                    this.$message({
                        message: '请填写完整',
                        type: 'error'
                    });
                }
                
            },
            editBanner(val){
                if (val.bannerimg) {
                    this._ajax('admin/updateBanner', {
                        bannerId: this.onlyInfo.bannerId,
                        commodityId: val.couponId,
                        bannerType: 2,
                        photo: val.bannerimg,
                    }, msg => {
                        this.$message({
                            message: '修改轮播图成功',
                            type: 'success'
                        });
                        this.$emit('close');
                    },{logAdmin:this.bear.adminId,logCustomer:val.bannerId})
                }else{
                    this.$message({
                        message: '请填写完整',
                        type: 'error'
                    });
                }
                
            },
            getUrl(val){
                console.log(val);
                if (val) {
                    this.chooseList[0].bannerimg = val[0];
                    this.$set(this.chooseList[0],this.chooseList[0].bannerimg);
                    console.log(this.chooseList[0])
                    
                }
            },
            upImg(){
                this.$refs.zhanImg.tapUp();
            },
            //下一步
            nextTap() {
                if (this.chooseList.length == 1) {
                    if (this.isEdit) {
                        this.chooseList[0].bannerimg = this.onlyInfo.photo;
                    }
                    this.bannerNext=true;
                }else{
                    this.$message({
                        message: '请只选择一个优惠券创建banner',
                        type: 'error'
                    });
                }
            },
            bannerNextClose(){
                this.bannerNext=false
            },
            requireData() {

            },
            reSetting() {

            },
            /*表格选中*/
            chooseData(val) {
                console.log(val);
                this.chooseList = val;
            },
            // 商品信息
            getGoods(p){
                this.topData.page = p;
                this._ajax('adminOrder/getCouponList', this.topData, msg => {
                    console.log(msg)
                    this.tableData = msg;
                    // this.tableTotal = msg.pageInfo.total;
                    if (this.isEdit) {
                        this.tableData.forEach((item,index)=>{
                            if (item.couponId == this.onlyInfo.commodity_id) {
                                console.log(item.couponId);
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
        },
        components: {
            grey,ali
        },
        mixins: [mixin],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {}
                }
            },
            isEdit: {
                type: Boolean,
                default() {
                    return {}
                }
            },
        }
    }
</script>

<style scoped>
    .title {
        line-height: 50px;
        font-weight: 700;
        font-size: 18px;
        margin-left: 20px;
    }
    .bottom-btn{
        height: 50px;
    }
    .bottom-btn>button{
        width: 120px;
        height: 45px;
    }

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
    .displayN{
        display: block;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
    .chooseList-img{
        width: 260px;
        height: 120px;
        display: block;
    }
    .table{
        display: flex;
        width: 600px;
        justify-content: center;
    }
    .table .tableBox{
       /*padding: 5px 20px;*/
       border: 1px solid #ddd;
    }
    .tableBox>div{
        padding: 5px 50px;
    }
    .table .borderR{
        border-right:0;
    }
    .borderB{
        border-bottom: 1px solid #ddd;
    }
</style>
