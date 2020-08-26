<template>
    <el-card class="box-card">
        <el-form  :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <div>
                <el-form-item label="商品类型" prop="commodityType"  >
                    <el-radio label="1" v-model="ruleForm.commodityType">普通商品 </el-radio>
                    <el-radio label="2" v-model="ruleForm.commodityType">秒杀商品</el-radio>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="商品分组" prop="groupId" >
                    <el-select v-model="ruleForm.groupId" placeholder="请选择" @change="group">
                        <el-option
                            v-for="item in goodsGroup"
                            :key="item.groupId"
                            :label="item.group_name"
                            :value="item.groupId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="commodityName">
                    <el-input v-model="ruleForm.commodityName" style="width:450px"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="商品描述" prop="description">
                <el-input type="textarea" v-model="ruleForm.description" style="width:650px"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="商品价格" prop="realPrice" >
                    <el-input v-model="ruleForm.realPrice" style="width:100px" size="mini" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="划线价格" prop="originalPrice" >
                    <el-input v-model="ruleForm.originalPrice" style="width:100px" size="mini" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="已团" prop="sellOut" >
                    <el-input v-model.number="ruleForm.sellOut" style="width:100px" size="mini" ></el-input>份
                </el-form-item>
                <el-form-item label="仅剩" prop="surplus">
                    <el-input v-model.number="ruleForm.surplus" style="width:100px" size="mini"></el-input>份
                </el-form-item>
            </div>
            <div>
                <el-form-item label="距离结束时间" >
                    <el-form-item >
                        <el-date-picker type="date" placeholder="选择日期" v-model="endD" style="width: 100%;" value-format="yyyy-MM-dd" @change="clickEndDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="endT"
                            value-format="HH:mm"
                            :picker-options="{
                                start: '00:00',
                                step: '00:60',
                                end: '23:00'
                              }"
                            placeholder="选择时间" @change="endTime">
                        </el-time-select>
                    </el-form-item>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="商品规格" prop="specificationsNum">
                    <el-input v-model="ruleForm.specificationsNum" style="width:70px" size="mini"></el-input>
                </el-form-item>
                <el-form-item  prop="specifications">
                    <el-select v-model="ruleForm.specifications" placeholder="请选择" size="mini" style="width:100px">
                        <el-option
                            v-for="item in goodsSpecifications"
                            :key="item.id"
                            :label="item.specifications"
                            :value="item.specifications">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加规格">
                    <el-input v-model="specif" style="width:100px" size="mini"></el-input>
                    <el-button type="primary" size="mini" style="margin-top: 7px" @click="addSpecifications">确定添加</el-button>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="选择推荐分类" prop="type"  >
                    <el-checkbox-group v-model="value" style="width:800px" @change="choose">
                        <el-checkbox v-for="item in type" :label="item.classificationId" :key="item.classificationId" name="type">{{item.classification_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" " prop="type2"  >
                    <el-checkbox-group v-model="value2" style="width:800px" @change="choose2">
                        <el-checkbox v-for="item in goodsGroup2" :label="item.recommendClassId" :key="item.recommendClassId" name="type">{{item.recommend_class_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div class="clearfix">
                <div>
                    <span  class="title"><span style="color:red">*</span>添加商品轮播</span>
                    <!-- <div v-for="(item,index) in editTable.carousels" :key="index" style="float: left;text-align: center">
                        <up-ali
                            :defaultImg="item.carousel"
                            @getUrl="slideUrl2($event,index)"
                            :ref="'fileLoad'+index"
                            :fileNumber="1"
                        ></up-ali>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delImg(index)"></el-button>
                    </div> -->
                    <div style="float: left">
                        <up-ali2
                            :fileNumber="5"
                            @getUrl="slideUrl4($event)"
                            ref="fileLoad2"
                            :defaultImg="editTable.carousels"
                        ></up-ali2>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <span class="title"  ><span style="color:red">*</span>添加商品封面</span>
                    <up-ali
                        :defaultImg="editTable.commodity_img"
                        @getUrl="slideUrl1($event)"
                        ref="fileLoad1"
                        :fileNumber="1"
                    ></up-ali>
                </div>
            </div>
            <div>
                <div>
                    <span class="title">添加商品详情</span>
                    <up-ali3
                        :defaultImg="editTable.detailImgs"
                        @getUrl="slideUrl3($event)"
                        ref="fileLoad1"
                        :fileNumber="90"
                    ></up-ali3>
                </div>
            </div>
            <div>
                <div class="time">
                    <span><span style="color:red">*</span>上架时间</span>
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio label="1" @change="chooseUp">立即上架</el-radio>
                        <el-radio label="2" @change="chooseUp">暂不上架，放入仓库</el-radio>
                        <el-radio label="3" @change="chooseUp">定时上架</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <el-form-item label="选择上架时间" v-if="flag">
                    <el-form-item prop="date3">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="upD" style="width: 100%;" @change="clickUpDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="upT"
                            value-format="HH:mm"
                            :picker-options="{
                                start: '00:00',
                                step: '00:60',
                                end: '23:00'
                              }"
                            placeholder="选择时间" @change="clickUpTime">
                        </el-time-select>
                    </el-form-item>
                </el-form-item>
            </div>
            <div class="time">
                <div>
                    <span><span style="color:red">*</span>下架时间</span>
                    <el-radio-group v-model="xiaTime">
                        <el-radio label="1" @change="chooseOut">不设置</el-radio>
                        <el-radio label="2" @change="chooseOut">定时下架</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <el-form-item label="选择下架时间" v-if="flag1">
                    <el-form-item prop="date5">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="outD" style="width: 100%;" @change="clickOutDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="outT"
                            value-format="HH:mm"
                            :picker-options="{
                                    start: '00:00',
                                    step: '00:60',
                                    end: '23:00'
                                  }"
                            placeholder="选择时间" @change="clickOutTime">
                        </el-time-select>
                    </el-form-item>
                </el-form-item>
            </div>

            <el-form-item style="margin-left: 350px">
                <el-button type="primary" @click="submitForm('ruleForm')">{{submit}}</el-button>
                <el-button @click="$emit('close')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import upAli from '../../components/upload-ali'
    import upAli2 from '../../components/upload-ali2'
    import upAli3 from '../../components/upload-ali3'
    export default {
        name: "reGoods",
        props:['editTable','copyNum'],
        data() {
            return {
                bear:JSON.parse(sessionStorage.getItem('bear')),
                goodsGroup:[],
                goodsGroup2:[],
                goodsSpecifications:[],
                endD:'',
                endT:'',
                //上架日期
                upD:'',
                upT:'',
                //下架日期
                outD:'',
                outT:'',
                type: [],
                value:[],
                value2:[],
                //定时上下架
                flag:false,
                flag1:false,
                xiaTime:'1',
                //轮播图修改
                lunboAdd:'',
                lunboEdit:'',
                tableData:{},
                specif:'',//添加规格
                ruleForm: {
                    commodityId:'',
                    pictureId:'',
                    commodityName: '',
                    originalPrice:'',
                    realPrice:'',
                    groupId:'',
                    description:'',
                    surplus:'',
                    sellOut:'',
                    endTime:'',
                    sellTime:'',
                    removeTime:'',
                    status:'',
                    commodityImg:'',
                    carousel:'',
                    detailImg:'',
                    // classification:'',
                    classificationId:'',
                    commodityType:'',
                    specifications:'',
                    specificationsNum:''
                },
                submit:'',
                rules: {
                    commodityName: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入商品描述', trigger: 'blur' },
                    ],
                    realPrice: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' },
                    ],
                    originalPrice: [
                        { required: true, message: '请输入划线价格', trigger: 'blur' },
                    ],
                    surplus: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    specificationsNum: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    specifications: [
                        { required: true, message: '不能为空', trigger: 'change' },
                    ],
                    sellOut: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    groupId: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    shangpinLunbo:[
                        { required: true, message: '请上传商品轮播图', trigger: 'blur' }
                    ],
                    // sell: [
                    //     { required: true, message: '请选择上架方式', trigger: 'change' }
                    // ],
                    // xiaTime: [
                    //     { required: true, message: '请选择下架方式', trigger: 'change' }
                    // ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.getGroup();
            this.getRecommendClass();
            this.getClassify();
            this.requireData(1);
            this.getSpecifications();
            this.editTable.carousels.forEach(item=>{
                this.lunboAdd += item.carousel + ','
            });
            if(this.copyNum == 1){
                this.submit = '提交修改'
            }else{
                this.submit = '发布商品'
            }

        },
        methods:{
            ///请求列表数据
            requireData(p) {
                this._ajax('admin/getCommodity', {
                        page: 1,
                        pageSize: 15,
                        commodityId:this.editTable.commodityId,
                }, msg => {
                    this.tableData = msg.pageInfo.list[0];
                    console.log(this.tableData,'这是商品列表');
                    this.lookGoods();
                })
            },
            //渲染商品信息
            lookGoods(){
                this.ruleForm.commodityId = this.tableData.commodityId;
                this.ruleForm.pictureId = this.tableData.pictureId;
                this.ruleForm.commodityName = this.tableData.commodity_name;
                this.ruleForm.originalPrice = this.tableData.original_price;
                this.ruleForm.realPrice = this.tableData.real_price;
                // this.ruleForm.costPrice = this.tableData.cost_price;
                this.ruleForm.groupId = this.tableData.group_id;
                this.ruleForm.description = this.tableData.description;
                this.ruleForm.surplus = this.tableData.surplus;
                this.ruleForm.sellOut = this.tableData.sell_out;
                this.ruleForm.endTime = this.tableData.end_time;
                this.ruleForm.sellTime = this.tableData.sell_time;
                this.ruleForm.removeTime = this.tableData.remove_time;
                this.ruleForm.status = this.tableData.status.toString();
                this.ruleForm.commodityImg = this.tableData.commodity_img;
                this.ruleForm.carousel = this.tableData.carousel;
                this.ruleForm.detailImg = this.tableData.detail_img;
                // this.ruleForm.classification = this.tableData.classification;
                this.ruleForm.classificationId = this.tableData.classification_id;
                this.ruleForm.recommendClassId = this.tableData.recommendClassId;
                this.ruleForm.commodityType = this.tableData.commodity_type.toString();
                this.ruleForm.specificationsNum = this.tableData.specifications_num;
                this.ruleForm.specifications = this.tableData.specifications;
                console.log(this.ruleForm.commodityType);
                // let radio = this.ruleForm.commodityType;
                // if(radio=1){
                //     this.ruleForm.commodityType = 1;
                // }else {
                //     this.ruleForm.commodityType = 2;
                // }
                let endtime1 = this.ruleForm.endTime;
                let endTime2 = [];
                if(endtime1){
                    endTime2 = endtime1.split(' ');
                    this.endD = endTime2[0];
                    let endAll = endTime2[1];
                    let endT1 = endAll.split(':');
                    this.endT = endT1[0]+':'+endT1[1]
                }
                //定时上架
                let sellTime1 = this.ruleForm.sellTime;
                let sellTime2 = [];
                if(sellTime1 !==''){
                    sellTime2 = sellTime1.split(' ');
                    this.upD = sellTime2[0];
                    let upAll = sellTime2[1];
                    let upT1 = upAll.split(':');
                    this.upT = upT1[0]+':'+upT1[1]
                    this.ruleForm.status = '3'
                }else if(this.ruleForm.status == '1'|| this.ruleForm.status == '2'){
                    this.upD = '';
                    this.upT = '';
                }
                this.chooseUp(this.ruleForm.status.toString());


                //定时下架
                let outTime1 = this.ruleForm.removeTime;
                let outTime2 = [];
                if(outTime1 !==''){
                    outTime2 = outTime1.split(' ');
                    this.outD = outTime2[0];
                    let outAll = outTime2[1];
                    let outT1 = outAll.split(':');
                    this.outT = outT1[0]+':'+outT1[1]
                    this.xiaTime = '2'
                }else{
                    this.outD ='';
                    this.outT ='';
                    this.xiaTime = '1'
                }
                //判断定时下架
                if(this.ruleForm.removeTime !== ''){
                    this.xiaTime = '2';
                    this.flag1 = true;
                }else{
                    this.xiaTime = '1';
                    this.flag1 = false;
                }
                let fenlei = this.ruleForm.classificationId;
                let fen = [];
                if (typeof fenlei === 'string') {
                    fen = fenlei.split(',');
                    fen.pop();
                    fen.forEach((item,index)=>{
                        this.value.push(Number(item))
                    });
                }
                let fenlei2 = this.ruleForm.recommendClassId;
                let fen2 = [];
                if (typeof fenlei2 === 'string') {
                    fen2 = fenlei2.split(',');
                    fen2.pop();
                    fen2.forEach((item,index)=>{
                        this.value2.push(Number(item))
                    });
                }
            },
            //获取商品分组
            getGroup(){
                this._ajax('admin/getCommodityGroup', {
                }, msg => {
                    this.goodsGroup = msg;
                });
            },
            getRecommendClass(){
                this._ajax('admin/getRecommendClass', {
                }, msg => {
                    this.goodsGroup2 =msg;

                });
            },
            //获取商品规格
            getSpecifications(){
                this._ajax('admin/selectSpecifications', {
                }, msg => {
                    this.goodsSpecifications = msg;
                });
            },
            //添加商品规格
            addSpecifications(){
                if(this.specif.toString().trim()){
                    this._ajax('admin/insertSpecifications', {
                        specifications:this.specif
                    }, msg => {
                        this.getSpecifications();
                        this.specif = ''
                    });
                }else{
                    alert('请不要填写空值')
                    this.specif = ''
                }
            },
            //选择商品分组
            group(val){
            },
            //点击获取结束日期
            clickEndDate(val){
                this.endD = val;
            },
            //点击获取结束时间
            endTime(val){
                // val = val+':00';
                this.endT = val;
            },
            //获取商品分类
            getClassify(){
                this._ajax('admin/getClassification', {
                }, msg => {
                    this.type = msg;
                });
            },

            //选择的商品分类
            choose(value){
                this.value = value;
                //获取到选择的每一个分类id,用逗号拼接起来
                var goodsClassify ='';
                for(var i = 0;i < this.value.length;i++){
                    goodsClassify += this.value[i]+",";
                }
                this.ruleForm.classificationId = goodsClassify;
            },
            choose2(value){
                this.value2 = value;
                //获取到选择的每一个分类id,用逗号拼接起来
                var goodsClassify ='';
                for(var i = 0;i < this.value2.length;i++){
                    goodsClassify += this.value2[i]+",";
                }
                this.ruleForm.recommendClassId = goodsClassify;
            },
            //点击上架方式
            chooseUp(val){
                if(val == 1 || val == 2){
                    this.flag = false;
                    this.upD = '';
                    this.upT = '';
                    this.ruleForm.status = val
                }else{
                    this.flag = true;
                }
            },
            //点击获取上架日期
            clickUpDate(val){
                this.upD = val;
            },
            //点击获取上架时间
            clickUpTime(val){
                // val = val+':00';
                this.upT = val;
            },
            //点击下架方式
            chooseOut(val){
                if(val == 1){
                    this.flag1 = false;
                    this.outD = '';
                    this.outT = '';
                }else {
                    this.flag1 = true;
                }

            },
            //点击获取下架日期
            clickOutDate(val){
                this.outD = val;
            },
            //点击获取下架时间
            clickOutTime(val){
                // val = val+':00';
                this.outT = val;
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$router.push('/home/goods/goodsList')
            },
            slideUrl1(urlArr) {
                this.ruleForm.commodityImg = urlArr.toString();
            },
            slideUrl2(urlArr,num) {
                this.editTable.carousels[num].carousel = urlArr[0];
            },
            slideUrl4(urlArr) {
                let lunbo1 = '';
                //获取到选择的每一个权限,用逗号拼接起来
                for(var i = 0;i < urlArr.length;i++){
                    lunbo1 += urlArr[i]+",";
                }
                this.lunboAdd = lunbo1;
            },
            slideUrl3(urlArr) {
                let lunbo1 = '';
                //获取到选择的每一个权限,用逗号拼接起来
                for(var i = 0;i < urlArr.length;i++){
                    lunbo1 += urlArr[i]+",";
                }
                // this.lunboAdd = lunbo1;

                this.ruleForm.detailImg = lunbo1;
            },
            //点击修改删除轮播图
            delImg(i){
                this.editTable.carousels.splice(i,1);
            },
            submitForm(formName) {
                // let lunbo = '';
                // //获取到选择的每一个权限,用逗号拼接起来
                // for(var i = 0;i < this.editTable.carousels.length;i++){
                //     lunbo += this.editTable.carousels[i].carousel+",";
                // }
                // this.lunboEdit = lunbo;
                this.$refs[formName].validate((valid) => {
                    this.ruleForm.carousel = this.lunboAdd;
                    if (valid) {
                        //结束时间判断
                        if(this.endD == null || this.endT == null){
                            this.ruleForm.endTime = ''
                        }else if(this.endD == '' || this.endT == ''){
                            this.ruleForm.endTime = ''
                        }else{
                            this.ruleForm.endTime = this.endD+ ' '+this.endT + ':00';
                        }
                        //上架时间判断
                        if(this.upD == '' || this.upT == ''){
                            this.ruleForm.sellTime = ''
                        }else{
                            this.ruleForm.sellTime = this.upD + ' '+this.upT + ':00';
                        }
                        //下架时间判断
                        if(this.outD == '' || this.outT == ''){
                            this.ruleForm.removeTime = ''
                        }else{
                            this.ruleForm.removeTime = this.outD+' '+this.outT + ':00';
                        }
                        //判断添加图片
                        if(this.ruleForm.carousel ==''){
                            alert('请添加轮播图')
                        }else if(this.ruleForm.commodityImg ==''){
                            alert('请添加商品图片')
                        }else{
                            var url ='';
                            if(this.copyNum == 1){
                                url ='admin/updateCommodity'
                            }else{
                                url ='admin/insertCommodity'
                            }
                            this._ajax(url, this.ruleForm,msg => {
                                    this.$emit('close');
                                    this.requireData(1)
                                },{logAdmin:this.bear.adminId,logCustomer:this.ruleForm.commodityId});

                        }
                    } else {
                        return false;
                    }
                });

            },
        },
        components: {
            upAli,upAli2,upAli3
        },
    }
</script>

<style scoped>
.clearfix{
    overflow: hidden;
}
    .title{
        display: inline-block;
        margin-left: 25px;
        margin-right: 2px;
        float: left;
        color:#606266;
    }
    .time{
        line-height: 50px;
        color:#606266;
    }
.time span{
    display: inline-block;
    margin-left: 25px;
    margin-right: 10px;
}
</style>
