<template>
    <div>
        <div>
            <span class="management">客服记录</span>
            <el-button size="mini" class="servicerecord" type="primary" @click=" $emit('close')">返回</el-button>
        </div>
        <div style="margin: 20px;"></div>
        <table border="1px" width="100%"  v-model="tabelDate">
            <tr>
                <th>客服</th>
                <th class="weight">{{table.admin_no}}</th>
            </tr>
            <tr>
                <th>用户昵称</th>
                <th class="weight">{{table.nick_name}}</th>
            </tr>
            <tr>
                <th>联系方式</th>
                <th class="weight">{{table.mobile}}</th>

            </tr>
            <tr>
                <th>修改信息</th>
                <th class="weight">{{table.comment}}</th>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabelDate:[],
                pageType:{
                    page:1,
                },
            }
        },
        methods: {

        },
        props:['table'],
        created() {
            console.log(this.table)
        }
    }
</script>


<style scoped>
    .servicerecord{
        float:right;
    }
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    table,tr,th{
        border-collapse:collapse;
        border:1px solid #DCDFE6;
        text-align:center;
        height:70px;
        font-size:20px
    }/* 边框会合并为一个单一的边框 */
  .weight{
      font-weight:400;
      font-size:20px
  }
  .management{
      font-size: 22px;
  }
</style>

