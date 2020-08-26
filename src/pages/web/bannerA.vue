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
                    选择banner活动商品
                </div>
                <div class="title" v-if="isEdit">
                    <div class="table">
                        <div class="tableBox borderR">
                            <div class="borderB">商品编号/优惠券编号</div>
                            <div>{{onlyInfo.commodity_code}}</div>
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
        <el-card class="box-card">
            <div class="pageHead">
                <div class="pageBox">
                    <div>
                        <span>商品分组：</span>
                        <el-select class="inputW" size="mini" v-model="topData.groupId" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in topSelect2"
                                :key="item.groupId"
                                :label="item.group_name"
                                :value="item.groupId">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>　商品ID：</span>
                        <el-input v-model="topData.commodityCode" placeholder="请输入内容" size="mini" clearable
                                  class="inputW"></el-input>
                    </div>
                </div>
                <div class="pageBox">
                    <!-- <div>
                        <span>商品状态：</span>
                        <el-select class="inputW" size="mini" v-model="topData.status" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in topSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div>
                        <span>商品名称：</span>
                        <el-input v-model="topData.commodityName" placeholder="请输入内容" size="mini" clearable
                                  class="inputW"></el-input>
                    </div>
                </div>
                <div class="pageBox">
                    <div>
                        <el-button size="small" type="primary" icon="el-icon-search" @click="getGoods(1)">
                            搜索
                        </el-button>
                        <el-button size="small" class="greenBtn" type="primary" icon="el-icon-refresh"
                                   @click="reSetting()">重置
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    商品信息
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
                                label="宝贝描述">
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
                </div>
                <!-- 分页 -->
                <el-pagination
                    @current-change="getGoods"
                    :current-page.sync="topData.page"
                    :page-size="6"
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
                                        label="宝贝描述">
                                        <template slot-scope="scope">
                                            
                                            <span>{{scope.row.commodity_name}}</span>
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
                    pageSize: 6,
                    status: 1,
                },
                topSelect: [
                    {value: 1, label: '已上架'},
                    {value: 2, label: '已下架'},
                    {value: 3, label: '待上架'},
                ],
                topSelect2: [
                    {value: '选项1', label: '111'},
                    {value: '选项2', label: '222'},
                ],
                dataTime: [],
                //下一步
                bannerNext:false,
            }
        },
        created() {
            this.getGoods(1);
            this.getFenLei();
        },
        methods: {
            getFenLei(){
                this._ajax('admin/getCommodityGroup', this.topData, msg => {
                    this.topSelect2 = msg;
                })
            },
            addBanner(val){
                if (val.bannerimg) {
                    this._ajax('admin/insertBanner', {
                        commodityId: val.commodityId,
                        bannerType: 1,
                        photo: val.bannerimg,
                    }, msg => {
                        this.$message({
                            message: '添加轮播图成功',
                            type: 'success'
                        });
                        this.$emit('close');
                    },{logAdmin:this.bear.adminId,logCustomer:val.commodityId})
                }else{
                    this.$message({
                        message: '请上传图片',
                        type: 'error'
                    });
                }
            },
            editBanner(val){
                if (val.bannerimg) {
                    this._ajax('admin/updateBanner', {
                        bannerId: this.onlyInfo.bannerId,
                        commodityId: val.commodityId,
                        bannerType: 1,
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
                        message: '请上传图片',
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
                        message: '请只选择一个商品创建banner',
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
                this.topData = {
                    page: 1,
                    pageSize: 6,
                    status: 1,
                };
                this.getGoods(1);
            },
            /*表格选中*/
            chooseData(val) {
                console.log(val);
                this.chooseList = val;
            },
            // 商品信息
            getGoods(p){
                this.topData.page = p;
                this._ajax('admin/getCommodity', this.topData, msg => {
                    this.tableData = msg.pageInfo.list;
                    this.tableTotal = msg.pageInfo.total;
                    if (this.isEdit) {
                        this.tableData.forEach((item,index)=>{
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
