<template>
    <transition name="el-fade-in">
        <div>
            <TableHeader
                @watchSeach="watchSeach"
                ref="tableHeader"
                :showoption="['crumbs']"
                :breadcrumb="{nameA: '财务管理', nameB: '销售统计'}">
            </TableHeader>
            <div class="m-t-20">
                <!-- fill="#009999" -->
                <el-radio-group v-model="pageStep" size="small">
                    <el-radio-button label="1" >　总营业额统计　</el-radio-button>
                    <el-radio-button label="2">　月营业额统计　</el-radio-button>
                    <el-radio-button label="3">　日营业额统计　</el-radio-button>
                    <el-radio-button label="4">　商品成本列表　</el-radio-button>
                </el-radio-group>
            </div>
            <div v-if="pageStep == 4">
                <SalesGood></SalesGood>
            </div>
            <div v-else-if="pageStep == 3">
                <SalesStep :pageStep="pageStep" @changePageStep="changePageStep($event)"></SalesStep>
            </div>
            <div v-else-if="pageStep == 2">
                <SalesStepA :pageStep="pageStep" @changePageStep="changePageStep($event)"></SalesStepA>
            </div>
            <div v-else>
                <SalesStepB :pageStep="pageStep" @changePageStep="changePageStep($event)"></SalesStepB>
            </div>
        </div>
    </transition> 
</template>

<script>
    import TableHeader from '@/components/TableHeader'
    import mixin from '@/mixins/mixins'
    // 
    import SalesStep from './SalesStatsStep';
    import SalesStepA from './SalesStatsStepA';
    import SalesStepB from './SalesStatsStepB';
    import SalesGood from './SalesStatsGood';

    export default {
        name: "list",
        data() {
            return {
                pageStep: 1,
                isAnYear: false,
            }
        },
        methods: {
            watchSeach(e) {
                
            },
            changePageStep(num){
                this.pageStep = num;
            },
        },
        components: {
            TableHeader,SalesStep,SalesGood,SalesStepA,SalesStepB
        },
        mixins: [mixin],
        created() {
        },
    }
</script>

<style scoped>

</style>
