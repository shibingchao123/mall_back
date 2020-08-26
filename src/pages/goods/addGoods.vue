<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px" >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
        <el-form  :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div>
                <el-form-item label="商品类型" prop="commodityType"  >
                    <el-radio-group v-model="ruleForm.commodityType">
                        <el-radio label="1" v-model="ruleForm.commodityType">普通商品 </el-radio>
                        <el-radio label="2" v-model="ruleForm.commodityType">秒杀商品</el-radio>
                        <!--<el-radio label="1" @change="chooseCommodity">普通商品 </el-radio>-->
                        <!--<el-radio label="2" @change="chooseCommodity">秒杀商品</el-radio>-->
                    </el-radio-group>
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
                <el-input type="textarea" v-model="ruleForm.description"style="width:795px"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="商品价格" prop="realPrice" >
                    <el-input v-model="ruleForm.realPrice" style="width:100px" size="mini" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="划线价格" prop="originalPrice" >
                    <el-input v-model="ruleForm.originalPrice" style="width:100px" size="mini" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="已团" prop="sellOut" >
                    <el-input v-model.number="ruleForm.sellOut" style="width:100px" size="mini"></el-input>份
                </el-form-item>
                <el-form-item label="仅剩" prop="surplus">
                    <el-input v-model.number="ruleForm.surplus" style="width:100px" size="mini"></el-input>份
                </el-form-item>
            </div>
            <div>
                <el-form-item label="距离结束时间" >
                    <el-form-item >
                        <el-date-picker type="date" placeholder="选择日期" v-model="endDate" style="width: 100%;" value-format="yyyy-MM-dd" @change="clickEndDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="ruleForm.endTime"
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
                <el-form-item label="添加规格" prop="specif">
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
                <el-form-item label=" " prop="type2"  >
                    <el-checkbox-group v-model="value2" style="width:800px" @change="choose2">
                        <el-checkbox v-for="item in goodsGroup2" :label="item.recommendClassId" :key="item.recommendClassId" name="type">{{item.recommend_class_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <span  class="title"><span style="color:red">*</span>添加商品轮播</span>
                    <up-ali
                        :fileNumber="5"
                        @getUrl="slideUrl2($event)"
                        ref="fileLoad2"
                    ></up-ali>
            </div>
            <div>
                <div>
                    <span  class="title"><span style="color:red">*</span>添加商品封面</span>
                    <div>
                        <up-ali
                            :fileNumber="1"
                            @getUrl="slideUrl1($event)"
                            ref="fileLoad1"
                        ></up-ali>
                    </div>
                </div>

            </div>
            <!-- <div>
                <el-form-item label="添加商品详情" prop="type3" >
                    <up-ali
                        :fileNumber="90"
                        @getUrl="slideUrl3($event)"
                        ref="fileLoad3"
                    ></up-ali>
                </el-form-item>
            </div> -->
            <div>
                <div>
                    <span class="title"><span style="color:#fff">*</span>添加商品详情</span>
                    <div style="overflow: hidden;">
                        <up-ali
                            :fileNumber="90"
                            @getUrl="slideUrl3($event)"
                            ref="fileLoad3"
                        ></up-ali>
                    </div>

                </div>
            </div>
            <div>
                <el-form-item label="上架时间" prop="sellTime"  >
                    <el-radio-group v-model="ruleForm.sellTime">
                        <el-radio label="1" @change="chooseUp">立即上架</el-radio>
                        <el-radio label="2" @change="chooseUp">暂不上架，放入仓库</el-radio>
                        <el-radio label="3" @change="chooseUp">定时上架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="选择上架时间" v-if="flag0">
                    <el-form-item prop="date3">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="upDate" style="width: 100%;" @change="clickUpDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="upTime"
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
            <div>
                <el-form-item label="下架时间" prop="removeTime" >
                    <el-radio-group v-model="ruleForm.removeTime">
                        <el-radio label="1" @change="chooseOut">不设置</el-radio>
                        <el-radio label="2" @change="chooseOut">定时下架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="选择下架时间" v-if="flag1">
                    <el-form-item prop="date5">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="outDate" style="width: 100%;" @change="clickOutDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <span>-</span>
                    </el-form-item>
                    <el-form-item >
                        <el-time-select
                            v-model="outTime"
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

            <el-form-item style="margin-left: 350px;margin-bottom: 100px">
                <el-button type="primary" @click="submitForm('ruleForm')">添加商品</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script>
    import upAli from '../../components/upload-ali'
    export default {
        name: "reGoods",
        props:['editTable'],
        /*watch: {
            editTable: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    this.ruleForm = newValue;
                }
            },
        },*/
        data() {
            return {
                bear:JSON.parse(sessionStorage.getItem('bear')),
                goodsGroup:[],
                goodsGroup2:[],
                goodsSpecifications:[],//商品规格
                endDate: '',
                endD:'',
                endT:'',
                //上架日期
                upDate:'',
                upTime:'',
                upD:'',
                upT:'',
                //下架日期
                outDate:'',
                outTime:'',
                outD:'',
                outT:'',
                type: [],
                value:[],
                value2:[],
                //定时上下架
                flag:false,
                flag1:false,
                //商品类型
                flag0:false,
                specif:'',//添加规格
                ruleForm: {
                    commodityName: '',
                    originalPrice:'',
                    realPrice:'',
                    costPrice:1,
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
                    classification:'',
                    classificationId:'',
                    commodityType:'1',
                    specificationsNum:'',//商品规格数量
                    specifications:''
                },
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
                    sellTime: [
                        { required: true, message: '请选择上架方式', trigger: 'change' }
                    ],

                    removeTime: [
                        { required: true, message: '请选择下架方式', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            // this.ruleForm = this.editTable;
            /*this.ruleForm.commodityName = this.editTable.commodity_name;
            this.ruleForm.originalPrice = this.editTable.originalPrice;*/
            this.getGroup();
            this.getRecommendClass();
            this.getClassify();
            this.getSpecifications();
            this.value = []
        },
        methods:{
            //获取商品分组
            getGroup(){
                this._ajax('admin/getCommodityGroup', {
                }, msg => {
                    this.goodsGroup =msg;
                });
            },
            getRecommendClass(){
                this._ajax('admin/getRecommendClass', {
                }, msg => {
                    this.goodsGroup2 =msg;

                });
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
                val = val+':00';
                this.endT = val;
            },
            //获取商品分类
            getClassify(){
                this._ajax('admin/getClassification', {
                }, msg => {
                    this.type = msg;
                    for(let i = 0;i<msg.length;i++){
                        this.value.push(msg[i].classificationId)
                    }
                    this.ruleForm.classificationId = this.value.toString();
                    // this.value = [msg[0].classificationId,msg[1].classificationId,msg[2].classificationId];
                    // this.ruleForm.classificationId = msg[0].classificationId+ ','+msg[1].classificationId+','+msg[2].classificationId+',';
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
                    this.flag0 = false;
                }else{
                    this.flag0 = true;
                }
                this.ruleForm.status = val
            },
            //点击获取上架日期
            clickUpDate(val){
                this.upD = val;
            },
            //点击获取上架时间
            clickUpTime(val){
                val = val+':00';
                this.upT = val;
            },
            //点击下架方式
            chooseOut(val){
                if(val == 1){
                    this.flag1 = false;
                }else{
                    this.flag1 = true;
                }
            },
            //点击获取下架日期
            clickOutDate(val){
                this.outD = val;
            },
            //点击获取下架时间
            clickOutTime(val){
                val = val+':00';
                this.outT = val;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.classificationId == ''){
                            this.ruleForm.classification = 0;
                        }else{
                            this.ruleForm.classification = 1;
                        }
                        //结束时间判断
                        if(this.endD == '' || this.endT == ''){
                            this.ruleForm.endTime = '1'
                        }else{
                            this.ruleForm.endTime = this.endD+ ' '+this.endT;
                        }
                        //上架时间判断
                        if(this.upD == '' || this.upT == ''){
                            this.ruleForm.sellTime = '1'
                        }else{
                            this.ruleForm.sellTime = this.upD + ' '+this.upT;
                        }
                        //下架时间判断
                        if(this.outD == '' || this.outT == ''){
                            this.ruleForm.removeTime = '1'
                        }else{
                            this.ruleForm.removeTime = this.outD+' '+this.outT;
                        }

                        //判断添加图片
                        if(this.ruleForm.carousel ==''){
                            alert('请添加轮播图')
                        }else if(this.ruleForm.commodityImg ==''){
                            alert('请添加商品图片')
                        }else{
                            this._ajax('admin/insertCommodity', this.ruleForm,msg => {
                                this.$router.push('/home/goods/goodsList')
                            },{logAdmin:this.bear.adminId})
                        }
                    } else {
                        return false;
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$router.push('/home/goods/goodsList')
            },
            slideUrl1(urlArr) {
                this.ruleForm.commodityImg = urlArr.toString();
            },
            slideUrl2(urlArr) {
                let lunbo = '';
                //获取到选择的每一个权限,用逗号拼接起来
                for(var i = 0;i < urlArr.length;i++){
                    lunbo += urlArr[i]+",";
                }
                this.ruleForm.carousel = lunbo;
            },
            slideUrl3(urlArr) {
                let lunbo = '';
                //获取到选择的每一个权限,用逗号拼接起来
                for(var i = 0;i < urlArr.length;i++){
                    lunbo += urlArr[i]+",";
                }
                this.ruleForm.detailImg = lunbo;
            }
        },
        components: {
            upAli
        },
    }
</script>

<style scoped>
    .title{
        display: inline-block;
        margin-left: 16px;
        margin-right: 2px;
        float: left;
        color:#606266;
    }
</style>
