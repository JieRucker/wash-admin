import Main from '@/views/Main.vue';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/statistic/statistic-charts',
  component: Main,
  children: [
    {path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue')},
    {
      path: 'product/:templateId',
      title: '模板详情',
      name: 'product-info',
      component: () => import('@/views/advanced-router/product-info/product-info.vue')
    },
    /*{
        path: 'ownspace',
        title: '个人中心',
        name: 'ownspace_index',
        component: () => import('@/views/own-space/own-space.vue')
    },*/
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/statistic',
    icon: 'android-apps',
    name: 'statistic',
    title: '数据分析',
    component: Main,
    children: [
      {
        path: 'statistic-charts',
        title: '数据分析',
        name: 'statistic-charts',
        icon: 'stats-bars',
        component: () => import('@/views/statistic/statistic-charts.vue')
      },
    ]
  },
  {
    path: '/order',
    icon: 'android-apps',
    name: 'order',
    title: '订单管理',
    component: Main,
    children: [
      {
        path: 'order-list',
        title: '订单列表',
        name: 'order-list',
        icon: 'android-funnel',
        component: () => import('@/views/order/order-list.vue')
      },
      {
        path: 'order-refund',
        title: '退款管理',
        name: 'order-refund',
        icon: 'arrow-swap',
        component: () => import('@/views/order/order-refund.vue')
      }
    ]
  },
  {
    path: '/coupon',
    icon: 'android-apps',
    name: 'coupon',
    title: '优惠券',
    component: Main,
    children: [
      {
        path: 'present-list',
        title: '礼包',
        name: 'present-list',
        icon: 'android-funnel',
        component: () => import('@/views/coupon/present-list.vue')
      },
      {
        path: 'coupon-list',
        title: '优惠券',
        name: 'coupon-list',
        icon: 'android-funnel',
        component: () => import('@/views/coupon/coupon-list.vue')
      }
    ]
  },
  {
    path: '/device',
    icon: 'android-apps',
    name: 'device',
    title: '设备管理',
    component: Main,
    children: [
      {
        path: 'device-list',
        title: '设备管理',
        name: 'device-list',
        icon: 'android-funnel',
        component: () => import('@/views/device/device-list.vue')
      },
    ]
  },
  {
    path: '/user',
    icon: 'android-person',
    name: 'user',
    title: '用户列表',
    component: Main,
    children: [
      {
        path: 'user-list',
        title: '用户列表',
        name: 'user-list',
        icon: 'android-person',
        component: () => import('@/views/user/user-list.vue')
      },
    ]
  },
  {
    path: '/price',
    icon: 'android-apps',
    name: 'price',
    title: '定价模板管理',
    component: Main,
    children: [
      {
        path: 'price-list',
        title: '定价模板管理',
        name: 'price-list',
        icon: 'android-funnel',
        component: () => import('@/views/price/price-list.vue')
      },
    ]
  },
  {
    path: '/member',
    icon: 'android-apps',
    name: 'member',
    title: '会员配置',
    component: Main,
    children: [
      {
        path: 'member-list',
        title: '会员配置',
        name: 'member-list',
        icon: 'android-funnel',
        component: () => import('@/views/member/member-list.vue')
      },
    ]
  },
  {
    path: '/company',
    icon: 'android-apps',
    name: 'company',
    title: '公司列表',
    component: Main,
    children: [
      {
        path: 'company-list',
        title: '公司列表',
        name: 'company-list',
        icon: 'android-funnel',
        component: () => import('@/views/company/company-list.vue')
      },
    ]
  },
  {
    path: '/shop',
    icon: 'android-apps',
    name: 'shop',
    title: '门店管理',
    component: Main,
    children: [
      {
        path: 'shop-list',
        title: '门店管理',
        name: 'shop-list',
        icon: 'android-funnel',
        component: () => import('@/views/shop/shop-list.vue')
      },
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  ...appRouter,
];
