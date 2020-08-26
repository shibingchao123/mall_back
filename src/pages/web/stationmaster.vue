<template>
    <div class="userMsg">
        <TableHeader
            class="m-b-20"
            ref="tableHeader"
            :showoption="['crumbs']"
            :breadcrumb="{nameA: '运营管理', nameB: '站长管理'}">
        </TableHeader>
        <grey>
            <template v-slot:title>
                <div>站长申请管理</div>
            </template>
            <template v-slot:body>
                <div class="w10 box padding-20 flex-start img-Box">
                    <div class="img-border">
                        <img v-if="tableImg.length!==0" v-for="item in tableImg" :src="aliurl + item">
                        <div v-else>暂无图片</div>
                    </div>
                    <div>
                        <div class="tip tipBtn">
                            　　*为了保证流畅加载，请不要使用超多1M的图片。
                        </div>
                        <!-- <el-button size="small" class="green-btn setBtn" type="primary" @click="addImg">保存</el-button> -->
                        <el-button size="small" class="green-btn setBtn" type="primary" @click="upImg">上传图片</el-button>
                    </div>
                </div>
                <div class="displayN">
                    <ali ref="zhanImg" @getUrl="getUrl"></ali>
                </div>
            </template>
        </grey>
        <div class="dialog">
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="300px">
                    <div v-if="dialogVisible">
                        <up-ali2
                            :fileNumber="50"
                            @getUrl="getUrlImg($event)"
                            ref="fileLoad2"
                            :defaultImg="tableImg"
                        ></up-ali2>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addImg">确 定</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import TableHeader from '@/components/TableHeader'
    import grey from '@/components/order/greyTable';
    import ali from '@/components/upload-ali';

    import upAli2 from '../../components/upload-ali4'

    export default {
        name: 'classify',
        data() {
            return {
                bear: JSON.parse(sessionStorage.getItem("bear")),
                tableData: [{}],
                tableImg: [],
                dialogVisible: false,
                upDataImg: [],
            }
        },
        created() {
            this.getImg();
        },
        methods: {
            addImg(){
                this.tableImg = this.upDataImg;
                this.dialogVisible = false
                let abcImg = this.tableImg.join();
                this._ajax('admin/insertImage', {
                    img: abcImg,
                }, msg => {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.getImg();
                },{logAdmin:this.bear.adminId})
            },
            getUrl(val){
                console.log(val);
                if (val) {
                    this.tableImg = val[0];
                }else{

                }
            },
            getUrlImg(val){
                console.log(val);
                if (val.length !==0) {
                    this.upDataImg = val;
                }else{

                }
            },
            upImg(){
                // this.$refs.zhanImg.tapUp();
                this.dialogVisible = true;
            },

            getImg(){
                this.tableImg = [];
                this._ajax('admin/getImage', {}, msg => {
                    console.log(msg);
                    if (msg) {
                        // this.tableImg = msg.img;
                        let aimg = msg.img.split(',');
                        console.log(aimg);
                        aimg.forEach(item=>{
                            this.tableImg.push(item);
                        })
                        console.log(this.tableImg);
                        
                    }
                })
            },
        },
        components: {
            TableHeader, grey,ali,upAli2
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

    .img-border {
        width:350px;
        height: 560px;
        border: 1px solid #009999;
        overflow-y: scroll;
    }
    .img-border>div{
        line-height: 500px;
        text-align: center;
    }
    .img-border>img{
        display: block;
        width: 100%;
        /*height: 100%;*/
    }
    .setBtn{
        width:90px;
        height: 40px;
        margin-top: 430px;
        margin-left: 20px;
    }
    .displayN{
        display: block;
        width: 1px;
        height: 1px;
        overflow: hidden;
        /*display: none;*/
    }
    .img-Box{
        position: relative;
    }
    .tipBtn{
        position: absolute;
        bottom: 120px;
    }
</style>
