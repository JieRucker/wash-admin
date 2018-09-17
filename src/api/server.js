/**
 * Created by JRucker on 2018/3/18.
 * api 接口
 */

export default {
  /*登录*/
  sendVerifyCode: process.env.api.authUrl + '/login/sendVerifyCode', //发送验证码
  reSetPassword: process.env.api.authUrl + '/login/reSetPassword', //修改密码
  reSetPasswordNotVerifyCode: process.env.api.authUrl + '/login/reSetPasswordNotVerifyCode', //密码重置(不需要验证码)
  isRegisted: process.env.api.authUrl + '/login/isRegisted', //用户是否注册
  register: process.env.api.authUrl + '/login/register', //注册
  loginIn: process.env.api.authUrl + '/login/loginIn', //登录
  loginOut: process.env.api.commonUrl + '/loginOut', //登出

  /*报表*/
  selectShopYearIncome: process.env.api.commonUrl + '/order/info/selectShopYearIncome', //查询年报详情（去年）
  selectShopMonthIncome: process.env.api.commonUrl + '/order/info/selectShopMonthIncome',//查询月份报表详情
  listShopDayIncome: process.env.api.commonUrl + '/order/info/listShopDayIncome',//查询近七日收入
  addShopYearIncome: process.env.api.commonUrl + '/order/info/addShopYearIncome',//生成年报
  addShopMonthIncome: process.env.api.commonUrl + '/order/info/addShopMonthIncome',//生成月报
  addShopDayIncome: process.env.api.commonUrl + '/order/info/addShopDayIncome',//生成日报

  /*订单*/
  listOrder: process.env.api.commonUrl + '/order/info/listOrder', //可选订单查询
  orderRefund: process.env.api.commonUrl + '/order/info/orderRefund', //订单退款
  cancelOrder: process.env.api.commonUrl + '/order/info/cancelOrder', //订单取消
  listNormalOrder: process.env.api.commonUrl + '/order/info/listNormalOrder', //普通订单查询
  listNormalRefundingOrder: process.env.api.commonUrl + '/order/info/listNormalRefundingOrder', //普通退款中订单查询
  listPrepareOrder: process.env.api.commonUrl + '/order/info/listPrepareOrder', //预约订单查询
  listPrepareRefundingOrder: process.env.api.commonUrl + '/order/info/listPrepareRefundingOrder', //预约退款中订单查询
  acceptOrderRefund: process.env.api.commonUrl + '/order/info/acceptOrderRefund', //接受退款
  refusedToOrderRefund: process.env.api.commonUrl + '/order/info/acceptOrderRefund', //拒绝退款

  /*价格模板*/
  updateServicePrice: process.env.api.commonUrl + '/order/info/updateServicePrice', //修改服务价格
  deleteServicePrice: process.env.api.commonUrl + '/order/info/deleteServicePrice', //删除服务价格
  listServicePrice: process.env.api.commonUrl + '/order/info/listServicePrice', //查询服务价格
  addServicePrice: process.env.api.commonUrl + '/order/info/addServicePrice', //添加服务价格
  listAssociatedShop: process.env.api.commonUrl + '/order/info/listAssociatedShop', //查询模板绑定门店

  /*优惠券*/
  updateCoupon: process.env.api.commonUrl + '/order/info/updateCoupon', //修改优惠券
  deleteCoupon: process.env.api.commonUrl + '/order/info/deleteCoupon', //删除优惠券
  listCoupon: process.env.api.commonUrl + '/order/info/listCoupon', //查询优惠券
  addCoupon: process.env.api.commonUrl + '/order/info/addCoupon', //添加优惠券

  /*会员卡*/
  updateVipCard: process.env.api.commonUrl + '/order/info/updateVipCard', //修改会员卡
  deleteVipCard: process.env.api.commonUrl + '/order/info/deleteVipCard', //删除会员卡
  listVipCard: process.env.api.commonUrl + '/order/info/listVipCard', //查询会员卡
  addVipCard: process.env.api.commonUrl + '/order/info/addVipCard', //添加会员卡

  /*公司*/
  updateCompany: process.env.api.commonUrl + '/order/info/updateCompany', //修改公司
  deleteCompany: process.env.api.commonUrl + '/order/info/deleteCompany', //删除公司
  listCompany: process.env.api.commonUrl + '/order/info/listCompany', //查询公司
  addCompany: process.env.api.commonUrl + '/order/info/addCompany', //添加公司

  /*省市区*/
  listProvince: process.env.api.commonUrl + '/order/info/listProvince', //查询省
  listCity: process.env.api.commonUrl + '/order/info/listCity', //查询市
  listCounty: process.env.api.commonUrl + '/order/info/listCounty', //查询区

  /*用户*/
  listUser: process.env.api.commonUrl + '/order/info/listUser', //用户查询(列表)
  getUserByUserId: process.env.api.commonUrl + '/order/info/getUserByUserId', //用户查询(单个)
  bindUserGiftPacksRel: process.env.api.commonUrl + '/order/info/bindUserGiftPacksRel', //绑定优惠券礼包
  bindUserVipCardRel: process.env.api.commonUrl + '/order/info/bindUserVipCardRel', //绑定会员卡
  bindUserCoupon: process.env.api.commonUrl + '/order/info/bindUserCoupon',//绑定优惠券

  /*礼包*/
  updateCouponGiftPack: process.env.api.commonUrl + '/order/info/updateCouponGiftPack', //修改优惠券礼包
  deleteCouponGiftPack: process.env.api.commonUrl + '/order/info/deleteCouponGiftPack', //删除优惠券礼包
  listCouponGiftPack: process.env.api.commonUrl + '/order/info/listCouponGiftPack', //查询优惠券礼包
  modifyGiftPacksState: process.env.api.commonUrl + '/order/info/modifyGiftPacksState',// 改变优惠券礼包状态
  createUploadId: process.env.api.commonUrl + '/order/info/createUploadId',// 创建uploadId
  addGiftPacksPic: process.env.api.commonUrl + '/order/info/addGiftPacksPic',// 上传图片
  endGiftPacksPic: process.env.api.commonUrl + '/order/info/endGiftPacksPic',// 添加优惠券礼包

  /*设备*/
  updateDevice: process.env.api.commonUrl + '/order/info/updateDevice', //修改设备
  deleteDevice: process.env.api.commonUrl + '/order/info/deleteDevice', //删除设备
  addDevice: process.env.api.commonUrl + '/order/info/addDevice', //添加设备
  listDevice: process.env.api.commonUrl + '/order/info/listDevice', //设备查询
  listDeviceRel: process.env.api.commonUrl + '/order/info/listDeviceRel', //设备查询(增改门店用)
  startDevice: process.env.api.commonUrl + '/order/info/startDevice',// 启动设备
  stopDevice: process.env.api.commonUrl + '/order/info/stopDevice',//强制停止设备
  startDeviceClear: process.env.api.commonUrl + '/order/info/startDeviceClear',// 启动桶自洁

  /*门店*/
  updateShop: process.env.api.commonUrl + '/order/info/updateShop', //修改门店
  deleteShop: process.env.api.commonUrl + '/order/info/deleteShop', //删除门店
  addShop: process.env.api.commonUrl + '/order/info/addShop', //添加门店
  listShop: process.env.api.commonUrl + '/order/info/listShop', //门店查询
}


