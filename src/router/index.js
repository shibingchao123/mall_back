import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {   // 登录页面
            path: '/',
            name: 'hrhLogin',
            component: resolve => require(['@/pages/login'], resolve),
        },
        {   // 主页
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/pages/home'], resolve),
            //项目已通过审核列表
            redirect: {name: 'welcome'},
            children: [
                {   // 欢迎页面
                    path: '/home/welcome',
                    name: 'welcome',
                    component: resolve => require(['@/pages/welcome'], resolve),
                },
                {   //权限管理--权限列表
                    path: '/home/limit/limitList',
                    name: 'limitList',
                    component: resolve => require(['@/pages/limit/limitList'], resolve),
                },
                {   //权限管理--权限列表
                    path: '/home/limit/addLimit',
                    name: 'addLimit',
                    component: resolve => require(['@/pages/limit/addLimit'], resolve),
                },
                {   //用户管理--用户列表
                    path: '/home/user/userList',
                    name: 'userList',
                    component: resolve => require(['@/pages/userManagement/userList'], resolve),
                },
                {   //userList2
                    path: '/home/user/userList2',
                    name: 'userList2',
                    component: resolve => require(['@/pages/userManagement/userList2'], resolve),
                },
                {   //用户管理--用户列表
                    path: '/home/user/userList1',
                    name: 'userList1',
                    component: resolve => require(['@/pages/userManagement/userList1'], resolve),
                },

                {  //商品管理--商品列表
                    path: '/home/goods/goodsList',
                    name: 'goodsList',
                    component: resolve => require(['@/pages/goods/goodsList'], resolve),
                },
                {  //商品管理--添加商品
                    path: '/home/goods/addGoods',
                    name: 'addGoods',
                    component: resolve => require(['@/pages/goods/addGoods'], resolve),
                },
                {  //商品管理--修改商品
                    path: '/home/goods/reGoods',
                    name: 'reGoods',
                    component: resolve => require(['@/pages/goods/reGoods'], resolve),
                },
                {  //商品管理--商品详情
                    path: '/home/goods/goodsD',
                    name: 'goodsD',
                    component: resolve => require(['@/pages/goods/goodsD'], resolve),
                },

                //6订单管理
                {   //订单管理--订单列表管理
                    path: '/home/order/OrderList',
                    name: 'OrderList',
                    component: resolve => require(['@/pages/order/OrderList'], resolve),
                },
                {   //订单管理--采购订单-打印
                    path: '/home/order/PurchaseOrderList',
                    name: 'PurchaseOrderList',
                    component: resolve => require(['@/pages/order/PurchaseOrderList'], resolve),
                },
                {   //订单管理--配送订单
                    path: '/home/order/DeliveryOrderList',
                    name: 'DeliveryOrderList',
                    component: resolve => require(['@/pages/order/DeliveryOrderList'], resolve),
                },
                // 7营销管理
                {   //营销管理--优惠券管理
                    path: '/home/Marketing/MarketList',
                    name: 'MarketList',
                    component: resolve => require(['@/pages/Marketing/MarketList'], resolve),
                },
                {   //营销管理--添加活动
                    path: '/home/Marketing/AddMarketing',
                    name: 'AddMarketing',
                    component: resolve => require(['@/pages/Marketing/AddMarketing'], resolve),
                },
                // 客服中心
                {  //客服中心--客服记录列表
                    path: '/home/serviceCenter/recordList',
                    name: 'recordList',
                    component: resolve => require(['@/pages/serviceCenter/recordList'], resolve),
                },
                // 客服中心
                {  //客服中心--客服记录列表
                    path: '/home/serviceCenter/recordList',
                    name: 'recordList1',
                    component: resolve => require(['@/pages/serviceCenter/recordList'], resolve),
                },
                {  //客服中心--新增客服记录
                    path: '/home/serviceCenter/addServiceList',
                    name: 'addServiceList',
                    component: resolve => require(['@/pages/serviceCenter/addServiceList'], resolve),
                },
                {  //客服中心--修改信息
                    path: '/home/serviceCenter/updataService',
                    name: 'updataService',
                    component: resolve => require(['@/pages/serviceCenter/updataService'], resolve),
                },
                {  //客服中心--查看记录详情
                    path: '/home/serviceCenter/lookRecord',
                    name: 'lookRecord',
                    component: resolve => require(['@/pages/serviceCenter/lookRecord'], resolve),
                },
                //8积分管理
                {  //客服中心--查看记录详情
                    path: '/home/point/pointManagement',
                    name: 'pointManagement',
                    component: resolve => require(['@/pages/point/pointManagement'], resolve),
                },
                //9数据统计
                {   //数据统计--交易统计
                    path: '/home/dataStats/dealData',
                    name: 'dealData',
                    component: resolve => require(['@/pages/dataStats/dealData'], resolve),
                },
                {   //数据统计--商品统计
                    path: '/home/dataStats/shopData',
                    name: 'shopData',
                    component: resolve => require(['@/pages/dataStats/shopData'], resolve),
                },
                {   //数据统计--积分订单统计
                    path: '/home/dataStats/integralData',
                    name: 'integralData',
                    component: resolve => require(['@/pages/dataStats/integralData'], resolve),
                },
                //10财务管理
                {   //财务管理--销售统计
                    path: '/home/finance/SalesStats',
                    name: 'SalesStats',
                    component: resolve => require(['@/pages/finance/SalesStats'], resolve),
                },
                {   //财务管理--提现申请
                    path: '/home/finance/CashOut',
                    name: 'CashOut',
                    component: resolve => require(['@/pages/finance/CashOut'], resolve),
                },
                /*wrrr1*/
                {   //用户管理--商户列表
                    path: '/home/user/merchantList',
                    name: 'merchantList',
                    component: resolve => require(['@/pages/userManagement/merchantList'], resolve),
                },
                {   //用户管理--商户审核
                    path: '/home/user/merchantAudit',
                    name: 'merchantAudit',
                    component: resolve => require(['@/pages/userManagement/merchantAudit'], resolve),
                },
                //运营管理
                {   //运营管理--banner管理
                    path: '/home/web/banner',
                    name: 'banner',
                    component: resolve => require(['@/pages/web/banner'], resolve),
                },
                {   //运营管理--分类管理
                    path: '/home/web/classify',
                    name: 'classify',
                    component: resolve => require(['@/pages/web/classify'], resolve),
                },
                {   //运营管理--分组管理
                    path: '/home/web/classifyG',
                    name: 'classifyG',
                    component: resolve => require(['@/pages/web/classifyG'], resolve),
                },
                {   //运营管理--站长管理
                    path: '/home/web/stationmaster',
                    name: 'stationmaster',
                    component: resolve => require(['@/pages/web/stationmaster'], resolve),
                },
                /*wrrr1*/
                {   //操作管理
                    path: '/home/operating/operatingRecord',
                    name: 'operatingRecord',
                    component: resolve => require(['@/pages/operating/operatingRecord'], resolve),
                },
                // 8-8
                {   //团长打印管理
                    path: '/home/Printing/Printing',
                    name: 'Printing',
                    component: resolve => require(['@/pages/Printing/Printing'], resolve),
                },
            ]
        },
    ]
})
