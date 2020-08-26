<template>
    <div class="goodsD">
        <div class="goodsD-left">
            <div class="detail">
                <label>商品编号：<span>{{table.commodity_code}}</span></label>
            </div>
            <div class="detail">
                <!--<label>商品类型：<span :datas="param">{{table.commodity_type}}</span></label>-->
                <label>商品类型：<span class="fs18" v-if="table.commodity_type == 1">普通商品</span>
                    <span class="fs18" v-if="table.commodity_type == 2">秒杀商品</span>
                </label>
            </div>
            <div class="detail">
                <label>商品名称：<span style="display: inline-block; width:550px;vertical-align: top">{{table.commodity_name}}</span></label>
            </div>
            <div class="detail">
                <label>商品分组：<span>{{table.group_name}}</span></label>
            </div>
            <div class="detail">
                <label>商品描述：<span style="display: inline-block; width:550px;vertical-align: top">{{table.description}}</span></label>
            </div>
            <div class="detail">
                <label>商品价格：<span>{{table.real_price}}</span></label>
                <label>划线价格：<span>{{table.original_price}}</span></label>
                <label>已团：<span>{{table.sell_out}}</span></label>
                <label>仅剩：<span>{{table.surplus}}</span></label>
            </div>
            <div class="detail">
                <label>距离结束时间：<span>{{table.end_time}}</span></label>
            </div>
            <div class="detail">
                <label>商品规格：<span>{{table.specifications_num}}{{table.specifications}}</span></label>
            </div>
            <div class="detail">
                <label>选择分类：
                    <span style="display: inline-block; width:550px;vertical-align: top">{{table.classification_name}}</span>
                </label>
            </div>
            <div class="detail">
                <label style="margin-left:115px"><span style="display: inline-block; width:550px;vertical-align: top">{{table.recommend_class_name}}</span></label>
            </div>
            <div class="detail">
                <label>上架时间：<span>{{table.sell_time}}</span></label>
            </div>
            <div class="detail">
                <label>下架时间：<span>{{table.remove_time}}</span></label>
            </div>
            <div class="img" style="width:600px;margin-left: 60px;">
                <div>商品轮播图：</div>
                <span v-for="item in table.carousels">
                    <img :src="aliurl+item.carousel" alt="" width="155" height="100" style="margin: 10px">
                </span>
            </div>
            <div class="detail">
                <label>商品详情:</label>
                <div>
                    <img v-for="item in table.detailImgs" :src="aliurl+item.detailImg" style="width: 100%;height: 100%;" @click="bigImg(item.detailImg)">
                </div>
            </div>

        </div>
        <!--图片放大弹窗-->
        <el-dialog
            title="商品详情"
            :visible.sync="dialogVisible"
            width="30%"
        z-index="999">
            <img :src="aliurl+imgBig" alt="" style="width:100%">
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "goodsD",
        props:['table'],
        data() {
            return {
            imgBig:'',
            dialogVisible:false,
            }
        },
        created(){

        },
        methods:{
            bigImg(val){

                this.imgBig = val;
                this.dialogVisible = true;
            },
        }
    }
</script>

<style scoped>
    .goodsD{
        overflow: hidden;
    }
    .goodsD-left{
        /*float: left;*/
        /*width:750px;*/

    }
    .goodsD-left .detail{
        margin:20px
    }
    .goodsD-left div label{
        margin:40px
}
</style>
