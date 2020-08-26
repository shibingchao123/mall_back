<template>
    <div class="userMsg">
        <TableHeader
            class="m-b-20"
            ref="tableHeader"
            :showoption="['crumbs']"
            :breadcrumb="{nameA: '运营管理', nameB: 'banner管理'}">
        </TableHeader>
        <grey>
            <template v-slot:title>
                <div class="box flex-between p-r-50">
                    <span>首页banner管理</span>
                    <el-button size="small" class="greenBtn" type="primary" @click="addBanner()">新增</el-button>
                </div>
            </template>
            <template v-slot:body>
                <div>
                    <div :style="{'width': '100%', 'height': (screenHeight - 165) + 'px'}" class="table-box">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                align="center"
                                label="顺序">
                            </el-table-column>
                            <!-- <el-table-column
                                align="center"
                                label="序号"
                                width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.sort}}</span>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="commodity_code"
                                align="center"
                                label="商品/优惠券编号">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.banner_type == 3">积分签到</div>
                                    <div v-else>{{scope.row.commodity_id}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="photo"
                                label="商品/优惠券图片">
                                <template slot-scope="scope">
                                    <div>
                                        <img class="list-img" :src="aliurl + scope.row.photo">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="editOpen(scope.row)">编辑</el-button>
                                    <el-button type="text" size="small" @click="GoOnline(scope.row,1)">上移</el-button>
                                    <el-button type="text" size="small" @click="GoOnline(scope.row,2)">下移</el-button>
                                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </template>
        </grey>
        <!-- 分页 -->
        <!-- <el-pagination
            @current-change="requireData"
            :current-page.sync="topData.page"
            :page-size="15"
            layout="prev, pager, next, jumper"
            :total="tableTotal">
        </el-pagination> -->
        <div>
            <el-dialog
                :visible.sync="bannerISshow"
                width="500px">
                <div v-if="bannerISshow">
                    <div>banner内容类型</div>
                    <div class="m-t-20">
                        <el-radio-group v-model="isbannerA">
                            <el-radio-button :label="1">商品轮播图</el-radio-button>
                            <el-radio-button :label="2">优惠券轮播图</el-radio-button>
                            <el-radio-button :label="3">积分签到</el-radio-button>
                            <el-radio-button :label="4">普通banner</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="box1-btns m-t-20">
                        <el-button v-if="isbannerA == 1" type="primary" size="small" @click="bannerAshow = true,bannerISshow = false">确认</el-button>
                        <el-button v-else-if="isbannerA == 3||isbannerA == 4" type="danger" size="small" @click="bannerCshow = true,bannerISshow = false">确认</el-button>
                        <el-button v-else type="danger" size="small" @click="bannerBshow = true,bannerISshow = false">确认</el-button>
                        <el-button size="small" @click="bannerISshow = false">取消</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--新增bannerA-->
            <!-- 新增商品轮播图的A -->
            <el-dialog
                :visible.sync="bannerAshow"
                width="85%"
                :before-close="bannerAshowClose">
                <div v-if="bannerAshow">
                    <bannerA :isEdit="isEdit" :onlyInfo="onlyInfo" @close="bannerAshowClose"></bannerA>
                </div>
            </el-dialog>
            <!-- 新增优惠券轮播图的B -->
            <el-dialog
                :visible.sync="bannerBshow"
                width="85%"
                :before-close="bannerBshowClose">
                <div v-if="bannerBshow">
                    <bannerB :isEdit="isEdit" :onlyInfo="onlyInfo" @close="bannerBshowClose"></bannerB>
                </div>
            </el-dialog>
            <!-- 新增商品轮播图的C-积分签到 -->
            <el-dialog
                :visible.sync="bannerCshow"
                width="450px"
                :before-close="bannerCshowClose">
                <div v-if="bannerCshow">
                    <h5 class="bannerC-head">
                        {{{'3':'积分签到banner图','4':'普通banner图'}[isbannerA]}}
                    {{{false:'添加',true:'修改'}[isEdit]}}</h5>
                    <div class="bannerC-img">
                        <!-- <img v-if="onlyInfo.bannerCimg" :src="aliurl + onlyInfo.bannerCimg"> -->
                        <!-- <div v-if="onlyInfo.bannerCimg"> -->
                        <ali ref="zhanImg" @getUrl="getUrl" :defaultImg="onlyInfo.bannerCimg"></ali>
                        <!-- </div> -->
                        <!-- <div v-else>暂无数据。</div> -->
                    </div>
                    <div class="tip m-t-20" style="text-align: center;">*图片比例为15:8，推荐尺寸为750：400。</div>
                    <!-- <div class="displayN"> -->
                        
                    <!-- </div> -->
                    <div class="box1-btns m-t-20">
                        <!-- <el-button type="primary" size="small" @click="upImg">上传</el-button> -->
                        <el-button type="danger" size="small" @click="submitBanC(onlyInfo)">确认提交</el-button>
                        <el-button size="small" @click="bannerCshowClose()">取消</el-button>
                    </div>
                </div>
            </el-dialog>
    </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import TableHeader from '@/components/TableHeader'
    import grey from '@/components/order/greyTable';
    import ali from '@/components/upload-ali-banner';
    import bannerA from './bannerA';
    import bannerB from './bannerB';

    export default {
        name: 'classify',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                topData:{
                    page: 1,
                    pageSize: 15,
                },
                tableTotal: 0,
                tableData: [],
                bannerAshow:false,
                bannerBshow:false,
                bannerCshow: false,
                onlyInfo:{
                    bannerCimg:'',
                },
                bannerISshow: false,
                isbannerA: 1,
                isEdit: false,
            }
        },
        created() {
            this.requireData(1)
        },
        methods: {
            getUrl(val){
                console.log(val);
                if (val.length) {
                    this.onlyInfo.bannerCimg = val[0];
                    this.$set(this.onlyInfo,this.onlyInfo.bannerCimg)
                }else{
                    this.onlyInfo.bannerCimg = '';
                    this.$set(this.onlyInfo,this.onlyInfo.bannerCimg);
                    console.log(this.onlyInfo.bannerCimg)
                }
            },
            upImg(){
                this.onlyInfo.bannerCimg = '';
                this.$refs.zhanImg.tapUp();
            },
            submitBanC(data){
                if (this.isEdit) {
                    if (data.bannerCimg) {
                        this._ajax('admin/updateBanner', {
                            bannerId: data.bannerId,
                            commodityId: 0,
                            bannerType: this.isbannerA,
                            photo: data.bannerCimg,
                        }, msg => {
                            this.$message({
                                message: '修改轮播图成功',
                                type: 'success'
                            });
                            this.bannerCshowClose();
                        },{logAdmin:this.bear.adminId,logCustomer:data.bannerId})
                    }else{
                        this.$message({
                            message: '请上传图片',
                            type: 'error'
                        });
                    }
                }else{
                    if (data.bannerCimg) {
                        this._ajax('admin/insertBanner', {
                            commodityId: 0,
                            bannerType: this.isbannerA,
                            photo: data.bannerCimg,
                        }, msg => {
                            this.$message({
                                message: '添加轮播图成功',
                                type: 'success'
                            });
                            this.bannerCshowClose();
                        },{logAdmin:this.bear.adminId})
                    }else{
                        this.$message({
                            message: '请上传图片',
                            type: 'error'
                        });
                    }
                }
            },
            editOpen(val){
                this.isEdit = true;
                this.onlyInfo = val;
                if (val.banner_type == 2) {
                    this.bannerBshow = true;
                }else if(val.banner_type == 1){
                    this.bannerAshow = true;
                }else{
                    this.bannerCshow = true;
                    this.onlyInfo.bannerCimg = val.photo;
                }
            },
            // 删除
            del(val){
                this.$confirm('确认执行删除操作？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._ajax('admin/updateBannerStatus', {
                        bannerId: val.bannerId,
                        status: 0,
                    }, msg => {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.requireData(1);
                    },{logAdmin:this.bear.adminId,logCustomer:val.bannerId})
                }).catch(() => {

                });

            },
            /* 获取列表*/
            requireData(p) {
                this.topData.page = p;
                this._ajax('admin/getBanner', this.topData, msg => {
                    console.log(msg);
                    this.tableData = msg;
                })
            },
            GoOnline(val,num){
                let url = '';
                if (num == 1) {
                    url = 'admin/updateBannerMoveUp';
                }else if (num == 2) {
                    url = 'admin/updateBannerMoveDown';
                }
                this._ajax(url,
                    {
                        bannerId: val.bannerId,
                        move: num
                    }
                    , msg => {
                    this.$message({
                        message: {'1':'上移','2':'下移'}[num]+'成功',
                        type: 'success'
                    });
                    this.requireData();
                },{logAdmin:this.bear.adminId,logCustomer:val.bannerId})

            },
            /*新增banner*/
            addBanner(){
                // this.bannerAshow=true;
                this.bannerISshow = true;
            },
            bannerAshowClose(data){
                this.isEdit = false;
                this.onlyInfo={};
                this.bannerAshow=false;
                this.requireData(1)
            },
            bannerBshowClose(data){
                this.isEdit = false;
                this.onlyInfo={};
                this.bannerBshow=false;
                this.requireData(1)
            },
            bannerCshowClose(){
                this.isEdit = false;
                this.onlyInfo = {};
                this.bannerCshow = false;
                this.requireData(1);
            }
        },
        components: {
            TableHeader,grey,bannerA,bannerB,ali
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
    .bannerC-img{
        width: 375px;
        height: 200px;
        /*border: 1px solid #ddd;*/
        text-align: center;
        margin: 0 auto;
    }
    .bannerC-img>img{
        width: 100%;
        height: 100%;
    }
    .bannerC-img>div{
        line-height: 200px;
    }
    .bannerC-head{
        font-size: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
    .displayN{
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
</style>
